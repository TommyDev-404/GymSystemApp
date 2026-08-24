import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { theme } from "@/utils/theme";

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
  color = theme.primary,
}: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color={color} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(23, 24, 26, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  card: {
    minWidth: 180,
    backgroundColor: theme.card,
    paddingHorizontal: 30,
    paddingVertical: 24,
    borderRadius: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.borderAccent,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
  },
  title: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "700",
    color: theme.text,
  },
  message: {
    marginTop: 4,
    fontSize: 12,
    color: theme.textMuted,
  },
});