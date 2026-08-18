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

export function QuickActionsGrid({
  actions,
}: QuickActionsGridProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>

      <View style={styles.row}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          const iconColor = action.color ?? theme.primary;

          return (
            <Pressable
              key={index}
              onPress={action.onPress}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
              {/* Centered Icon */}
              <View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor:
                      action.bg ?? `${iconColor}18`,
                    borderColor: `${iconColor}45`,
                  },
                ]}
              >
                <Icon
                  size={20}
                  color={iconColor}
                  strokeWidth={2.2}
                />
              </View>

              {/* Label */}
              <Text
                style={styles.label}
                numberOfLines={2}
              >
                {action.label}
              </Text>

              {/* Centered Accent Underline */}
              <View
                style={[
                  styles.accentLine,
                  {
                    backgroundColor: iconColor,
                  },
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
  container: {
    
  },

  title: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "700",
    color: theme.text,
    letterSpacing: -0.2,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  card: {
    flex: 1,

    minHeight: 112,

    paddingHorizontal: 8,
    paddingVertical: 14,

    borderRadius: 16,

    backgroundColor: theme.card,

    // Sharper visible border
    borderWidth: 1,
    borderColor: theme.borderAccent,

    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 3,
  },

  cardPressed: {
    transform: [
      {
        scale: 0.97,
      },
    ],
    borderColor: theme.primary,
    opacity: 0.9,
  },
  iconBox: {
    width: 42,
    height: 42,
  
    borderRadius: 13,
  
    alignItems: "center",
    justifyContent: "center",
  
    marginBottom: 9,
  
    // Dark background
    backgroundColor: theme.surface,
  
    // Very subtle border
    borderWidth: 1,
    borderColor: theme.border,
  
    // Soft glow
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  
    elevation: 3,
  },

  label: {
    fontSize: 11,
    lineHeight: 15,

    fontWeight: "600",

    color: theme.textSub,

    textAlign: "center",
  },

  accentLine: {
    position: "absolute",

    bottom: 0,

    width: 28,
    height: 2,

    borderRadius: 999,

    opacity: 0.85,
  },
});