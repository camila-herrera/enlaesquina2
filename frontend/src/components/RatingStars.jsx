function RatingStars({ rating = 0 }) {
    const stars = [1,2,3,4,5]
  
    return (
      <div>
        {stars.map((star) => (
          <span key={star}>
            {star <= rating ? "⭐" : "☆"}
          </span>
        ))}
      </div>
    )
  }
  
  export default RatingStars