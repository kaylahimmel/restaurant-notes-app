import { RouterProvider, createRouter } from '@tanstack/react-router';
import { AuthProvider, useAuth } from './context/AuthContext';
import { routeTree } from './routeTree';

const router = createRouter({
  routeTree,
  context: { user: null },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const { user } = useAuth();
  return <RouterProvider router={router} context={{ user }} />;
}

export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
