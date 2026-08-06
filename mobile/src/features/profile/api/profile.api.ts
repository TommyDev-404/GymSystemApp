import { api } from "../../../lib/axios";

export const updateProfileApi = async (
   userId: number,
   data: {
     username?: string;
     email?: string;
   }
 ) => {
   try {
     const res = await api.patch(
       `/profile/update/${userId}`,
       data
     );
 
     return res.data;
 
   } catch (error: any) {
     throw new Error(
       error.response?.data?.message ||
       "Failed to update profile"
     );
   }
 };