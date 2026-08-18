import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackground } from "@/components/shared/AppBackground";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { WorkoutSummaryCard } from "@/features/workout/components/history/WorkoutSummary";
import { WorkoutProgressChart } from "@/features/workout/components/history/WorkoutProgressChart";
import { WorkoutHistoryList } from "@/features/workout/components/history/WorkoutHistoryList";
import { useAuth } from "@/context/AuthContext";
import {
  useGetPersonalWorkoutHistory,
  useWorkoutProgress,
  useWorkoutSummary,
} from "../hook/useWorkout";
import { theme } from "@/utils/theme";

const GREEN = theme.primary;

export function WorkoutHistoryScreen() {
  const { member } = useAuth();

  const {
    data: chartData = [],
    isLoading: chartLoading,
  } = useWorkoutProgress(member?.memberId!);

  const {
    data: personalWorkoutHistory = [],
    isLoading: historyLoading,
  } = useGetPersonalWorkoutHistory(member?.memberId!);

  const {
    data: summary,
    isLoading: summaryLoading,
  } = useWorkoutSummary(Number(member?.memberId!));

  const isLoading =
    chartLoading || historyLoading || summaryLoading;

  if (isLoading) {
    return (
      <AppBackground>
        <SafeAreaView style={styles.container}>
          <ScreenHeader
            title="Workout History"
            subtitle="Track your training journey"
          />

          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="small"
              color={GREEN}
            />

            <Text style={styles.loadingText}>
              Loading your workouts...
            </Text>
          </View>
        </SafeAreaView>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Workout History"
          subtitle="Track your training journey"
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.section}>
            <WorkoutSummaryCard
              totalWorkouts={summary?.totalWorkouts ?? 0}
              weeklyWorkouts={summary?.weeklyWorkouts ?? 0}
              averageDuration={summary?.averageDuration ?? 0}
            />
          </View>

          <View style={styles.section}>
            <WorkoutProgressChart
              chartData={chartData}
            />
          </View>

          <View style={styles.section}>
            <WorkoutHistoryList
              workouts={personalWorkoutHistory}
            />
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  section: {
    marginBottom: 24,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 12,
    color: theme.textMuted,
  },

  bottomSpace: {
    height: 12,
  },
});