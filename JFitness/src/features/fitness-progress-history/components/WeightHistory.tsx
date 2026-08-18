import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  CalendarDays,
  TrendingDown,
  TrendingUp,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FitnessGoalHistory } from "@/features/home/types/HomeTypes";
import { theme } from "@/utils/theme";

interface WeightHistoryProps {
  history: FitnessGoalHistory[];
}

const GREEN = theme.primary;
const RED = "#EF4444";

export function WeightHistory({ history }: WeightHistoryProps) {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Weight History</Text>
          <Text style={styles.subtitle}>
            Your recent weight updates
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <CalendarDays
            size={16}
            color={theme.primary}
            strokeWidth={2}
          />
        </View>
      </View>

      <View style={styles.card}>
        <LinearGradient
          colors={[
            "rgba(20,184,166,0.055)",
            "rgba(20,184,166,0.015)",
            "rgba(11,13,16,0)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.backgroundGlow}
          pointerEvents="none"
        />

        {history.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <CalendarDays
                size={24}
                color={theme.textMuted}
                strokeWidth={1.8}
              />
            </View>

            <Text style={styles.emptyTitle}>
              No weight records yet
            </Text>

            <Text style={styles.emptyText}>
              Your weight updates will appear here.
            </Text>
          </View>
        ) : (
          history.slice(0, 10).map((item, index) => {
            const current = Number(item.current_weight ?? 0);

            const previous =
              index < history.length - 1
                ? Number(
                    history[index + 1]?.current_weight ?? current
                  )
                : current;

            const change = Number(
              item.weight_change ?? current - previous
            );

            const target = Number(item.target_weight ?? 0);
            const percentage = Number(
              item.progress_percentage ?? 0
            );

            const isGainGoal = item.goal_type === "GAIN_WEIGHT";

            const isPositiveChange = isGainGoal
              ? change > 0
              : change < 0;

            const isNegativeChange = isGainGoal
              ? change < 0
              : change > 0;

            const isNoChange = change === 0;

            const changeColor = isNegativeChange
              ? RED
              : isPositiveChange
                ? GREEN
                : theme.textMuted;

            const ChangeIcon =
              change > 0
                ? TrendingUp
                : change < 0
                  ? TrendingDown
                  : null;

            const isLast =
              index === Math.min(history.length, 10) - 1;

            return (
              <View
                key={item.id ?? index}
                style={[
                  styles.row,
                  !isLast && styles.rowBorder,
                ]}
              >
                <View style={styles.topRow}>
                  <View style={styles.dateContainer}>
                    <View style={styles.timelineDot} />

                    <Text style={styles.date}>
                      {formatHistoryDate(item.recorded_at)}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.goalBadge,
                      isGainGoal
                        ? styles.goalBadgeGain
                        : styles.goalBadgeLose,
                    ]}
                  >
                    <Text
                      style={[
                        styles.goalBadgeText,
                        isGainGoal
                          ? styles.goalBadgeTextGain
                          : styles.goalBadgeTextLose,
                      ]}
                    >
                      {isGainGoal
                        ? "GAIN WEIGHT"
                        : "LOSE WEIGHT"}
                    </Text>
                  </View>
                </View>

                <View style={styles.weightRow}>
                  <View>
                    <View style={styles.weightValueRow}>
                      <Text style={styles.weight}>
                        {current.toFixed(1)}
                      </Text>

                      <Text style={styles.unit}>kg</Text>
                    </View>

                    <Text style={styles.weightLabel}>
                      Current weight
                    </Text>
                  </View>

                  {isNoChange ? (
                    <View style={styles.noChangeBadge}>
                      <Text style={styles.noChangeText}>
                        No change
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.changeBadge,
                        isPositiveChange &&
                          styles.changeBadgeGood,
                        isNegativeChange &&
                          styles.changeBadgeBad,
                      ]}
                    >
                      {ChangeIcon && (
                        <ChangeIcon
                          size={13}
                          color={changeColor}
                          strokeWidth={2.5}
                        />
                      )}

                      <Text
                        style={[
                          styles.changeText,
                          { color: changeColor },
                        ]}
                      >
                        {change > 0 ? "+" : ""}
                        {change.toFixed(1)} kg
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.bottomRow}>
                  <View style={styles.infoItem}>
                    <Text style={styles.bottomLabel}>
                      TARGET
                    </Text>

                    <Text style={styles.bottomValue}>
                      {target.toFixed(1)} kg
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.infoItem,
                      styles.progressItem,
                    ]}
                  >
                    <Text style={styles.bottomLabel}>
                      PROGRESS
                    </Text>

                    <Text
                      style={[
                        styles.progressValue,
                        percentage < 0 &&
                          styles.progressDanger,
                      ]}
                    >
                      {percentage > 0 ? "+" : ""}
                      {percentage.toFixed(0)}%
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

function formatHistoryDate(date?: string) {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,184,166,0.07)",
    borderWidth: 1,
    borderColor: "rgba(20,184,166,0.16)",
  },

  card: {
    position: "relative",
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    paddingHorizontal: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.16,
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

  row: {
    paddingVertical: 14,
  },

  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  timelineDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: theme.primary,
    shadowColor: theme.primary,
    shadowOpacity: 0.7,
    shadowRadius: 5,
  },

  date: {
    fontSize: 10.5,
    fontWeight: "600",
    color: theme.textSub,
  },

  goalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },

  goalBadgeLose: {
    backgroundColor: "rgba(20,184,166,0.07)",
    borderColor: "rgba(20,184,166,0.18)",
  },

  goalBadgeGain: {
    backgroundColor: "rgba(59,130,246,0.07)",
    borderColor: "rgba(59,130,246,0.18)",
  },

  goalBadgeText: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.35,
  },

  goalBadgeTextLose: {
    color: theme.primary,
  },

  goalBadgeTextGain: {
    color: "#60A5FA",
  },

  weightRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  weightValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  weight: {
    fontSize: 25,
    lineHeight: 29,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.6,
  },

  unit: {
    marginLeft: 3,
    fontSize: 11,
    fontWeight: "600",
    color: theme.textMuted,
  },

  weightLabel: {
    marginTop: 1,
    fontSize: 9,
    color: theme.textMuted,
  },

  changeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
  },

  changeBadgeGood: {
    backgroundColor: "rgba(20,184,166,0.07)",
    borderColor: "rgba(20,184,166,0.18)",
  },

  changeBadgeBad: {
    backgroundColor: "rgba(239,68,68,0.07)",
    borderColor: "rgba(239,68,68,0.18)",
  },

  changeText: {
    fontSize: 10.5,
    fontWeight: "700",
  },

  noChangeBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  noChangeText: {
    fontSize: 9.5,
    fontWeight: "600",
    color: theme.textMuted,
  },

  bottomRow: {
    marginTop: 11,
    paddingTop: 9,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  progressItem: {
    justifyContent: "flex-end",
  },

  bottomLabel: {
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.4,
    color: theme.textMuted,
  },

  bottomValue: {
    fontSize: 10.5,
    fontWeight: "700",
    color: theme.textSub,
  },

  progressValue: {
    fontSize: 10.5,
    fontWeight: "800",
    color: theme.primary,
  },

  progressDanger: {
    color: RED,
  },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 38,
  },

  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  emptyTitle: {
    marginTop: 11,
    fontSize: 13,
    fontWeight: "700",
    color: theme.textSub,
  },

  emptyText: {
    marginTop: 4,
    fontSize: 10.5,
    color: theme.textMuted,
    textAlign: "center",
  },
});