import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { CalendarDays, TrendingDown, TrendingUp } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FitnessGoalHistory } from "@/features/home/types/HomeTypes";
import { theme } from "@/utils/theme";

interface WeightHistoryProps {
  history: FitnessGoalHistory[];
  loading: boolean;
}

const GREEN = theme.primary;
const RED = "#EF4444";
const BLUE = "#3B82F6";

export function WeightHistory({ history, loading }: WeightHistoryProps) {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Weight History</Text>
          <Text style={styles.subtitle}>Your recent weight updates</Text>
        </View>
        <View style={styles.headerIcon}>
          <CalendarDays size={16} color={theme.primary} strokeWidth={2} />
        </View>
      </View>

      <View style={styles.card}>
        <LinearGradient
          colors={[
            "rgba(139,30,45,0.07)",
            "rgba(169,43,61,0.025)",
            "rgba(255,255,255,0)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.backgroundGradient}
          pointerEvents="none"
        />
        <View style={styles.topGlow} pointerEvents="none" />

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color={theme.primary} />
            <Text style={styles.loadingText}>Loading weight history...</Text>
          </View>
        ) : history.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <CalendarDays size={24} color={theme.textMuted} strokeWidth={1.8} />
            </View>
            <Text style={styles.emptyTitle}>No weight records yet</Text>
            <Text style={styles.emptyText}>
              Your weight updates will appear here.
            </Text>
          </View>
        ) : (
          history.slice(0, 10).map((item, index) => {
            const current = Number(item.current_weight ?? 0);
            const previous =
              index < history.length - 1
                ? Number(history[index + 1]?.current_weight ?? current)
                : current;
            const change = Number(item.weight_change ?? current - previous);
            const target = Number(item.target_weight ?? 0);
            const percentage = Number(item.progress_percentage ?? 0);
            const isGainGoal = item.goal_type === "GAIN_WEIGHT";
            const isPositiveChange = isGainGoal ? change > 0 : change < 0;
            const isNegativeChange = isGainGoal ? change < 0 : change > 0;
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
            const isLast = index === Math.min(history.length, 10) - 1;

            return (
              <View
                key={item.id ?? index}
                style={[styles.row, !isLast && styles.rowBorder]}
              >
                <View style={styles.topRow}>
                  <View style={styles.dateContainer}>
                    <View
                      style={[
                        styles.timelineDot,
                        isGainGoal && styles.timelineDotGain,
                      ]}
                    />
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
                    {isGainGoal ? (
                      <TrendingUp size={11} color={BLUE} strokeWidth={2.5} />
                    ) : (
                      <TrendingDown size={11} color={GREEN} strokeWidth={2.5} />
                    )}
                    <Text
                      style={[
                        styles.goalBadgeText,
                        isGainGoal
                          ? styles.goalBadgeTextGain
                          : styles.goalBadgeTextLose,
                      ]}
                    >
                      {isGainGoal ? "GAIN WEIGHT" : "LOSE WEIGHT"}
                    </Text>
                  </View>
                </View>

                <View style={styles.weightRow}>
                  <View>
                    <View style={styles.weightValueRow}>
                      <Text style={styles.weight}>{current.toFixed(1)}</Text>
                      <Text style={styles.unit}>kg</Text>
                    </View>
                    <Text style={styles.weightLabel}>Current weight</Text>
                  </View>

                  {isNoChange ? (
                    <View style={styles.noChangeBadge}>
                      <Text style={styles.noChangeText}>No change</Text>
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.changeBadge,
                        isPositiveChange && styles.changeBadgeGood,
                        isNegativeChange && styles.changeBadgeBad,
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
                        style={[styles.changeText, { color: changeColor }]}
                      >
                        {change > 0 ? "+" : ""}
                        {change.toFixed(1)} kg
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.bottomRow}>
                  <View style={styles.infoItem}>
                    <Text style={styles.bottomLabel}>TARGET</Text>
                    <Text style={styles.bottomValue}>
                      {target.toFixed(1)} kg
                    </Text>
                  </View>

                  <View style={[styles.infoItem, styles.progressItem]}>
                    <Text style={styles.bottomLabel}>PROGRESS</Text>
                    <Text
                      style={[
                        styles.progressValue,
                        percentage < 0 && styles.progressDanger,
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
    backgroundColor: "rgba(139,30,45,0.06)",
    borderWidth: 1,
    borderColor: "rgba(139,30,45,0.15)",
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
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 190,
  },
  topGlow: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 999,
    top: -95,
    right: -65,
    backgroundColor: theme.primaryLight,
    opacity: 0.045,
  },
  loading: {
    minHeight: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 10.5,
    color: theme.textMuted,
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
    backgroundColor: GREEN,
  },
  timelineDotGain: {
    backgroundColor: BLUE,
  },
  date: {
    fontSize: 10.5,
    fontWeight: "600",
    color: theme.textSub,
  },
  goalBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  goalBadgeLose: {
    backgroundColor: "rgba(139,30,45,0.055)",
    borderColor: "rgba(139,30,45,0.16)",
  },
  goalBadgeGain: {
    backgroundColor: "rgba(59,130,246,0.055)",
    borderColor: "rgba(59,130,246,0.16)",
  },
  goalBadgeText: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.35,
  },
  goalBadgeTextLose: {
    color: GREEN,
  },
  goalBadgeTextGain: {
    color: BLUE,
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
    backgroundColor: "rgba(16,185,129,0.055)",
    borderColor: "rgba(16,185,129,0.16)",
  },
  changeBadgeBad: {
    backgroundColor: "rgba(239,68,68,0.055)",
    borderColor: "rgba(239,68,68,0.16)",
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