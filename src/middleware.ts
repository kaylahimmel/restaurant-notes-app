import { type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Create a response object that we'll modify
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Create a Supabase client for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Set cookies on the request (for this middleware execution)
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          // Create new response with updated cookies
          supabaseResponse = NextResponse.next({
            request,
          });
          // Set cookies on the response (sent back to browser)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // CRITICAL: This refreshes the user's session and validates the JWT
  // It also updates cookies with the refreshed token
  await supabase.auth.getUser();

  return supabaseResponse;
}

// Configure which routes middleware runs on
// This excludes static files, images, and Next.js internals for performance
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
