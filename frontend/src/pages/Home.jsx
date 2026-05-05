import { products } from "../data/products"
import ProductCard from "../components/ProductCard"
import useGeolocation from "../hooks/useGeolocation"

function Home({ goToDetail }) { // 👈 agregamos esto
  const { location } = useGeolocation()

  return (
    <div style={{ padding: "15px" }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: "15px" }}>
        <h2>En la Esquina</h2>
        {location && (
          <p>
            📍 Cerca de ti
          </p>
        )}
      </div>

      {/* FILTROS */}
      <div style={{ marginBottom: "15px" }}>
        <button>500m</button>
        <button>1km</button>
        <button>5km</button>
      </div>

      {/* LISTA */}
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          goToDetail={goToDetail} // 👈 ESTA ES LA CLAVE
        />
      ))}

    </div>
  )
}

export default Home