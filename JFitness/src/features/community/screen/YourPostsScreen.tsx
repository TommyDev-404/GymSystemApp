import {
	FlatList,
	StatusBar,
	View,
	Text,
 } from "react-native";
 
 import {
	SafeAreaView,
 } from "react-native-safe-area-context";
 
 import {
	MessageSquareDashed,
	ChevronLeft,
	Heart,
	MessageCircle,
	FileText,
 } from "lucide-react-native";
 

 import {
	useAuth,
 } from "@/context/AuthContext";
 
 import {
	PostCard,
 } from "../components/PostCard";
 
 import {
	EmptyState,
 } from "@/components/shared/EmptyState";
 
import { useCreateComment, useGetMyPosts } from "../hooks/useCommunity";
import { Loading } from "@/components/shared/Loading";
import { router } from "expo-router";
import { YourPostsHeader } from "../components/YourPostsHeader";
import { useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CommentModal } from "../components/CommentModal";

 
export function YourPostsScreen() {
	const { member } = useAuth();
	const { data: postsData, isLoading } = useGetMyPosts(member?.memberId!);

	const { mutate: createComment, isPending } = useCreateComment();

	const posts = postsData?.posts ?? [];
	const stats = postsData?.stats ?? { totalPosts: 0, totalLikes: 0, totalComments: 0 };

	const commentModalRef = useRef<BottomSheetModal>(null);
	const [selectedPost, setSelectedPost] = useState<any>(null);
	
	const [commentsOpen, setCommentsOpen] = useState(false);

	const openComments = (post: any) => {
		setSelectedPost(post);
		setCommentsOpen(true);
	 
		setTimeout(() => {
		  commentModalRef.current?.present();
		}, 100);
	 };

	const handleSendComment = (comment: string) => {
		if (!selectedPost) return;

		createComment({
			post_id: selectedPost.id,
			member_id: member!.memberId,
			comment,
		});
	};

	
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#f8fafc",
			}}
		>
			<StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

			<YourPostsHeader onBack={() => router.back()} stats={stats} />

			{isLoading ? (
				<Loading text="Loading your posts..." />
			) : (
				<FlatList
					data={posts}
					keyExtractor={(item) => String(item.id)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						flexGrow: 1,
						paddingBottom: 24,
					}}
					renderItem={({ item }) => (
						<View style={{ paddingTop: 14 }}>
							<PostCard
								post={item}
								onCommentPress={() => openComments(item)}
							/>
						</View>
					)}
					ListEmptyComponent={
						<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							paddingHorizontal: 24,
						}}
						>
						<EmptyState
							icon={MessageSquareDashed}
							title="No posts yet"
							subtitle="You haven't shared anything with the community."
						/>
						</View>
					}
				/>
			)}

			<CommentModal
				enabled={commentsOpen}
				modalRef={commentModalRef}
				postId={selectedPost?.id}
				onClose={() => {
					setSelectedPost(null);
				}}
				onSend={handleSendComment}
				isPending={isPending}
			/>
		</SafeAreaView>
	);
}