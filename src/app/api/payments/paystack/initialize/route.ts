import {
  proxyAuthRequest,
} from "../../../auth/_proxy";

export async function POST(
  request: Request,
): Promise<Response> {
  return proxyAuthRequest(request, {
    method: "POST",
    backendPath:
      "/api/payments/paystack/initialize",
  });
}
