import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getItem, setItem, deleteItemAsync } from "expo-secure-store";
import { authService } from '../api/authService';
import { User, LoginCredentials, RegisterData } from '@/types/auth';
import { ApiError } from '@/types/api';
import { APP_CONFIG } from '@/constants/app';

interface AuthState {
  // State
  user: User | null;
  isLoggedIn: boolean;
  shouldCreateAccount: boolean;
  hasCompletedOnboarding: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  logIn: (credentials: LoginCredentials) => Promise<void>;
  logOut: () => Promise<void>;
  createAccount: (userData: RegisterData) => Promise<void>;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthState = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isLoggedIn: false,
      shouldCreateAccount: false,
      hasCompletedOnboarding: false,
      isLoading: false,
      error: null,

      // Actions
      logIn: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          console.log('credentials', credentials);
          const response = await authService.login(credentials);
          console.log('response', response);
          await setItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN, response.token);
          
          set({
            user: response.user,
            isLoggedIn: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const authError = error as ApiError;
          set({
            isLoading: false,
            error: authError.message || 'Login failed',
          });
          throw error;
        }
      },

      logOut: async () => {
        set({ isLoading: true });
        set({
            user: null,
            isLoggedIn: false,
            isLoading: false,
            error: null,
          });
        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout API call failed:', error);
        } finally {
          await deleteItemAsync(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
          set({
            user: null,
            isLoggedIn: false,
            isLoading: false,
            error: null,
          });
        }
      },

      createAccount: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.register(userData);
          await setItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN, response.token);
          
          set({
            user: response.user,
            isLoggedIn: true,
            shouldCreateAccount: false,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const authError = error as ApiError;
          set({
            isLoading: false,
            error: authError.message || 'Account creation failed',
          });
          throw error;
        }
      },

      initializeAuth: async () => {
        const token = await getItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
        if (token && !get().isLoggedIn) {
          try {
            const user = await authService.getProfile();
            set({ user, isLoggedIn: true });
          } catch (error) {
            await deleteItemAsync(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
            set({ user: null, isLoggedIn: false });
          }
        }
      },

      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
      },

      resetOnboarding: () => {
        set({ hasCompletedOnboarding: false });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: APP_CONFIG.STORAGE_KEYS.AUTH_STORE,
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        shouldCreateAccount: state.shouldCreateAccount,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
    }
  )
);

// Selectors
export const useUser = () => useAuthState((state) => state.user);
export const useIsLoggedIn = () => useAuthState((state) => state.isLoggedIn);
export const useIsLoading = () => useAuthState((state) => state.isLoading);
export const useAuthError = () => useAuthState((state) => state.error);