import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  TrendingDown,
  TrendingUp,
} from "lucide-react-native";

import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/utils/theme";

interface CurrentWeightCardProps {
  currentWeight: number;
  startingWeight: number;
  isMovingAway: boolean;
  goalType: "LOSE_WEIGHT" | "GAIN_WEIGHT";
}

const GREEN = theme.primary;
const RED = "#EF4444";

export function WeighProgressCard({
  currentWeight,
  startingWeight,
  isMovingAway,
  goalType,
}: CurrentWeightCardProps) {
  const weightChange =
    currentWeight - startingWeight;

  const absoluteChange =
    Math.abs(weightChange);

  const changeType =
    weightChange < 0
      ? "lost"
      : weightChange > 0
        ? "gained"
        : "no change";

  const isWeightLoss = weightChange < 0;

  const GoalIcon =
    goalType === "LOSE_WEIGHT"
      ? TrendingDown
      : TrendingUp;

  const goalColor = isMovingAway ? RED : GREEN;

  return (
    <View style={styles.card}>

      {/* ================= BACKGROUND GLOW ================= */}

      <LinearGradient
        colors={[
          "rgba(20,184,166,0.09)",
          "rgba(20,184,166,0.025)",
          "rgba(11,13,16,0)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
        pointerEvents="none"
      />

      {/* Decorative top-left glow */}
      <View
        style={styles.topGlow}
        pointerEvents="none"
      />

      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        <View style={styles.headerText}>
          <Text style={styles.title}>
            Weight Progress
          </Text>

          <Text style={styles.subtitle}>
            Your current weight journey
          </Text>
        </View>

        {/* GOAL TYPE */}

        <View
          style={[
            styles.goalBadge,
            isMovingAway
              ? styles.goalBadgeDanger
              : styles.goalBadgeNormal,
          ]}
        >
          <GoalIcon
            size={13}
            color={goalColor}
            strokeWidth={2.5}
          />

          <Text
            style={[
              styles.goalBadgeText,
              {
                color: goalColor,
              },
            ]}
          >
            {goalType === "LOSE_WEIGHT"
              ? "LOSE WEIGHT"
              : "GAIN WEIGHT"}
          </Text>
        </View>

      </View>

      {/* ================= CURRENT WEIGHT ================= */}

      <View style={styles.content}>

        <Text
          style={[
            styles.weight,
            isMovingAway && styles.weightDanger,
          ]}
        >
          {currentWeight.toFixed(1)}

          <Text style={styles.unit}>
            {" kg"}
          </Text>
        </Text>

        <Text style={styles.currentLabel}>
          Current Weight
        </Text>

        {/* ================= CHANGE ================= */}

        {changeType !== "no change" ? (
          <View
            style={[
              styles.changeBadge,
              isMovingAway &&
                styles.changeBadgeDanger,
            ]}
          >
            {isWeightLoss ? (
              <TrendingDown
                size={14}
                color={
                  isMovingAway
                    ? RED
                    : GREEN
                }
                strokeWidth={2.5}
              />
            ) : (
              <TrendingUp
                size={14}
                color={
                  isMovingAway
                    ? RED
                    : GREEN
                }
                strokeWidth={2.5}
              />
            )}

            <Text
              style={[
                styles.changeText,
                isMovingAway &&
                  styles.changeTextDanger,
              ]}
            >
              {absoluteChange.toFixed(1)}
              {" kg "}
              {changeType}
            </Text>
          </View>
        ) : (
          <View style={styles.noChangeBadge}>
            <Text style={styles.noChangeText}>
              No weight change
            </Text>
          </View>
        )}

        {/* ================= DESCRIPTION ================= */}

        <Text
          style={[
            styles.description,
            isMovingAway &&
              styles.descriptionDanger,
          ]}
        >
          {isMovingAway
            ? "Moving away from your goal"
            : goalType === "LOSE_WEIGHT"
              ? "Progress toward your weight-loss goal"
              : "Progress toward your weight-gain goal"}
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  /* ================= CARD ================= */

  card: {
    position: "relative",

    backgroundColor: theme.card,

    borderRadius: 18,

    borderWidth: 1,
    borderColor: theme.borderAccent,

    padding: 17,

    overflow: "hidden",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.18,
    shadowRadius: 14,

    elevation: 4,
  },

  backgroundGlow: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,

    height: 180,
  },

  topGlow: {
    position: "absolute",

    top: -75,
    left: -70,

    width: 180,
    height: 180,

    borderRadius: 999,

    backgroundColor:
      "rgba(20,184,166,0.055)",
  },

  /* ================= HEADER ================= */

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    gap: 10,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 15,

    fontWeight: "700",

    color: theme.text,

    letterSpacing: -0.2,
  },

  subtitle: {
    marginTop: 3,

    fontSize: 10.5,

    color: theme.textMuted,
  },

  /* ================= GOAL BADGE ================= */

  goalBadge: {
    flexDirection: "row",

    alignItems: "center",

    gap: 4,

    paddingHorizontal: 8,
    paddingVertical: 5,

    borderRadius: 999,

    borderWidth: 1,
  },

  goalBadgeNormal: {
    backgroundColor:
      "rgba(16,185,129,0.07)",

    borderColor:
      "rgba(16,185,129,0.20)",
  },

  goalBadgeDanger: {
    backgroundColor:
      "rgba(239,68,68,0.07)",

    borderColor:
      "rgba(239,68,68,0.20)",
  },

  goalBadgeText: {
    fontSize: 8.5,

    fontWeight: "800",

    letterSpacing: 0.4,
  },

  /* ================= CONTENT ================= */

  content: {
    alignItems: "center",

    paddingTop: 20,
  },

  weight: {
    fontSize: 38,

    lineHeight: 42,

    fontWeight: "800",

    color: theme.text,

    letterSpacing: -1,
  },

  weightDanger: {
    color: RED,
  },

  unit: {
    fontSize: 16,

    fontWeight: "600",

    color: theme.textMuted,
  },

  currentLabel: {
    marginTop: 2,

    fontSize: 10,

    fontWeight: "500",

    color: theme.textMuted,
  },

  /* ================= CHANGE ================= */

  changeBadge: {
    marginTop: 11,

    flexDirection: "row",

    alignItems: "center",

    gap: 5,

    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 999,

    backgroundColor:
      "rgba(16,185,129,0.07)",

    borderWidth: 1,

    borderColor:
      "rgba(16,185,129,0.18)",
  },

  changeBadgeDanger: {
    backgroundColor:
      "rgba(239,68,68,0.07)",

    borderColor:
      "rgba(239,68,68,0.18)",
  },

  changeText: {
    fontSize: 11,

    fontWeight: "700",

    color: GREEN,
  },

  changeTextDanger: {
    color: RED,
  },

  /* ================= NO CHANGE ================= */

  noChangeBadge: {
    marginTop: 11,

    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 999,

    backgroundColor: theme.surface,

    borderWidth: 1,

    borderColor: theme.border,
  },

  noChangeText: {
    fontSize: 10.5,

    fontWeight: "600",

    color: theme.textMuted,
  },

  /* ================= DESCRIPTION ================= */

  description: {
    marginTop: 6,

    fontSize: 10,

    lineHeight: 14,

    color: theme.textMuted,

    textAlign: "center",
  },

  descriptionDanger: {
    color: RED,
  },

});