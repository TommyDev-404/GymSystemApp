import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { theme } from "@/utils/theme";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;

  actionLabel?: string;
  onActionPress?: () => void;

  style?: StyleProp<ViewStyle>;

  iconColor?: string;
  iconBackground?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  actionLabel,
  onActionPress,
  style,
  iconColor = theme.textMuted,
  iconBackground = theme.surface,
}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
      {/* ICON */}
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: iconBackground,
            borderColor: theme.border,
          },
        ]}
      >
        <Icon
          size={22}
          color={iconColor}
          strokeWidth={2}
        />
      </View>

      {/* TITLE */}
      <Text style={styles.title}>
        {title}
      </Text>

      {/* SUBTITLE */}
      {subtitle && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}

      {/* ACTION */}
      {actionLabel && onActionPress && (
        <Pressable
          onPress={onActionPress}
          style={({ pressed }) => [
            styles.action,
            pressed && styles.actionPressed,
          ]}
        >
          <Text style={styles.actionText}>
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 11,

    borderWidth: 1,
  },

  title: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 4,

    fontSize: 11,
    lineHeight: 17,

    color: theme.textMuted,
    textAlign: "center",

    maxWidth: 260,
  },

  action: {
    marginTop: 14,

    backgroundColor: theme.primary,

    paddingHorizontal: 17,
    paddingVertical: 8,

    borderRadius: 10,
  },

  actionPressed: {
    opacity: 0.75,
  },

  actionText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});