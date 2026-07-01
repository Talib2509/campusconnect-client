export interface ApiResponse<T = any> {
  succeeded: boolean;
  success?: boolean;
  message?: string;
  data?: T;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  errors?: ApiError[];
}

export interface ApiError {
  field?: string;
  message: string;
}