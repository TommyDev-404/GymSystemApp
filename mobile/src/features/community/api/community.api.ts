import { api } from "@/lib/axios";

export const getPostsApi = async (memberId: number) => {
	try {
		const res = await api.get(`/community/get-posts/${memberId}`);

		return res.data;
	} catch (error:any) {
		console.error("Get posts error:",
			error.response?.data || error.message
		);

		throw error;
	}
};

export const createPostApi = async (member_id: number, formData: FormData) => {
	try {
		const res = await api.post(`/community/post/${member_id}`, formData,
			{
			headers:{
				"Content-Type":"multipart/form-data",
			},
			}
		);

		return res.data;
	} catch(error:any){
		console.error("Create post error:",
			error.response?.data || error.message
		);

		throw error;
	}
};

export const toggleLikeApi = async (post_id:number, member_id:number) => {
	try {
		const res = await api.post(`/community/toggle-like/${member_id}/${post_id}`);

		return res.data;
	} catch(error:any){
		console.error("Toggle like error:",
			error.response?.data || error.message
		);

		throw error;
	}
};

export const createCommentApi = async (post_id:number, member_id:number, comment:string) => {
	try {
		const res = await api.post(`/community/add-comment/${member_id}/${post_id}`, { comment });

		return res.data;
	} catch(error:any){
		console.error("Create comment error:",
			error.response?.data || error.message
		);

		throw error;
	}
};

export const getCommentsApi = async (post_id: number) => {
	try {
		const res = await api.get(`/community/posts/${post_id}/comments`);

		return res.data;
	} catch(error:any){
		console.error("Get comments error:",
			error.response?.data || error.message
		);

		throw error;
	}
};

export const getMyPosts = async (memberId:number) => {
	try {
		const response = await api.get(`/community/get-my-posts/${memberId}`);

		return response.data;
	} catch(error:any){
		console.error("Get my posts error:",
			error.response?.data || error.message
		);

		throw error;
	}
};