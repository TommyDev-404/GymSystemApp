import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Target } from "lucide-react-native";
import { theme } from "@/utils/theme";
import { FitnessGuideType } from "../types/fitnessTypes";

const GREEN = theme.primary;

interface GoalGuideCardProps {
  goalType: FitnessGuideType;
  currentWeight: number;
  targetWeight: number;
  description: string;
}

export function GoalGuideCard({
  goalType,
  currentWeight,
  targetWeight,
  description,
}: GoalGuideCardProps) {
  const isGain = goalType === "GAIN";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Target
            size={17}
            color={GREEN}
            strokeWidth={2.2}
          />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.label}>YOUR GOAL</Text>

          <Text style={styles.title}>
            {isGain
              ? "Build toward your target"
              : "Work toward your target"}
          </Text>
        </View>
      </View>

      <View style={styles.weightRow}>
        <View>
          <Text style={styles.weightLabel}>Current</Text>

          <Text style={styles.weightValue}>
            {currentWeight.toFixed(1)} kg
          </Text>
        </View>

        <Text style={styles.arrow}>→</Text>

        <View>
          <Text style={styles.weightLabel}>Target</Text>

          <Text style={styles.weightValue}>
            {targetWeight.toFixed(1)} kg
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {isGain ? "WEIGHT GAIN" : "WEIGHT LOSS"}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: `${GREEN}20`,
    marginRight: 10,
  },

  headerText: {
    flex: 1,
  },

  label: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.7,
    color: GREEN,
  },

  title: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
    color: theme.textSub,
  },

  weightRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  weightLabel: {
    fontSize: 10.5,
    fontWeight: "500",
    color: theme.textMuted,
  },

  weightValue: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.3,
  },

  arrow: {
    marginHorizontal: 14,
    fontSize: 18,
    color: theme.textMuted,
  },

  badge: {
    marginLeft: "auto",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: `${GREEN}20`,
  },

  badgeText: {
    fontSize: 8.5,
    fontWeight: "800",
    letterSpacing: 0.4,
    color: GREEN,
  },

  description: {
    marginTop: 15,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    fontSize: 12,
    lineHeight: 18,
    color: theme.textSub,
  },
});