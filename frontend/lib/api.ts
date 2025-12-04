import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // ← THIS LINE WAS MISSING OR OVERRIDDEN
  },
  withCredentials: false, // keep false unless you use httpOnly cookies
});

// Request interceptor to add Bearer token from cookie
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// You can add response interceptors if needed, e.g., for handling 401 unauthorized
export default api;
