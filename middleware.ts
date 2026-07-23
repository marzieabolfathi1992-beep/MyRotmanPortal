export const config = {
  matcher: "/:path*",
};

const SITE_PASSWORD = "RotmanEP";

export default function middleware(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const separatorIndex = decoded.indexOf(":");
      const pass = decoded.substring(separatorIndex + 1);
      if (pass === SITE_PASSWORD) {
        return; // correct password — let the request through
      }
    }
  }

  return new Response("Password required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Rotman Executive Programs Portal"',
    },
  });
}
