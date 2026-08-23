import { api } from "../../../lib/axios";

export const loginApi = async (data: { username: string, password: string }) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

export const verifyActivationCodeApi = async (activation_code: string) => {
  try {
    const res = await api.post("/auth/verify-activation", { activation_code });
    return res.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

export const completeRegistrationApi = async (data: {
  member_id: number;
  username: string;
  password: string
}
) => {
  try {
    const res = await api.post("/auth/complete-registration", data);
    return res.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

export const sendOtpApi = async (email: string) => {
  try {
    const res = await api.post("/auth/send-otp", { email });
    return res.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

export const verifyOtpApi = async (
  data: { email: string; code: string }
) => {
  try {
    const res = await api.post("/auth/verify-otp", data);
    return res.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

export const resetPasswordApi = async (
  data: { email: string; newPassword: string }
) => {
  try {
    const res = await api.post("/auth/reset-password", data);
    return res.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};