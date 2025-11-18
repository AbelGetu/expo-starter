
export const APP_CONFIG = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://hrmapi.kobelindustries.com',
  STORAGE_KEYS: {
    AUTH_STORE: 'auth-store',
    AUTH_TOKEN: 'auth-token',
  },
  API_ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/login',
      VIP_LOGIN: '/auth/vip-login',
      LOGOUT: '/api/logout',
      REGISTER: '/api/register',
    },
    USER: {
      PROFILE: '/user/profile',
    },
  },
} as const;