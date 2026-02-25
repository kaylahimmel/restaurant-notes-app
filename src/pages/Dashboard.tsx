import { useAuth } from '@/context/AuthContext';
import { SignOutButton } from '../components/SignOutButton/SignOutButton';
import styles from '@/styles/dashboard.module.scss';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}!</p>
      <SignOutButton />
    </div>
  );
}
