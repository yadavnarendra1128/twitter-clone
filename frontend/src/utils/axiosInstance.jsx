import axios from "axios";

const BASE_URL = "https://twitter-clone-y8en.onrender.com"; // Fallback for local development

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

export default axiosInstance;
