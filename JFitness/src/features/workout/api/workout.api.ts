import { api } from "../../../lib/axios";
import { CreateWorkoutInput, Params } from "../types/WorkoutTypes";


export const getWorkoutTutorial = async (params?: Params) => {
   try {
      const res = await api.get(`/workout/tutorials`, { params });

      return res.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message);
	}
};

export const getWorkoutInfoApi = async (id: number) => {
   try {
      const res = await api.get(`/workout/info/${id}`);

      return res.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message);
	}
};


export const getWorkoutSummaryApi = async (member_id: number) => {
   try {
      const response = await api.get(`/workout/${member_id}/summary`);
      
      return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message);
	}
 };

 
export const getWorkoutProgressApi = async (member_id: number) => {
   try {
      const response = await api.get(`/workout/${member_id}/progress`);

      return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message);
	}
};

export const getPersonalWorkoutHistoryApi = async (member_id: number) => {
   try {
      const res = await api.get(`/workout/personal-workout/${member_id}`);

      return res.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message);
	}
};

export const addPersonalWorkoutApi = async (member_id: number, data: CreateWorkoutInput) => {
   try {
      const res = await api.post(`/workout/add-personal-workout/${member_id}`, data);

      return res.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message);
	}
};

export const searchExerciseApi = async (search?: string) => {
   try {
      const res = await api.get(`/workout/search`, {
         params: { search }
      });

      return res.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message);
	}
};