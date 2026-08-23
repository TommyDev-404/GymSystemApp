import { FlatList, View, StyleSheet } from "react-native";
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
import { StackWrapper } from "@/components/shared/StackWrapper";
import {
  useCreateComment,
  useGetMyPosts,
} from "../hooks/useCommunity";

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
    <StackWrapper
      title="Your post"
  		subtitle="Your community activity"
      headerContent={
        <View style={styles.headerWrapper}>
          <YourPostsHeader
            stats={stats}
          />
        </View>
      }
      loading={isLoading}
      loadingMinHeight={400}
      horizontalPadding={0}
      paddingTop={0}
      paddingBottom={24}
      gap={14}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onCommentPress={() => openComments(item)}
          />
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
    </StackWrapper>
  );
}

const styles = StyleSheet.create({
	headerWrapper: {
	  marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderAccent,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
});