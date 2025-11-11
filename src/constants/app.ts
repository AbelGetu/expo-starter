
export const APP_CONFIG = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://your-api.com',
  STORAGE_KEYS: {
    AUTH_STORE: 'auth-store',
    AUTH_TOKEN: 'auth-token',
  },
  API_ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      VIP_LOGIN: '/auth/vip-login',
      LOGOUT: '/auth/logout',
      REGISTER: '/auth/register',
    },
    USER: {
      PROFILE: '/user/profile',
    },
  },
} as const;