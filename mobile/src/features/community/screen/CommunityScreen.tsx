import {
  FlatList,
  StatusBar,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useRef,
  useState,
} from "react";

import {
  BottomSheetModal,
} from "@gorhom/bottom-sheet";

import { PostCard } from "../components/PostCard";
import { CommentModal } from "../components/CommentModal";

import { useGetPosts } from "../hooks/useCommunity";
import { useAuth } from "@/context/AuthContext";
import { useCreateComment } from "../hooks/useCommunity"; // example
import { EmptyState } from "@/components/EmptyState";
import { MessageSquareDashed } from "lucide-react-native";
import { Loading } from "@/components/Loading";

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
    if (!selectedPost) return;

    createComment({
      post_id: selectedPost.id,
      member_id: member!.memberId,
      comment,
    });
  };
  

  if (isLoading) return <Loading/>;
  
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#f8fafc",
        }}
        edges={["bottom"]}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#f8fafc"
        />

        <FlatList
          data={posts}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{
            paddingTop: 14,
            paddingBottom: 24,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}

          renderItem={({ item }) => (
            <PostCard
              post={item}
              onCommentPress={() => openComments(item)}
            />
          )}

          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
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

      {posts && posts.length > 0 && 
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
      }
    </>
  );
}

