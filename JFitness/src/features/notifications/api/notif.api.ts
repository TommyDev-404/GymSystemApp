import { api } from "../../../lib/axios";

export const getMembersNotificationsApi = async (memberId: number) => {
  const res = await api.get(`/notifications/${memberId}`);
  return res.data;
};

export const markNotificationRead = async (
  notifId: number,
  memberId: number
) => {
  const res = await api.patch(
    `/notifications/${notifId}/read/${memberId}`
  );
  return res.data;
};

export const markAllNotificationRead = async (memberId: number) => {
  const res = await api.patch(`/notifications/mark-all-read/${memberId}`);
  return res.data;
};
