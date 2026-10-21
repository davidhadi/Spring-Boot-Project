
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use(
  (config) => {
    const method = (config.method || "get").toLowerCase();
    const url = config.url || "";

    // Public GET endpoints
    const isPublicRead =
      method === "get" &&
      (
        (url.startsWith("/products") &&
          !url.startsWith("/products/seller")) ||
        url.startsWith("/categories") ||
        url.startsWith("/subcategories")
      );

    // Authentication endpoints
    const isAuthRoute = url.startsWith("/auth");

    // Attach JWT to all protected requests
    if (!isPublicRead && !isAuthRoute) {
      const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
