import { getReviews } from '@/lib/fetcher'
import styles from './restaurant.module.css'
import { Review } from '@/components/Review/Review'

export default async function Restaurant(restaurant: string) {
  const reviews = await getReviews()

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>{restaurant}</h1>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <ul>
          {reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </ul>
      </main>
    </div>
  )
}
