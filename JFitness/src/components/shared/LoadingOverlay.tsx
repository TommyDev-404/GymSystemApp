import { View, Text, ActivityIndicator } from "react-native";

interface Props {
  visible: boolean;
  title?: string;
  message?: string;
  color?: string;
}

export default function LoadingOverlay({
  visible,
  title = "Loading...",
  message = "Please wait",
  color = "#10b981",
}: Props) {
  if (!visible) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(46, 44, 44, 0.8)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 30,
          paddingVertical: 24,
          borderRadius: 18,
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <ActivityIndicator
          size="large"
          color={color}
        />

        <Text
          style={{
            marginTop: 12,
            fontSize: 14,
            fontWeight: "600",
            color: "#334155",
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            marginTop: 4,
            fontSize: 12,
            color: "#94a3b8",
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  );
}