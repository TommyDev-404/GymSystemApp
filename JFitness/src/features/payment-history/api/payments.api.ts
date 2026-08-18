import { api } from "../../../lib/axios";

export const getPaymentHistory = async (memberId: number) => {
  try {
    const res = await api.get(`/payments/${memberId}`);

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch payment history"
    );
  }
};