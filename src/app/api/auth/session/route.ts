import { adminAuth } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// called after login
export async function POST(request: Request) {
  const { idToken } = await request.json();

  // Verify the token is real, then create a 14-day session cookie
  const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 days in ms
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });

  const cookieStore = await cookies();
  cookieStore.set('session', sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: expiresIn / 1000,
    path: '/',
  });

  return NextResponse.json({ success: true });
}

// for logout
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  return NextResponse.json({ success: true });
}
