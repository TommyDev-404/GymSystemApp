import { api } from "../../../lib/axios";

export const getMemberAttendanceHistoryApi = async (
  memberId: number
) => {
  try {
    const res = await api.get(
      `/home/member-attendance/${memberId}`
    );

    return res.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch attendance history"
    );
  }
};