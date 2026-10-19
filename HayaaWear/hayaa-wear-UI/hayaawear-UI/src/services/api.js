
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const method = (config.method || "get").toLowerCase();
  const url = config.url || "";

  // Public catalog GET requests don't require authentication
  const isPublicRead =
    method === "get" &&
    (
      url.startsWith("/products") ||
      url.startsWith("/categories") ||
      url.startsWith("/subcategories")
    );

  // Login and registration requests
  const isAuthRoute = url.startsWith("/auth");

  // Attach JWT to all other requests
  if (!isPublicRead && !isAuthRoute) {
    const token = localStorage.getItem("jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;
