import { api } from "../../../lib/axios";

export const getMembersDashboardDataApi = async (
   memberId: number
 ) => {
   try {
     const res = await api.get(
       `/home/member-stat/${memberId}`
     );
 
     return res.data;
 
   } catch (error: any) {
     throw new Error(
       error.response?.data?.message ||
       "Failed to fetch dashboard data"
     );
   }
 };

export const getMemberRecentActivityApi = async (
  memberId: number
) => {
  try {
    const res = await api.get(
      `/home/recent-activity/${memberId}`
    );

    return res.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch recent activity"
    );
  }
};