import { useQuery } from "@tanstack/react-query";
import * as api from "../api/payments.api"
import { MemberPaymentHistoryData } from "../types/PaymentTypes";

export function useFetchPaymentHistory(memberId: number) {
  return useQuery<MemberPaymentHistoryData>({
    queryKey: ["member-payment-history", memberId],
    queryFn: () => api.getPaymentHistory(memberId),
  });
}