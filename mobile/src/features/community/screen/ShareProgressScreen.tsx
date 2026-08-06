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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { X, ImagePlus, Trash2 } from "lucide-react-native";
import { useCreatePost } from "../hooks/useCommunity";
import { useAuth } from "@/context/AuthContext";
import LoadingOverlay from "@/components/LoadingOverlay";

const GREEN = "#10b981";
const suggestedTags = ["Fitness", "NoExcuses", "MorningRun", "LegDay", "PR", "Cardio"];

export default function ShareProgressScreen() {
  const { member } = useAuth();
  const { mutate: createPost, isPending } = useCreatePost();

  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [pickingImage, setPickingImage] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
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
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 10,
      });
  
      if (!result.canceled) {
        const newImages = result.assets.map((asset) => asset.uri);
  
        setImages((prev) => {
          const unique = [...prev];
  
          newImages.forEach((img) => {
            if (!unique.includes(img)) unique.push(img);
          });
  
          return unique;
        });
      }
    } finally {
      setPickingImage(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
      
      createPost({
        member_id: member?.memberId!,
        formData,
      },
      {
        onSuccess: () => {
          console.log("Posted successfully.");
          router.back();
        }
      });

    } catch (err) {
        console.log(err);
        Alert.alert("Error", "Unable to create post.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#f1f5f9",
        }}
      >
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <X size={22} color="#334155" />
        </Pressable>

        <Text style={{ fontSize: 15, fontWeight: "700", color: "#0f172a" }}>
          Share Progress
        </Text>

        <Pressable
          onPress={handlePost}
          disabled={!canPost}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 7,
            borderRadius: 999,
            backgroundColor: canPost ? GREEN : "#e2e8f0",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "700",
              color: canPost ? "#fff" : "#94a3b8",
            }}
          >
            Post
          </Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={12}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* IDENTITY */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 16,
              paddingTop: 16,
            }}
          >
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: "#ecfdf5",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "700", color: GREEN }}>YA</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#0f172a" }}>
                You
              </Text>
              <Text style={{ fontSize: 12, color: "#94a3b8" }}>Posting publicly</Text>
            </View>
          </View>

          {/* TEXT INPUT */}
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="What did you achieve today?"
            placeholderTextColor="#94a3b8"
            multiline
            autoFocus
            style={{
              fontSize: 16,
              color: "#0f172a",
              lineHeight: 22,
              paddingHorizontal: 16,
              paddingTop: 16,
              minHeight: 120,
              textAlignVertical: "top",
            }}
          />

          {/* IMAGE PREVIEW */}
          {images.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 12,
              }}
            >
              {images.map((image, index) => (
                <View
                  key={index}
                  style={{
                    marginRight: 12,
                    position: "relative",
                  }}
                >
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: 14,
                      backgroundColor: "#f1f5f9",
                    }}
                  />

                  <Pressable
                    onPress={() => removeImage(index)}
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: "rgba(0,0,0,.55)",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Trash2 size={14} color="#fff" />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          )}

          <Pressable
            onPress={handlePickImage}
            disabled={pickingImage}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginHorizontal: 16,
              marginTop: 16,
              paddingVertical: 12,
              paddingHorizontal: 14,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#e2e8f0",
              borderStyle: "dashed",
              opacity: pickingImage ? 0.6 : 1,
            }}
          >
            {pickingImage ? (
              <ActivityIndicator size="small" color={GREEN} />
            ) : (
              <ImagePlus size={18} color={GREEN} />
            )}

            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: "#475569",
              }}
            >
              {images.length === 0 ? "Add Photos" : "Add More Photos"}
            </Text>
          </Pressable>

          {/* TAGS */}
          <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: 0.6,
                marginBottom: 10,
              }}
            >
              Add tags
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {suggestedTags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <Pressable
                    key={tag}
                    onPress={() => toggleTag(tag)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 7,
                      borderRadius: 999,
                      backgroundColor: active ? GREEN : "#f8fafc",
                      borderWidth: 1,
                      borderColor: active ? GREEN : "#e2e8f0",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: active ? "#fff" : "#475569",
                      }}
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
  );
}