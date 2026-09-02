import { useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { MessageSquareDashed } from "lucide-react-native";
import { TabWrapper } from "@/components/shared/TabWrapper";
import { EmptyState } from "@/components/shared/EmptyState";
import { PostCard } from "../components/PostCard";
import { CommentModal } from "../components/CommentModal";
import {
  useCreateComment,
  useGetPosts,
} from "../hooks/useCommunity";
import { useAuth } from "@/context/AuthContext";

export function CommunityScreen() {
  const { memberIDs } = useAuth();
  const { data: posts = [], isLoading } = useGetPosts(memberIDs?.member_id!);
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
    if (!selectedPost || !memberIDs?.member_id) {
      return;
    }

    createComment({
      post_id: selectedPost.id,
      member_id: memberIDs.member_id,
      comment,
    });
  };

  return (
    <TabWrapper
      loading={isLoading}
      loadingMinHeight={400}
      useScrollView={false}
      horizontalPadding={0}
      paddingTop={0}
      paddingBottom={0}
      gap={0}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
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
              subtitle="Be the first to share something with the community. Your post could inspire others!"
            />
          </View>
        }
      />

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
    </TabWrapper>
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});