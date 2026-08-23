import { api } from "../../../lib/axios";

export const updateProfileInfoApi = async (userId: number, data: {
	username?: string;
	email?: string;
}) => {
	try {
		const res = await api.patch(`/profile/update-profile-info/${userId}`, data);

		return res.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
			"Failed to update profile"
		);
	}
};

export const updateProfileImageApi = async (userId: number, formData: FormData) => {
	try {
		const res = await api.patch(`/profile/update-profile-image/${userId}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return res.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
			"Failed to update profile"
		);
	}
};