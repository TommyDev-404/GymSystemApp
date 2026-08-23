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
  const { member } = useAuth();

  const { data: chartData = [], isLoading: chartLoading } =
    useWorkoutProgress(member?.memberId!);

  const { data: personalWorkoutHistory = [], isLoading: historyLoading } =
    useGetPersonalWorkoutHistory(member?.memberId!);

  const { data: summary, isLoading: summaryLoading } = useWorkoutSummary(
    Number(member?.memberId!)
  );

  const isLoading = chartLoading || historyLoading || summaryLoading;

  return (
    <StackWrapper
      title="Workout History"
      subtitle="Track your training journey"
      loading={isLoading}
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