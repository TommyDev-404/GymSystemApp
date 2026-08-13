import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

interface LoadingProps {
  text?: string;
  fullscreen?: boolean;
}

export function Loading({
  text = "Loading...",
  fullscreen = true,
}: LoadingProps) {
  return (
    <View
      style={[
        styles.container,
        fullscreen && styles.fullscreen,
      ]}
    >
      <ActivityIndicator
        size="large"
        color="#10b981"
      />

      {text && (
        <Text style={styles.text}>
          {text}
        </Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  fullscreen: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  text: {
    marginTop: 12,
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
});