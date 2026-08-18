import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import {
  Dumbbell,
  TrendingUp,
  Activity,
} from "lucide-react-native";
import { theme } from "@/utils/theme";

interface WorkoutProgressChartProps {
  chartData: any[];
}

const GREEN = theme.primary;

export function WorkoutProgressChart({
  chartData,
}: WorkoutProgressChartProps) {
  const totalWorkouts = chartData.reduce(
    (total, item) => total + Number(item.value || 0),
    0
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <Activity
              size={16}
              color={theme.primaryLight}
              strokeWidth={2.2}
            />
          </View>

          <View>
            <Text style={styles.title}>Workout Progress</Text>
            <Text style={styles.subtitle}>
              Your weekly training activity
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View pointerEvents="none" style={styles.glow} />

        <View style={styles.summaryRow}>
          <View style={styles.summaryLeft}>
            <View style={styles.iconBox}>
              <Dumbbell
                size={17}
                color={theme.primaryLight}
                strokeWidth={2.2}
              />
            </View>

            <View>
              <Text style={styles.summaryLabel}>
                Workouts Tracked
              </Text>

              <View style={styles.valueRow}>
                <Text style={styles.totalValue}>
                  {totalWorkouts}
                </Text>
                <Text style={styles.sessionText}>sessions</Text>
              </View>
            </View>
          </View>

          <View style={styles.periodBadge}>
            <View style={styles.periodDot} />
            <Text style={styles.periodText}>
              Weekly Activity
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {chartData.length >= 2 ? (
          <LineChart
            data={chartData}
            height={175}
            width={310}
            spacing={Math.max(45, 310 / chartData.length)}
            initialSpacing={10}
            endSpacing={10}
            color={GREEN}
            thickness={2.5}
            dataPointsColor={GREEN}
            dataPointsRadius={3.5}
            curved
            areaChart
            startFillColor={GREEN}
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
              pointerColor: GREEN,
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
                      workouts
                    </Text>
                  </View>
                );
              },
            }}
          />
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
              Complete more workouts to see your weekly progress.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  sectionHeader: {
    marginBottom: 10,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "rgba(16,185,129,0.07)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.16)",
  },

  title: {
    fontSize: 15,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.2,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 11,
    color: theme.textMuted,
  },

  card: {
    position: "relative",
    backgroundColor: theme.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.22)",
    paddingTop: 15,
    paddingBottom: 12,
    paddingHorizontal: 8,
    minHeight: 255,
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
    width: 190,
    height: 190,
    borderRadius: 999,
    top: -115,
    left: -75,
    backgroundColor: "rgba(16,185,129,0.055)",
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  summaryLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(16,185,129,0.08)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.18)",
  },

  summaryLabel: {
    fontSize: 9.5,
    fontWeight: "600",
    color: theme.textMuted,
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

  sessionText: {
    fontSize: 10,
    fontWeight: "700",
    color: theme.primaryLight,
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
    borderColor: "rgba(16,185,129,0.13)",
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

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginTop: 13,
    marginHorizontal: 10,
    marginBottom: 5,
  },

  tooltip: {
    alignItems: "center",
    backgroundColor: theme.surface3,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.18)",
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
    paddingVertical: 32,
  },

  emptyIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(16,185,129,0.08)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.20)",
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