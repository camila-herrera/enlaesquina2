import RatingStars from "./RatingStars"

function ProductCard({ product, goToDetail }) {

  const openWhatsApp = (e) => {
    e.stopPropagation()
    window.open(`https://wa.me/${product.whatsapp}`, "_blank")
  }

  return (
    <div
      onClick={() => goToDetail(product)}
      style={{
        background: "#111",
        borderRadius: "15px",
        padding: "10px",
        marginBottom: "10px",
        color: "white"
      }}
    >
      <img
        src={product.images[0]}
        alt=""
        style={{ width: "100%", borderRadius: "10px" }}
      />

      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>📍 {product.distance}</p>

      <RatingStars rating={product.rating} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>👍 {product.likes}</span>

        <button onClick={openWhatsApp}>
          WhatsApp
        </button>
      </div>
    </div>
  )
}

export default ProductCard