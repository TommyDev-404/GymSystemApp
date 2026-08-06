import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetTextInput,
  BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Send, MessageCircle } from "lucide-react-native";
import { useGetComments } from "../hooks/useCommunity";

const GREEN = "#10b981";

function CommentInputBar({
  onSend,
  isPending,
}: {
  onSend: (comment: string) => void;
  isPending?: boolean;
}) {
  const [comment, setComment] = useState("");

  const submit = () => {
    if (!comment.trim()) return;

    onSend(comment.trim());
    setComment("");
  };

  return (
    <View style={styles.inputContainer}>
      <BottomSheetTextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Write a comment..."
        placeholderTextColor="#94a3b8"
        style={styles.input}
        multiline
      />

      <Pressable
        onPress={submit}
        disabled={isPending || !comment.trim()}
        style={[
          styles.sendBtn,
          { opacity: !comment.trim() || isPending ? 0.5 : 1 },
        ]}
      >
        {isPending ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Send size={18} color="white" />
        )}
      </Pressable>
    </View>
  );
}

interface Props {
  modalRef: React.RefObject<BottomSheetModal | null>;
  postId: number;
  onClose: () => void;
  onSend: (comment: string) => void;
  isPending?: boolean;
}

type Comment = {
	id: number;
	author: string;
	comment: string;
	date: string;
};

export function CommentModal({
  modalRef,
  postId,
  onClose,
  onSend,
  isPending = false,
}: Props) {
	const { data: comments = [], isLoading } = useGetComments(postId);

	const snapPoints = useMemo(() => ["50%"], []);
	const insets = useSafeAreaInsets();

	const renderBackdrop = useCallback(
		(props: any) => (
		<BottomSheetBackdrop
			{...props}
			appearsOnIndex={0}
			disappearsOnIndex={-1}
			opacity={0.5}
		/>
		),
		[]
	);

	const renderFooter = useCallback(
		(footerProps: BottomSheetFooterProps) => (
		<BottomSheetFooter {...footerProps} bottomInset={insets.bottom}>
			<CommentInputBar onSend={onSend} isPending={isPending} />
		</BottomSheetFooter>
		),
		[insets.bottom, onSend, isPending]
	);

	return (
		<BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      footerComponent={renderFooter}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      onDismiss={onClose}
		>
		<View style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<MessageCircle size={20} color={GREEN} />
				<Text style={styles.title}>Comments</Text>
			</View>

			<BottomSheetFlatList
				data={comments}
				keyExtractor={(item: Comment) => item.id.toString()}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				style={styles.list}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => (
          <View style={styles.commentRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
              {item.author?.charAt(0)?.toUpperCase()}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.author}>{item.author}</Text>

              <View style={styles.commentBox}>
                <Text style={styles.commentText}>{item.comment}</Text>
              </View>

              <Text style={styles.date}>{new Date(item.date).toLocaleDateString('en-Us', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
            </View>
          </View>
        )}
          
        ListEmptyComponent={
          <View style={styles.empty}>
            <MessageCircle size={50} color="#cbd5e1" />
            <Text style={styles.emptyTitle}>No comments yet</Text>
            <Text style={styles.emptyText}>Be the first to comment</Text>
          </View>
				}
			/>
		</View>
		</BottomSheetModal>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
  },

  list: {
    flex: 1,
  },

  listContent: {
    flexGrow: 1,
    // clears the footer's resting height so the last comment
    // isn't hidden underneath the input bar
    paddingBottom: 74,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "700",
    color: "#475569",
  },

  emptyText: {
    marginTop: 5,
    color: "#94a3b8",
    fontSize: 13,
  },

  commentRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ecfdf5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarText: {
    color: GREEN,
    fontWeight: "700",
  },

  author: {
    fontWeight: "700",
    fontSize: 13,
    color: "#0f172a",
  },

  commentBox: {
    backgroundColor: "#f1f5f9",
    padding: 10,
    borderRadius: 12,
    marginTop: 4,
  },

  commentText: {
    fontSize: 14,
    color: "#334155",
  },

  date: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 4,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#f1f5f9",
    backgroundColor: "#ffffff",
  },

  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 100,
    backgroundColor: "#f8fafc",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    color: "#0f172a",
  },

  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
});