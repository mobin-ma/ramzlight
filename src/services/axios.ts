// Central axios instance for the entire app
// All interceptors (auth, errors, headers) should be handled here
import axios from "axios";
import { API_CONFIG, ERROR_MESSAGES } from "@/constants";

// Create a centralized axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});
 
// Attach auth token to every request (when auth is enabled)
api.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global error handling (401, 403, 500)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status } = error.response;
      switch (status) {
        case 401:
          console.error(ERROR_MESSAGES.UNAUTHORIZED);
          break;
        case 404:
          console.error(ERROR_MESSAGES.NOT_FOUND);
          break;
        case 500:
          console.error(ERROR_MESSAGES.SERVER_ERROR);
          break;
        default:
          console.error(ERROR_MESSAGES.UNKNOWN_ERROR);
      }
    } else if (error.request) {
      // Network error
      console.error(ERROR_MESSAGES.NETWORK_ERROR);
    }
    
    return Promise.reject(error);
  },
);

export default api;
