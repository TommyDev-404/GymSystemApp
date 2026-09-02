import { api } from "../../../lib/axios";

export const loginApi = async (data: { username: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const verifyActivationCodeApi = async (activation_code: string) => {
  const res = await api.post("/auth/verify-activation", { activation_code });
  return res.data;
};

export const completeRegistrationApi = async (data: {
  member_id: number;
  username: string;
  password: string;
}) => {
  const res = await api.post("/auth/complete-registration", data);
  return res.data;
};

export const sendOtpApi = async (email: string) => {
  const res = await api.post("/auth/send-otp", { email });
  return res.data;
};

export const verifyOtpApi = async (data: { email: string; code: string }) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};

export const resetPasswordApi = async (data: { email: string; newPassword: string }) => {
  const res = await api.post("/auth/reset-password", data);
  return res.data;
};
