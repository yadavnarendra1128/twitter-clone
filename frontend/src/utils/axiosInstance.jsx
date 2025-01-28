import axios from "axios";

const BASE_URL = "https://twitter-clone-y8en.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure credentials (cookies) are sent with every request
});

export default axiosInstance;
