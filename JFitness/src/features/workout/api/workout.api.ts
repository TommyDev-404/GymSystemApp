import { api } from "../../../lib/axios";
import { CreateWorkoutInput, Params } from "../types/WorkoutTypes";

export const getWorkoutTutorial = async (params?: Params) => {
   const res = await api.get(`/workout/tutorials`, { params });
   return res.data;
};

export const getWorkoutSummaryApi = async (member_id: number) => {
   const response = await api.get(`/workout/${member_id}/summary`);
   return response.data;
 };

 
export const getWorkoutProgressApi = async (member_id: number) => {
  const response = await api.get(`/workout/${member_id}/progress`);

  return response.data;
};


export const getPersonalWorkoutHistoryApi = async (member_id: number) => {
   const res = await api.get(`/workout/personal-workout/${member_id}`);
   return res.data;
};

export const addPersonalWorkoutApi = async (member_id: number, data: CreateWorkoutInput) => {
   const res = await api.post(`/workout/add-personal-workout/${member_id}`, data);
   return res.data;
};