import { useState, useRef } from "react"
import "./welcome.css"

function Welcome({ onEnter, goToLogin, goToRegister }) {
  const [showUI, setShowUI] = useState(false)
  const videoRef = useRef(null)

  const skipVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration
    }
    setShowUI(true)
  }

  return (
    <div className="container">

      {/* 🎥 VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="video"
        onEnded={() => setShowUI(true)}
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* 🌑 overlay */}
      <div className="overlay">

        {!showUI && (
          <div
            className="skip-layer"
            onClick={skipVideo}
          />
        )}

        {showUI && (
          <div className="glass">

            <p className="fade p1">¿VENDES ALGO?</p>
            <p className="fade p2">¿QUIERES SABER QUE VENDEN CERCA?</p>
            <h1 className="fade title">En la Esquina, lo encuentras!</h1>

            <div className="buttons fade buttonsFade">

              <button 
                className="primary"
                onClick={() => {
                  skipVideo()
                  goToLogin()
                }}
              >
                Iniciar sesión
              </button>

              <button 
                className="secondary"
                onClick={() => {
                  skipVideo()
                  goToRegister()
                }}
              >
                Registrarse
              </button>

              <button 
                className="ghost"
                onClick={() => {
                  skipVideo()
                  onEnter()
                }}
              >
                Entrar sin registro
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Welcome