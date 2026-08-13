import {
  View,
  Text,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import type { LucideIcon } from "lucide-react-native";

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

  iconColor = "#94a3b8",
  iconBackground = "#f1f5f9",
}: EmptyStateProps) {
  return (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        },
        style,
      ]}
    >
      {/* ICON */}
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: iconBackground,

          alignItems: "center",
          justifyContent: "center",

          marginBottom: 12,
        }}
      >
        <Icon
          size={26}
          color={iconColor}
          strokeWidth={2}
        />
      </View>

      {/* TITLE */}
      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: "#334155",
          textAlign: "center",
        }}
      >
        {title}
      </Text>

      {/* SUBTITLE */}
      {subtitle && (
        <Text
          style={{
            marginTop: 4,
            fontSize: 12,
            lineHeight: 18,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 260,
          }}
        >
          {subtitle}
        </Text>
      )}

      {/* ACTION */}
      {actionLabel && onActionPress && (
        <Pressable
          onPress={onActionPress}
          style={{
            marginTop: 16,
            backgroundColor: "#10b981",
            paddingHorizontal: 18,
            paddingVertical: 8,
            borderRadius: 999,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}