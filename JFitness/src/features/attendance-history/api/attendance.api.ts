import { api } from "../../../lib/axios";

export const getMemberAttendanceProgressApi = async (memberId: number) => {
	const res = await api.get(`/check-in/${memberId}/progress`);

	return res.data;
};

export const getMemberAttendanceHistoryApi = async (memberId: number) => {
	const res = await api.get(`/home/member-attendance/${memberId}`);

	return res.data;
};