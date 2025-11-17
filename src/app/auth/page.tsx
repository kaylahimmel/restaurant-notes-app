'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './auth.module.scss';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { createClient } from '@/lib/supabase/client';

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        // Sign in with email and password
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
          setLoading(false);
          return;
        }

        // Login successful - redirect to dashboard
        router.push('/dashboard');
        router.refresh();
      } else {
        // Sign up with email and password
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }

        // Sign up successful
        setMessage('Check your email to confirm your account!');
        setEmail('');
        setPassword('');
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
