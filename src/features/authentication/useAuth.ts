import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/services/api/auth";
import { useAuthStore } from "@/store/authStore";

export function useLogin() {
  const setSession = useAuthStore(state => state.setSession);
  return useMutation({
    mutationFn: login,
    onSuccess: setSession,
  });
}

export function useRegister() {
  const setSession = useAuthStore(state => state.setSession);
  return useMutation({
    mutationFn: register,
    onSuccess: setSession,
  });
}
