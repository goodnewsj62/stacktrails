import axios from "axios";

// Create axios instance with credentials
const appAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8020/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle 401 responses
appAxios.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 (Unauthorized) and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Make a POST request to refresh the token
        await axios.post("/auth/refresh", null, {
          baseURL:
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8020/api/v1",
          withCredentials: true,
        });

        // Retry the original request with the new token
        return appAxios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, reject the original error
        return Promise.reject(error);
      }
    }

    // For other errors, just reject the promise
    return Promise.reject(error);
  }
);

export default appAxios;
