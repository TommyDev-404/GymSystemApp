import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import {
  Bot,
  ChevronLeft,
} from "lucide-react-native";
import { theme } from "@/utils/theme";

export default function AiHeader() {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.pressed,
        ]}
        hitSlop={8}
      >
        <ChevronLeft
          size={21}
          color={theme.text}
          strokeWidth={2.2}
        />
      </Pressable>

      <View style={styles.botIcon}>
        <Bot
          size={20}
          color={theme.primaryLight}
          strokeWidth={2.2}
        />

        <View style={styles.onlineDot} />
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>
            AI Fitness Coach
          </Text>

          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>AI</Text>
          </View>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.statusDot} />

          <Text style={styles.statusText}>
            Online • Ready to help
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  botIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    position: "relative",
  },

  onlineDot: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: theme.primaryLight,
    borderWidth: 2,
    borderColor: theme.card,
  },

  info: {
    flex: 1,
    marginLeft: 11,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  title: {
    fontSize: 14,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.2,
  },

  aiBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  aiBadgeText: {
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: theme.primaryLight,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    marginRight: 5,
    backgroundColor: theme.primaryLight,
  },

  statusText: {
    fontSize: 9.5,
    fontWeight: "500",
    color: theme.textMuted,
  },

  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.96 }],
  },
});