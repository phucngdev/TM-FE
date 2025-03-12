import axios from "axios";
import { refreshToken } from "../services/admin/auth.service";

axios.defaults.withCredentials = true;

const BaseUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

BaseUrl.interceptors.request.use(
  async (config) => {
    // Các route không cần kiểm tra token
    const publicRoutes = ["auth/login", "auth/register"];

    // Kiểm tra nếu request là đến route không cần auth thì bỏ qua
    const check = publicRoutes.some((route) => {
      return config.url.includes(route);
    });
    if (check) {
      return config;
    }

    const isLogin = document.cookie.includes("isLogin");

    if (!isLogin) {
      // Chuyển hướng đến trang login nếu không có token
      window.location.href = "/login";
      return Promise.reject(new Error("No token found, redirecting to login"));
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý response khi gặp lỗi 401 (Unauthorized)
// BaseUrl.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // const res = await axios.post(
//         //   `${import.meta.env.VITE_API_URL}auth/refresh-token`,
//         //   {},
//         //   { withCredentials: true }
//         // );
//         // const res = await refreshToken();
//         // if (res.status === 200) {
//         //   return BaseUrl(originalRequest);
//         // }
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default BaseUrl;
