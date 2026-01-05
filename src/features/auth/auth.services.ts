import { AUTH_CONFIG } from "@/config/auth";
import { LoginCredentials, AuthResponse } from "./auth.types";

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
};