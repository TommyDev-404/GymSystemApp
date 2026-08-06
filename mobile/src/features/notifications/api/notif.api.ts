import { api } from "../../../lib/axios";

export const getMembersNotificationsApi = async (
   memberId: number
 ) => {
   try {
     const res = await api.get(
       `/notifications/${memberId}`
     );
 
     return res.data;
 
   } catch (error: any) {
     throw new Error(
       error.response?.data?.message ||
       "Failed to fetch notifications data"
     );
   }
};

export const markNotificationRead = async (
  notifId: number,
  memberId: number
) => {
  try {
    const res = await api.patch(`/notifications/${notifId}/read/${memberId}`);

    return res.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to mark notifications as read"
    );
  }
};

export const markAllNotificationRead = async (memberId: number) => {
  try {
    const res = await api.patch(`/notifications/mark-all-read/${memberId}`);

    return res.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to mark notifications as read"
    );
  }
};
