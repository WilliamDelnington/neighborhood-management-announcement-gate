import { apiRequest } from "@/services/api/client";
import type { AuthSession, LoginInput, RegisterInput, User } from "@/types/auth";

export function login(input: LoginInput): Promise<AuthSession> {
  return apiRequest<AuthSession>("/auth/login", { method: "POST", body: input });
}

export function register(input: RegisterInput): Promise<AuthSession> {
  return apiRequest<AuthSession>("/auth/register", {
    method: "POST",
    body: input,
  });
}

export function getMe(): Promise<User> {
  return apiRequest<User>("/auth/me", { auth: true });
}
