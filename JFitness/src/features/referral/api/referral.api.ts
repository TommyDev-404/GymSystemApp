import { api } from "../../../lib/axios";


export const getMemberReferralDataApi = async (
  memberId: number
) => {
  try {

    const response = await api.get(
      `/referral/${memberId}`
    );

    return response.data;

  } catch (error: any) {

    throw new Error(
      error.response?.data?.message ||
      "Failed to get referral data"
    );

  }
};



export const getMemberReferralRecordsApi = async (
  memberId: number
) => {
  try {

    const response = await api.get(
      `/referral/records/${memberId}`
    );

    return response.data;

  } catch (error: any) {

    throw new Error(
      error.response?.data?.message ||
      "Failed to get referral records"
    );

  }
};