import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "@/features/profile/api/profile.api";

type ProfileInfo = {
  user_id: number,
  member_id: number,
  username: string,
  email: string,
  profile: string,
  pass_last_changed: Date
};

export const useGetProfileInfo = (user_id: number) => {
   return useQuery<ProfileInfo>({
      queryKey: ["profile-info", user_id],
      queryFn: () => api.getProfileInfoApi(user_id),
   });
};

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
           queryKey: ["member-dashboard-stat", variables.memberId ],
         });
        
         queryClient.invalidateQueries({
          queryKey: ["profile-info", variables.userId ],
        });
       },

    onError: (error) => {
      console.log("Update profile failed:", error);
    },
  });

};

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

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
    
    onSuccess: (_, variables) => {
      
      queryClient.invalidateQueries({
       queryKey: ["profile-info", variables.userId ],
     });
    }
  });

};