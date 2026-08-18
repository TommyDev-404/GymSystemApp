import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Linking,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Play,
  Dumbbell,
  Target,
  ImageOff,
} from "lucide-react-native";
import { theme } from "@/utils/theme";
import { AppBackground } from "@/components/shared/AppBackground";

const { width } = Dimensions.get("window");

function parseArray(value: any): string[] {
  try {
    let result = value;

    while (typeof result === "string") {
      result = JSON.parse(result);
    }

    if (!Array.isArray(result)) {
      return [];
    }

    return result.flatMap((item) =>
      typeof item === "string" && item.startsWith("[")
        ? parseArray(item)
        : item
    );
  } catch {
    return [];
  }
}

function getYoutubeVideoId(url: string) {
  try {
    const urlObj = new URL(url);

    if (urlObj.hostname.includes("youtube.com")) {
      return urlObj.searchParams.get("v");
    }

    if (urlObj.hostname.includes("youtu.be")) {
      return urlObj.pathname.slice(1);
    }

    return null;
  } catch {
    return null;
  }
}

export default function WorkoutTutorialDetails() {
  const { workout } = useLocalSearchParams();

  const [activeImage, setActiveImage] = useState(0);
  const [failedImages, setFailedImages] = useState<number[]>([]);

  const data = workout
    ? JSON.parse(workout as string)
    : null;

  if (!data) {
    return (
      <AppBackground>
        <SafeAreaView style={styles.emptyScreen}>
          <Text style={styles.emptyTitle}>
            No workout found
          </Text>
        </SafeAreaView>
      </AppBackground>
    );
  }

  const muscles = parseArray(data.muscles_targeted);
  const equipment = parseArray(data.equipment);
  const images = parseArray(data.demo_images);

  const videoId = getYoutubeVideoId(data.video_url);

  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  const gallery =
    images.length > 0
      ? images
      : thumbnail
        ? [thumbnail]
        : [];

  return (
    <AppBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.backButtonContainer}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <ArrowLeft
              size={20}
              color="#fff"
              strokeWidth={2.2}
            />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.gallery}>
            <FlatList
              data={gallery}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / width
                );

                setActiveImage(index);
              }}
              keyExtractor={(_, index) =>
                index.toString()
              }
              renderItem={({ item, index }) => {
                const hasError =
                  failedImages.includes(index);

                if (hasError) {
                  return (
                    <View style={styles.imageError}>
                      <ImageOff
                        size={42}
                        color={theme.textMuted}
                        strokeWidth={1.8}
                      />

                      <Text style={styles.imageErrorText}>
                        Image unavailable
                      </Text>
                    </View>
                  );
                }

                return (
                  <Image
                    source={{ uri: item }}
                    onError={() => {
                      setFailedImages((prev) =>
                        prev.includes(index)
                          ? prev
                          : [...prev, index]
                      );
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                );
              }}
            />

            {gallery.length > 1 && (
              <View style={styles.pagination}>
                {gallery.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      activeImage === index
                        ? styles.activeDot
                        : styles.inactiveDot,
                    ]}
                  />
                ))}
              </View>
            )}
          </View>

          <View style={styles.content}>
            <View style={styles.titleRow}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>
                  {data.name}
                </Text>

                <Text style={styles.category}>
                  {data.category}
                  {" • "}
                  {data.level}
                </Text>
              </View>

              <View style={styles.workoutIcon}>
                <Dumbbell
                  size={19}
                  color={theme.primaryLight}
                  strokeWidth={2}
                />
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Dumbbell
                    size={16}
                    color={theme.primaryLight}
                    strokeWidth={2}
                  />
                </View>

                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>
                    Equipment
                  </Text>

                  <Text style={styles.infoValue}>
                    {equipment.join(", ")}
                  </Text>
                </View>
              </View>

              <View style={styles.infoDivider} />

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Target
                    size={16}
                    color={theme.primaryLight}
                    strokeWidth={2}
                  />
                </View>

                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>
                    Target Muscles
                  </Text>

                  <Text style={styles.infoValue}>
                    {muscles.join(", ")}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.instructionsSection}>
              <Text style={styles.sectionTitle}>
                Instructions
              </Text>

              <View style={styles.instructionsCard}>
                <Text style={styles.instructions}>
                  {data.instructions}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <Pressable
            onPress={() =>
              Linking.openURL(data.video_url)
            }
            style={({ pressed }) => [
              styles.youtubeButton,
              pressed && styles.youtubePressed,
            ]}
          >
            <Play
              size={18}
              color="#fff"
              fill="#fff"
              strokeWidth={2}
            />

            <Text style={styles.youtubeText}>
              Watch on YouTube
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },

  scrollContent: {
    paddingBottom: 105,
  },

  backButtonContainer: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15,23,42,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },

  pressed: {
    opacity: 0.75,
  },

  gallery: {
    width,
    height: 320,
    backgroundColor: theme.surface,
  },

  image: {
    width,
    height: 320,
  },

  imageError: {
    width,
    height: 320,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
  },

  imageErrorText: {
    marginTop: 9,
    fontSize: 11,
    color: theme.textMuted,
  },

  pagination: {
    position: "absolute",
    bottom: 18,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  dot: {
    height: 6,
    borderRadius: 999,
  },

  activeDot: {
    width: 21,
    backgroundColor: theme.primaryLight,
  },

  inactiveDot: {
    width: 6,
    backgroundColor: "rgba(255,255,255,0.65)",
  },

  content: {
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 25,
    backgroundColor: "transparent",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  titleContainer: {
    flex: 1,
    marginRight: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.6,
  },

  category: {
    marginTop: 6,
    fontSize: 11.5,
    fontWeight: "700",
    color: theme.primaryLight,
  },

  workoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.18)",
  },

  infoCard: {
    marginTop: 20,
    padding: 13,
    borderRadius: 16,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.16)",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.14)",
  },

  infoContent: {
    flex: 1,
    marginLeft: 11,
  },

  infoLabel: {
    fontSize: 9.5,
    fontWeight: "600",
    color: theme.textMuted,
  },

  infoValue: {
    marginTop: 2,
    fontSize: 11.5,
    fontWeight: "600",
    color: theme.text,
    lineHeight: 17,
  },

  infoDivider: {
    height: 1,
    marginVertical: 11,
    backgroundColor: theme.border,
  },

  instructionsSection: {
    marginTop: 24,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.text,
  },

  instructionsCard: {
    marginTop: 10,
    padding: 14,
    borderRadius: 15,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.14)",
  },

  instructions: {
    fontSize: 12,
    lineHeight: 20,
    color: theme.textMuted,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: theme.bg,
    borderTopWidth: 1,
    borderColor: theme.border,
  },

  youtubeButton: {
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: theme.primaryLight,
  },

  youtubePressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },

  youtubeText: {
    color: "#fff",
    fontSize: 12.5,
    fontWeight: "700",
  },

  emptyScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  emptyTitle: {
    fontSize: 13,
    color: theme.textMuted,
  },
});