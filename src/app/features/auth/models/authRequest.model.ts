export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}
export interface ForgotPasswordRequest {
  email: string;
}