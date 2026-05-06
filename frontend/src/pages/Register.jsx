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
      goBack()

    } catch (error) {
      setErrorServidor("No se pudo conectar con el servidor")
    } finally {
      setLoading(false)
    }
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

      <p
        onClick={goToLogin}
        style={{ marginTop: "20px", cursor: "pointer", opacity: 0.7 }}
      >
        ¿Ya tienes cuenta? <strong>Inicia sesión aquí</strong>
      </p>

    </div>
  )
}

export default Register