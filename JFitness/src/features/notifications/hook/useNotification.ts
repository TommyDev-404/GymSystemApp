import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/notif.api"

export function useGetMemberNotifications(memberId: number) {
   return useQuery({
     queryKey: ["member-notifications", memberId],
     queryFn: () => api.getMembersNotificationsApi(memberId),
   });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      notificationId,
      memberId,
    }: {
      notificationId: number;
      memberId: number;
    }) =>
      api.markNotificationRead(notificationId, memberId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["member-notifications", variables.memberId],
      });

      queryClient.invalidateQueries({
        queryKey: ["tab-badges", variables.memberId],
      });
    },
  });
}

export function useMarkAllNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberId,
    }: {
      memberId: number;
    }) =>
      api.markAllNotificationRead(memberId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["member-notifications", variables.memberId],
      });
      
      queryClient.invalidateQueries({
        queryKey: ["tab-badges", variables.memberId],
      });
    },
  });
}