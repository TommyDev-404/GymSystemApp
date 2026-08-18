import {
  FlatList,
  StatusBar,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { MessageSquareDashed } from "lucide-react-native";

import { AppBackground } from "@/components/shared/AppBackground";
import { EmptyState } from "@/components/shared/EmptyState";
import { Loading } from "@/components/shared/Loading";

import { PostCard } from "../components/PostCard";
import { CommentModal } from "../components/CommentModal";

import {
  useCreateComment,
  useGetPosts,
} from "../hooks/useCommunity";

import { useAuth } from "@/context/AuthContext";
import { theme } from "@/utils/theme";

export function CommunityScreen() {
	const { member } = useAuth();

	const { data: posts = [], isLoading } = useGetPosts(member?.memberId!);
	const { mutate: createComment, isPending } = useCreateComment();

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
		if (!selectedPost || !member?.memberId) {
			return;
		}

		createComment({
			post_id: selectedPost.id,
			member_id: member.memberId,
			comment,
		});
	};

	if (isLoading) {
		return (
			<AppBackground>
				<SafeAreaView
					style={{ flex: 1 }}
					edges={["bottom"]}
				>
					<Loading />
				</SafeAreaView>
			</AppBackground>
		);
	}

	return (
		<AppBackground>
			<SafeAreaView
				style={{ flex: 1 }}
				edges={["bottom"]}
			>
				<FlatList
					data={posts}
					keyExtractor={(item) => String(item.id)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingTop: 14,
						paddingBottom: 24,
						paddingHorizontal: 16,
						flexGrow: 1,
					}}
					renderItem={({ item }) => (
						<PostCard
							post={item}
							onCommentPress={() =>
								openComments(item)
							}
						/>
					)}
					ListEmptyComponent={
						<View
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								paddingHorizontal: 20,
							}}
						>
							<EmptyState
								icon={MessageSquareDashed}
								title="No posts yet"
								subtitle="Be the first to share something with the community. Your post could inspire others!"
							/>
						</View>
					}
				/>
			</SafeAreaView>

			{posts.length > 0 && (
				<CommentModal
					modalRef={commentModalRef}
					postId={selectedPost?.id}
					enabled={commentsOpen}
					onClose={() => {
						setCommentsOpen(false);
						setSelectedPost(null);
					}}
					onSend={handleSendComment}
					isPending={isPending}
				/>
			)}
		</AppBackground>
	);
}