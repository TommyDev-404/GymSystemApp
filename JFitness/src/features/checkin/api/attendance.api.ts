import { api } from "../../../lib/axios";


export const checkInApi = async (member_id: number, sessionId: string) => {
	try {
		const { data } = await api.post(`/check-in/${member_id}`, { sessionId });

		return data;
	} catch (error) {
		console.error(error);
		
		throw error;
	}
};