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
      {/* Base background */}
      <LinearGradient
        colors={[
          theme.bg,
          "#0d1415",
          "#0b1112",
          theme.bg,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Top-left soft teal glow */}
      <LinearGradient
        colors={[
          "rgba(20,184,166,0.10)",
          "rgba(20,184,166,0.045)",
          "rgba(20,184,166,0.012)",
          "rgba(20,184,166,0)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topLeftGlow}
        pointerEvents="none"
      />

      {/* Bottom-left soft teal glow */}
      <LinearGradient
        colors={[
          "rgba(20,184,166,0.08)",
          "rgba(20,184,166,0.035)",
          "rgba(20,184,166,0.01)",
          "rgba(20,184,166,0)",
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.bottomLeftGlow}
        pointerEvents="none"
      />

      {/* Very subtle right-side ambient glow */}
      <LinearGradient
        colors={[
          "rgba(20,184,166,0.035)",
          "rgba(20,184,166,0.01)",
          "rgba(20,184,166,0)",
        ]}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.rightGlow}
        pointerEvents="none"
      />

      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    position: "relative",
    overflow: "hidden",
  },

  content: {
    flex: 1,
  },

  /*
   * Large asymmetric gradients.
   *
   * They intentionally extend outside the screen so
   * there is no obvious "circle" or hard edge.
   */

  topLeftGlow: {
    position: "absolute",

    width: 360,
    height: 300,

    top: -150,
    left: -150,

    opacity: 0.9,
  },

  bottomLeftGlow: {
    position: "absolute",

    width: 380,
    height: 320,

    bottom: -170,
    left: -170,

    opacity: 0.8,
  },

  rightGlow: {
    position: "absolute",

    width: 220,
    height: 500,

    top: "25%",
    right: -170,

    opacity: 0.45,
  },
});