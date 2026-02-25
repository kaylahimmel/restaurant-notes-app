# Firebase Authentication

This document explains how Firebase authentication is integrated into this app.

## Overview

This app uses **Firebase Auth** for user authentication. Auth state is managed client-side using React Context and persisted automatically by Firebase in the browser's IndexedDB. Routes are protected using TanStack Router's `beforeLoad`.

---

## File Structure

```bash
src/
├── lib/
│   └── firebase/
│       └── client.ts        # Firebase app + auth instance
├── context/
│   └── AuthContext.tsx      # Auth state provider + useAuth hook
├── routeTree.ts             # Route definitions with beforeLoad protection
└── App.tsx                  # Router setup with auth context
```

---

## How It Works

### Auth State (`AuthContext.tsx`)

Firebase automatically persists auth state in IndexedDB between page loads. `onAuthStateChanged` fires on mount and whenever auth state changes (sign in, sign out, token refresh).

```tsx
// Access the current user anywhere in the app
const { user, loading } = useAuth();
```

- `user` — the Firebase `User` object if signed in, `null` if not
- `loading` — `true` while Firebase is confirming the initial auth state on page load

Always check `loading` before acting on `user` to avoid a flash of incorrect UI.

---

## Auth Flow

### Sign In

```tsx
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';

const userCredential = await signInWithEmailAndPassword(auth, email, password);
// Firebase persists the session automatically — no extra steps needed
navigate({ to: '/dashboard' });
```

### Sign Up

```tsx
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';

const userCredential = await createUserWithEmailAndPassword(auth, email, password);
navigate({ to: '/dashboard' });
```

### Sign Out

```tsx
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';

await signOut(auth);
navigate({ to: '/auth' });
```

---

## Route Protection

Routes are protected in `routeTree.ts` using TanStack Router's `beforeLoad`. This runs before the page component renders and redirects unauthenticated users.

```ts
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: ({ context }) => {
    if (!context.user) throw redirect({ to: '/auth' });
  },
  component: Dashboard,
});
```

The `context.user` value comes from `AuthContext` and is passed into the router in `App.tsx` via `InnerApp`.

---

## Common Patterns

### Accessing the current user in a component

```tsx
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return <p>Welcome, {user?.email}</p>;
}
```

### Redirecting already-authenticated users away from the auth page

Add `beforeLoad` to the auth route to redirect logged-in users to the dashboard:

```ts
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  beforeLoad: ({ context }) => {
    if (context.user) throw redirect({ to: '/dashboard' });
  },
  component: Auth,
});
```

---

## Environment Variables

Create a `.env` file at the project root. All Firebase config values come from the Firebase Console under **Project Settings → Your apps → SDK setup and configuration**.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

Vite exposes env vars prefixed with `VITE_` to the browser via `import.meta.env`. Never use `process.env` in this project.

`.env` should be in `.gitignore` — do not commit it.

---

## Additional Resources

- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Firebase Web SDK Reference](https://firebase.google.com/docs/reference/js/auth)
- [TanStack Router — Router Context](https://tanstack.com/router/latest/docs/framework/react/guide/router-context)
- [TanStack Router — Authentication Guide](https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes)
