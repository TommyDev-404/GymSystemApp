import {
	useQuery, 
	useMutation,
	useQueryClient
} from "@tanstack/react-query";
import {
	FitnessGoalHistory,
	MemberDashboard,
	WeightGoal,
	CreateFitnessGoalPayload,
	UpdateFitnessGoalPayload,
} from "../types/HomeTypes";
import * as api from "../api/home.api"


export function useGetMemberDashboardData(memberId: number) {
	return useQuery<MemberDashboard>({
		queryKey: ["member-dashboard-stat", memberId],
		queryFn: () => api.getMembersDashboardDataApi(memberId),
		enabled: !!memberId
	});
}

export function useGetMemberRecentActivity(memberId: number) {
	return useQuery({
		queryKey: ["member-recent-activity", memberId],
		queryFn: () => api.getMemberRecentActivityApi(memberId),
		enabled: !!memberId
	});
}

export const useGetFitnessGoal = (memberId:number)=>{
  return useQuery<WeightGoal>({
    queryKey: ["fitness-goal", memberId],
    queryFn: () => api.getFitnessGoalApi(memberId),
    enabled: !!memberId
  });

};

export const useGetFitnessGoalHistory = (memberId: number) => {
  return useQuery <FitnessGoalHistory[]>({
    queryKey: ["fitness-goal-history", memberId],
    queryFn: () => api.getFitnessGoalHistoryApi(memberId),
    enabled: !!memberId
  });

};

export const useCreateFitnessGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      member_id,
      data
    }: {
      member_id: number,
      data: CreateFitnessGoalPayload
    }) => api.createFitnessGoalApi(member_id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey:["fitness-goal", variables.member_id]
      });
    }
  });
};

export const useUpdateFitnessGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }:{ id:number, data:UpdateFitnessGoalPayload }) => api.updateFitnessGoalApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["fitness-goal"]
      });

      queryClient.invalidateQueries({
        queryKey:["fitness-goal-history"]
      });
    }
  });
};


