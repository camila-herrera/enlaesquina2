import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ComingSoon from "./pages/ComingSoon"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Detail from "./pages/Detail"
import PerfilEmprendedor from "./pages/PerfilEmprendedor"
import { useState } from "react"

function App() {
  const [userLocation, setUserLocation] = useState(null)
  const [usuario, setUsuario] = useState(null) // usuario logueado

  return (
    <BrowserRouter>
      <Routes>

        {/* LANDING */}
        <Route
          path="/"
          element={
            <ComingSoon
              goToRegister={() => window.location.href = "/registro"}
              onLocationReady={(loc) => setUserLocation(loc)}
            />
          }
        />

        {/* REGISTRO */}
        <Route
          path="/registro"
          element={
            <Register
              goToLogin={() => window.location.href = "/login"}
              goBack={() => window.location.href = "/"}
              userLocation={userLocation}
            />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <Login
              onLogin={(user) => {
                setUsuario(user)
                window.location.href = "/home"
              }}
              goToRegister={() => window.location.href = "/registro"}
            />
          }
        />

        {/* HOME — protegida */}
        <Route
          path="/home"
          element={
            usuario
              ? <Home usuario={usuario} />
              : <Navigate to="/login" />
          }
        />

        {/* DETALLE PRODUCTO — protegida */}
        <Route
          path="/producto/:id"
          element={
            usuario
              ? <Detail usuario={usuario} />
              : <Navigate to="/login" />
          }
        />

        {/* PERFIL EMPRENDEDOR — ruta publica tipo enlaesquina.cl/camilapostres */}
        <Route
          path="/:slug"
          element={<PerfilEmprendedor />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App