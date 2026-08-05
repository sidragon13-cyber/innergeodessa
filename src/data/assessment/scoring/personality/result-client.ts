import {
  isPersonalityResultContract,
  type PersonalityResultContract,
} from "./schema";

export class PersonalityResultRequestError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "PersonalityResultRequestError";
    this.status = status;
  }
}

export async function fetchPersonalityResult(
  sessionId: string,
): Promise<PersonalityResultContract> {
  const response = await fetch(
    `/api/sessions/${encodeURIComponent(sessionId)}/result`,
    { cache: "no-store" },
  );
  const data: unknown = await response.json();

  if (!response.ok) {
    throw new PersonalityResultRequestError(
      getErrorMessage(data),
      response.status,
    );
  }

  if (
    !isPersonalityResultContract(data) ||
    data.sessionId !== sessionId
  ) {
    throw new PersonalityResultRequestError(
      "The result service returned an invalid response.",
      502,
    );
  }

  return data;
}

function getErrorMessage(value: unknown): string {
  if (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof value.error === "string" &&
    value.error.trim()
  ) {
    return value.error;
  }

  return "Unable to load result.";
}
