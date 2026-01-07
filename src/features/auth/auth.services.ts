import { LoginCredentials, AuthResponse } from "./types";
import { CookieService } from "@/services/cookieService";
import { AUTH_CONFIG } from "@/config/auth";

// Static authentication service
export const authenticateUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (credentials.code === AUTH_CONFIG.STATIC_AUTH_CODE) {
    return {
      success: true,
      message: "ورود موفقیت‌آمیز"
    };
  } else {
    return {
      success: false,
      message: "کد وارد شده صحیح نیست"
    };
  }
};

// Check if user is authenticated (from cookie)
export const checkAuthStatus = (): boolean => {
  return CookieService.checkAuthCookie();
};