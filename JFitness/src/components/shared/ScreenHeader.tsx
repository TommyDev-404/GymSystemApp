import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

import { theme } from "@/utils/theme";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

export function ScreenHeader({
  title,
  subtitle,
  rightContent,
}: ScreenHeaderProps) {

  return (
    <View style={styles.header}>

      <View style={styles.left}>

        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <ArrowLeft
            size={19}
            color={theme.textSub}
            strokeWidth={2}
          />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Text>

          {subtitle && (
            <Text
              style={styles.subtitle}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>

      </View>

      {rightContent && (
        <View style={styles.right}>
          {rightContent}
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    minHeight: 64,

    paddingHorizontal: 20,
    paddingVertical: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "transparent",
  },

  left: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 37,
    height: 37,

    borderRadius: 11,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.surface,

    borderWidth: 1,
    borderColor: theme.borderStrong,

    marginRight: 11,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",

    color: theme.text,

    letterSpacing: -0.2,
  },

  subtitle: {
    marginTop: 2,

    fontSize: 10.5,
    fontWeight: "500",

    color: theme.textMuted,
  },

  right: {
    marginLeft: 10,

    alignItems: "center",
    justifyContent: "center",
  },

});