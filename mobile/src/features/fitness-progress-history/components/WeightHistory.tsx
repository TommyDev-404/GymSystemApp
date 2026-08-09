import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  CalendarDays,
  ArrowDown,
  ArrowUp,
} from "lucide-react-native";

import {
  FitnessGoalHistory,
} from "@/features/home/types/HomeTypes";

interface WeightHistoryProps {
  history: FitnessGoalHistory[];
}

const GREEN = "#10B981";
const GREEN_DARK = "#059669";
const RED = "#EF4444";

const SLATE_50 = "#F8FAFC";
const SLATE_100 = "#F1F5F9";
const SLATE_200 = "#E2E8F0";
const SLATE_400 = "#94A3B8";
const SLATE_500 = "#64748B";
const SLATE_700 = "#334155";
const SLATE_900 = "#0F172A";

export function WeightHistory({
  history,
}: WeightHistoryProps) {
  return (
    <>
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Weight History
          </Text>

          <Text style={styles.subtitle}>
            Your recent weight updates
          </Text>
        </View>

        <CalendarDays
          size={18}
          color={SLATE_400}
        />
      </View>

      {/* HISTORY CARD */}

      <View style={styles.card}>

        {history.length === 0 ? (

          <View style={styles.empty}>

            <CalendarDays
              size={28}
              color={SLATE_400}
            />

            <Text style={styles.emptyTitle}>
              No weight records yet
            </Text>

            <Text style={styles.emptyText}>
              Your weight updates will appear here.
            </Text>

          </View>

        ) : (

          history
            .slice(0, 10)
            .map((item, index) => {

              const current =
                Number(item.current_weight ?? 0);

              const previous =
                index < history.length - 1
                  ? Number(
                      history[index + 1]
                        ?.current_weight ?? current
                    )
                  : current;

              const change =
                Number(item.weight_change ?? (
                  current - previous
                ));

              const target =
                Number(item.target_weight ?? 0);

              const percentage =
                Number(
                  item.progress_percentage ?? 0
                );

              const isGainGoal =
                item.goal_type === "GAIN_WEIGHT";

              const isPositiveChange =
                isGainGoal
                  ? change > 0
                  : change < 0;

              const isNegativeChange =
                isGainGoal
                  ? change < 0
                  : change > 0;

              return (
                <View
                  key={item.id ?? index}
                  style={[
                    styles.row,

                    index ===
                      Math.min(history.length, 10) - 1 &&
                      styles.lastRow,
                  ]}
                >

                  {/* TOP ROW */}

                  <View style={styles.topRow}>

                    <Text style={styles.date}>
                      {formatHistoryDate(
                        item.recorded_at
                      )}
                    </Text>

                    <View
                      style={[
                        styles.goalBadge,

                        isGainGoal &&
                          styles.goalBadgeGain,
                      ]}
                    >
                      <Text
                        style={[
                          styles.goalBadgeText,

                          isGainGoal &&
                            styles.goalBadgeTextGain,
                        ]}
                      >
                        {isGainGoal
                          ? "Gain Weight"
                          : "Lose Weight"}
                      </Text>
                    </View>

                  </View>


                  {/* WEIGHT ROW */}

                  <View style={styles.weightRow}>

                    <View>

                      <View
                        style={styles.weightValueRow}
                      >

                        <Text
                          style={styles.weight}
                        >
                          {current.toFixed(1)}
                        </Text>

                        <Text
                          style={styles.unit}
                        >
                          kg
                        </Text>

                      </View>

                      <Text style={styles.weightLabel}>
                        Current weight
                      </Text>

                    </View>


                    {/* CHANGE */}

                    <View
                      style={[
                        styles.changeBadge,

                        isNegativeChange &&
                          styles.changeBadgeBad,

                        !isPositiveChange &&
                          !isNegativeChange &&
                          styles.changeBadgeNeutral,
                      ]}
                    >

                      {change !== 0 &&
                        (
                          isGainGoal
                            ? change > 0
                            : change < 0
                        ) ? (

                        <ArrowDown
                          size={12}
                          color={
                            isPositiveChange
                              ? GREEN
                              : RED
                          }
                          strokeWidth={2.5}
                        />

                      ) : (

                        <ArrowUp
                          size={12}
                          color={
                            isNegativeChange
                              ? RED
                              : SLATE_400
                          }
                          strokeWidth={2.5}
                        />

                      )}

                      <Text
                        style={[
                          styles.changeText,

                          isPositiveChange &&
                            styles.changeGood,

                          isNegativeChange &&
                            styles.changeBad,
                        ]}
                      >
                        {change > 0 ? "+" : ""}
                        {change.toFixed(1)} kg
                      </Text>

                    </View>

                  </View>


                  {/* BOTTOM INFO */}

                  <View style={styles.bottomRow}>

                    <View style={styles.targetContainer}>

                      <Text style={styles.bottomLabel}>
                        Target
                      </Text>

                      <Text style={styles.bottomValue}>
                        {target.toFixed(1)} kg
                      </Text>

                    </View>


                    <View style={styles.progressContainer}>

                      <Text style={styles.bottomLabel}>
                        Progress
                      </Text>

                      <Text
                        style={[
                          styles.progressValue,

                          percentage < 0 &&
                            styles.progressDanger,
                        ]}
                      >
                        {percentage > 0
                          ? `+${percentage.toFixed(0)}%`
                          : `${percentage.toFixed(0)}%`}
                      </Text>

                    </View>

                  </View>

                </View>
              );
            })

        )}

      </View>
    </>
  );
}


/* DATE */

function formatHistoryDate(
  date?: string
) {
  if (!date) {
    return "";
  }

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return "";
  }

  return parsed.toLocaleDateString(
    "en-PH",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}


/* STYLES */

const styles = StyleSheet.create({

  header: {
    marginTop: 24,
    marginBottom: 10,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",
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


  /* CARD */

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    borderWidth: 1,
    borderColor: SLATE_100,

    paddingHorizontal: 15,
  },


  /* HISTORY ROW */

  row: {
    paddingVertical: 13,

    borderBottomWidth: 1,
    borderBottomColor: SLATE_100,
  },

  lastRow: {
    borderBottomWidth: 0,
  },


  /* TOP */

  topRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  date: {
    fontSize: 11,

    fontWeight: "600",

    color: SLATE_500,
  },


  /* GOAL BADGE */

  goalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 999,

    backgroundColor: "#ECFDF5",
  },

  goalBadgeGain: {
    backgroundColor: "#EFF6FF",
  },

  goalBadgeText: {
    fontSize: 9,

    fontWeight: "700",

    color: GREEN_DARK,
  },

  goalBadgeTextGain: {
    color: "#2563EB",
  },


  /* WEIGHT */

  weightRow: {
    marginTop: 9,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  weightValueRow: {
    flexDirection: "row",

    alignItems: "baseline",
  },

  weight: {
    fontSize: 22,

    lineHeight: 25,

    fontWeight: "800",

    color: SLATE_900,
  },

  unit: {
    marginLeft: 3,

    fontSize: 11,

    fontWeight: "600",

    color: SLATE_400,
  },

  weightLabel: {
    marginTop: 1,

    fontSize: 9,

    color: SLATE_400,
  },


  /* CHANGE */

  changeBadge: {
    flexDirection: "row",

    alignItems: "center",

    gap: 3,

    paddingHorizontal: 8,

    paddingVertical: 5,

    borderRadius: 999,

    backgroundColor: "#ECFDF5",
  },

  changeBadgeBad: {
    backgroundColor: "#FEF2F2",
  },

  changeBadgeNeutral: {
    backgroundColor: SLATE_50,
  },

  changeText: {
    fontSize: 10,

    fontWeight: "700",

    color: GREEN_DARK,
  },

  changeGood: {
    color: GREEN_DARK,
  },

  changeBad: {
    color: RED,
  },


  /* BOTTOM */

  bottomRow: {
    marginTop: 10,

    paddingTop: 9,

    borderTopWidth: 1,
    borderTopColor: SLATE_50,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  targetContainer: {
    flexDirection: "row",

    alignItems: "center",

    gap: 5,
  },

  progressContainer: {
    flexDirection: "row",

    alignItems: "center",

    gap: 5,
  },

  bottomLabel: {
    fontSize: 9,

    color: SLATE_400,
  },

  bottomValue: {
    fontSize: 10,

    fontWeight: "700",

    color: SLATE_700,
  },

  progressValue: {
    fontSize: 10,

    fontWeight: "800",

    color: GREEN_DARK,
  },

  progressDanger: {
    color: RED,
  },


  /* EMPTY */

  empty: {
    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 35,
  },

  emptyTitle: {
    marginTop: 10,

    fontSize: 13,

    fontWeight: "700",

    color: SLATE_700,
  },

  emptyText: {
    marginTop: 4,

    fontSize: 11,

    color: SLATE_400,

    textAlign: "center",
  },

});