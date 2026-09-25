import { useState } from "react";

import { WorkoutSummaryCard } from "@/features/workout/components/history/WorkoutSummary";
import { WorkoutProgressChart } from "@/features/workout/components/history/WorkoutProgressChart";
import { WorkoutHistoryList } from "@/features/workout/components/history/WorkoutHistoryList";
import { StackWrapper } from "@/components/shared/StackWrapper";
import { useAuth } from "@/context/AuthContext";
import {
  useGetPersonalWorkoutHistory,
  useWorkoutProgress,
  useWorkoutSummary,
} from "../hook/useWorkout";

export function WorkoutHistoryScreen() {
  const { memberIDs } = useAuth();
  const memberId = memberIDs?.member_id!;

  const [refreshing, setRefreshing] = useState(false);

  const {
    data: chartData = [],
    isLoading: chartLoading,
    refetch: refetchChart,
  } = useWorkoutProgress(memberId);

  const {
    data: personalWorkoutHistory = [],
    isLoading: historyLoading,
    refetch: refetchHistory,
  } = useGetPersonalWorkoutHistory(memberId);

  const {
    data: summary,
    isLoading: summaryLoading,
    refetch: refetchSummary,
  } = useWorkoutSummary(Number(memberId));

  const isLoading = chartLoading || historyLoading || summaryLoading;

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await Promise.all([
        refetchChart(),
        refetchHistory(),
        refetchSummary(),
      ]);
    } catch (error) {
      console.error("❌ Workout history refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <StackWrapper
      title="Workout History"
      subtitle="Track your training journey"
      loading={isLoading}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    >
      <WorkoutSummaryCard
        totalWorkouts={summary?.totalWorkouts ?? 0}
        weeklyWorkouts={summary?.weeklyWorkouts ?? 0}
        averageDuration={summary?.averageDuration ?? 0}
      />

      <WorkoutProgressChart chartData={chartData} />

      <WorkoutHistoryList workouts={personalWorkoutHistory} />
    </StackWrapper>
  );
}