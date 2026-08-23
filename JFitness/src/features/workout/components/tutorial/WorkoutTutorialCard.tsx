import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ChevronRight, Play } from "lucide-react-native";
import { theme } from "@/utils/theme";

function getYoutubeVideoId(url: string): string | null {
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

function ytThumb(videoId: string) {
  if (!videoId) return "";

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function parseMuscles(value: string) {
  try {
    return JSON.parse(value).join(", ");
  } catch {
    return "";
  }
}

export function WorkoutTutorialCard({ item }: { item: any }) {
  const videoId = getYoutubeVideoId(item.video_url);
  const thumb = videoId ? ytThumb(videoId) : "";
  const muscles = parseMuscles(item.muscles_targeted);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(app)/workout-details",
          params: {
            fetch: "false",
            workout: JSON.stringify(item),
          },
        })
      }
      style={({ pressed }) => [
        styles.wrapper,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {thumb ? (
            <Image
              source={{ uri: thumb }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}

          <View style={styles.imageOverlay} />

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>

          <View style={styles.playButton}>
            <Play
              size={18}
              color="#FFFFFF"
              fill="#FFFFFF"
              strokeWidth={2}
            />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text numberOfLines={2} style={styles.title}>
              {item.name}
            </Text>

            <View style={styles.arrowButton}>
              <ChevronRight
                size={16}
                color={theme.primaryLight}
                strokeWidth={2.5}
              />
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{item.level}</Text>
            </View>

            {muscles ? (
              <>
                <View style={styles.dot} />
                <Text
                  numberOfLines={1}
                  style={styles.muscles}
                >
                  {muscles}
                </Text>
              </>
            ) : null}
          </View>

          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>TYPE</Text>
              <Text style={styles.metaValue}>Workout Tutorial</Text>
            </View>

            <View style={styles.metaItemRight}>
              <Text style={styles.metaLabel}>ADDED</Text>
              <Text style={styles.metaValue}>
                {new Date(item.created_at).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  card: {
    overflow: "hidden",
    borderRadius: 18,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  imageContainer: {
    height: 160,
    position: "relative",
    backgroundColor: theme.surface,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: theme.surface,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.12)",
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: theme.primary,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  playButton: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 42,
    height: 42,
    marginLeft: -21,
    marginTop: -21,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.58)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
  },
  content: {
    padding: 14,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    flex: 1,
    fontSize: 15.5,
    fontWeight: "800",
    lineHeight: 20,
    color: theme.text,
    letterSpacing: -0.25,
  },
  arrowButton: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
    minWidth: 0,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  levelText: {
    color: theme.primaryLight,
    fontSize: 9.5,
    fontWeight: "700",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    marginHorizontal: 7,
    backgroundColor: theme.textMuted,
  },
  muscles: {
    flex: 1,
    fontSize: 11,
    fontWeight: "500",
    color: theme.textMuted,
  },
  meta: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 13,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  metaItem: {
    flex: 1,
  },
  metaItemRight: {
    alignItems: "flex-end",
  },
  metaLabel: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.7,
    color: theme.textMuted,
  },
  metaValue: {
    marginTop: 3,
    fontSize: 10.5,
    fontWeight: "600",
    color: theme.textSub,
  },
});