import { api } from "@/lib/axios";

export const getPostsApi = async (memberId: number) => {
  const res = await api.get(`/community/get-posts/${memberId}`);
  return res.data;
};

export const getCommentsApi = async (post_id: number) => {
  const res = await api.get(`/community/posts/${post_id}/comments`);
  return res.data;
};

export const getMyPosts = async (memberId: number) => {
  const response = await api.get(`/community/get-my-posts/${memberId}`);
  return response.data;
};

export const createPostApi = async (member_id: number, formData: FormData) => {
  const res = await api.post(`/community/post/${member_id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const toggleLikeApi = async (post_id: number, member_id: number) => {
  const res = await api.post(`/community/toggle-like/${member_id}/${post_id}`);
  return res.data;
};

export const createCommentApi = async (
  post_id: number,
  member_id: number,
  comment: string
) => {
  const res = await api.post(
    `/community/add-comment/${member_id}/${post_id}`,
    { comment }
  );
  return res.data;
};
