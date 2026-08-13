import { router } from "expo-router";
import { BotMessageSquare, Image, Search, SquarePen, User } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppHeader({
  isOnWorkout,
  isOnCommunity,
  onProfilePress,
}: {
  isOnWorkout?: boolean;
  isOnCommunity?: boolean;
  onProfilePress?: () => void;
}) {
  const handleSearch = () => {
    if (isOnWorkout) {
      router.push({
        pathname: "/(app)/search",
        params: { fromWorkout: "true" },
      });
    } else {
      router.push("/(app)/search");
    }
  };

  const handleFieldPress = () => {
    if (isOnCommunity) {
      router.push("/(app)/share-progress");
    } else {
      handleSearch();
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 10,
          gap: 10,
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
        }}
      >
        {/* Logo — opens the profile sidebar */}
        <Pressable
          onPress={() => router.push("/(app)/profile")}
          hitSlop={8}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "#10b981",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <User size={20} color="white" />
        </Pressable>

        {/* Search — becomes "Share your progress" on Community */}
        <Pressable
          onPress={handleFieldPress}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f8fafc",
            height: 36,
            borderRadius: 18,
            paddingHorizontal: 12,
            gap: 8,
            borderWidth: 1,
            borderColor: "#e2e8f0",
          }}
        >
          {isOnCommunity ? (
            <Image size={16} color="#10b981" />
          ) : (
            <Search size={16} color="#64748b" />
          )}

          <Text
            style={{
              color: isOnCommunity ? "#475569" : "#94a3b8",
              fontSize: 14,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {isOnCommunity
              ? "Share your progress..."
              : isOnWorkout
              ? "Search exercises..."
              : "Search features..."}
          </Text>
        </Pressable>

        {/* Chatbot */}
        <Pressable
          onPress={() => router.push("/(app)/ai-assistant")}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BotMessageSquare size={22} color="#475569" />
          <View
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: "#22c55e",
            }}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}