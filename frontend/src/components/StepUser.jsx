import { useState } from "react"
import "../styles/form.css"

function StepUser({ nextStep, formData, setFormData, goToTerms, onSaveAsClient }) {

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "documento" && !formData.isForeign) {
      let clean = value.replace(/[^0-9kK-]/g, "").toUpperCase()
      if ((clean.match(/-/g) || []).length > 1) return
      setFormData({ ...formData, documento: clean })
      return
    }

    setFormData({ ...formData, [name]: value })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.nombre) newErrors.nombre = "Nombre requerido"
    if (!formData.apellido) newErrors.apellido = "Apellido requerido"
    if (!formData.documento) newErrors.documento = "Documento requerido"
    if (!formData.email) newErrors.email = "Email requerido"

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres"
    } else if (!/[a-zA-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      newErrors.password = "Debe tener letras y números"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    if (!formData.acceptedTerms) {
      newErrors.terms = "Debes aceptar los términos"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validate()) nextStep()
  }

  const handleSaveAsClient = () => {
    if (validate()) onSaveAsClient()
  }

  return (
    <div className="form-container">
      <div className="form-card">

        <h2 className="form-title">Tu perfil</h2>
        <p className="form-subtitle">Cuéntanos sobre ti</p>

        <div className="form-row">
          <div style={{ flex: 1 }}>
            <input
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-input"
            />
            {errors.nombre && <span className="error">{errors.nombre}</span>}
          </div>
          <div style={{ flex: 1 }}>
            <input
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="form-input"
            />
            {errors.apellido && <span className="error">{errors.apellido}</span>}
          </div>
        </div>

        <input
          name="documento"
          placeholder={formData.isForeign ? "Pasaporte" : "RUT (ej: 16964866-2)"}
          value={formData.documento}
          onChange={handleChange}
          className="form-input"
        />
        {errors.documento && <span className="error">{errors.documento}</span>}

        <div className="form-checkbox">
          <input
            type="checkbox"
            checked={formData.isForeign}
            onChange={(e) =>
              setFormData({ ...formData, isForeign: e.target.checked, documento: "" })
            }
          />
          <span>No soy chileno/a</span>
        </div>

        <input
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-input"
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

        <div className="form-checkbox">
          <input
            type="checkbox"
            checked={formData.acceptedTerms}
            onChange={(e) =>
              setFormData({ ...formData, acceptedTerms: e.target.checked })
            }
          />
          <span>
            Acepto los{" "}
            <strong
              onClick={goToTerms}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Términos y Condiciones
            </strong>
          </span>
        </div>
        {errors.terms && <span className="error">{errors.terms}</span>}

        <button className="form-button" onClick={handleNext}>
          Registrar mi emprendimiento 🚀
        </button>

        <button
          onClick={handleSaveAsClient}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "transparent",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            opacity: 0.8
          }}
        >
          Solo quiero descubrir emprendimientos 🔍
        </button>

      </div>
    </div>
  )
}

export default StepUser