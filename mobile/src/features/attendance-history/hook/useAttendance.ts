import { useQuery } from "@tanstack/react-query";
import * as api from "../api/attendance.api"

export function useGetMemberAttendanceHistory(memberId: number) {
  return useQuery({
    queryKey: ["member-attendance", memberId],
    queryFn: () => api.getMemberAttendanceHistoryApi(memberId),
  });
}
