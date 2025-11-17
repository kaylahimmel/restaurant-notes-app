# Supabase Authentication Documentation

This document explains how Supabase authentication is integrated into this Next.js application.

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Client Files Explained](#client-files-explained)
- [How Authentication Flow Works](#how-authentication-flow-works)
- [Common Patterns](#common-patterns)
- [Environment Variables](#environment-variables)
- [Additional Resources](#additional-resources)

---

## Overview

This app uses **Supabase Auth** with Next.js 15 App Router. Authentication sessions are stored in HTTP cookies and automatically refreshed by middleware.

### Key Technologies

- `@supabase/ssr` - Server-side rendering support for Supabase
- `@supabase/supabase-js` - Core Supabase client library
- Next.js 15 App Router with Server Components

---

## File Structure

```bash
src/
├── lib/
│   └── supabase/
│       ├── client.ts        # Browser client (Client Components)
│       └── server.ts        # Server client (Server Components)
├── middleware.ts            # Session refresh middleware
└── app/
    └── auth/
        └── page.tsx         # Login/signup page
```

---

## Client Files Explained

### 1. Browser Client (`src/lib/supabase/client.ts`)

**Purpose:**
Creates a Supabase client for use in the browser (Client Components).

**When to use:**

- ✅ Client Components (marked with `'use client'`)
- ✅ Authentication actions (signIn, signUp, signOut)
- ✅ Real-time subscriptions
- ✅ Client-side data fetching with user interaction

**How it works:**

- Runs only in the browser (client-side)
- Automatically stores auth sessions in HTTP cookies
- Reads auth tokens from cookies on every request
- Updates cookies when authentication state changes

**Example usage:**

```tsx
'use client';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const supabase = createClient();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'user@example.com',
      password: 'password123',
    });
  };

  return <button onClick={handleLogin}>Sign In</button>;
}
```

---

### 2. Server Client (`src/lib/supabase/server.ts`)

**Purpose:**
Creates a Supabase client for use on the server (Server Components, API routes, Server Actions).

**When to use:**

- ✅ Server Components (no `'use client'` directive)
- ✅ API routes (`app/api/**/route.ts`)
- ✅ Server Actions (functions marked with `'use server'`)
- ✅ Server-side data fetching

**How it works:**

- Runs only on the server (server-side)
- Uses Next.js's `cookies()` function to read HTTP cookies
- `getAll()` - Reads all cookies (auth tokens are stored in cookies)
- `setAll()` - Attempts to update cookies with refreshed tokens
  - Often fails in Server Components (this is expected!)
  - The try/catch prevents crashes
  - Middleware handles token refreshing, so failures here are safe

**Why the try/catch?**
When Server Components render, the HTTP response headers may already be sent, making it impossible to set new cookies. This is normal and expected. The middleware runs BEFORE Server Components and handles all token refreshing, so this failure is harmless.

**Example usage:**

```tsx
// Server Component (no 'use client')
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  return <div>Welcome {user.email}!</div>;
}
```

---

### 3. Middleware (`src/middleware.ts`)

**Purpose:**
Automatically validates and refreshes authentication sessions on EVERY request.

**This is THE most important file for authentication!**

**When it runs:**

- ✅ Before EVERY page load
- ✅ Before EVERY API route
- ❌ NOT on static files (images, CSS, JS) - excluded by matcher for performance

**How it works:**

1. **Request comes in** (e.g., user visits `/dashboard`)
2. **Middleware intercepts** the request BEFORE the page loads
3. **Creates Supabase client** using request cookies
4. **Calls `getUser()`** which:
   - Validates the JWT token against Supabase servers
   - If token is expired (usually after ~1 hour), requests a new one
   - Supabase returns a fresh token
5. **Updates cookies** with the new token via `setAll()`
6. **Passes updated cookies** to your page/API route
7. **Your page loads** with a valid, fresh session

**Why it's critical:**

- JWT tokens expire after approximately 1 hour
- Without middleware, users would be logged out every hour
- Middleware automatically refreshes tokens in the background
- Users stay logged in seamlessly without manual intervention

**The matcher pattern:**

```typescript
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

This regex excludes:

- `_next/static` - Next.js static files
- `_next/image` - Next.js image optimization
- `favicon.ico` - Favicon
- Image files (svg, png, jpg, etc.)

This improves performance by not running middleware on static assets.

**Security Note:**
We use `getUser()` instead of `getSession()` because:

- `getUser()` validates the JWT against Supabase's servers (secure ✅)
- `getSession()` only reads cookies without validation (insecure ❌)

---

## How Authentication Flow Works

### 1. User Signs Up

```bash
User fills form → signUp() called → Supabase creates account → Email sent with confirmation link → User clicks link → Account confirmed
```

**Code:**

```tsx
const { error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});
```

**Note:** By default, Supabase requires email confirmation. Users cannot log in until they click the confirmation link in their email.

---

### 2. User Signs In

```bash
User fills form → signInWithPassword() called → Supabase validates → JWT token created → Stored in cookies → Redirect to /dashboard
```

**Code:**

```tsx
const { error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

if (!error) {
  router.push('/dashboard');
  router.refresh(); // Refresh Server Components
}
```

---

### 3. Session Maintenance

```bash
User visits page → Middleware runs → getUser() validates JWT → Token expired? → Request new token → Update cookies → Page loads with fresh session
```

**This happens automatically on every request thanks to middleware!**

---

### 4. Accessing User in Server Components

```tsx
import { createClient } from '@/lib/supabase/server';

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  // User is authenticated
  return <div>Protected content for {user.email}</div>;
}
```

---

### 5. Accessing User in Client Components

```tsx
'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return <div>{user?.email}</div>;
}
```

---

## Common Patterns

### Pattern 1: Protected Server Component

```tsx
// app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  return <div>Welcome {user.email}</div>;
}
```

---

### Pattern 2: Sign Out Button

```tsx
'use client';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
    router.refresh();
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
```

---

### Pattern 3: Server Action with Auth

```tsx
'use server';
import { createClient } from '@/lib/supabase/server';

export async function createRestaurantNote(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase.from('restaurant_notes').insert({
    user_id: user.id,
    note: formData.get('note'),
  });

  return data;
}
```

---

## Environment Variables

### Required Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Where to find these values

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Security Notes

- ✅ The `anon` key is safe to expose in the browser (it's public)
- ❌ NEVER expose the `service_role` key in environment variables
- ✅ Use Row Level Security (RLS) policies in Supabase to protect data
- ✅ `.env.local` should be in `.gitignore` (don't commit to git)

---

## Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Next.js Quickstart](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
- [Supabase SSR Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

## Quick Reference

| Task                       | Use This Client                  |
| -------------------------- | -------------------------------- |
| Login/Signup form          | Browser client (`client.ts`)     |
| Protected Server Component | Server client (`server.ts`)      |
| API route                  | Server client (`server.ts`)      |
| Server Action              | Server client (`server.ts`)      |
| Real-time subscription     | Browser client (`client.ts`)     |
| Client-side data fetch     | Browser client (`client.ts`)     |

