import {
  useQuery, 
  useMutation,
  useQueryClient, } from "@tanstack/react-query";
import { FitnessGoalHistory, FitnessGoalHistoryResponse, MemberDashboard } from "../types/HomeTypes";

import {
  CreateFitnessGoalPayload,
  UpdateFitnessGoalPayload,
} from "../types/HomeTypes";

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

export const useGetFitnessGoal = (
  memberId:number
)=>{

  return useQuery({

    queryKey:[
      "fitness-goal",
      memberId
    ],


    queryFn:()=> 
      api.getFitnessGoalApi(memberId),


    enabled:
      !!memberId,


    staleTime:
      1000 * 60 * 5,


    retry:false,

  });

};

export const useGetFitnessGoalHistory = (
  memberId: number
) => {

  return useQuery <FitnessGoalHistoryResponse>({

    queryKey:[
      "fitness-goal-history",
      memberId
    ],

    queryFn:()=> 
      api.getFitnessGoalHistoryApi(memberId),


    enabled:
      !!memberId,

    staleTime:
      1000 * 60 * 5,


    retry:false,

  });

};

export const useCreateFitnessGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn:
      (data: CreateFitnessGoalPayload) =>
        api.createFitnessGoalApi(data),


    onSuccess: (_, variables) => {

      queryClient.invalidateQueries({
        queryKey:[
          "fitness-goal",
          variables.member_id
        ]
      });

    }

  });

};

export const useUpdateFitnessGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn:
      ({
        id,
        data,
      }:{
        id:number;
        data:UpdateFitnessGoalPayload;
      }) =>
        api.updateFitnessGoalApi(
          id,
          data
        ),


    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:[
          "fitness-goal"
        ]
      });

      queryClient.invalidateQueries({
        queryKey:[
          "fitness-goal-history"
        ]
      });
    }

  });
};


