import { apiClient } from './client';
import { APP_CONFIG } from '@/constants/app';
import { LoginCredentials, RegisterData, AuthResponse, User } from '@/types/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(
      APP_CONFIG.API_ENDPOINTS.AUTH.LOGIN, 
      credentials
    );
  },

  logout: async (): Promise<void> => {
    return apiClient.post(APP_CONFIG.API_ENDPOINTS.AUTH.LOGOUT);
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(
      APP_CONFIG.API_ENDPOINTS.AUTH.REGISTER, 
      userData
    );
  },

  getProfile: async (): Promise<User> => {
    return apiClient.get<User>(APP_CONFIG.API_ENDPOINTS.USER.PROFILE);
  },
};