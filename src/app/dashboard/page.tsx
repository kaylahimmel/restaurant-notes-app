import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import styles from './dashboard.module.scss';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) {
    redirect('/auth');
  }

  // Verify the session cookie is valid (not expired, not tampered with)
  const decodedClaims = await adminAuth
    .verifySessionCookie(session, true)
    .catch(() => null);

  if (!decodedClaims) {
    redirect('/auth');
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Dashboard</h1>
        <p>Welcome, {decodedClaims.email}!</p>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </main>
    </div>
  );
}
