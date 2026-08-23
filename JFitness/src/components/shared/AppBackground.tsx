import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/utils/theme";

interface AppBackgroundProps {
  children: ReactNode;
}

export function AppBackground({ children }: AppBackgroundProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "#FFFFFF",
          theme.bg,
          "#F8F8FA",
          theme.bg,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <LinearGradient
        colors={[
          "rgba(232,93,117,0.075)",
          "rgba(232,93,117,0.035)",
          "rgba(232,93,117,0.012)",
          "rgba(232,93,117,0)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topLeftGlow}
        pointerEvents="none"
      />

      <LinearGradient
        colors={[
          "rgba(232,93,117,0.055)",
          "rgba(232,93,117,0.025)",
          "rgba(232,93,117,0.008)",
          "rgba(232,93,117,0)",
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.bottomLeftGlow}
        pointerEvents="none"
      />

      <LinearGradient
        colors={[
          "rgba(201,68,92,0.025)",
          "rgba(201,68,92,0.008)",
          "rgba(201,68,92,0)",
        ]}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.rightGlow}
        pointerEvents="none"
      />

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  content: {
    flex: 1,
  },
  topLeftGlow: {
    position: "absolute",
    width: 380,
    height: 320,
    top: -160,
    left: -160,
    opacity: 0.9,
  },
  bottomLeftGlow: {
    position: "absolute",
    width: 400,
    height: 340,
    bottom: -180,
    left: -180,
    opacity: 0.8,
  },
  rightGlow: {
    position: "absolute",
    width: 240,
    height: 520,
    top: "20%",
    right: -190,
    opacity: 0.5,
  },
});