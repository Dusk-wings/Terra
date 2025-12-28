export function extractAuthToken(req: Request): string | null {
  console.log("Request Headers:", Array.from(req.headers.entries()));
  const authHeader = req.headers.get("Authorization");
  console.log("Authorization Header:", authHeader);
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }
  return null;
}
