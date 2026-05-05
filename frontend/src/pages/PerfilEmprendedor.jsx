import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function PerfilEmprendedor() {
  const { slug } = useParams()
  const [emprendimiento, setEmprendimiento] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imgActual, setImgActual] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:3001/perfil/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setEmprendimiento(data)
        }
        setLoading(false)
      })
      .catch(() => {
        setError("No se pudo cargar el perfil")
        setLoading(false)
      })
  }, [slug])

  if (loading) return (
    <div style={styles.center}>
      <p style={{ color: "white" }}>Cargando... ⏳</p>
    </div>
  )

  if (error) return (
    <div style={styles.center}>
      <p style={{ color: "white", opacity: 0.6 }}>Este perfil no existe 😕</p>
    </div>
  )

  const imagenes = [
    emprendimiento.imagen_1,
    emprendimiento.imagen_2,
    emprendimiento.imagen_3
  ].filter(Boolean)

  const anteriorImg = () => {
    setImgActual(prev => prev === 0 ? imagenes.length - 1 : prev - 1)
  }

  const siguienteImg = () => {
    setImgActual(prev => prev === imagenes.length - 1 ? 0 : prev + 1)
  }

  return (
    <div style={styles.container}>

      {/* CARRUSEL */}
      {imagenes.length > 0 && (
        <div style={styles.carrusel}>

          {/* FONDO DIFUMINADO */}
          <div style={{
            ...styles.bgBlur,
            backgroundImage: `url(${imagenes[imgActual]})`
          }} />

          {/* IMAGEN CONTENIDA */}
          <img
            src={imagenes[imgActual]}
            style={styles.carruselImg}
          />

          {/* OVERLAY GRADIENTE ABAJO */}
          <div style={styles.carruselOverlay} />

          {/* FLECHAS */}
          {imagenes.length > 1 && (
            <>
              <button onClick={anteriorImg} style={{ ...styles.flecha, left: "12px" }}>
                ‹
              </button>
              <button onClick={siguienteImg} style={{ ...styles.flecha, right: "12px" }}>
                ›
              </button>

              {/* PUNTOS INDICADORES */}
              <div style={styles.indicador}>
                {imagenes.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setImgActual(i)}
                    style={{
                      ...styles.punto,
                      background: i === imgActual ? "#E5B129" : "rgba(255,255,255,0.5)"
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* INFO SOBRE LA IMAGEN */}
          <div style={styles.headerOverlay}>
            <h1 style={styles.nombre}>{emprendimiento.nombre}</h1>
            {emprendimiento.nombre_fantasia && (
              <p style={styles.fantasia}>"{emprendimiento.nombre_fantasia}"</p>
            )}
            <span style={styles.badge}>
              {emprendimiento.area} · {emprendimiento.categoria}
            </span>
          </div>

        </div>
      )}

      {/* SI NO HAY IMÁGENES */}
      {imagenes.length === 0 && (
        <div style={styles.sinImagen}>
          <div style={styles.headerOverlay}>
            <h1 style={styles.nombre}>{emprendimiento.nombre}</h1>
            {emprendimiento.nombre_fantasia && (
              <p style={styles.fantasia}>"{emprendimiento.nombre_fantasia}"</p>
            )}
            <span style={styles.badge}>
              {emprendimiento.area} · {emprendimiento.categoria}
            </span>
          </div>
        </div>
      )}

      {/* CONTENIDO */}
      <div style={styles.content}>

        {/* DESCRIPCIÓN */}
        <p style={styles.descripcion}>{emprendimiento.descripcion}</p>

        {/* INFO */}
        <div style={styles.infoCard}>
          {emprendimiento.horario && (
            <p style={styles.infoRow}>🕐 {emprendimiento.horario}</p>
          )}
          {emprendimiento.precio_referencial && (
            <p style={styles.infoRow}>💰 {emprendimiento.precio_referencial}</p>
          )}
          {emprendimiento.comuna && (
            <p style={styles.infoRow}>
              📍 {emprendimiento.comuna}, {emprendimiento.region}
            </p>
          )}
          {emprendimiento.direccion_publica && emprendimiento.calle && (
            <p style={styles.infoRow}>
              🏠 {emprendimiento.calle} {emprendimiento.numero} {emprendimiento.depto || ""}
            </p>
          )}
          {emprendimiento.metodos_pago && emprendimiento.metodos_pago.length > 0 && (
            <p style={styles.infoRow}>💳 {emprendimiento.metodos_pago.join(", ")}</p>
          )}
        </div>

        {/* REDES SOCIALES */}
        <div style={styles.redes}>
          {emprendimiento.social_instagram && (
            <a
              href={`https://instagram.com/${emprendimiento.social_instagram}`}
              target="_blank"
              rel="noreferrer"
              style={styles.redBtn}
            >
              Instagram
            </a>
          )}
          {emprendimiento.social_facebook && (
             <a
              href={emprendimiento.social_facebook}
              target="_blank"
              rel="noreferrer"
              style={styles.redBtn}
            >
              Facebook
            </a>
          )}
          {emprendimiento.social_tiktok && (
             <a
              href={`https://tiktok.com/@${emprendimiento.social_tiktok}`}
              target="_blank"
              rel="noreferrer"
              style={styles.redBtn}
            >
              TikTok
            </a>
          )}
          {emprendimiento.social_x && (
             <a
              href={`https://x.com/${emprendimiento.social_x}`}
              target="_blank"
              rel="noreferrer"
              style={styles.redBtn}
            >
              X
            </a>
          )}
        </div>

        <div style={{ height: "80px" }} />

      </div>

      {/* BOTÓN WHATSAPP FIJO */}
      {emprendimiento.telefono_wsp && (
         <a
          href={`https://wa.me/${emprendimiento.telefono_wsp}`}
          target="_blank"
          rel="noreferrer"
          style={styles.whatsappFijo}
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      )}

    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f0f0f",
    color: "white",
    fontFamily: "system-ui, sans-serif"
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#0f0f0f"
  },
  carrusel: {
    position: "relative",
    width: "100%",
    height: "360px",
    overflow: "hidden",
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  bgBlur: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(20px) brightness(0.4)",
    transform: "scale(1.1)",
    zIndex: 0
  },
  carruselImg: {
    position: "relative",
    zIndex: 1,
    maxWidth: "100%",
    maxHeight: "360px",
    width: "auto",
    height: "auto",
    objectFit: "contain",
    display: "block"
  },
  carruselOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "160px",
    background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
    zIndex: 2
  },
  flecha: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    border: "none",
    color: "white",
    fontSize: "32px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    lineHeight: 1
  },
  indicador: {
    position: "absolute",
    bottom: "60px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "6px",
    zIndex: 3
  },
  punto: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "background 0.2s"
  },
  headerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "20px",
    zIndex: 3
  },
  sinImagen: {
    position: "relative",
    width: "100%",
    height: "180px",
    background: "linear-gradient(to bottom, #1a1a1a, #0f0f0f)"
  },
  nombre: {
    fontSize: "28px",
    fontWeight: "900",
    margin: "0 0 4px 0"
  },
  fantasia: {
    fontSize: "14px",
    opacity: 0.7,
    margin: "0 0 8px 0"
  },
  badge: {
    background: "#E5B129",
    color: "black",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    display: "inline-block"
  },
  content: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto"
  },
  descripcion: {
    fontSize: "15px",
    lineHeight: "1.6",
    opacity: 0.85,
    marginBottom: "16px"
  },
  infoCard: {
    background: "#1a1a1a",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px"
  },
  infoRow: {
    margin: "6px 0",
    fontSize: "14px",
    opacity: 0.85
  },
  redes: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "16px"
  },
  redBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    textDecoration: "none",
    fontSize: "13px"
  },
  whatsappFijo: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#25D366",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
    zIndex: 999,
    textDecoration: "none"
  }
}

export default PerfilEmprendedor