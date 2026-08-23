import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { theme } from "@/utils/theme";

interface QuickAction {
  label: string;
  icon: React.ComponentType<any>;
  color?: string;
  bg?: string;
  onPress: () => void;
}

interface QuickActionsGridProps {
  actions: QuickAction[];
}

export function QuickActionsGrid({ actions }: QuickActionsGridProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>

      <View style={styles.row}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          const iconColor = action.color ?? theme.primary;
          const bgColor = action.bg ?? `${iconColor}14`;

          return (
            <Pressable
              key={index}
              onPress={action.onPress}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
              {/* Icon */}
              <View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor: bgColor,
                    borderColor: `${iconColor}28`,
                  },
                ]}
              >
                <Icon
                  size={20}
                  color={iconColor}
                  strokeWidth={2.1}
                />
              </View>

              {/* Label */}
              <Text style={styles.label} numberOfLines={2}>
                {action.label}
              </Text>

              {/* Accent underline */}
              <View
                style={[
                  styles.accentLine,
                  { backgroundColor: iconColor },
                ]}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "700",
    color: theme.text,
    letterSpacing: -0.25,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  card: {
    flex: 1,
    minHeight: 108,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 12,
    borderRadius: 16,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    // Soft professional shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
    borderColor: theme.primary + "60",
    opacity: 0.92,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1,
    // Clean soft shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 11.5,
    lineHeight: 15,
    fontWeight: "600",
    color: theme.text,          // stronger primary text
    textAlign: "center",
    paddingHorizontal: 2,
  },
  accentLine: {
    position: "absolute",
    bottom: 0,
    width: 26,
    height: 2.5,
    borderRadius: 999,
    opacity: 0.9,
  },
});