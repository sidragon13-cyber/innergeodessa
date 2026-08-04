import {
  proxyAuthRequest,
} from "../_proxy";

export async function GET(
  request: Request,
): Promise<Response> {
  return proxyAuthRequest(request, {
    method: "GET",
    backendPath: "/api/auth/me",
  });
}
