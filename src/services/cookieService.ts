// Centralized cookie management service
import { AUTH_CONFIG } from "@/config/auth";

export class CookieService {
  // Check if auth cookie exists and is valid
  static checkAuthCookie(): boolean {
    if (typeof window !== 'undefined') {
      const authCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${AUTH_CONFIG.COOKIE_NAME}=`));
      
      if (authCookie) {
        const value = authCookie.split('=')[1];
        return value === AUTH_CONFIG.AUTH_TOKEN;
      }
    }
    return false;
  }

  // Set authentication cookie
  static setAuthCookie(): void {
    if (typeof window !== 'undefined') {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + AUTH_CONFIG.COOKIE_EXPIRY_DAYS);
      
      document.cookie = `${AUTH_CONFIG.COOKIE_NAME}=${AUTH_CONFIG.AUTH_TOKEN}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
    }
  }

  // Remove authentication cookie
  static removeAuthCookie(): void {
    if (typeof window !== 'undefined') {
      // Multiple ways to ensure cookie is cleared
      document.cookie = `${AUTH_CONFIG.COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
      document.cookie = `${AUTH_CONFIG.COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      document.cookie = `${AUTH_CONFIG.COOKIE_NAME}=; max-age=0; path=/`;
    }
  }
}