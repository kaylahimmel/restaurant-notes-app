// TO-DO: Add a review component that shows the date, rating, meal ordered, and any additional notes
export const Review = ({ review }) => {
  return (
    <div>
      <h2>{review.date}</h2>
      <h3>{review.rating}</h3>
      <p>{review.meal}</p>
      <p>{review.notes}</p>
    </div>
  )
}
