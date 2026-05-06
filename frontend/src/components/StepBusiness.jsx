import { useState, useEffect } from "react"
import "../styles/form.css"
import API_URL from "../config"

const regionesYComunas = {
  "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
  "Región de Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
  "Región de Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
  "Región de Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
  "Región de Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
  "Región Metropolitana": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Santiago", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
  "Región del Libertador Gral. Bernardo O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
  "Región del Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
  "Región de Ñuble": ["Chillán", "Bulnes", "Chillán Viejo", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ránquil", "Treguaco", "Coihueco", "Ñiquén", "San Carlos", "San Fabián", "San Nicolás"],
  "Región del Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
  "Región de La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
  "Región de Los Ríos": ["Valdivia", "Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "Río Bueno"],
  "Región de Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
  "Región de Aysén": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
  "Región de Magallanes": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
}

const areasYCategorias = {
  "Alimentación": ["Comida casera", "Repostería", "Bebidas", "Frutas y verduras", "Snacks", "Otro"],
  "Moda y accesorios": ["Ropa mujer", "Ropa hombre", "Ropa niños", "Calzado", "Bolsos", "Joyería", "Otro"],
  "Belleza y cuidado": ["Cosméticos", "Skincare", "Peluquería", "Uñas", "Masajes", "Otro"],
  "Hogar y deco": ["Muebles", "Decoración", "Iluminación", "Textiles", "Plantas", "Otro"],
  "Servicios": ["Gasfitería", "Electricidad", "Computación", "Clases", "Diseño", "Fotografía", "Otro"],
  "Tecnología": ["Celulares", "Accesorios", "Computación", "Electrónica", "Otro"],
  "Arte y manualidades": ["Cuadros", "Cerámica", "Tejidos", "Joyería artesanal", "Otro"],
  "Salud y bienestar": ["Nutrición", "Yoga", "Psicología", "Medicamentos naturales", "Otro"],
  "Educación": ["Clases particulares", "Talleres", "Cursos online", "Otro"],
  "Mascotas": ["Alimentos", "Accesorios", "Veterinaria", "Paseos", "Otro"]
}

const paymentOptions = ["Efectivo", "Transferencia", "Débito", "Crédito", "MercadoPago"]

const selectStyle = (hasValue) => ({
  color: hasValue ? "white" : "rgba(255,255,255,0.5)",
  background: "#1a1a1a"
})

const optionStyle = { color: "white", background: "#1a1a1a" }
const optionPlaceholderStyle = { color: "rgba(255,255,255,0.5)", background: "#1a1a1a" }

const generarSlugLocal = (texto) => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "")
}

function StepBusiness({ formData, setFormData, next, back }) {
  const [errors, setErrors] = useState({})
  const [slugDisponible, setSlugDisponible] = useState(null)
  const [verificando, setVerificando] = useState(false)

  useEffect(() => {
    const nombre = formData.businessFantasyName || formData.businessName
    if (!nombre || nombre.length < 3) {
      setSlugDisponible(null)
      return
    }

    const slug = generarSlugLocal(nombre)
    setVerificando(true)

    const timer = setTimeout(() => {
      fetch(`${API_URL}/verificar-slug/${slug}`)
        .then(res => res.json())
        .then(data => {
          setSlugDisponible(data.disponible)
          setVerificando(false)
        })
        .catch(() => setVerificando(false))
    }, 600)

    return () => clearTimeout(timer)
  }, [formData.businessFantasyName, formData.businessName])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "businessRegion") {
      setFormData({ ...formData, businessRegion: value, businessComuna: "" })
    } else if (name === "businessArea") {
      setFormData({ ...formData, businessArea: value, businessCategory: "" })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleImageChange = (e, index) => {
    const file = e.target.files[0]
    if (!file) return
    const images = [...(formData.businessImages || [null, null, null])]
    images[index] = file
    setFormData({ ...formData, businessImages: images })
  }

  const handlePayment = (method) => {
    const current = formData.paymentMethods || []
    if (current.includes(method)) {
      setFormData({ ...formData, paymentMethods: current.filter(m => m !== method) })
    } else {
      setFormData({ ...formData, paymentMethods: [...current, method] })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.businessName) newErrors.businessName = "Nombre requerido"
    if (!formData.businessDescription) newErrors.businessDescription = "Descripción requerida"
    if (!formData.businessPhone) newErrors.businessPhone = "WhatsApp requerido"
    if (!formData.businessArea) newErrors.businessArea = "Área requerida"
    if (!formData.businessCategory) newErrors.businessCategory = "Categoría requerida"
    if (!formData.businessRegion) newErrors.businessRegion = "Región requerida"
    if (!formData.businessComuna) newErrors.businessComuna = "Comuna requerida"
    if (!formData.businessStreet) newErrors.businessStreet = "Calle requerida"
    if (!formData.businessNumber) newErrors.businessNumber = "Número requerido"
    if (slugDisponible === false) newErrors.businessFantasyName = "Este nombre ya está en uso"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFinish = () => {
    if (validate()) next()
  }

  const slugPreview = generarSlugLocal(formData.businessFantasyName || formData.businessName || "")

  return (
    <div className="form-container">
      <div className="form-card">

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4px", position: "relative" }}>
          <button
            onClick={back}
            style={{
              position: "absolute",
              left: 0,
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "22px",
              cursor: "pointer",
              padding: "0",
              lineHeight: 1
            }}
          >
            ←
          </button>
          <h2 className="form-title" style={{ margin: 0, textAlign: "center" }}>
            Tu emprendimiento
          </h2>
        </div>
        <p className="form-subtitle" style={{ textAlign: "center" }}>
          Da tu primer paso 🚀
        </p>

        {/* NOMBRE */}
        <input
          name="businessName"
          placeholder="Nombre del emprendimiento *"
          value={formData.businessName || ""}
          onChange={handleChange}
          className="form-input"
        />
        {errors.businessName && <span className="error">{errors.businessName}</span>}

        {/* NOMBRE FANTASÍA */}
        <input
          name="businessFantasyName"
          placeholder="Nombre de fantasía (opcional)"
          value={formData.businessFantasyName || ""}
          onChange={handleChange}
          className="form-input"
        />

        {/* PREVIEW URL */}
        {slugPreview && (
          <div style={{
            fontSize: "12px",
            marginTop: "-8px",
            marginBottom: "8px",
            padding: "8px 12px",
            borderRadius: "8px",
            background: slugDisponible === false ? "rgba(255,0,0,0.08)" : "rgba(229,177,41,0.08)",
            border: `1px solid ${slugDisponible === false ? "rgba(255,0,0,0.3)" : "rgba(229,177,41,0.3)"}`
          }}>
            <span style={{ opacity: 0.6 }}>Tu página será: </span>
            <span style={{ color: "#E5B129" }}>enlaesquina.cl/{slugPreview}</span>
            {verificando && <span style={{ opacity: 0.5, marginLeft: "8px" }}>verificando...</span>}
            {!verificando && slugDisponible === true && <span style={{ color: "#25D366", marginLeft: "8px" }}>✓ disponible</span>}
            {!verificando && slugDisponible === false && <span style={{ color: "#ff4444", marginLeft: "8px" }}>✗ ya está en uso</span>}
          </div>
        )}
        {errors.businessFantasyName && <span className="error">{errors.businessFantasyName}</span>}

        {/* DESCRIPCIÓN */}
        <textarea
          name="businessDescription"
          placeholder="Descripción de tu emprendimiento *"
          value={formData.businessDescription || ""}
          onChange={handleChange}
          className="form-input"
          rows={3}
          style={{ resize: "vertical" }}
        />
        {errors.businessDescription && <span className="error">{errors.businessDescription}</span>}

        {/* IMÁGENES */}
        <p style={labelStyle}>Fotos del emprendimiento (hasta 3)</p>
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          {[0, 1, 2].map((i) => (
            <label key={i} style={imageBox}>
              {formData.businessImages?.[i] ? (
                <img
                  src={URL.createObjectURL(formData.businessImages[i])}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
                />
              ) : (
                <span style={{ fontSize: "24px", opacity: 0.4 }}>+</span>
              )}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e, i)}
              />
            </label>
          ))}
        </div>

        {/* VALORES */}
        <input
          name="businessPriceRange"
          placeholder="Valores referenciales (ej: desde $1.000 a $50.000)"
          value={formData.businessPriceRange || ""}
          onChange={handleChange}
          className="form-input"
        />

        {/* WHATSAPP */}
        <input
          name="businessPhone"
          placeholder="Número de WhatsApp * (ej: 56912345678)"
          value={formData.businessPhone || ""}
          onChange={handleChange}
          className="form-input"
        />
        {errors.businessPhone && <span className="error">{errors.businessPhone}</span>}

        {/* DIRECCIÓN */}
        <p style={labelStyle}>Dirección del emprendimiento (privada) *</p>
        <p style={{ fontSize: "12px", opacity: 0.5, marginBottom: "10px" }}>
          Tu dirección no será visible públicamente. La usamos solo para mostrarte a personas cercanas.
        </p>

        <select
          name="businessRegion"
          value={formData.businessRegion || ""}
          onChange={handleChange}
          className="form-input"
          style={selectStyle(formData.businessRegion)}
        >
          <option value="" style={optionPlaceholderStyle}>Selecciona una región *</option>
          {Object.keys(regionesYComunas).map(region => (
            <option key={region} value={region} style={optionStyle}>{region}</option>
          ))}
        </select>
        {errors.businessRegion && <span className="error">{errors.businessRegion}</span>}

        {formData.businessRegion && (
          <select
            name="businessComuna"
            value={formData.businessComuna || ""}
            onChange={handleChange}
            className="form-input"
            style={selectStyle(formData.businessComuna)}
          >
            <option value="" style={optionPlaceholderStyle}>Selecciona una comuna *</option>
            {regionesYComunas[formData.businessRegion].map(comuna => (
              <option key={comuna} value={comuna} style={optionStyle}>{comuna}</option>
            ))}
          </select>
        )}
        {errors.businessComuna && <span className="error">{errors.businessComuna}</span>}

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 2 }}>
            <input
              name="businessStreet"
              placeholder="Calle *"
              value={formData.businessStreet || ""}
              onChange={handleChange}
              className="form-input"
            />
            {errors.businessStreet && <span className="error">{errors.businessStreet}</span>}
          </div>
          <div style={{ flex: 1 }}>
            <input
              name="businessNumber"
              placeholder="Número *"
              value={formData.businessNumber || ""}
              onChange={handleChange}
              className="form-input"
            />
            {errors.businessNumber && <span className="error">{errors.businessNumber}</span>}
          </div>
        </div>

        <input
          name="businessDept"
          placeholder="Depto / Piso / Block (opcional)"
          value={formData.businessDept || ""}
          onChange={handleChange}
          className="form-input"
        />

        {/* ÁREA */}
        <select
          name="businessArea"
          value={formData.businessArea || ""}
          onChange={handleChange}
          className="form-input"
          style={selectStyle(formData.businessArea)}
        >
          <option value="" style={optionPlaceholderStyle}>Selecciona un área *</option>
          {Object.keys(areasYCategorias).map(area => (
            <option key={area} value={area} style={optionStyle}>{area}</option>
          ))}
        </select>
        {errors.businessArea && <span className="error">{errors.businessArea}</span>}

        {formData.businessArea && (
          <select
            name="businessCategory"
            value={formData.businessCategory || ""}
            onChange={handleChange}
            className="form-input"
            style={selectStyle(formData.businessCategory)}
          >
            <option value="" style={optionPlaceholderStyle}>Selecciona una categoría *</option>
            {areasYCategorias[formData.businessArea].map(cat => (
              <option key={cat} value={cat} style={optionStyle}>{cat}</option>
            ))}
          </select>
        )}
        {errors.businessCategory && <span className="error">{errors.businessCategory}</span>}

        {/* HORARIO */}
        <input
          name="businessHours"
          placeholder="Horario de atención (ej: Lun-Vie 9:00 a 18:00)"
          value={formData.businessHours || ""}
          onChange={handleChange}
          className="form-input"
        />

        {/* MÉTODOS DE PAGO */}
        <p style={labelStyle}>Métodos de pago aceptados</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
          {paymentOptions.map(method => {
            const selected = (formData.paymentMethods || []).includes(method)
            return (
              <button
                key={method}
                onClick={() => handlePayment(method)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: selected ? "none" : "1px solid rgba(255,255,255,0.3)",
                  background: selected ? "#E5B129" : "transparent",
                  color: selected ? "black" : "white",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: selected ? "bold" : "normal"
                }}
              >
                {method}
              </button>
            )
          })}
        </div>

        {/* REDES SOCIALES */}
        <p style={labelStyle}>Redes sociales (opcional)</p>
        {[
          { name: "socialFacebook", placeholder: "Facebook", icon: "f" },
          { name: "socialInstagram", placeholder: "Instagram", icon: "ig" },
          { name: "socialX", placeholder: "X (Twitter)", icon: "x" },
          { name: "socialTiktok", placeholder: "TikTok", icon: "tt" }
        ].map(({ name, placeholder, icon }) => (
          <div key={name} style={{ position: "relative" }}>
            <span style={socialIcon}>{icon}</span>
            <input
              name={name}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={handleChange}
              className="form-input"
              style={{ paddingLeft: "36px" }}
            />
          </div>
        ))}

        {/* CHECKBOX DIRECCIÓN PÚBLICA */}
        <div style={{
          background: "rgba(255,0,0,0.08)",
          border: "1px solid rgba(255,0,0,0.3)",
          borderRadius: "10px",
          padding: "14px",
          marginTop: "8px",
          marginBottom: "16px"
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <input
              type="checkbox"
              checked={formData.direccionPublica || false}
              onChange={(e) =>
                setFormData({ ...formData, direccionPublica: e.target.checked })
              }
              style={{ marginTop: "3px", cursor: "pointer", accentColor: "#ff4444" }}
            />
            <span style={{ fontSize: "13px", lineHeight: "1.5" }}>
              <strong style={{ color: "#ff4444" }}>
                Autorizo que mi dirección exacta sea visible públicamente
              </strong>
              <br />
              <span style={{ opacity: 0.6, fontSize: "12px" }}>
                Solo activa esta opción si tienes un local, taller o espacio físico al que recibes clientes.
              </span>
            </span>
          </div>
        </div>

        <button className="form-button" onClick={handleFinish} style={{ marginTop: "8px" }}>
          Finalizar registro 🚀
        </button>

      </div>
    </div>
  )
}

const labelStyle = { fontSize: "13px", opacity: 0.7, marginBottom: "8px" }

const imageBox = {
  width: "80px",
  height: "80px",
  borderRadius: "10px",
  border: "1px dashed rgba(255,255,255,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  overflow: "hidden",
  color: "white"
}

const socialIcon = {
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "12px",
  fontWeight: "bold",
  opacity: 0.6,
  color: "white",
  pointerEvents: "none",
  zIndex: 1
}

export default StepBusiness