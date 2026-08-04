"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  AuthRequestError,
  createAuthRequestError,
} from "./auth-errors";

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated";

export type AuthUser = {
  userId: string;
  email: string;
  nickname: string;
  emailVerified: boolean;
  status: string;
  createdAt: string;
};

export type RegisterInput = {
  email: string;
  nickname: string;
  password: string;
};

export type RegisterResult = {
  user: AuthUser;
  verificationToken?: string;
};

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  error: AuthRequestError | null;
  refreshUser: () => Promise<AuthUser | null>;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<RegisterResult>;
  verifyEmail: (token: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<AuthRequestError | null>(null);
  const refreshPromise = useRef<Promise<AuthUser | null> | null>(null);

  const refreshUser = useCallback((): Promise<AuthUser | null> => {
    if (refreshPromise.current) {
      return refreshPromise.current;
    }

    const request = (async () => {
      setStatus("loading");
      setError(null);
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        });
        if (response.status === 401) {
          setUser(null);
          setStatus("unauthenticated");
          return null;
        }
        if (!response.ok) {
          throw await createAuthRequestError(response, "general");
        }
        const nextUser = (await response.json()) as AuthUser;
        setUser(nextUser);
        setStatus("authenticated");
        return nextUser;
      } catch (requestError) {
        const safeError =
          requestError instanceof AuthRequestError
            ? requestError
            : new AuthRequestError("unavailable", 503);
        setUser(null);
        setStatus("unauthenticated");
        setError(safeError);
        return null;
      }
    })();

    refreshPromise.current = request;
    void request.finally(() => {
      if (refreshPromise.current === request) {
        refreshPromise.current = null;
      }
    });
    return request;
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthUser> => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw await createAuthRequestError(response, "login");
      }
      const payload = (await response.json()) as { user: AuthUser };
      return (await refreshUser()) ?? payload.user;
    },
    [refreshUser],
  );

  const register = useCallback(
    async (input: RegisterInput): Promise<RegisterResult> => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        throw await createAuthRequestError(response, "register");
      }
      return (await response.json()) as RegisterResult;
    },
    [],
  );

  const verifyEmail = useCallback(
    async (token: string): Promise<AuthUser> => {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        throw await createAuthRequestError(response, "verify");
      }
      const verifiedUser = (await response.json()) as AuthUser;
      await refreshUser();
      return verifiedUser;
    },
    [refreshUser],
  );

  const logout = useCallback(async (): Promise<void> => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    if (!response.ok) {
      throw await createAuthRequestError(response, "general");
    }
    await refreshUser();
  }, [refreshUser]);

  const value = useMemo(
    () => ({
      status,
      user,
      error,
      refreshUser,
      login,
      register,
      verifyEmail,
      logout,
    }),
    [
      status,
      user,
      error,
      refreshUser,
      login,
      register,
      verifyEmail,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}
