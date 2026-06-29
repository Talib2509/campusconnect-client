import axios from "axios";
import { TokenManager } from "../utils/tokenManager";
import { authService } from "../features/auth/services/authService";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = TokenManager.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as any;
    const status = error.response?.status;
    const requestUrl = originalRequest?.url || "";

    const isAuthRequest =
      requestUrl.includes("/Auth/login") ||
      requestUrl.includes("/Auth/register") ||
      requestUrl.includes("/Auth/forgot-password") ||
      requestUrl.includes("/Auth/reset-password") ||
      requestUrl.includes("/Auth/refresh-token-login");

    if (status === 401 && !isAuthRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = TokenManager.getRefreshToken();

        if (!refreshToken) {
          throw new Error("Refresh token yoxdur.");
        }

        const result = await authService.refreshTokenLogin({
          refreshToken,
        });

        const newAccessToken = result.accessToken || result.token;

        if (!newAccessToken) {
          throw new Error("Yeni access token gəlmədi.");
        }

        TokenManager.setAccessToken(newAccessToken);

        if (result.refreshToken) {
          TokenManager.setRefreshToken(result.refreshToken);
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch {
        TokenManager.clearTokens();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);