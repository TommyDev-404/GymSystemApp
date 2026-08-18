import {
	FlatList,
	StatusBar,
	View,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MessageSquareDashed } from "lucide-react-native";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { useAuth } from "@/context/AuthContext";
import { theme } from "@/utils/theme";

import { PostCard } from "../components/PostCard";
import { YourPostsHeader } from "../components/YourPostsHeader";
import { CommentModal } from "../components/CommentModal";

import { EmptyState } from "@/components/shared/EmptyState";
import { Loading } from "@/components/shared/Loading";

import {
	useCreateComment,
	useGetMyPosts,
} from "../hooks/useCommunity";
import { AppBackground } from "@/components/shared/AppBackground";


export function YourPostsScreen() {
	const { member } = useAuth();

	const { data: postsData, isLoading } = useGetMyPosts(member?.memberId!);
	const { mutate: createComment, isPending } = useCreateComment();

	const posts = postsData?.posts ?? [];

	const stats = postsData?.stats ?? {
		totalPosts: 0,
		totalLikes: 0,
		totalComments: 0,
	};

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
		<AppBackground>
			<SafeAreaView
				style={styles.container}
				edges={["top", "bottom"]}
			>

			<View style={styles.headerWrapper}>
				<YourPostsHeader
					onBack={() => router.back()}
					stats={stats}
				/>
			</View>

			{isLoading ? (
				<Loading text="Loading your posts..." />
			) : (
				<FlatList
					data={posts}
					keyExtractor={(item) => String(item.id)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.listContent}
					renderItem={({ item }) => (
						<View style={styles.postWrapper}>
							<PostCard
							post={item}
							onCommentPress={() =>
								openComments(item)
							}
							/>
						</View>
					)}
					ListEmptyComponent={
						<View style={styles.emptyContainer}>
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
				setCommentsOpen(false);
				setSelectedPost(null);
				}}
				onSend={handleSendComment}
				isPending={isPending}
			/>
			</SafeAreaView>
		</AppBackground>
	);
}

const styles = StyleSheet.create({
container: {
	flex: 1,
},

headerWrapper: {
	borderBottomWidth: 1,
	borderBottomColor: theme.borderAccent,
},

listContent: {
	flexGrow: 1,
	paddingBottom: 24,
	paddingHorizontal: 20
},

postWrapper: {
	paddingTop: 14,
},

emptyContainer: {
	flex: 1,
	alignItems: "center",
	justifyContent: "center",
	paddingHorizontal: 24,
},
});