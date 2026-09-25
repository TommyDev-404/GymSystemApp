import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/reward.api"
import { RedeemedReward, Reward } from "../types/RewardTypes";


export function useFetchAvailableRewards() {
  return useQuery<Reward[]>({
    queryKey: ["available-rewards"],
    queryFn: api.getAvailableRewardsApi,
    
  });
}

export function useFetchRedeemedRewards(member_id: number) {
   return useQuery<RedeemedReward[]>({
     queryKey: ["redeemed-rewards"],
     queryFn: () => api.getRedeemedRewardsApi(member_id),
   });
}

export const useRedeemReward = () => {
   const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: ({
       member_id,
       reward_id
    }: {
      member_id: number, 
      reward_id: number
    }) =>
      api.redeemRewardApi(member_id, reward_id),

      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({
           queryKey: ["member-dashboard-stat", variables.member_id],
         });

         queryClient.invalidateQueries({
            queryKey: ["redeemed-rewards"],
         });

         queryClient.invalidateQueries({
            queryKey: ["available-rewards"],
         });
         
         queryClient.invalidateQueries({
            queryKey: ["member-notifications", variables.member_id]
         });
        
         queryClient.invalidateQueries({
            queryKey: ["member-recent-activity", variables.member_id]
        });
       }
  });

};

export const useCancelRedeemReward = () => {
   const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: ({
       member_id,
       redemption_id
    }: {
      member_id: number, 
      redemption_id: number
    }) =>
      api.cancelRedeemRewardApi(member_id, redemption_id),

      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({
           queryKey: ["member-dashboard-stat", variables.member_id],
         });

         queryClient.invalidateQueries({
            queryKey: ["redeemed-rewards"],
         });

         queryClient.invalidateQueries({
            queryKey: ["available-rewards"],
         });

         queryClient.invalidateQueries({
            queryKey: ["member-notifications", variables.member_id]
         });
        
        queryClient.invalidateQueries({
          queryKey: ["member-recent-activity", variables.member_id]
        });

        queryClient.invalidateQueries({
          queryKey: ["tab-badges", variables.member_id]
       });
       }
  });

};