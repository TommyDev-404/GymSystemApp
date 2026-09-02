import { api } from "../../../lib/axios";

export const getProfileInfoApi = async (userId: number) => {
  const res = await api.get(`/profile/info/${userId}`);
  return res.data;
};

export const updateProfileInfoApi = async (
  userId: number,
  data: {
    username?: string;
    email?: string;
  }
) => {
  const res = await api.patch(`/profile/update-profile-info/${userId}`, data);
  return res.data;
};

export const updateProfileImageApi = async (
  userId: number,
  formData: FormData
) => {
  const res = await api.patch(
    `/profile/update-profile-image/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
