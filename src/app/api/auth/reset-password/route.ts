import { proxyAuthRequest } from "../_proxy";

export async function POST(request: Request): Promise<Response> {
  return proxyAuthRequest(request, {
    method: "POST",
    backendPath: "/api/auth/reset-password",
  });
}
