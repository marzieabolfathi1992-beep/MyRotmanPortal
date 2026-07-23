export const config = {
  matcher: "/:path*",
};

function lockPageHtml(error?: boolean) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Rotman Travel Portal</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
    background: linear-gradient(135deg, #E20778 0%, #7a044a 100%);
    position: relative;
    overflow: hidden;
  }
  body::before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(40px);
    background: rgba(18,18,20,0.35);
  }
  .card {
    position: relative;
    z-index: 1;
    background: rgba(255,255,255,0.97);
    border-radius: 24px;
    padding: 48px 40px;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 25px 70px rgba(0,0,0,0.35);
    text-align: center;
  }
  .lock-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: #E20778;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }
  h1 { font-size: 20px; font-weight: 700; color: #121214; margin: 0 0 6px; }
  p { font-size: 14px; color: #6b7280; margin: 0 0 28px; line-height: 1.5; }
  input {
    width: 100%;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1.5px solid #e5e7eb;
    font-size: 15px;
    text-align: center;
    letter-spacing: 1px;
    outline: none;
    margin-bottom: 14px;
  }
  input:focus { border-color: #E20778; }
  button {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    background: #E20778;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
  button:hover { opacity: 0.92; }
  .error { color: #E20778; font-size: 13px; margin: -18px 0 18px; font-weight: 600; }
</style>
</head>
<body>
  <div class="card">
    <div class="lock-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    </div>
    <h1>Rotman Travel Portal</h1>
    <p>Enter the passcode to view partner hotel rates.</p>
    ${error ? '<div class="error">Incorrect passcode — try again.</div>' : ""}
    <form method="POST" action="/api/login">
      <input type="password" name="password" placeholder="Passcode" autofocus required />
      <button type="submit">Unlock</button>
    </form>
  </div>
</body>
</html>`;
}

export default function middleware(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === "/api/login") {
    return;
  }

  const cookie = request.headers.get("cookie") || "";
  const authenticated = cookie.includes("rotman_auth=granted");

  if (authenticated) {
    return;
  }

  const accept = request.headers.get("accept") || "";
  const isPageRequest = url.pathname === "/" || accept.includes("text/html");

  if (isPageRequest) {
    const showError = url.searchParams.get("error") === "1";
    return new Response(lockPageHtml(showError), {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  return new Response("Locked", { status: 401 });
}
