import { theme } from "@/utils/theme";
import { router } from "expo-router";
import {
  BotMessageSquare,
  Search,
  User,
  Share2,
} from "lucide-react-native";
import { memo, useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

interface AppHeaderProps {
  pathname: string;
  onProfilePress?: () => void;
}

function AppHeader({
  pathname,
  onProfilePress,
}: AppHeaderProps) {
  const isWorkout = pathname.includes("/workout");
  const isCommunity = pathname.includes("/community");

  const handleSearch = useCallback(() => {
    if (isWorkout) {
      router.push({
        pathname: "/(app)/search",
        params: {
          fromWorkout: "true",
        },
      });
    } else {
      router.push("/(app)/search");
    }
  }, [isWorkout]);

  const handleFieldPress = useCallback(() => {
    if (isCommunity) {
      router.push("/(app)/share-progress");
    } else {
      handleSearch();
    }
  }, [isCommunity, handleSearch]);

  const handleProfilePress = useCallback(() => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      router.push("/(app)/profile");
    }
  }, [onProfilePress]);

  const handleAssistantPress = useCallback(() => {
    router.push("/(app)/ai-assistant");
  }, []);

  const fieldKey = isCommunity
    ? "community"
    : isWorkout
    ? "workout"
    : "default";

  const fieldText = isCommunity
    ? "Share your progress..."
    : isWorkout
    ? "Search exercises..."
    : "Search features...";

  return (
    <>

      <View style={styles.header}>
        <Pressable
          onPress={handleProfilePress}
          hitSlop={8}
          style={styles.profileButton}
        >
          <User
            size={20}
            color="#ffffff"
            strokeWidth={2.2}
          />
        </Pressable>

        <Pressable
          onPress={handleFieldPress}
          style={styles.searchField}
        >
          <Animated.View
            key={fieldKey}
            entering={FadeIn.duration(160)}
            exiting={FadeOut.duration(120)}
            style={styles.fieldContent}
          >
            {isCommunity ? (
              <Share2
                size={16}
                color={theme.primary}
                strokeWidth={2}
              />
            ) : (
              <Search
                size={16}
                color={theme.textSub}
                strokeWidth={2}
              />
            )}

            <Text
              style={[
                styles.fieldText,
                isCommunity && styles.communityFieldText,
              ]}
              numberOfLines={1}
            >
              {fieldText}
            </Text>
          </Animated.View>
        </Pressable>

        <Pressable
          onPress={handleAssistantPress}
          hitSlop={6}
          style={styles.assistantButton}
        >
          <BotMessageSquare
            size={22}
            color={theme.textSub}
            strokeWidth={2}
          />

          <View style={styles.assistantDot} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
    backgroundColor: theme.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  searchField: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    paddingHorizontal: 12,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    justifyContent: "center",
  },
  fieldContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fieldText: {
    flex: 1,
    color: theme.textMuted,
    fontSize: 14,
  },
  communityFieldText: {
    color: theme.textSub,
  },
  assistantButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  assistantDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: theme.primaryLight,
  },
});

export default memo(AppHeader);