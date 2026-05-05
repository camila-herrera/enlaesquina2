function Terms({ onAccept, onClose }) {

  return (
    <div style={styles.backdrop}>
      <div style={styles.card}>

        <h1 style={styles.title}>Términos y Condiciones</h1>

        <div style={styles.content}>

          <p><strong>1. Uso de la plataforma</strong></p>
          <p>
            "En la Esquina" es una plataforma que conecta usuarios para descubrir,
            comprar y vender productos o servicios dentro de su entorno cercano.
            La plataforma no participa en pagos, entregas ni garantías.
          </p>

          <p><strong>2. Registro de usuarios</strong></p>
          <p>
            El usuario se compromete a proporcionar información real, completa y actualizada.
            Es responsable de la seguridad de su cuenta.
          </p>

          <p><strong>3. Edad y contenido</strong></p>
          <p>
            La plataforma permite el registro de usuarios de cualquier edad.
            Sin embargo, el contenido clasificado para mayores de edad será restringido
            y no se mostrará a usuarios menores de 18 años.
          </p>

          <p><strong>4. Publicaciones</strong></p>
          <p>
            Cada usuario es el único y exclusivo responsable del contenido que publica.
            Esto incluye imágenes, descripciones, precios y cualquier información asociada.
          </p>
          <p>Al publicar contenido en "En la Esquina", el usuario declara que:</p>
          <ul>
            <li>La información es verídica</li>
            <li>No infringe leyes ni derechos de terceros</li>
            <li>No corresponde a contenido ilegal o engañoso</li>
          </ul>

          <p><strong>5. Responsabilidad legal</strong></p>
          <p>El usuario asume el 100% de la responsabilidad legal por sus publicaciones.</p>
          <p>Asimismo, autoriza expresamente a "En la Esquina" a:</p>
          <ul>
            <li>Utilizar su información registrada en caso de requerimientos legales</li>
            <li>Compartir datos con autoridades competentes si es necesario</li>
            <li>Tomar acciones legales en caso de uso indebido de la plataforma</li>
          </ul>

          <p><strong>6. Geolocalización</strong></p>
          <p>
            La plataforma utiliza ubicación para mostrar contenido cercano.
            Nunca se compartirá la ubicación exacta del usuario, solo aproximaciones.
          </p>

          <p><strong>7. Contacto entre usuarios</strong></p>
          <p>
            Las interacciones se realizan directamente entre usuarios, generalmente mediante WhatsApp.
            "En la Esquina" no es responsable por acuerdos, conflictos o transacciones.
          </p>

          <p><strong>8. Suspensión de cuentas</strong></p>
          <p>
            La plataforma se reserva el derecho de suspender o eliminar cuentas que incumplan estos términos.
          </p>

          <p><strong>9. Protección de datos</strong></p>
          <p>
            Los datos serán utilizados exclusivamente para el funcionamiento de la plataforma
            y podrán ser utilizados en contextos legales si es requerido.
          </p>

          <p><strong>10. Aceptación</strong></p>
          <p>
            Al utilizar la plataforma, el usuario acepta estos términos en su totalidad.
          </p>

        </div>

        <div style={styles.actions}>
          <button style={styles.back} onClick={onClose}>
            Volver
          </button>
          <button style={styles.accept} onClick={onAccept}>
            Aceptar y continuar
          </button>
        </div>

      </div>
    </div>
  )
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.80)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    zIndex: 1000
  },
  card: {
    background: "#1a1a1a",
    borderRadius: "20px",
    padding: "25px",
    width: "100%",
    maxWidth: "700px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    color: "white"
  },
  title: {
    marginBottom: "15px",
    fontSize: "28px"
  },
  content: {
    overflowY: "auto",
    textAlign: "left",
    fontSize: "14px",
    lineHeight: "1.6",
    paddingRight: "10px",
    marginBottom: "20px",
    flex: 1
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px"
  },
  back: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontSize: "14px"
  },
  accept: {
    flex: 2,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#E5B129",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
    color: "black"
  }
}

export default Terms