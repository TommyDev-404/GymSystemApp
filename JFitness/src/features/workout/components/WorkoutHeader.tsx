import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Plus } from "lucide-react-native";
import { theme } from "@/utils/theme";

export function WorkoutHeader({
  onAddPress,
}: {
  onAddPress: () => void;
}) {
  return (
    <View style={styles.topRow}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Workouts
        </Text>
        <Text style={styles.subtitle}>
          Track • Train • Improve
        </Text>
      </View>

      <Pressable
        onPress={onAddPress}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed,
        ]}
      >
        <Plus
          size={16}
          color="#FFFFFF"
          strokeWidth={2.5}
        />
        <Text style={styles.addText}>
          Add Workout
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    marginTop: 10
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.6,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 11.5,
    fontWeight: "500",
    color: theme.textMuted,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 13,
    backgroundColor: theme.primary,
    borderWidth: 1,
    borderColor: theme.primaryLight,
    shadowColor: theme.primaryLight,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  addText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});