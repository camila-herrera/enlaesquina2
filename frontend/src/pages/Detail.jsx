function Detail({ product, goBack }) {
    if (!product) return <p>No hay producto</p>
  
    return (
      <div style={{ padding: "15px", background: "black", color: "white" }}>
        <button onClick={goBack}>← Volver</button>
  
        <h2>{product.title}</h2>
  
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        ))}
  
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>
    )
  }
  
  export default Detail