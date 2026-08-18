import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { X, ImagePlus, Trash2 } from "lucide-react-native";

import { useCreatePost } from "../hooks/useCommunity";
import { useAuth } from "@/context/AuthContext";
import LoadingOverlay from "@/components/shared/LoadingOverlay";
import { theme } from "@/utils/theme";
import { AppBackground } from "@/components/shared/AppBackground";

const suggestedTags = [
  "Fitness",
  "NoExcuses",
  "MorningRun",
  "LegDay",
  "PR",
  "Cardio",
];

export default function ShareProgressScreen() {
  const { member } = useAuth();
  const { mutate: createPost, isPending } = useCreatePost();

  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [pickingImage, setPickingImage] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handlePickImage = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Allow access to your photos to add images."
      );
      return;
    }

    try {
      setPickingImage(true);

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          quality: 0.8,
          selectionLimit: 10,
        });

      if (!result.canceled) {
        const newImages = result.assets.map(
          (asset) => asset.uri
        );

        setImages((prev) => {
          const unique = [...prev];

          newImages.forEach((img) => {
            if (!unique.includes(img)) {
              unique.push(img);
            }
          });

          return unique;
        });
      }
    } finally {
      setPickingImage(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const canPost = text.trim().length > 0;

  const handlePost = async () => {
    try {
      const formData = new FormData();

      formData.append("content", text);

      images.forEach((image, index) => {
        formData.append("files", {
          uri: image,
          name: `image-${index}.jpg`,
          type: "image/jpeg",
        } as any);
      });

      createPost(
        {
          member_id: member?.memberId!,
          formData,
        },
        {
          onSuccess: () => {
            console.log("Posted successfully.");
            router.back();
          },
        }
      );
    } catch (err) {
      console.log(err);
      Alert.alert(
        "Error",
        "Unable to create post."
      );
    }
  };

  const initials =
    member?.username
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <AppBackground>
      <SafeAreaView
        style={styles.container}
        edges={["top", "bottom"]}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.pressed,
            ]}
          >
            <X
              size={19}
              color={theme.textSub}
              strokeWidth={2.2}
            />
          </Pressable>

          <Text style={styles.headerTitle}>
            Share Progress
          </Text>

          <Pressable
            onPress={handlePost}
            disabled={!canPost}
            style={({ pressed }) => [
              styles.postButton,
              canPost
                ? pressed && styles.postButtonPressed
                : styles.postButtonDisabled,
            ]}
          >
            <Text
              style={[
                styles.postButtonText,
                !canPost && styles.postButtonTextDisabled,
              ]}
            >
              Post
            </Text>
          </Pressable>
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : undefined
          }
          keyboardVerticalOffset={12}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.postCard}>
              <View style={styles.identityRow}>
                <View style={styles.avatar}>
                  {member?.profile ? (
                    <Image
                      source={{
                        uri: member.profile,
                      }}
                      style={styles.avatarImage}
                    />
                  ) : (
                    <Text style={styles.avatarText}>
                      {initials}
                    </Text>
                  )}
                </View>

                <View style={styles.identityInfo}>
                  <Text style={styles.username}>
                    {member?.username || "You"}
                  </Text>

                  <Text style={styles.postingText}>
                    Posting publicly
                  </Text>
                </View>

                <View style={styles.publicBadge}>
                  <View style={styles.publicDot} />

                  <Text style={styles.publicText}>
                    PUBLIC
                  </Text>
                </View>
              </View>

              <TextInput
                value={text}
                onChangeText={setText}
                placeholder="What did you achieve today?"
                placeholderTextColor={theme.textMuted}
                multiline
                autoFocus
                style={styles.textInput}
              />
            </View>

            {images.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                  styles.imageList
                }
              >
                {images.map((image, index) => (
                  <View
                    key={index}
                    style={styles.imageWrapper}
                  >
                    <Image
                      source={{ uri: image }}
                      style={styles.previewImage}
                    />

                    <Pressable
                      onPress={() =>
                        removeImage(index)
                      }
                      style={styles.removeImageButton}
                    >
                      <Trash2
                        size={14}
                        color="#ffffff"
                        strokeWidth={2}
                      />
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            )}

            <Pressable
              onPress={handlePickImage}
              disabled={pickingImage}
              style={({ pressed }) => [
                styles.addPhotosButton,
                pressed && styles.addPhotosPressed,
                pickingImage && styles.pickingImage,
              ]}
            >
              {pickingImage ? (
                <ActivityIndicator
                  size="small"
                  color={theme.primary}
                />
              ) : (
                <ImagePlus
                  size={18}
                  color={theme.primary}
                  strokeWidth={2}
                />
              )}

              <Text style={styles.addPhotosText}>
                {images.length === 0
                  ? "Add Photos"
                  : "Add More Photos"}
              </Text>
            </Pressable>

            <View style={styles.tagsCard}>
              <Text style={styles.tagsTitle}>
                Add tags
              </Text>

              <View style={styles.tagsContainer}>
                {suggestedTags.map((tag) => {
                  const active =
                    selectedTags.includes(tag);

                  return (
                    <Pressable
                      key={tag}
                      onPress={() => toggleTag(tag)}
                      style={({ pressed }) => [
                        styles.tag,
                        active && styles.activeTag,
                        pressed &&
                          !active &&
                          styles.tagPressed,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          active &&
                            styles.activeTagText,
                        ]}
                      >
                        #{tag}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <LoadingOverlay
          visible={isPending}
          title="Posting..."
          message="Uploading your progress"
        />
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.borderStrong,
  },

  headerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.text,
  },

  postButton: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: theme.primary,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  postButtonPressed: {
    backgroundColor: theme.primaryDark,
  },

  postButtonDisabled: {
    backgroundColor: theme.surface3,
    borderColor: theme.border,
  },

  postButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ffffff",
  },

  postButtonTextDisabled: {
    color: theme.textMuted,
  },

  pressed: {
    opacity: 0.7,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 32,
  },

  postCard: {
    margin: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

  identityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    overflow: "hidden",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  avatarText: {
    fontSize: 13,
    fontWeight: "800",
    color: theme.primaryLight,
  },

  identityInfo: {
    flex: 1,
  },

  username: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.text,
  },

  postingText: {
    marginTop: 2,
    fontSize: 11,
    color: theme.textMuted,
  },

  publicBadge: {
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

  publicDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.primaryLight,
  },

  publicText: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: theme.primaryLight,
  },

  textInput: {
    marginTop: 18,
    minHeight: 130,
    fontSize: 16,
    lineHeight: 23,
    color: theme.text,
    textAlignVertical: "top",
    padding: 0,
  },

  imageList: {
    paddingHorizontal: 16,
  },

  imageWrapper: {
    marginRight: 12,
    position: "relative",
  },

  previewImage: {
    width: 140,
    height: 140,
    borderRadius: 14,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.borderStrong,
  },

  removeImageButton: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 27,
    height: 27,
    borderRadius: 9,
    backgroundColor: "rgba(0,0,0,0.72)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  addPhotosButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    borderStyle: "dashed",
  },

  addPhotosPressed: {
    backgroundColor: theme.surface3,
  },

  pickingImage: {
    opacity: 0.6,
  },

  addPhotosText: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.textSub,
  },

  tagsCard: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

  tagsTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: theme.textSub,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 12,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.borderStrong,
  },

  tagPressed: {
    backgroundColor: theme.surface3,
  },

  activeTag: {
    backgroundColor: theme.primary,
    borderColor: theme.borderAccent,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.textSub,
  },

  activeTagText: {
    color: "#ffffff",
  },
});