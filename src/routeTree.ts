import {
  createRootRouteWithContext,
  createRoute,
  redirect,
} from '@tanstack/react-router';
import type { User } from 'firebase/auth';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

interface RouterContext {
  user: User | null;
}

const rootRoute = createRootRouteWithContext<RouterContext>()();

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: Auth,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: ({ context }) => {
    if (!context.user) throw redirect({ to: '/auth' });
  },
  component: Dashboard,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/auth' });
  },
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  dashboardRoute,
]);
