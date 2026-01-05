import { RootState } from "@/store/store";

// Auth selectors
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectLoginLoading = (state: RootState) => state.auth.isLoginLoading;
export const selectAuthError = (state: RootState) => state.auth.error;