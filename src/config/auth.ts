// Authentication settings
export const AUTH_CONFIG = {
  // Authentication code - you can change it or use environment variable
  STATIC_AUTH_CODE: process.env.NEXT_PUBLIC_AUTH_CODE || 'ramzlight2024',
  
  // Cookie name
  COOKIE_NAME: 'ramzlight_auth',
  
  // Cookie validity period (days)
  COOKIE_EXPIRY_DAYS: 30,
  
  // Cookie value for authentication
  AUTH_TOKEN: 'authenticated'
} as const;