// TO-DO: Add Database connection

export function getReviews() {
  return fetch('/api/reviews').then((res) => res.json())
}
