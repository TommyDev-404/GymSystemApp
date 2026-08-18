import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

import { theme } from "@/utils/theme";

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
        color={theme.primary}
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

    backgroundColor:
      theme.bg,
  },

  text: {
    marginTop: 12,

    fontSize: 12,

    color:
      theme.textMuted,

    fontWeight: "500",
  },

});