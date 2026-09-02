import { api } from "../../../lib/axios";


export const getMemberReferralDataApi = async (memberId: number) => {
	const response = await api.get(`/referral/${memberId}`);

	return response.data;
};

export const getMemberReferralRecordsApi = async (memberId: number) => {
	const response = await api.get(`/referral/records/${memberId}`);

	return response.data;
};