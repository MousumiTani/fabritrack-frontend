import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const axiosSecure = axios.create({
  baseURL: API, // ✅ this will use the deployed backend URL
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosSecure;
