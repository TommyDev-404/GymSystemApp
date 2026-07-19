
import { View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";

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
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 18,
          overflow: "hidden",
          elevation: 3,
          marginBottom: 14,
        }}
      >
        {/* IMAGE */}
        <View
          style={{
            height: 160,
            position: "relative",
          }}
        >
          <Image
            source={{ uri: thumb }}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          />

          {/* CLICK HINT */}
          <View
            style={{
              position: "absolute",
              bottom: 12,
              alignSelf: "center",
              backgroundColor: "rgba(0,0,0,0.55)",
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 999,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              Tap card to view full info
            </Text>
          </View>

          {/* CATEGORY BADGE */}
          <View
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: "rgba(16,185,129,0.9)",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 999,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 11,
                fontWeight: "600",
              }}
            >
              {item.category}
            </Text>
          </View>
        </View>

        {/* CONTENT */}
        <View
          style={{
            padding: 14,
          }}
        >
          {/* TITLE */}
          <Text
            numberOfLines={2}
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            {item.name}
          </Text>

          {/* LEVEL + MUSCLE */}
          <Text
            style={{
              fontSize: 12,
              color: "#64748b",
              marginTop: 4,
            }}
          >
            {item.level}
            {muscles ? ` • ${muscles}` : ""}
          </Text>

          {/* META */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#64748b",
              }}
            >
              🏋️ Workout Tutorial
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: "#64748b",
              }}
            >
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}