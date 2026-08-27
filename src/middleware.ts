import { NextRequest, NextResponse } from 'next/server';

const INTERNAL_ROUTES = ['/vacancy', '/move-in', '/move-out', '/docs', '/marketing', '/flyer', '/flyer5'];
const PASSWORD = '@internal!llpm1';
const COOKIE_NAME = 'llpm_internal_auth';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isInternal = INTERNAL_ROUTES.some(route => pathname.startsWith(route));
  if (!isInternal) return NextResponse.next();

  // Check if already authenticated via cookie
  const authCookie = req.cookies.get(COOKIE_NAME);
  if (authCookie?.value === 'authenticated') return NextResponse.next();

  // Check if submitting password via query param
  const url = req.nextUrl.clone();
  const submittedPassword = url.searchParams.get('password');

  if (submittedPassword === PASSWORD) {
    // Set cookie and redirect to clean URL
    url.searchParams.delete('password');
    const response = NextResponse.redirect(url);
    response.cookies.set(COOKIE_NAME, 'authenticated', {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });
    return response;
  }

  // Show login page
  const loginHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LLPM Internal Access</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Arial, sans-serif;
      background: #1F3A5F;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      background: white;
      border-radius: 12px;
      padding: 48px 40px;
      width: 100%;
      max-width: 400px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    img { height: 80px; width: auto; margin-bottom: 24px; }
    h1 { color: #1F3A5F; font-size: 20px; margin-bottom: 8px; }
    p { color: #666; font-size: 14px; margin-bottom: 24px; }
    input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 16px;
      margin-bottom: 16px;
      outline: none;
      transition: border-color 0.2s;
    }
    input:focus { border-color: #F5A623; }
    button {
      width: 100%;
      padding: 12px;
      background: #1F3A5F;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover { background: #C85A17; }
    .error {
      color: #C85A17;
      font-size: 13px;
      margin-top: 12px;
    }
  </style>
</head>
<body>
  <div class="card">
    <img src="/logo.png" alt="LLPM Logo" />
    <h1>Internal Access</h1>
    <p>This page is restricted to LLPM staff only.</p>
    <form method="GET" action="${pathname}">
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        autofocus
        required
      />
      <button type="submit">Access Internal Tools</button>
      ${submittedPassword !== null ? '<p class="error">Incorrect password. Please try again.</p>' : ''}
    </form>
  </div>
</body>
</html>
  `;

  return new NextResponse(loginHtml, {
    status: 401,
    headers: { 'Content-Type': 'text/html' },
  });
}

export const config = {
  matcher: ['/vacancy/:path*', '/move-in/:path*', '/move-out/:path*', '/docs/:path*', '/marketing/:path*', '/flyer/:path*', '/flyer5/:path*'],
};
