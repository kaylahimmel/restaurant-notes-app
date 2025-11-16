'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../restaurant.module.scss';
import { Review, ReviewProps } from '@/components/Review/Review';

export default function Restaurant() {
  const router = useRouter();
  const { name } = router.query;

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
