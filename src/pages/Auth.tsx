import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import styles from '@/styles/auth.module.scss';

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);

        navigate({ to: '/dashboard' });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);

        setMessage('Account created! You can now sign in.');

        // POST to our API route — this sets the session cookie
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });

        setEmail('');
        setPassword('');
        navigate({ to: '/dashboard' });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setError(null);
    setMessage(null);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Restaurant Notes</h1>
        <h2 className={styles.subtitle}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.message}>{message}</div>}

        <div className={styles.form}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
          />

          <Button
            label={loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
            onClick={handleSubmit}
            disabled={loading}
          />

          <button
            className={styles.toggleButton}
            onClick={toggleMode}
            disabled={loading}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </main>
    </div>
  );
}
