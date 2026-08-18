import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import {
  CalendarCheck,
  TrendingUp,
} from "lucide-react-native";
import { theme } from "@/utils/theme";
import { AttendanceChartData } from "../types/AttendanceTypes";

interface AttendanceChartProps {
  chartData: AttendanceChartData[];
}

export function AttendanceChart({
  chartData,
}: AttendanceChartProps) {
  const totalVisits = chartData.reduce(
    (total, item) => total + Number(item.value || 0),
    0
  );

  return (
    <View style={styles.card}>
      {/* Decorative glow */}
      <View pointerEvents="none" style={styles.glow} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <CalendarCheck
              size={17}
              color={theme.primaryLight}
              strokeWidth={2.2}
            />
          </View>

          <View>
            <Text style={styles.title}>
              Attendance Progress
            </Text>

            <Text style={styles.subtitle}>
              Your gym visits this week
            </Text>
          </View>
        </View>

        <View style={styles.periodBadge}>
          <View style={styles.periodDot} />

          <Text style={styles.periodText}>
            Weekly
          </Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryIcon}>
          <CalendarCheck
            size={18}
            color={theme.primaryLight}
            strokeWidth={2.2}
          />
        </View>

        <View style={styles.summaryContent}>
          <Text style={styles.summaryLabel}>
            VISITS THIS WEEK
          </Text>

          <View style={styles.valueRow}>
            <Text style={styles.totalValue}>
              {totalVisits}
            </Text>

            <Text style={styles.visitText}>
              {totalVisits === 1 ? "visit" : "visits"}
            </Text>
          </View>
        </View>

        <View style={styles.trendBox}>
          <TrendingUp
            size={15}
            color={theme.primaryLight}
            strokeWidth={2.2}
          />

          <Text style={styles.trendText}>
            Activity
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Chart */}
      {chartData.length >= 2 ? (
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            height={175}
            width={310}
            spacing={Math.max(
              38,
              310 / chartData.length
            )}
            initialSpacing={10}
            endSpacing={10}
            color={theme.primary}
            thickness={2.5}
            dataPointsColor={theme.primary}
            dataPointsRadius={3.5}
            curved
            areaChart
            startFillColor={theme.primary}
            endFillColor={theme.card}
            startOpacity={0.16}
            endOpacity={0.01}
            hideRules={false}
            rulesColor={theme.border}
            yAxisColor={theme.borderStrong}
            xAxisColor={theme.borderStrong}
            yAxisTextStyle={{
              color: theme.textMuted,
              fontSize: 10,
            }}
            xAxisLabelTextStyle={{
              color: theme.textMuted,
              fontSize: 9,
            }}
            hideDataPoints={false}
            focusEnabled
            pointerConfig={{
              pointerStripHeight: 145,
              pointerStripColor: theme.borderStrong,
              pointerStripWidth: 1,
              pointerColor: theme.primary,
              radius: 5,
              pointerLabelWidth: 100,
              pointerLabelHeight: 45,
              activatePointersOnLongPress: true,
              autoAdjustPointerLabelPosition: true,

              pointerLabelComponent: (items: any[]) => {
                const item = items?.[0];

                return (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipValue}>
                      {item?.value}
                    </Text>

                    <Text style={styles.tooltipLabel}>
                      {Number(item?.value) === 1
                        ? "visit"
                        : "visits"}
                    </Text>
                  </View>
                );
              },
            }}
          />
        </View>
      ) : (
        <View style={styles.emptyChart}>
          <View style={styles.emptyIcon}>
            <TrendingUp
              size={20}
              color={theme.primaryLight}
              strokeWidth={2}
            />
          </View>

          <Text style={styles.emptyTitle}>
            Not enough data yet
          </Text>

          <Text style={styles.emptyText}>
            Attend the gym more often to see your
            weekly attendance progress.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "relative",
    width: "100%",
    backgroundColor: theme.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 10,
    minHeight: 300,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 3,
  },

  glow: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 999,
    top: -125,
    left: -90,
    backgroundColor: "rgba(16,185,129,0.055)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,

    backgroundColor: "rgba(16,185,129,0.08)",
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  title: {
    fontSize: 15,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.2,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 10.5,
    color: theme.textMuted,
  },

  periodBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,

    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 9,
    backgroundColor: "rgba(16,185,129,0.06)",
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  periodDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: theme.primaryLight,
  },

  periodText: {
    fontSize: 8.5,
    fontWeight: "700",
    color: theme.primaryLight,
  },

  summaryCard: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 15,
    paddingHorizontal: 11,
    paddingVertical: 10,

    borderRadius: 14,
    backgroundColor: theme.surface3,
    borderWidth: 1,
    borderColor: theme.border,
  },

  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(16,185,129,0.08)",
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  summaryContent: {
    marginLeft: 10,
    flex: 1,
  },

  summaryLabel: {
    fontSize: 8.5,
    fontWeight: "700",
    color: theme.textMuted,
    letterSpacing: 0.4,
  },

  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 1,
    gap: 5,
  },

  totalValue: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.6,
  },

  visitText: {
    fontSize: 10,
    fontWeight: "700",
    color: theme.primaryLight,
  },

  trendBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,

    paddingHorizontal: 8,
    paddingVertical: 5,

    borderRadius: 8,
    backgroundColor: "rgba(16,185,129,0.06)",
  },

  trendText: {
    fontSize: 8,
    fontWeight: "700",
    color: theme.primaryLight,
  },

  divider: {
    height: 1,
    backgroundColor: theme.border,
    marginTop: 13,
    marginHorizontal: 2,
    marginBottom: 4,
  },

  chartContainer: {
    alignItems: "center",
    marginTop: 1,
  },

  tooltip: {
    alignItems: "center",

    backgroundColor: theme.surface3,
    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.borderAccent,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 4,
  },

  tooltipValue: {
    color: theme.text,
    fontSize: 12,
    fontWeight: "800",
  },

  tooltipLabel: {
    marginTop: 1,
    color: theme.textMuted,
    fontSize: 9,
  },

  emptyChart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },

  emptyIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(16,185,129,0.08)",
    borderWidth: 1,
    borderColor: theme.borderAccent,

    marginBottom: 9,
  },

  emptyTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
  },

  emptyText: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 16,
    color: theme.textMuted,
    textAlign: "center",
    maxWidth: 230,
  },
});