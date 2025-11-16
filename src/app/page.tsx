import styles from './page.module.scss';
import { Link } from '@/components/Link/Link';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Restaurant Notes</h1>
        <p>Keep track of your favorite restaurants and dining experiences</p>

        <div className={styles.ctas}>
          <Link label="Get Started" href="/dashboard" className="primary" />
          <Link
            label="Search Restaurants"
            href="/search"
            className="secondary"
          />
        </div>

        <div className={styles.ctas}>
          <Link label="Login" href="/auth" className="secondary" />
        </div>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </main>
    </div>
  );
}
