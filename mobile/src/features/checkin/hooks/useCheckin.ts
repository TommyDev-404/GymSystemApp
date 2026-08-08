import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkInApi } from "../api/attendance.api";

export const useCheckIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      { member_id, sessionId }:
      { member_id: number,sessionId: string  }
    ) => checkInApi(member_id, sessionId),
    onSuccess: (_, variables) => {
      // refresh attendance list after check-in
      queryClient.invalidateQueries({
        queryKey: ["attendance"]
      });

      queryClient.invalidateQueries({
        queryKey: ["member-dashboard-stat", variables.member_id]
      });
      
      queryClient.invalidateQueries({
        queryKey: ["member-dashboard-stat", variables.member_id]
      });
      
      queryClient.invalidateQueries({
        queryKey: ["member-recent-activity", variables.member_id]
      });

      queryClient.invalidateQueries({
        queryKey: ["member-attendance", variables.member_id]
      });

      queryClient.invalidateQueries({
        queryKey: ["member-notifications", variables.member_id]
      });
    }
  });
};