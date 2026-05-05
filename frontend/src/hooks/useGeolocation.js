import { useState, useEffect } from "react"

function useGeolocation() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada")
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (err) => {
        setError(err.message)
      },
      {
        enableHighAccuracy: true
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return { location, error }
}

export default useGeolocation