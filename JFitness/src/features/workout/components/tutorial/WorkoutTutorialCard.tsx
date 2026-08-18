import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
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

export function WorkoutTutorialCard({ item }: any) {
  const videoId = getYoutubeVideoId(item.video_url);
  const thumb = videoId ? ytThumb(videoId) : "";
  const muscles = parseMuscles(item.muscles_targeted);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(app)/workout-details",
          params: {
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
          <Image
            source={{ uri: thumb }}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {item.category}
            </Text>
          </View>

          <View style={styles.tapHint}>
            <Text style={styles.tapHintText}>
              Tap card to view full info
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.title}>
            {item.name}
          </Text>

          <Text style={styles.details}>
            {item.level}
            {muscles ? ` • ${muscles}` : ""}
          </Text>

          <View style={styles.meta}>
            <Text style={styles.metaText}>
              🏋️ Workout Tutorial
            </Text>

            <Text style={styles.metaText}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },

  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
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
    shadowOpacity: 0.16,
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

  categoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: theme.primaryLight,
  },

  categoryText: {
    color: "#fff",
    fontSize: 10.5,
    fontWeight: "700",
  },

  tapHint: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.62)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },

  tapHintText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },

  content: {
    padding: 14,
  },

  title: {
    fontSize: 15.5,
    fontWeight: "700",
    color: theme.text,
    letterSpacing: -0.2,
  },

  details: {
    marginTop: 5,
    fontSize: 11.5,
    color: theme.textMuted,
  },

  meta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },

  metaText: {
    fontSize: 10.5,
    color: theme.textMuted,
  },
});