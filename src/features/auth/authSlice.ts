import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AUTH_CONFIG } from "@/config/auth";
import { authenticateUser } from "./auth.services";
import { LoginCredentials } from "./auth.types";

// Type definition for the auth state
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoginLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  isLoginLoading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const result = await authenticateUser(credentials);
      if (result.success) {
        return result;
      } else {
        return rejectWithValue(result.message || 'خطا در ورود');
      }
    } catch (error) {
      return rejectWithValue('خطا در برقراری ارتباط');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    // Clear cookies
    if (typeof window !== 'undefined') {
      document.cookie = `${AUTH_CONFIG.COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
      document.cookie = `${AUTH_CONFIG.COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      document.cookie = `${AUTH_CONFIG.COOKIE_NAME}=; max-age=0; path=/`;
    }
    return true;
  }
);

// Helper function to check cookie
const checkAuthCookie = (): boolean => {
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

// Helper function to set cookie
const setAuthCookie = (): void => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + AUTH_CONFIG.COOKIE_EXPIRY_DAYS);
  
  document.cookie = `${AUTH_CONFIG.COOKIE_NAME}=${AUTH_CONFIG.AUTH_TOKEN}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
};

// Helper function to remove cookie
const removeAuthCookie = (): void => {
  if (typeof window !== 'undefined') {
    // Several ways to clear cookies
    document.cookie = `${AUTH_CONFIG.COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
    document.cookie = `${AUTH_CONFIG.COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    document.cookie = `${AUTH_CONFIG.COOKIE_NAME}=; max-age=0; path=/`;
  }
};

// Redux slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Initialize auth state from cookie
    initializeAuth: (state) => {
      state.isAuthenticated = checkAuthCookie();
      state.isLoading = false;
      state.error = null;
    },
    
    // Login action
    loginStart: (state) => {
      state.error = null;
    },
    
    loginSuccess: (state) => {
      state.isAuthenticated = true;
      state.error = null;
      setAuthCookie();
    },
    
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    
    // Logout action
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      removeAuthCookie();
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.isLoginLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoginLoading = false;
        state.isAuthenticated = true;
        state.error = null;
        setAuthCookie();
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      // Logout user
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
export const { 
  initializeAuth, 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  clearError 
} = authSlice.actions;