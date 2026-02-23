'use client';

import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/client';
import { Button } from '@/components/Button/Button';

export const SignOutButton = () => {
  const router = useRouter();

  const handleSignout = async () => {
    // clear the server cookie
    await fetch('/api/auth/session', {
      method: 'DELETE',
    });

    await signOut(auth);

    router.push('/auth');
  };

  return <Button onClick={handleSignout} label="Sign Out" />;
};
