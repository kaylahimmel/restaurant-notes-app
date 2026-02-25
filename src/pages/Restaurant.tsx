import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Review, ReviewProps } from '@/components/Review/Review';
import styles from '@styles/restaurant.module.scss';

export default function Restaurant() {
  const navigate = useNavigate();
  navigate({ to: '/dashboard' });

  const { name } = navigate.call;

  const [reviews, setReviews] = useState<ReviewProps[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      setReviews(data);
    }
    fetchReviews();
  }, []);

  if (!name) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>{name}</h1>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <ul>
          {reviews.map((review: ReviewProps) => (
            <Review key={review.id} {...review} />
          ))}
        </ul>
      </main>
    </div>
  );
}
