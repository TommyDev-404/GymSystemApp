import { useQuery } from "@tanstack/react-query";
import * as api from "../api/attendance.api"
import { AttendanceChartData } from "../types/AttendanceTypes";

export function useGetMemberAttendanceHistory(memberId: number) {
  return useQuery({
    queryKey: ["member-attendance", memberId],
    queryFn: () => api.getMemberAttendanceHistoryApi(memberId),
    enabled: !!memberId
  });
}

export function useGetMemberAttendanceProgress(memberId: number) {
  return useQuery<AttendanceChartData[]>({
    queryKey: ["member-attendance-progress", memberId],
    queryFn: () => api.getMemberAttendanceProgressApi(memberId),
    enabled: !!memberId
  });
}
