export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).end("Method not allowed");
    return;
  }

  let password = req.body?.password;

  if (password === undefined) {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const raw = Buffer.concat(chunks).toString();
    const params = new URLSearchParams(raw);
    password = params.get("password") || "";
  }

  const correct = password === "RotmanEP";

  if (correct) {
    res.setHeader(
      "Set-Cookie",
      "rotman_auth=granted; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax"
    );
    res.writeHead(302, { Location: "/" });
    res.end();
  } else {
    res.writeHead(302, { Location: "/?error=1" });
    res.end();
  }
}
