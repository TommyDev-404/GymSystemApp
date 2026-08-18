import { api } from "../../../lib/axios";
import { CreateFitnessGoalPayload, UpdateFitnessGoalPayload } from "../types/HomeTypes";


export const getMembersDashboardDataApi = async (memberId: number) => {
	try {
		const res = await api.get(`/home/member-stat/${memberId}`);

		return res.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
			"Failed to fetch dashboard data"
		);
	}
 };

export const getMemberRecentActivityApi = async (memberId: number) => {
	try {
		const res = await api.get(`/home/recent-activity/${memberId}`);

		return res.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
			"Failed to fetch recent activity"
		);
	}
};

export const createFitnessGoalApi = async (member_id: number, data: CreateFitnessGoalPayload) => {
	try {
		const response = await api.post(`/home/create-fitness-goal/${member_id}`, data);

		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
			"Failed to create fitness goal"
		);
	}
};

export const updateFitnessGoalApi = async (member_id:number, data:UpdateFitnessGoalPayload)=>{
	try {
		const response = await api.patch(`/home/update-fitness-goal/${member_id}`, data);

		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
			"Failed to update fitness goal"
		);
	}
};

export const getFitnessGoalApi = async (memberId:number)=>{
	try {
		const response = await api.get(`/home/member-fitness-goal/${memberId}`);

	 	return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
			"Failed to get weight progress"
		);
	}
};

export const getFitnessGoalHistoryApi = async (memberId:number )=>{
  	try {
		const response = await api.get(`/home/member-fitness-goal-history/${memberId}`);

		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
			"Failed to get fitness progress history"
		);
	}
};