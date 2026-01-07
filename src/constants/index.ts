// Application constants

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.ramzlight.com",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 50,
  MAX_PAGE_SIZE: 100,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  INFINITE_SCROLL_THRESHOLD: 100,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "خطا در برقراری ارتباط با سرور",
  UNAUTHORIZED: "دسترسی غیرمجاز",
  NOT_FOUND: "صفحه مورد نظر یافت نشد",
  SERVER_ERROR: "خطای داخلی سرور",
  UNKNOWN_ERROR: "خطای نامشخص",
} as const;