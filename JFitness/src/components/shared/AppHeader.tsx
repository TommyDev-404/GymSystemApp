import { theme } from "@/utils/theme"; // adjust path if needed
import { router } from "expo-router";
import { BotMessageSquare, Image, Search, User } from "lucide-react-native";
import { Pressable, Text, View, StatusBar as RNStatusBar } from "react-native";
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
    <>
      <RNStatusBar barStyle="light-content" backgroundColor="transparent" translucent />
   
      <SafeAreaView edges={["top"]} style={{ backgroundColor: theme.card }}>     
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 10,
            gap: 10,
            backgroundColor: theme.card,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
          }}
        >
          {/* Logo / Profile */}
          <Pressable
            onPress={onProfilePress ?? (() => router.push("/(app)/profile"))}
            hitSlop={8}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: theme.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={20} color="#ffffff" />
          </Pressable>

          {/* Search / Share field */}
          <Pressable
            onPress={handleFieldPress}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: theme.surface,
              height: 36,
              borderRadius: 18,
              paddingHorizontal: 12,
              gap: 8,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            {isOnCommunity ? (
              <Image size={16} color={theme.primary} />
            ) : (
              <Search size={16} color={theme.textSub} />
            )}
            <Text
              style={{
                color: isOnCommunity ? theme.textSub : theme.textMuted,
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

          {/* AI Assistant */}
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
            <BotMessageSquare size={22} color={theme.textSub} />
            <View
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: theme.primaryLight, // soft teal "online" dot
              }}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}