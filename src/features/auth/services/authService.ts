import { axiosInstance } from "../../../api/axiosInstance";
import type {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from "../types/auth.types";

function unwrapResponse<T>(responseData: any): T {
  return responseData?.data ?? responseData;
}

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post("/Auth/login", data);
    return unwrapResponse<LoginResponse>(response.data);
  },

  async register(data: RegisterRequest) {
    const response = await axiosInstance.post("/Auth/register", data);
    return unwrapResponse(response.data);
  },

  async refreshTokenLogin(data: RefreshTokenRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post("/Auth/refresh-token-login", data);
    return unwrapResponse<LoginResponse>(response.data);
  },

  async forgotPassword(data: ForgotPasswordRequest) {
    const response = await axiosInstance.post("/Auth/forgot-password", data);
    return unwrapResponse(response.data);
  },

  async resetPassword(data: ResetPasswordRequest) {
    const response = await axiosInstance.post("/Auth/reset-password", data);
    return unwrapResponse(response.data);
  },
};