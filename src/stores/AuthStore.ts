import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";
import { AuthService } from "../services/AuthService";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export interface AuthActions {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkStoredAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: true,

        // Actions
        login: async () => {
          try {
            set({ isLoading: true });
            const authService = AuthService.getInstance();
            const { user, token } = await authService.authenticate();

            set({
              isAuthenticated: true,
              user,
              token,
              isLoading: false,
            });
          } catch (error) {
            console.error("Erro no login:", error);
            set({ isLoading: false });
            throw error;
          }
        },

        logout: async () => {
          try {
            const authService = AuthService.getInstance();
            await authService.logout();

            set({
              isAuthenticated: false,
              user: null,
              token: null,
            });
          } catch (error) {
            console.error("Erro no logout:", error);
          }
        },

        checkStoredAuth: async () => {
          try {
            set({ isLoading: true });
            const authService = AuthService.getInstance();
            const storedAuth = await authService.getStoredAuth();

            if (storedAuth) {
              set({
                isAuthenticated: true,
                user: storedAuth.user,
                token: storedAuth.token,
              });
            }
          } catch (error) {
            console.error("Erro ao verificar autenticação armazenada:", error);
          } finally {
            set({ isLoading: false });
          }
        },

        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          token: state.token,
        }),
      }
    ),
    {
      name: "auth-store",
    }
  )
);
