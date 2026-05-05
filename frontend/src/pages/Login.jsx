import "../styles/auth.css"

function Login({ goToRegister, onLogin }) {
  return (
    <div className="auth-container">

      <img src="/fondo.jpg" className="auth-bg" />

      <div className="auth-box">
        <h2>Iniciar sesión</h2>

        <input type="email" placeholder="Correo" />
        <input type="password" placeholder="Contraseña" />

        <button onClick={onLogin}>Entrar</button>

        <p onClick={goToRegister}>
          ¿No tienes cuenta? Regístrate
        </p>
      </div>

    </div>
  )
}

export default Login