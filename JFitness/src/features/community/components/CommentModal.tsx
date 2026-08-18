import React, { useCallback, useMemo, useState } from "react";
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
import { theme } from "@/utils/theme";

function CommentInputBar({
  onSend,
  isPending,
}: {
  onSend: (comment: string) => void;
  isPending?: boolean;
}) {
  const [comment, setComment] = useState("");

  const submit = () => {
    if (!comment.trim() || isPending) return;

    onSend(comment.trim());
    setComment("");
  };

  const disabled = !comment.trim() || isPending;

  return (
    <View style={styles.inputContainer}>
      <BottomSheetTextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Write a comment..."
        placeholderTextColor={theme.textMuted}
        style={styles.input}
        multiline
      />

      <Pressable
        onPress={submit}
        disabled={disabled}
        style={({ pressed }) => [
          styles.sendBtn,
          disabled && styles.sendBtnDisabled,
          pressed && !disabled && styles.pressed,
        ]}
      >
        {isPending ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Send size={18} color="#fff" strokeWidth={2.2} />
        )}
      </Pressable>
    </View>
  );
}

interface Props {
  modalRef: React.RefObject<BottomSheetModal | null>;
  postId: number;
  onClose: () => void;
  enabled: boolean;
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
  enabled,
  onClose,
  onSend,
  isPending = false,
}: Props) {
  const { data: comments = [], isLoading } = useGetComments(postId, {
    enabled: enabled && !!postId,
  });

  const snapPoints = useMemo(() => ["50%"], []);
  const insets = useSafeAreaInsets();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.55}
      />
    ),
    []
  );

  const renderFooter = useCallback(
    (footerProps: BottomSheetFooterProps) => (
      <BottomSheetFooter
        {...footerProps}
        bottomInset={insets.bottom}
      >
        <CommentInputBar
          onSend={onSend}
          isPending={isPending}
        />
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
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MessageCircle
              size={18}
              color={theme.primaryLight}
              strokeWidth={2.2}
            />
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Comments</Text>
            <Text style={styles.subtitle}>
              {comments.length}{" "}
              {comments.length === 1 ? "comment" : "comments"}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator
              size="small"
              color={theme.primary}
            />
            <Text style={styles.loadingText}>
              Loading comments...
            </Text>
          </View>
        ) : (
          <BottomSheetFlatList
            data={comments}
            keyExtractor={(item: Comment) =>
              item.id.toString()
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={styles.list}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.commentRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.author
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </Text>
                </View>

                <View style={styles.commentContent}>
                  <Text style={styles.author}>
                    {item.author}
                  </Text>

                  <View style={styles.commentBox}>
                    <Text style={styles.commentText}>
                      {item.comment}
                    </Text>
                  </View>

                  <Text style={styles.date}>
                    {new Date(item.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.empty}>
                <View style={styles.emptyIcon}>
                  <MessageCircle
                    size={25}
                    color={theme.textMuted}
                    strokeWidth={1.8}
                  />
                </View>

                <Text style={styles.emptyTitle}>
                  No comments yet
                </Text>

                <Text style={styles.emptyText}>
                  Be the first to comment
                </Text>
              </View>
            }
          />
        )}
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: theme.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  handleIndicator: {
    backgroundColor: theme.borderStrong,
    width: 38,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: theme.card,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    gap: 10,
  },

  headerIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: theme.text,
  },

  subtitle: {
    marginTop: 1,
    fontSize: 10,
    color: theme.textMuted,
  },

  divider: {
    height: 1,
    backgroundColor: theme.border,
  },

  list: {
    flex: 1,
  },

  listContent: {
    flexGrow: 1,
    paddingTop: 14,
    paddingBottom: 80,
  },

  commentRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarText: {
    color: theme.primaryLight,
    fontSize: 13,
    fontWeight: "800",
  },

  commentContent: {
    flex: 1,
  },

  author: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
  },

  commentBox: {
    marginTop: 4,
    paddingHorizontal: 11,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  commentText: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.textSub,
  },

  date: {
    marginTop: 4,
    fontSize: 10,
    color: theme.textMuted,
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },

  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "700",
    color: theme.textSub,
  },

  emptyText: {
    marginTop: 4,
    fontSize: 12,
    color: theme.textMuted,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: theme.card,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },

  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    color: theme.text,
    fontSize: 14,
  },

  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.primary,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  sendBtnDisabled: {
    opacity: 0.45,
  },

  pressed: {
    opacity: 0.7,
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  loadingText: {
    fontSize: 12,
    color: theme.textMuted,
  },
});