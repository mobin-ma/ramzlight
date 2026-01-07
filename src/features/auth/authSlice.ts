import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authenticateUser } from "./auth.services";
import { LoginCredentials } from "./types";
import { CookieService } from "@/services/cookieService";

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
    } catch {
      return rejectWithValue('خطا در برقراری ارتباط');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    CookieService.removeAuthCookie();
    return true;
  }
);

// Redux slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Initialize auth state from cookie
    initializeAuth: (state) => {
      state.isAuthenticated = CookieService.checkAuthCookie();
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
      CookieService.setAuthCookie();
    },
    
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    
    // Logout action
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      CookieService.removeAuthCookie();
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
        CookieService.setAuthCookie();
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