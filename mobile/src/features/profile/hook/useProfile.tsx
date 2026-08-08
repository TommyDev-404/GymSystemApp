import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "@/features/profile/api/profile.api";

export const useUpdateProfileInfo = () => {
   const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: ({
       userId,
       memberId,
      username,
      email,
    }: {
      userId: number;
      memberId: number;
      username?: string;
      email?: string;
    }) =>
      api.updateProfileInfoApi(
        userId,
        {
          username,
          email,
        }
      ),

      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({
           queryKey: [
             "member-dashboard-stat",
             variables.memberId,
           ],
         });
       },

    onError: (error) => {
      console.log("Update profile failed:", error);
    },
  });

};

export const useUpdateProfileImage = () => {

  return useMutation({
    mutationFn: ({
      userId,
      formData,
    }: {
      userId: number;
      formData: FormData;
    }) =>
      api.updateProfileImageApi(
        userId,
        formData
      ),

  });

};