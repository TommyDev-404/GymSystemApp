import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "@/features/community/api/community.api";

export const useGetPosts = (memberId: number) => {
	return useQuery({
		queryKey: ["community-posts"],
		queryFn: () => api.getPostsApi(memberId),
		enabled: !!memberId
	});
};

export const useGetComments = (post_id: number, options?: {
	enabled?: boolean;
}) => {
	return useQuery({
		queryKey: ["community-comments", post_id],
		queryFn: () => api.getCommentsApi(post_id),
		enabled: options?.enabled ?? true,
	});
};

export const useGetMyPosts = (memberId:number)=>{
	return useQuery({
		queryKey:["my-posts", memberId],
		queryFn: () => api.getMyPosts(memberId),
		enabled: !!memberId
	});
};

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ member_id, formData }: { member_id: number, formData: FormData }) =>
			api.createPostApi(member_id, formData),

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["community-posts"],
			});

			queryClient.invalidateQueries({
				queryKey: ["my-posts", variables.member_id],
			});

			queryClient.invalidateQueries({
				queryKey: ["tab-badges", variables.member_id],
			});
		},
	});
};

export const useToggleLike = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn:({ post_id, member_id }:{ post_id:number, member_id:number  }) =>
			api.toggleLikeApi(post_id, member_id),

		onSuccess:(_, variables)=>{
			queryClient.invalidateQueries({
				queryKey:["community-posts"]
			});

			queryClient.invalidateQueries({
				queryKey:["my-posts", variables.member_id]
			});
		}
	});
};

export const useCreateComment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn:({ post_id, member_id, comment }:{ post_id:number, member_id:number, comment:string }) =>
			api.createCommentApi(post_id, member_id, comment),

		onSuccess:(_, variables)=>{
			queryClient.invalidateQueries({
				queryKey:["community-comments", variables.post_id]
			});

			queryClient.invalidateQueries({
				queryKey:["community-posts"]
			});
			
			queryClient.invalidateQueries({
				queryKey:["my-posts", variables.member_id]
			});
		}
	});
};