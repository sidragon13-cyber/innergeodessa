import type {
  AccountDictionary,
} from "@/data/i18n";

export type AuthErrorCode =
  | "credentials"
  | "emailConflict"
  | "emailDelivery"
  | "invalidToken"
  | "validation"
  | "unavailable"
  | "generic";

export type AuthValidationField =
  | "email"
  | "nickname"
  | "password"
  | "token";

export class AuthRequestError extends Error {
  readonly code: AuthErrorCode;
  readonly field?: AuthValidationField;
  readonly status: number;

  constructor(
    code: AuthErrorCode,
    status: number,
    field?: AuthValidationField,
  ) {
    super(code);
    this.name = "AuthRequestError";
    this.code = code;
    this.status = status;
    this.field = field;
  }
}

export async function createAuthRequestError(
  response: Response,
  context: "login" | "register" | "verify" | "general",
): Promise<AuthRequestError> {
  if (response.status === 401 && context === "login") {
    return new AuthRequestError("credentials", 401);
  }
  if (response.status === 409 && context === "register") {
    return new AuthRequestError("emailConflict", 409);
  }
  if (response.status === 503 && context === "register") {
    return new AuthRequestError("emailDelivery", 503);
  }
  if (response.status === 503) {
    return new AuthRequestError("unavailable", 503);
  }
  if (response.status === 422) {
    return new AuthRequestError(
      "validation",
      422,
      await readValidationField(response),
    );
  }
  if (context === "verify" && response.status >= 400) {
    return new AuthRequestError("invalidToken", response.status);
  }
  return new AuthRequestError("generic", response.status);
}

export function getAuthErrorMessage(
  error: unknown,
  dictionary: AccountDictionary,
): string {
  if (!(error instanceof AuthRequestError)) {
    return dictionary.errors.generic;
  }
  if (error.code === "validation") {
    if (error.field === "email") {
      return dictionary.errors.invalidEmail;
    }
    if (error.field === "nickname") {
      return dictionary.errors.invalidNickname;
    }
    if (error.field === "password") {
      return dictionary.errors.invalidPassword;
    }
    if (error.field === "token") {
      return dictionary.errors.invalidToken;
    }
  }
  return dictionary.errors[error.code];
}

async function readValidationField(
  response: Response,
): Promise<AuthValidationField | undefined> {
  try {
    const payload: unknown = await response.json();
    if (!isRecord(payload) || !Array.isArray(payload.detail)) {
      return undefined;
    }
    const first = payload.detail.find(
      (item) => isRecord(item) && Array.isArray(item.loc),
    );
    if (!isRecord(first) || !Array.isArray(first.loc)) {
      return undefined;
    }
    const field = [...first.loc]
      .reverse()
      .find((part) => typeof part === "string");
    return field === "email" ||
      field === "nickname" ||
      field === "password" ||
      field === "token"
      ? field
      : undefined;
  } catch {
    return undefined;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
