import { useQuery } from "@tanstack/react-query";
import { MemberDashboard } from "../types/HomeTypes";
import * as api from "../api/home.api"

export function useGetMemberDashboardData(memberId: number) {
  return useQuery<MemberDashboard>({
    queryKey: ["member-dashboard-stat", memberId],
    queryFn: () => api.getMembersDashboardDataApi(memberId),
  });
}

export function useGetMemberRecentActivity(memberId: number) {
  return useQuery({
    queryKey: ["member-recent-activity", memberId],
    queryFn: () => api.getMemberRecentActivityApi(memberId),
  });
}