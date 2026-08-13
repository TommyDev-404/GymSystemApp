import { api } from "@/lib/axios";


export const getAvailableRewardsApi = async () => {
   try {
      const res = await api.get(`/reward`);

      return res.data;
   } catch (error:any) {
      console.error("Error:",
         error.response?.data || error.message
      );

      throw error;
   }
};

export const getRedeemedRewardsApi = async (member_id: number) => {
   try {
      const res = await api.get(`/reward/redeemed/${member_id}`);

      return res.data;
   } catch (error:any) {
      console.error("Error:",
         error.response?.data || error.message
      );

      throw error;
   }
};

export const redeemRewardApi = async (member_id: number, reward_id: number) => {
   try {
      const res = await api.post(`/reward/${member_id}/redeem/${reward_id}`);

      return res.data;
   } catch (error:any) {
      console.error("Error:",
         error.response?.data || error.message
      );

      throw error;
   }
};

export const cancelRedeemRewardApi = async (member_id: number, redemption_id: number) => {
   try {
      const res = await api.patch(`/reward/redeemed/cancel/${member_id}/${redemption_id}`);

      return res.data;
   } catch (error:any) {
      console.error("Error:",
         error.response?.data || error.message
      );

      throw error;
   }
};