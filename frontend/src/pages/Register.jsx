import { useState } from "react"
import StepUser from "../components/StepUser"
import StepBusiness from "../components/StepBusiness"
import Terms from "./Terms"
import API_URL from "../config"

function Register({ goToLogin, goBack, userLocation }) {
  const [step, setStep] = useState(1)
  const [showTerms, setShowTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorServidor, setErrorServidor] = useState("")
  const [slugFinal, setSlugFinal] = useState(null)
  const [copiado, setCopiado] = useState(false)

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    email: "",
    password: "",
    confirmPassword: "",
    isForeign: false,
    isBusiness: false,
    acceptedTerms: false
  })

  const next = () => setStep(2)
  const back = () => setStep(1)

  const saveAsClient = async () => {
    setLoading(true)
    setErrorServidor("")
    try {
      const res = await fetch(`${API_URL}/registro/cliente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          documento: formData.documento,
          es_extranjero: formData.isForeign,
          email: formData.email,
          password: formData.password,
          acepto_terminos: formData.acceptedTerms
        })
      })

      const data = await res.json()
      if (!res.ok) {
        setErrorServidor(data.error || "Error al registrar")
        return
      }
      goBack()

    } catch (error) {
      setErrorServidor("No se pudo conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  const saveAsBusiness = async () => {
    setLoading(true)
    setErrorServidor("")
    try {
      const body = new FormData()

      body.append("nombre", formData.nombre)
      body.append("apellido", formData.apellido)
      body.append("documento", formData.documento)
      body.append("es_extranjero", formData.isForeign)
      body.append("email", formData.email)
      body.append("password", formData.password)
      body.append("acepto_terminos", formData.acceptedTerms)
      body.append("businessName", formData.businessName || "")
      body.append("businessFantasyName", formData.businessFantasyName || "")
      body.append("businessDescription", formData.businessDescription || "")
      body.append("businessPhone", formData.businessPhone || "")
      body.append("businessRegion", formData.businessRegion || "")
      body.append("businessComuna", formData.businessComuna || "")
      body.append("businessStreet", formData.businessStreet || "")
      body.append("businessNumber", formData.businessNumber || "")
      body.append("businessDept", formData.businessDept || "")
      body.append("businessArea", formData.businessArea || "")
      body.append("businessCategory", formData.businessCategory || "")
      body.append("businessHours", formData.businessHours || "")
      body.append("businessPriceRange", formData.businessPriceRange || "")
      body.append("paymentMethods", JSON.stringify(formData.paymentMethods || []))
      body.append("socialFacebook", formData.socialFacebook || "")
      body.append("socialInstagram", formData.socialInstagram || "")
      body.append("socialX", formData.socialX || "")
      body.append("socialTiktok", formData.socialTiktok || "")
      body.append("direccionPublica", formData.direccionPublica || false)

      if (formData.businessImages) {
        formData.businessImages.forEach(img => {
          if (img) body.append("imagenes", img)
        })
      }

      const res = await fetch(`${API_URL}/registro/emprendedor`, {
        method: "POST",
        body
      })

      const data = await res.json()
      if (!res.ok) {
        setErrorServidor(data.error || "Error al registrar")
        return
      }

      // Guardamos el slug para mostrar la pantalla final
      setSlugFinal(data.slug)
      setStep(3)

    } catch (error) {
      setErrorServidor("No se pudo conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  const copiarLink = () => {
    navigator.clipboard.writeText(`https://www.enlaesquina.cl/${slugFinal}`)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div style={{ padding: "20px", color: "white" }}>

      {step === 1 && (
        <StepUser
          nextStep={next}
          formData={formData}
          setFormData={setFormData}
          goToTerms={() => setShowTerms(true)}
          onSaveAsClient={saveAsClient}
        />
      )}

      {step === 2 && (
        <StepBusiness
          next={saveAsBusiness}
          back={back}
          formData={formData}
          setFormData={setFormData}
          userLocation={userLocation}
        />
      )}

      {/* PANTALLA FINAL */}
      {step === 3 && slugFinal && (
        <div style={styles.finalContainer}>
          <div style={styles.finalCard}>

            <p style={styles.emoji}>🎉</p>
            <h2 style={styles.titulo}>¡Ya estás en la esquina!</h2>
            <p style={styles.subtitulo}>
              Tu emprendimiento está registrado. Comparte tu link y empieza a recibir clientes.
            </p>

            <div style={styles.linkBox}>
              <p style={styles.linkText}>
                enlaesquina.cl/<strong>{slugFinal}</strong>
              </p>
            </div>

            <button onClick={copiarLink} style={styles.btnCopiar}>
              {copiado ? "¡Copiado! ✅" : "📋 Copiar link"}
            </button>

            <a
              href={`https://www.enlaesquina.cl/${slugFinal}`}
              target="_blank"
              rel="noreferrer"
              style={styles.btnVerPagina}
            >
              Ver mi página 🚀
            </a>

            <button onClick={goBack} style={styles.btnVolver}>
              Volver al inicio
            </button>

          </div>
        </div>
      )}

      {showTerms && (
        <Terms
          onAccept={() => {
            setFormData({ ...formData, acceptedTerms: true })
            setShowTerms(false)
          }}
          onClose={() => setShowTerms(false)}
        />
      )}

      {errorServidor && (
        <p style={{
          color: "#ff6b6b",
          textAlign: "center",
          marginTop: "10px",
          fontSize: "14px"
        }}>
          ⚠️ {errorServidor}
        </p>
      )}

      {loading && (
        <p style={{
          color: "#E5B129",
          textAlign: "center",
          marginTop: "10px",
          fontSize: "14px"
        }}>
          Guardando... ⏳
        </p>
      )}

      {step !== 3 && (
        <p
          onClick={goToLogin}
          style={{ marginTop: "20px", cursor: "pointer", opacity: 0.7 }}
        >
          ¿Ya tienes cuenta? <strong>Inicia sesión aquí</strong>
        </p>
      )}

    </div>
  )
}

const styles = {
  finalContainer: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  finalCard: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "20px",
    padding: "32px 24px",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%"
  },
  emoji: {
    fontSize: "48px",
    marginBottom: "8px"
  },
  titulo: {
    fontSize: "24px",
    fontWeight: "900",
    marginBottom: "8px"
  },
  subtitulo: {
    fontSize: "14px",
    opacity: 0.7,
    marginBottom: "24px",
    lineHeight: "1.5"
  },
  linkBox: {
    background: "rgba(229,177,41,0.1)",
    border: "1px solid #E5B129",
    borderRadius: "10px",
    padding: "12px 16px",
    marginBottom: "16px"
  },
  linkText: {
    fontSize: "14px",
    color: "#E5B129",
    wordBreak: "break-all",
    margin: 0
  },
  btnCopiar: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "10px"
  },
  btnVerPagina: {
    display: "block",
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#E5B129",
    color: "black",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "10px",
    textDecoration: "none",
    boxSizing: "border-box"
  },
  btnVolver: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontSize: "13px",
    opacity: 0.5
  }
}

export default Register