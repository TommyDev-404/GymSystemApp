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


interface CurrentWeightCardProps {
  currentWeight: number;
  startingWeight: number;
  isMovingAway: boolean;

  goalType: "LOSE_WEIGHT" | "GAIN_WEIGHT";
}


const GREEN = "#10B981";
const RED = "#EF4444";

const SLATE_400 = "#94A3B8";
const SLATE_500 = "#64748B";
const SLATE_700 = "#334155";
const SLATE_900 = "#0F172A";


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


  /**
   * Determine icon based on
   * actual weight movement.
   */
  const isWeightLoss =
    weightChange < 0;


  const GoalIcon =
    goalType === "LOSE_WEIGHT"
      ? TrendingDown
      : TrendingUp;


  return (
    <View style={styles.card}>

      {/* HEADER */}

      <View style={styles.header}>

        <View>

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

            goalType === "GAIN_WEIGHT"
              ? styles.goalBadgeGain
              : styles.goalBadgeLoss,
          ]}
        >

          <GoalIcon
            size={13}
            color={
              goalType === "GAIN_WEIGHT"
                ? GREEN
                : GREEN
            }
            strokeWidth={2.5}
          />

          <Text
            style={[
              styles.goalBadgeText,

              goalType === "GAIN_WEIGHT"
                ? styles.goalBadgeTextGain
                : styles.goalBadgeTextLoss,
            ]}
          >
            {goalType === "LOSE_WEIGHT"
              ? "LOSE WEIGHT"
              : "GAIN WEIGHT"}
          </Text>

        </View>

      </View>


      {/* CURRENT WEIGHT */}

      <View style={styles.content}>

        <Text
          style={[
            styles.weight,

            isMovingAway &&
              styles.weightDanger,
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


        {/* CHANGE */}

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

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    borderWidth: 1,
    borderColor: "#F1F5F9",

    padding: 20,

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.04,
    shadowRadius: 8,
  },


  /* HEADER */

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },


  title: {
    fontSize: 15,

    fontWeight: "700",

    color: SLATE_900,
  },


  subtitle: {
    marginTop: 3,

    fontSize: 11,

    color: SLATE_400,
  },


  /* GOAL BADGE */

  goalBadge: {
    flexDirection: "row",

    alignItems: "center",

    gap: 4,

    paddingHorizontal: 8,

    paddingVertical: 5,

    borderRadius: 999,
  },


  goalBadgeLoss: {
    backgroundColor: "#ECFDF5",
  },


  goalBadgeGain: {
    backgroundColor: "#ECFDF5",
  },


  goalBadgeText: {
    fontSize: 9,

    fontWeight: "800",

    letterSpacing: 0.3,
  },


  goalBadgeTextLoss: {
    color: GREEN,
  },


  goalBadgeTextGain: {
    color: GREEN,
  },


  /* CONTENT */

  content: {
    alignItems: "center",

    paddingTop: 18,
  },


  weight: {
    fontSize: 38,

    lineHeight: 42,

    fontWeight: "800",

    color: SLATE_900,
  },


  weightDanger: {
    color: RED,
  },


  unit: {
    fontSize: 17,

    fontWeight: "600",

    color: SLATE_400,
  },


  currentLabel: {
    marginTop: 2,

    fontSize: 10,

    fontWeight: "500",

    color: SLATE_400,
  },


  /* CHANGE */

  changeBadge: {
    marginTop: 10,

    flexDirection: "row",

    alignItems: "center",

    gap: 5,

    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 999,

    backgroundColor: "#ECFDF5",
  },


  changeBadgeDanger: {
    backgroundColor: "#FEF2F2",
  },


  changeText: {
    fontSize: 12,

    fontWeight: "700",

    color: GREEN,
  },


  changeTextDanger: {
    color: RED,
  },


  noChangeBadge: {
    marginTop: 10,

    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 999,

    backgroundColor: "#F8FAFC",
  },


  noChangeText: {
    fontSize: 11,

    fontWeight: "600",

    color: SLATE_500,
  },


  description: {
    marginTop: 5,

    fontSize: 10,

    color: SLATE_400,

    textAlign: "center",
  },


  descriptionDanger: {
    color: RED,
  },

});