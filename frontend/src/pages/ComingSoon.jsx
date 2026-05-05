import { useEffect } from "react"
import useGeolocation from "../hooks/useGeolocation"

function ComingSoon({ goToRegister, onLocationReady }) {
  const { location } = useGeolocation()

  useEffect(() => {
    if (location) {
      onLocationReady(location)
    }
  }, [location])

  return (
    <div style={styles.container}>

      <video autoPlay muted loop playsInline style={styles.video}>
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div style={styles.overlay}>
        <div style={styles.box}>

          <p style={styles.badge}>MUY PRONTO</p>

          <h1 style={styles.title}>En la Esquina</h1>

          <h2 style={styles.subtitle}>
            ¿Sabes todo lo que tu barrio tiene para ofrecer?
          </h2>

          <p style={styles.text}>
            Descubre, compra y apoya a emprendedores cerca de ti. Sin intermediarios.
          </p>

          <div style={styles.actionContainer}>
            <button style={styles.button} onClick={goToRegister}>
              Inscríbete como emprendedor 🚀
            </button>
          </div>

          <span style={styles.subtext}>
            Cupos limitados en el lanzamiento
          </span>

          {location && (
            <p style={styles.locationBadge}>
              📍 Ubicación detectada
            </p>
          )}

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>

    </div>
  )
}

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    fontFamily: "system-ui, sans-serif"
  },
  video: {
    position: "absolute",
    top: "50%",
    left: "50%",
    minWidth: "100%",
    minHeight: "100%",
    transform: "translate(-50%, -50%)",
    objectFit: "cover"
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.85))",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px"
  },
  box: {
    animation: "fadeIn 1.2s ease-out",
    color: "white",
    maxWidth: "500px"
  },
  badge: {
    display: "inline-block",
    background: "#E5B129",
    color: "black",
    padding: "5px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "2px",
    marginBottom: "15px"
  },
  title: {
    fontSize: "48px",
    fontWeight: "900",
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "22px",
    marginBottom: "15px"
  },
  text: {
    fontSize: "16px",
    marginBottom: "25px",
    opacity: 0.9
  },
  actionContainer: {
    marginBottom: "20px"
  },
  button: {
    background: "#E5B129",
    color: "black",
    border: "none",
    padding: "14px 28px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "30px",
    cursor: "pointer",
    animation: "pulse 2s infinite"
  },
  subtext: {
    fontSize: "13px",
    opacity: 0.6
  },
  locationBadge: {
    marginTop: "12px",
    fontSize: "12px",
    opacity: 0.7
  }
}

export default ComingSoon