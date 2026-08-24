import React, { useMemo, useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Play,
  Dumbbell,
  Target,
  ImageOff,
  ChevronRight,
} from "lucide-react-native";
import { theme } from "@/utils/theme";
import { useWorkoutInfo } from "../../hook/useWorkout";
import { StackWrapper } from "@/components/shared/StackWrapper";

const { width } = Dimensions.get("window");
const HERO_HEIGHT = 330;

interface WorkoutData {
  name?: string;
  category?: string;
  level?: string;
  muscles_targeted?: string | string[];
  equipment?: string | string[];
  demo_images?: string | string[];
  video_url?: string;
  instructions?: string;
}

function parseArray(value: unknown): string[] {
  try {
    let result: unknown = value;

    while (typeof result === "string") {
      result = JSON.parse(result);
    }

    if (!Array.isArray(result)) return [];

    return result.flatMap((item) => {
      if (typeof item === "string" && item.startsWith("[")) {
        return parseArray(item);
      }

      return typeof item === "string" ? [item] : [];
    });
  } catch {
    return [];
  }
}

function getYoutubeVideoId(url?: string): string | null {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1);
    }

    return null;
  } catch {
    return null;
  }
}

export default function WorkoutTutorialDetails() {
  const { workout, workoutId, fetch } =
    useLocalSearchParams<{
      workout?: string;
      workoutId?: string;
      fetch?: "true" | "false";
    }>();

  const shouldFetch = fetch === "true" && !!workoutId;

  const { data: workoutInfo } = useWorkoutInfo(
    shouldFetch ? Number(workoutId) : undefined
  );

  const [activeImage, setActiveImage] = useState(0);
  const [failedImages, setFailedImages] = useState<number[]>([]);

  const workoutData: WorkoutData | null = useMemo(() => {
    if (shouldFetch) {
      return workoutInfo ?? null;
    }

    if (workout) {
      try {
        return JSON.parse(workout);
      } catch {
        return null;
      }
    }

    return null;
  }, [shouldFetch, workoutInfo, workout]);

  if (!workoutData) {
    return (
      <StackWrapper
        title="Workout"
        showDefaultHeader={false}
        horizontalPadding={0}
        paddingTop={0}
        paddingBottom={0}
        gap={0}
      >
        <View style={styles.emptyScreen}>
          <View style={styles.emptyIcon}>
            <Dumbbell
              size={24}
              color={theme.primaryLight}
              strokeWidth={2}
            />
          </View>

          <Text style={styles.emptyTitle}>No workout found</Text>

          <Text style={styles.emptySubtitle}>
            This workout could not be loaded.
          </Text>

          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.emptyButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.emptyButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </StackWrapper>
    );
  }

  const muscles = parseArray(workoutData.muscles_targeted);
  const equipment = parseArray(workoutData.equipment);
  const images = parseArray(workoutData.demo_images);

  const videoId = getYoutubeVideoId(workoutData.video_url);

  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  const gallery =
    images.length > 0 ? images : thumbnail ? [thumbnail] : [];

  const openYoutube = () => {
    if (workoutData.video_url) {
      Linking.openURL(workoutData.video_url);
    }
  };

  return (
    <StackWrapper
      title={workoutData.name ?? "Workout"}
      showDefaultHeader={false}
      horizontalPadding={0}
      paddingTop={0}
      paddingBottom={0}
      gap={0}
    >
      <View style={styles.screen}>
        <View style={styles.gallery}>
          {gallery.length > 0 ? (
            <FlatList
              data={gallery}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              onMomentumScrollEnd={(event) => {
                setActiveImage(
                  Math.round(
                    event.nativeEvent.contentOffset.x / width
                  )
                );
              }}
              renderItem={({ item, index }) => {
                if (failedImages.includes(index)) {
                  return (
                    <View style={styles.imageError}>
                      <ImageOff
                        size={44}
                        color={theme.textMuted}
                        strokeWidth={1.7}
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
                    style={styles.image}
                    resizeMode="cover"
                    onError={() => {
                      setFailedImages((prev) =>
                        prev.includes(index)
                          ? prev
                          : [...prev, index]
                      );
                    }}
                  />
                );
              }}
            />
          ) : (
            <View style={styles.imageError}>
              <ImageOff
                size={44}
                color={theme.textMuted}
                strokeWidth={1.7}
              />
              <Text style={styles.imageErrorText}>
                No workout image
              </Text>
            </View>
          )}

          <LinearGradient
            pointerEvents="none"
            colors={[
              "rgba(109,24,37,0.04)",
              "rgba(109,24,37,0.12)",
              "rgba(109,24,37,0.68)",
              "rgba(109,24,37,0.98)",
            ]}
            locations={[0, 0.34, 0.70, 1]}
            style={styles.heroGradient}
          />

          <View style={styles.topBar}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.pressed,
              ]}
            >
              <ArrowLeft
                size={21}
                color="#fff"
                strokeWidth={2.3}
              />
            </Pressable>
          </View>

          <View style={styles.heroContent}>
            <View style={styles.badges}>
              {workoutData.category && (
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>
                    {workoutData.category}
                  </Text>
                </View>
              )}

              {workoutData.level && (
                <View style={styles.levelBadge}>
                  <Text style={styles.levelBadgeText}>
                    {workoutData.level}
                  </Text>
                </View>
              )}
            </View>

            <Text
              style={styles.title}
              numberOfLines={2}
            >
              {workoutData.name}
            </Text>
          </View>

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

        <ScrollView
          style={styles.infoScroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.introRow}>
              <View style={styles.introIcon}>
                <Dumbbell
                  size={20}
                  color={theme.primaryLight}
                  strokeWidth={2}
                />
              </View>

              <View style={styles.introText}>
                <Text style={styles.introLabel}>
                  WORKOUT TUTORIAL
                </Text>

                <Text style={styles.introDescription}>
                  Follow the proper technique and form for this
                  exercise.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionEyebrow}>
                EQUIPMENT
              </Text>

              {equipment.length > 0 ? (
                <View style={styles.equipmentList}>
                  {equipment.map((item, index) => (
                    <View
                      key={`${item}-${index}`}
                      style={styles.equipmentItem}
                    >
                      <View style={styles.equipmentIcon}>
                        <Dumbbell
                          size={15}
                          color={theme.primaryLight}
                          strokeWidth={2}
                        />
                      </View>

                      <Text style={styles.equipmentText}>
                        {item}
                      </Text>

                      <ChevronRight
                        size={15}
                        color={theme.textMuted}
                      />
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.mutedText}>
                  No equipment required
                </Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionEyebrow}>
                TARGET MUSCLES
              </Text>

              {muscles.length > 0 ? (
                <View style={styles.muscleChips}>
                  {muscles.map((muscle, index) => (
                    <View
                      key={`${muscle}-${index}`}
                      style={styles.muscleChip}
                    >
                      <Target
                        size={13}
                        color={theme.primaryLight}
                        strokeWidth={2}
                      />

                      <Text style={styles.muscleText}>
                        {muscle}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.mutedText}>
                  No target muscles specified
                </Text>
              )}
            </View>

            <View style={styles.instructionsSection}>
              <Text style={styles.sectionEyebrow}>
                HOW TO PERFORM
              </Text>

              <Text style={styles.instructions}>
                {workoutData.instructions ||
                  "Follow proper form and controlled movement throughout the exercise."}
              </Text>
            </View>
          </View>
        </ScrollView>

        {workoutData.video_url && (
          <View style={styles.bottomBar}>
            <Pressable
              onPress={openYoutube}
              style={({ pressed }) => [
                styles.youtubeButton,
                pressed && styles.youtubePressed,
              ]}
            >
              <View style={styles.youtubeIcon}>
                <Play
                  size={16}
                  color="#fff"
                  fill="#fff"
                  strokeWidth={2}
                />
              </View>

              <View style={styles.youtubeContent}>
                <Text style={styles.youtubeLabel}>
                  VIDEO TUTORIAL
                </Text>

                <Text style={styles.youtubeText}>
                  Watch on YouTube
                </Text>
              </View>

              <ChevronRight
                size={19}
                color="#fff"
                strokeWidth={2.2}
              />
            </Pressable>
          </View>
        )}
      </View>
    </StackWrapper>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gallery: {
    width,
    height: HERO_HEIGHT,
    position: "relative",
    backgroundColor: theme.surface,
    overflow: "hidden",
  },
  image: {
    width,
    height: HERO_HEIGHT,
  },
  heroGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: HERO_HEIGHT,
  },
  topBar: {
    position: "absolute",
    top: 15,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    zIndex: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(109,24,37,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  titleContainer: {
    flex: 1,
    marginLeft: 11,
    minHeight: 42,
    paddingHorizontal: 14,
    paddingVertical: 9,
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "rgba(109,24,37,0.68)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  heroContent: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 30,
  },
  
  badges: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 9,
  },
  
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: theme.primaryLight,
  },
  
  categoryBadgeText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
  },
  
  levelBadgeText: {
    fontSize: 9.5,
    fontWeight: "700",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  
  title: {
    fontSize: 29,
    lineHeight: 34,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.8,
  },

  topTitle: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.2,
  },
  pagination: {
    position: "absolute",
    bottom: 15,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    height: 5,
    borderRadius: 999,
  },
  activeDot: {
    width: 19,
    backgroundColor: theme.primaryLight,
  },
  inactiveDot: {
    width: 5,
    backgroundColor: "rgba(255,255,255,0.55)",
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.96 }],
  },
  imageError: {
    width,
    height: HERO_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
  },
  imageErrorText: {
    marginTop: 10,
    fontSize: 11,
    fontWeight: "600",
    color: theme.textMuted,
  },
  infoScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 25,
  },
  introRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  introIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(139,30,45,0.08)",
    borderWidth: 1,
    borderColor: "rgba(139,30,45,0.14)",
  },
  introText: {
    flex: 1,
    marginLeft: 12,
  },
  introLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: theme.primaryLight,
    letterSpacing: 1,
  },
  introDescription: {
    marginTop: 4,
    fontSize: 11.5,
    lineHeight: 17,
    fontWeight: "500",
    color: theme.textMuted,
  },
  section: {
    marginTop: 25,
  },
  sectionEyebrow: {
    marginBottom: 11,
    fontSize: 9.5,
    fontWeight: "800",
    color: theme.textMuted,
    letterSpacing: 1.1,
  },
  equipmentList: {
    gap: 8,
  },
  equipmentItem: {
    minHeight: 48,
    paddingHorizontal: 11,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },
  equipmentIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(139,30,45,0.08)",
  },
  equipmentText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "600",
    color: theme.text,
  },
  muscleChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  muscleChip: {
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(139,30,45,0.07)",
    borderWidth: 1,
    borderColor: "rgba(139,30,45,0.14)",
  },
  muscleText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: theme.primaryLight,
  },
  instructionsSection: {
    marginTop: 30,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  instructions: {
    fontSize: 13,
    lineHeight: 22,
    fontWeight: "500",
    color: theme.textMuted,
  },
  mutedText: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.textMuted,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 12,
  },
  youtubeButton: {
    minHeight: 56,
    paddingHorizontal: 14,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.primary,
  },
  youtubeIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  youtubeContent: {
    flex: 1,
    marginLeft: 10,
  },
  youtubeLabel: {
    fontSize: 8.5,
    fontWeight: "800",
    color: "rgba(255,255,255,0.68)",
    letterSpacing: 1,
  },
  youtubeText: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "800",
    color: "#fff",
  },
  youtubePressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  emptyScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(139,30,45,0.08)",
    borderWidth: 1,
    borderColor: "rgba(139,30,45,0.14)",
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.text,
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
    color: theme.textMuted,
  },
  emptyButton: {
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: theme.primary,
  },
  emptyButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
});