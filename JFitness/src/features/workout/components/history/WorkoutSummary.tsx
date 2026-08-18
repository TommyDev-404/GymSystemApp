import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Dumbbell,
  CalendarDays,
  Clock3,
  Activity,
} from "lucide-react-native";
import { theme } from "@/utils/theme";

interface WorkoutSummaryCardProps {
  totalWorkouts: number;
  weeklyWorkouts: number;
  averageDuration: number;
}

export function WorkoutSummaryCard({
  totalWorkouts,
  weeklyWorkouts,
  averageDuration,
}: WorkoutSummaryCardProps) {
  return (
    <View style={styles.card}>
      <View pointerEvents="none" style={styles.glow} />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <Activity
              size={17}
              color={theme.primaryLight}
              strokeWidth={2.2}
            />
          </View>

          <View>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Workout Summary</Text>

              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>ACTIVE</Text>
              </View>
            </View>

            <Text style={styles.subtitle}>
              Your training activity at a glance
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <View style={styles.statIcon}>
            <Dumbbell
              size={14}
              color={theme.primaryLight}
              strokeWidth={2.2}
            />
          </View>

          <Text style={styles.value}>{totalWorkouts}</Text>
          <Text style={styles.label}>Total Workouts</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <View style={styles.statIcon}>
            <CalendarDays
              size={14}
              color={theme.primaryLight}
              strokeWidth={2.2}
            />
          </View>

          <Text style={styles.value}>{weeklyWorkouts}</Text>
          <Text style={styles.label}>This Week</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <View style={styles.statIcon}>
            <Clock3
              size={14}
              color={theme.primaryLight}
              strokeWidth={2.2}
            />
          </View>

          <View style={styles.valueRow}>
            <Text style={styles.value}>{averageDuration}</Text>
            <Text style={styles.unit}>min</Text>
          </View>

          <Text style={styles.label}>Avg. Duration</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLine} />
        <Text style={styles.footerText}>
          Keep showing up. Consistency builds results.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "relative",
    padding: 16,
    borderRadius: 20,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.22)",
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
    width: 170,
    height: 170,
    borderRadius: 999,
    top: -110,
    right: -80,
    backgroundColor: "rgba(16,185,129,0.055)",
  },
  header: {
    marginBottom: 17,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "rgba(16,185,129,0.08)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.20)",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.2,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 10.5,
    color: theme.textMuted,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "rgba(16,185,129,0.07)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.13)",
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: theme.primaryLight,
  },
  statusText: {
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: theme.primaryLight,
  },
  statsContainer: {
    flexDirection: "row",
    minHeight: 100,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.018)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.10)",
  },
  stat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: 1,
    marginVertical: 16,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  statIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    backgroundColor: "rgba(16,185,129,0.07)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.16)",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 3,
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.6,
  },
  unit: {
    fontSize: 9,
    fontWeight: "700",
    color: theme.textMuted,
  },
  label: {
    marginTop: 3,
    fontSize: 9,
    fontWeight: "500",
    color: theme.textMuted,
    textAlign: "center",
  },
  footer: {
    marginTop: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footerLine: {
    width: 3,
    height: 14,
    borderRadius: 999,
    backgroundColor: theme.primary,
  },
  footerText: {
    flex: 1,
    fontSize: 9.5,
    fontWeight: "500",
    color: theme.textMuted,
  },
});