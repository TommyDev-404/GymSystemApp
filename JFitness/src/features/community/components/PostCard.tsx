import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Modal,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import {
  X,
  Heart,
  ImageOff,
  MessageCircle,
} from "lucide-react-native";
import { useToggleLike } from "../hooks/useCommunity";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/utils/theme";

const { width, height } = Dimensions.get("window");

export function PostCard({ post, onCommentPress }: any) {
  const { member } = useAuth();
  const { mutate: toggleLikeApi } = useToggleLike();
  const imageViewerRef = useRef<ScrollView>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.like);

  const toggleLike = () => {
    const newLiked = !liked;

    setLiked(newLiked);
    setLikeCount((prev: number) =>
      newLiked ? prev + 1 : prev - 1
    );

    toggleLikeApi(
      {
        post_id: post.id,
        member_id: member!.memberId,
      },
      {
        onSuccess: () => {
          console.log("Like toggled successfully");
        },
        onError: () => {
          setLiked(!newLiked);
          setLikeCount((prev: number) =>
            newLiked ? prev - 1 : prev + 1
          );
        },
      }
    );
  };

  const openImage = (index: number) => {
    setSelectedImage(index);

    setTimeout(() => {
      imageViewerRef.current?.scrollTo({
        x: index * width,
        animated: false,
      });
    }, 100);
  };

  const handleImageScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / (width - 34)
    );

    setCurrentImage(index);
  };

  const initials =
    post.author
      ?.split(" ")
      .map((name: string) => name[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={styles.authorInfo}>
          <Text
            style={styles.author}
            numberOfLines={1}
          >
            {post.author}
          </Text>

          <Text style={styles.date}>
            {new Date(post.date).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            )}
          </Text>
        </View>

        <View style={styles.memberBadge}>
          <View style={styles.badgeDot} />
          <Text style={styles.memberBadgeText}>
            MEMBER
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>
          {post.content}
        </Text>
      </View>

      {post.images?.length > 0 ? (
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleImageScroll}
          >
            {post.images.map(
              (image: string, index: number) => (
                <Pressable
                  key={index}
                  onPress={() => openImage(index)}
                >
                  <Image
                    source={{ uri: image }}
                    style={styles.postImage}
                    resizeMode="cover"
                  />
                </Pressable>
              )
            )}
          </ScrollView>

          {post.images.length > 1 && (
            <View style={styles.imageIndicator}>
              <Text style={styles.imageIndicatorText}>
                {currentImage + 1} / {post.images.length}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.noImage}>
          <View style={styles.noImageIcon}>
            <ImageOff
              size={21}
              color={theme.textMuted}
            />
          </View>

          <Text style={styles.noImageText}>
            No images
          </Text>
        </View>
      )}

      {(likeCount > 0 || post.comment > 0) && (
        <View style={styles.counts}>
          {likeCount > 0 && (
            <View style={styles.countItem}>
              <Heart
                size={13}
                color={theme.primary}
                fill={theme.primary}
              />

              <Text style={styles.countText}>
                {likeCount}{" "}
                {likeCount === 1 ? "like" : "likes"}
              </Text>
            </View>
          )}

          {post.comment > 0 && (
            <View style={styles.countItem}>
              <MessageCircle
                size={13}
                color={theme.textSub}
              />

              <Text style={styles.countText}>
                {post.comment}{" "}
                {post.comment === 1
                  ? "comment"
                  : "comments"}
              </Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.actions}>
        <ActionButton
          icon={Heart}
          label="Like"
          active={liked}
          onPress={toggleLike}
        />

        <ActionButton
          icon={MessageCircle}
          label="Comment"
          onPress={onCommentPress}
        />
      </View>

      <Modal
        visible={selectedImage !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.imageViewer}>
          <Pressable
            onPress={() => setSelectedImage(null)}
            style={({ pressed }) => [
              styles.viewerClose,
              pressed && styles.pressed,
            ]}
          >
            <X
              size={23}
              color={theme.text}
              strokeWidth={2.2}
            />
          </Pressable>

          <ScrollView
            ref={imageViewerRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {post.images?.map(
              (image: string, index: number) => (
                <View
                  key={index}
                  style={styles.viewerPage}
                >
                  <Image
                    source={{ uri: image }}
                    style={styles.viewerImage}
                    resizeMode="contain"
                  />
                </View>
              )
            )}
          </ScrollView>

          {post.images?.length > 1 && (
            <View style={styles.imageCounter}>
              <Text style={styles.imageCounterText}>
                {selectedImage !== null
                  ? selectedImage + 1
                  : 1}{" "}
                / {post.images.length}
              </Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

function ActionButton({
  icon: Icon,
  label,
  active,
  onPress,
}: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        pressed && styles.actionPressed,
      ]}
    >
      <Icon
        size={18}
        color={
          active
            ? theme.primaryLight
            : theme.textSub
        }
        fill={
          active
            ? theme.primary
            : "transparent"
        }
        strokeWidth={2}
      />

      <Text
        style={[
          styles.actionLabel,
          active && styles.actionLabelActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
    borderRadius: 17,
    overflow: "hidden",
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 11,
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  avatarText: {
    fontSize: 13,
    fontWeight: "800",
    color: theme.primaryLight,
  },
  authorInfo: {
    flex: 1,
  },
  author: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.text,
  },
  date: {
    marginTop: 2,
    fontSize: 11,
    color: theme.textMuted,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.primaryLight,
  },
  memberBadgeText: {
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.6,
    color: theme.primaryLight,
  },
  content: {
    paddingHorizontal: 14,
    paddingBottom: 13,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 21,
    color: theme.text,
  },
  imageContainer: {
    position: "relative",
  },
  postImage: {
    width: width - 34,
    height: 260,
    backgroundColor: theme.surface,
  },
  imageIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.65)",
  },
  imageIndicatorText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  noImage: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.border,
  },
  noImageIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface3,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  noImageText: {
    marginTop: 6,
    fontSize: 11,
    color: theme.textMuted,
  },
  counts: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  countItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  countText: {
    fontSize: 11,
    color: theme.textSub,
  },
  actions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: theme.borderAccent,
    backgroundColor: theme.surface,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
  },
  actionPressed: {
    backgroundColor: theme.surface3,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.textSub,
  },
  actionLabelActive: {
    color: theme.primaryLight,
  },
  pressed: {
    opacity: 0.7,
  },
  imageViewer: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  viewerClose: {
    position: "absolute",
    top: 54,
    right: 18,
    zIndex: 20,
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  viewerPage: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  viewerImage: {
    width,
    height: height * 0.8,
  },
  imageCounter: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  imageCounterText: {
    fontSize: 11,
    fontWeight: "600",
    color: theme.textSub,
  },
});