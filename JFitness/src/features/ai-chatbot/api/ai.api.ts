import { api } from "../../../lib/axios";

export interface ChatResponse {
  reply: string;
}

export async function sendChatMessage(
   memberId: number,
   message: string,
): Promise<ChatResponse> {
  const response = await api.post(`/chat/${memberId}`, {
    message,
  });

  return response.data;
}