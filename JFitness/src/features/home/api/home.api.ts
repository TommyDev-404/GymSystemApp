import { api } from "../../../lib/axios";
import {
  CreateFitnessGoalPayload,
  UpdateFitnessGoalPayload,
} from "../types/HomeTypes";

export const getMembersDashboardDataApi = async (memberId: number) => {
  const res = await api.get(`/home/member-stat/${memberId}`);
  return res.data;
};

export const getMemberRecentActivityApi = async (memberId: number) => {
  const res = await api.get(`/home/recent-activity/${memberId}`);
  return res.data;
};

export const getFitnessGoalApi = async (memberId: number) => {
  const response = await api.get(`/home/member-fitness-goal/${memberId}`);
  return response.data;
};

export const getFitnessGoalHistoryApi = async (memberId: number) => {
  const response = await api.get(
    `/home/member-fitness-goal-history/${memberId}`
  );
  return response.data;
};

export const getTabBadgesApi = async (memberId: number) => {
  const response = await api.get(`/home/tab-badges/${memberId}`);
  return response.data;
};

export const createFitnessGoalApi = async (
  member_id: number,
  data: CreateFitnessGoalPayload
) => {
  const response = await api.post(
    `/home/create-fitness-goal/${member_id}`,
    data
  );
  return response.data;
};

export const updateFitnessGoalApi = async (
  member_id: number,
  data: UpdateFitnessGoalPayload
) => {
  const response = await api.patch(
    `/home/update-fitness-goal/${member_id}`,
    data
  );
  return response.data;
};
