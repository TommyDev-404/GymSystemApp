import { api } from "../../../lib/axios";

export const getPaymentHistory = async (memberId: number) => {
  const res = await api.get(`/payments/${memberId}`);

  return res.data;
};