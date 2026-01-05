// Central axios instance for the entire app
// All interceptors (auth, errors, headers) should be handled here
import axios from "axios";

// Create a centralized axios instance
const api = axios.create({
  baseURL: "https://api.ramzlight.com", // Base API URL
});
 
// Attach auth token to every request (when auth is enabled)
api.interceptors.request.use((config) => {
  return config;
});

// Global error handling (401, 403, 500)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error)
    return Promise.reject(error)
  },
);

export default api;
