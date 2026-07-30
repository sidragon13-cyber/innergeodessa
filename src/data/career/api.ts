import {
  isRiasecResultContract,
  type RiasecResultContract,
} from "./result-contract";

type ErrorPayload = {
  detail?: unknown;
  error?: unknown;
  message?: unknown;
};

export class RiasecResultRequestError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "RiasecResultRequestError";
    this.status = status;
  }
}

function extractErrorMessage(
  payload: ErrorPayload | null,
  fallback: string,
): string {
  if (!payload) {
    return fallback;
  }

  if (typeof payload.error === "string") {
    return payload.error;
  }

  if (typeof payload.message === "string") {
    return payload.message;
  }

  if (typeof payload.detail === "string") {
    return payload.detail;
  }

  if (
    typeof payload.detail === "object" &&
    payload.detail !== null &&
    "message" in payload.detail &&
    typeof payload.detail.message === "string"
  ) {
    return payload.detail.message;
  }

  return fallback;
}

export async function fetchRiasecResult(
  sessionId: string,
): Promise<RiasecResultContract> {
  const response = await fetch(
    `/api/sessions/${encodeURIComponent(sessionId)}/result`,
    {
      cache: "no-store",
    },
  );

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new RiasecResultRequestError(
      "The career result service returned an invalid response.",
      response.status,
    );
  }

  if (!response.ok) {
    throw new RiasecResultRequestError(
      extractErrorMessage(
        payload as ErrorPayload,
        "The career result could not be loaded.",
      ),
      response.status,
    );
  }

  if (!isRiasecResultContract(payload)) {
    throw new RiasecResultRequestError(
      "The career result did not match the expected RIASEC contract.",
      response.status,
    );
  }

  if (payload.sessionId !== sessionId) {
    throw new RiasecResultRequestError(
      "The career result belongs to a different assessment session.",
      response.status,
    );
  }

  return payload;
}
