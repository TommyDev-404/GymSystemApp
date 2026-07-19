import { useQuery } from "@tanstack/react-query";
import * as api from "../api/notif.api"

export function useGetMemberNotifications(memberId: number) {
   return useQuery({
     queryKey: ["member-notifications", memberId],
     queryFn: () => api.getMembersNotificationsApi(memberId),
   });
}
