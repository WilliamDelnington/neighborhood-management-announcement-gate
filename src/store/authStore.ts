import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthSession, User } from "@/types/auth";

type AuthState = {
  token: string | null;
  user: User | null;
  setSession: (session: AuthSession) => void;
  updateUser: (user: User) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,
      setSession: session => set({ token: session.token, user: session.user }),
      updateUser: user => set({ user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    { name: "hb-info-gate-auth" },
  ),
);

export function isAuthenticated(): boolean {
  return !!useAuthStore.getState().token;
}
