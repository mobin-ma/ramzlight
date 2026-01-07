import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";

// Typed Redux hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Auth hook
import { useEffect } from 'react';
import { 
  initializeAuth, 
  clearError,
  loginUser,
  logoutUser
} from '@/features/auth/authSlice';
import { 
  selectIsAuthenticated, 
  selectAuthLoading, 
  selectLoginLoading,
  selectAuthError 
} from '@/features/auth/auth.selectors';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const isLoginLoading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectAuthError);

  // Initialize auth state on mount
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Login function
  const login = async (code: string) => {
    await dispatch(loginUser({ code }));
  };

  // Logout function
  const logout = async () => {
    await dispatch(logoutUser());
  };

  // Clear error function
  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    isAuthenticated,
    isLoading,
    isLoginLoading,
    error,
    login,
    logout,
    clearAuthError
  };
};