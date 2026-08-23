import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TrendingDown, TrendingUp } from "lucide-react-native";
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
  const weightChange = currentWeight - startingWeight;
  const absoluteChange = Math.abs(weightChange);
  const changeType =
    weightChange < 0 ? "lost" : weightChange > 0 ? "gained" : "no change";
  const isWeightLoss = weightChange < 0;
  const GoalIcon =
    goalType === "LOSE_WEIGHT" ? TrendingDown : TrendingUp;
  const goalColor = isMovingAway ? "#FCA5A5" : "#FFFFFF";

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={[theme.primaryDark, theme.primary, theme.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.glow} />

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Weight Progress</Text>
            <Text style={styles.subtitle}>Your current weight journey</Text>
          </View>

          <View
            style={[
              styles.goalBadge,
              isMovingAway
                ? styles.goalBadgeDanger
                : styles.goalBadgeNormal,
            ]}
          >
            <GoalIcon size={13} color={goalColor} strokeWidth={2.5} />
            <Text style={[styles.goalBadgeText, { color: goalColor }]}>
              {goalType === "LOSE_WEIGHT" ? "LOSE WEIGHT" : "GAIN WEIGHT"}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text
            style={[styles.weight, isMovingAway && styles.weightDanger]}
          >
            {currentWeight.toFixed(1)}
            <Text style={styles.unit}> kg</Text>
          </Text>

          <Text style={styles.currentLabel}>Current Weight</Text>

          {changeType !== "no change" ? (
            <View
              style={[
                styles.changeBadge,
                isMovingAway && styles.changeBadgeDanger,
              ]}
            >
              {isWeightLoss ? (
                <TrendingDown
                  size={14}
                  color={isMovingAway ? RED : GREEN}
                  strokeWidth={2.5}
                />
              ) : (
                <TrendingUp
                  size={14}
                  color={isMovingAway ? RED : GREEN}
                  strokeWidth={2.5}
                />
              )}

              <Text
                style={[
                  styles.changeText,
                  isMovingAway && styles.changeTextDanger,
                ]}
              >
                {absoluteChange.toFixed(1)} kg {changeType}
              </Text>
            </View>
          ) : (
            <View style={styles.noChangeBadge}>
              <Text style={styles.noChangeText}>No weight change</Text>
            </View>
          )}

          <Text
            style={[
              styles.description,
              isMovingAway && styles.descriptionDanger,
            ]}
          >
            {isMovingAway
              ? "Moving away from your goal"
              : goalType === "LOSE_WEIGHT"
                ? "Progress toward your weight-loss goal"
                : "Progress toward your weight-gain goal"}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: theme.primaryDark,
    borderWidth: 1,
    borderColor: "rgba(255, 232, 237, 0.25)",
    shadowColor: theme.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8,
  },
  gradient: {
    position: "relative",
    padding: 18,
  },
  glow: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 100,
    right: -75,
    top: -75,
    backgroundColor: "#FFFFFF",
    opacity: 0.07,
  },
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
    color: "#FFFFFF",
    letterSpacing: -0.2,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 10.5,
    color: "rgba(255, 232, 237, 0.7)",
  },
  goalBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.28)",
  },
  goalBadgeNormal: {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    borderColor: "rgba(255, 255, 255, 0.28)",
  },
  goalBadgeDanger: {
    backgroundColor: "rgba(239, 68, 68, 0.18)",
    borderColor: "rgba(255, 180, 180, 0.4)",
  },
  goalBadgeText: {
    fontSize: 8.5,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  content: {
    alignItems: "center",
    paddingTop: 22,
  },
  weight: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  weightDanger: {
    color: "#FCA5A5",
  },
  unit: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.65)",
  },
  currentLabel: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.6)",
  },
  changeBadge: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  changeBadgeDanger: {
    backgroundColor: "rgba(239, 68, 68, 0.14)",
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  changeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  changeTextDanger: {
    color: "#FCA5A5",
  },
  noChangeBadge: {
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)",
  },
  noChangeText: {
    fontSize: 10.5,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.7)",
  },
  description: {
    marginTop: 7,
    fontSize: 10,
    lineHeight: 14,
    color: "rgba(255, 255, 255, 0.62)",
    textAlign: "center",
  },
  descriptionDanger: {
    color: "#FCA5A5",
  },
});