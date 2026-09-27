import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const publicRoutes = [
  "/products",
  "/categories",
  "/subcategories",
  "/auth",
];

API.interceptors.request.use((config) => {
  const isPublic = publicRoutes.some((route) =>
    config.url?.startsWith(route)
  );

  if (!isPublic) {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;