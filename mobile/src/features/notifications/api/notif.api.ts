import { api } from "../../../lib/axios";

export const getMembersNotificationsApi = async (
   memberId: number
 ) => {
   try {
     const res = await api.get(
       `/notifications/${memberId}`
     );
 
      console.log(res.data);
     return res.data;
 
   } catch (error: any) {
     throw new Error(
       error.response?.data?.message ||
       "Failed to fetch notifications data"
     );
   }
 };