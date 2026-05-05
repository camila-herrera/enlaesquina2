const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const pool = require("./db")
const { cloudinary, upload } = require("./cloudinary")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

// función para generar slug desde el nombre de fantasía
const generarSlug = (texto) => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "")
}

// ✅ TEST
app.get("/", (req, res) => {
  res.json({ mensaje: "Backend En la Esquina funcionando" })
})

// ✅ REGISTRO CLIENTE
app.post("/registro/cliente", async (req, res) => {
  const {
    nombre, apellido, documento, es_extranjero,
    email, password, acepto_terminos, username
  } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(
      `INSERT INTO usuarios 
        (nombre, apellido, documento, es_extranjero, email, password, es_emprendedor, acepto_terminos, username)
       VALUES ($1, $2, $3, $4, $5, $6, false, $7, $8)
       RETURNING id, nombre, email, username`,
      [nombre, apellido, documento, es_extranjero, email, hashedPassword, acepto_terminos, username]
    )

    res.status(201).json({
      mensaje: "Cliente registrado con exito",
      usuario: result.rows[0]
    })

  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ error: "El email o usuario ya esta registrado" })
    }
    console.error(error)
    res.status(500).json({ error: "Error en el servidor" })
  }
})

// ✅ REGISTRO EMPRENDEDOR
app.post("/registro/emprendedor", upload.array("imagenes", 3), async (req, res) => {
  const {
    nombre, apellido, documento, es_extranjero,
    email, password, acepto_terminos, username,
    businessName, businessFantasyName, businessDescription,
    businessPhone, businessRegion, businessComuna,
    businessStreet, businessNumber, businessDept,
    businessArea, businessCategory, businessHours,
    businessPriceRange, paymentMethods, direccionPublica,
    socialFacebook, socialInstagram, socialX, socialTiktok
  } = req.body

  try {
    const imageUrls = req.files ? req.files.map(f => f.path) : []

    const hashedPassword = await bcrypt.hash(password, 10)

    const usuarioResult = await pool.query(
      `INSERT INTO usuarios 
        (nombre, apellido, documento, es_extranjero, email, password, es_emprendedor, acepto_terminos, username)
       VALUES ($1, $2, $3, $4, $5, $6, true, $7, $8)
       RETURNING id, nombre, email, username`,
      [nombre, apellido, documento, es_extranjero, email, hashedPassword, acepto_terminos, username]
    )

    const usuarioId = usuarioResult.rows[0].id

    const metodosArray = typeof paymentMethods === "string"
      ? JSON.parse(paymentMethods)
      : paymentMethods

    // Generar slug desde nombre de fantasía, o desde nombre si no hay fantasía
    const slugBase = businessFantasyName
      ? generarSlug(businessFantasyName)
      : generarSlug(businessName)

    // Verificar que el slug no exista ya
    const slugExiste = await pool.query(
      "SELECT id FROM emprendimientos WHERE slug = $1",
      [slugBase]
    )

    // Si existe, agregar un número al final
    const slug = slugExiste.rows.length > 0
      ? `${slugBase}${Date.now()}`
      : slugBase

    await pool.query(
      `INSERT INTO emprendimientos 
        (usuario_id, nombre, nombre_fantasia, descripcion, telefono_wsp,
         region, comuna, calle, numero, depto,
         area, categoria, horario, precio_referencial, metodos_pago,
         social_facebook, social_instagram, social_x, social_tiktok,
         imagen_1, imagen_2, imagen_3, slug, direccion_publica)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)`,
      [
        usuarioId, businessName, businessFantasyName, businessDescription,
        businessPhone, businessRegion, businessComuna, businessStreet,
        businessNumber, businessDept, businessArea, businessCategory,
        businessHours, businessPriceRange, metodosArray,
        socialFacebook, socialInstagram, socialX, socialTiktok,
        imageUrls[0] || null, imageUrls[1] || null, imageUrls[2] || null,
        slug, direccionPublica === "true"
      ]
    )

    res.status(201).json({
      mensaje: "Emprendedor registrado con exito",
      usuario: usuarioResult.rows[0],
      slug
    })

  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ error: "El email o usuario ya esta registrado" })
    }
    console.error(error)
    res.status(500).json({ error: "Error en el servidor" })
  }
})

// ✅ PERFIL PUBLICO POR SLUG
app.get("/perfil/:slug", async (req, res) => {
  const { slug } = req.params
  try {
    const result = await pool.query(
      `SELECT e.*, u.username FROM emprendimientos e
       JOIN usuarios u ON e.usuario_id = u.id
       WHERE e.slug = $1`,
      [slug]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Perfil no encontrado" })
    }

    const emprendimiento = result.rows[0]

    // Si no autorizó dirección pública, ocultamos calle y número
    if (!emprendimiento.direccion_publica) {
      emprendimiento.calle = null
      emprendimiento.numero = null
      emprendimiento.depto = null
    }

    res.json(emprendimiento)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error en el servidor" })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})