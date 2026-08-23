import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Scale } from "lucide-react-native";
import { EaseView } from "react-native-ease";
import {
  useGetFitnessGoal,
  useGetFitnessGoalHistory,
} from "../../home/hook/useHome";
import { useAuth } from "@/context/AuthContext";
import { WeighProgressCard } from "../components/WeightProgressCard";
import { ProgressMetricGrid } from "../components/ProgressMetricGrid";
import { WeightTrendChart } from "../components/WeightTrendChart";
import { WeightHistory } from "../components/WeightHistory";
import { StackWrapper } from "@/components/shared/StackWrapper";
import { theme } from "@/utils/theme";

const GREEN = theme.primary;

export function FitnessGoalHistoryScreen() {
  const { member } = useAuth();

  const {
    data: history = [],
    isLoading,
  } = useGetFitnessGoalHistory(Number(member?.memberId!));

  const {
    data: memberWeightGoal,
    isLoading: weightGoalLoading,
  } = useGetFitnessGoal(member?.memberId!);

  const startingWeight = Number(
    memberWeightGoal?.start_weight ?? 0
  );

  const currentWeight = Number(
    memberWeightGoal?.current_weight ?? 0
  );

  const targetWeight = Number(
    memberWeightGoal?.target_weight ?? 0
  );

  const percentage = Number(
    memberWeightGoal?.progress_percentage ?? 0
  );

  const isMovingAway = percentage < 0;

  const remainingWeight = Math.abs(
    currentWeight - targetWeight
  );

  const weightChange = currentWeight - startingWeight;

  const chartHistory = [...history].reverse();

  const chartData = chartHistory.map((item) => ({
    value: Number(item.current_weight),
    label: formatShortDate(item.recorded_at),
    dataPointText: Number(item.current_weight).toFixed(1),
  }));

  return (
    <StackWrapper
      title="Progress Information"
      subtitle="View and track your progress"
      loading={isLoading || weightGoalLoading}
    >
        <View style={styles.pageHeader}>
          <View style={styles.pageHeaderText}>
            <Text style={styles.pageTitle}>
              Body Progress
            </Text>

            <Text style={styles.pageSubtitle}>
              Monitor your weight journey
            </Text>
          </View>

          <View style={styles.scaleBadge}>
            <Scale
              size={17}
              color={GREEN}
              strokeWidth={2.2}
            />
          </View>
        </View>

        <WeighProgressCard
          currentWeight={currentWeight}
          startingWeight={startingWeight}
          isMovingAway={isMovingAway}
          goalType={memberWeightGoal?.goal_type!}
        />

        <ProgressMetricGrid
          startingWeight={startingWeight}
          targetWeight={targetWeight}
          remainingWeight={remainingWeight}
          weightChange={weightChange}
          goalType={memberWeightGoal?.goal_type!}
          isMovingAway={isMovingAway}
        />

        <WeightTrendChart
          chartData={chartData}
          isMovingAway={isMovingAway}
          goal={memberWeightGoal}
        />

        <WeightHistory history={history} />

        <View style={styles.bottomSpace} />
    </StackWrapper>
  );
}

function formatShortDate(date?: string) {
  if (!date) {
    return "";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
  });
}

const styles = StyleSheet.create({
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageHeaderText: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.6,
  },
  pageSubtitle: {
    marginTop: 4,
    fontSize: 11.5,
    fontWeight: "500",
    color: theme.textMuted,
  },
  scaleBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(16,185,129,0.07)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.20)",
    shadowColor: GREEN,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 2,
  },
  bottomSpace: {
    height: 35,
  },
});