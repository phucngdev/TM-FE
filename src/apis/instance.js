import axios from "axios";
import { refreshToken } from "../services/admin/auth.service";

axios.defaults.withCredentials = true;

const BaseUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

BaseUrl.interceptors.request.use(async (config) => {
  return config;
});

// Xử lý response khi gặp lỗi 401 (Unauthorized)
BaseUrl.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // const res = await axios.post(
        //   `${import.meta.env.VITE_API_URL}auth/refresh-token`,
        //   {},
        //   { withCredentials: true }
        // );
        const res = await refreshToken();
        console.log("🚀 ~ res:", res);
        if (res.status === 200) {
          return BaseUrl(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default BaseUrl;
