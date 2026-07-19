import { api } from "../../../lib/axios";

export interface CheckInResponse {
  message: string;
  attendance?: {
    id: number;
    checkInTime: string;
  };
}

export const checkInApi = async (member_id: number, sessionId: string) => {
  const { data } = await api.post<CheckInResponse>(`/check-in/${member_id}`, {
    sessionId,
  });

  return data;
};