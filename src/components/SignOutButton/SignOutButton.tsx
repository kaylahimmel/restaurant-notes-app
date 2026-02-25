import { signOut } from 'firebase/auth';
import { useNavigate } from '@tanstack/react-router';
import { auth } from '@/lib/firebase/client';
import { Button } from '@/components/Button/Button';

export const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signOut(auth);
    navigate({ to: '/auth' });
  };

  return <Button onClick={handleSignout} label="Sign Out" />;
};
