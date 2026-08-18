import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Scale } from "lucide-react-native";

import {
  useGetFitnessGoal,
  useGetFitnessGoalHistory,
} from "../../home/hook/useHome";

import { useAuth } from "@/context/AuthContext";

import { WeighProgressCard } from "../components/WeightProgressCard";
import { ProgressMetricGrid } from "../components/ProgressMetricGrid";
import { WeightTrendChart } from "../components/WeightTrendChart";
import { WeightHistory } from "../components/WeightHistory";
import { AppBackground } from "@/components/shared/AppBackground";
import { theme } from "@/utils/theme";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { PageLoader } from "@/components/shared/PageLoader";

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

    dataPointText: Number(
      item.current_weight
    ).toFixed(1),
  }));

  if (isLoading || weightGoalLoading) {
    return (
      <PageLoader
        title="Progress Information"
        subtitle="View and track your progress"
      />
    );
  }

  return (
    <AppBackground>
      <SafeAreaView style={styles.container}>

      <ScreenHeader
        title="Progress Information"
        subtitle="View and track your progress"
      />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* PAGE INTRO */}

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

          {/* CURRENT WEIGHT */}

          <WeighProgressCard
            currentWeight={currentWeight}
            startingWeight={startingWeight}
            isMovingAway={isMovingAway}
            goalType={memberWeightGoal?.goal_type!}
          />

          {/* PROGRESS SUMMARY */}

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Progress Summary
              </Text>

              <Text style={styles.sectionSubtitle}>
                Your current goal metrics
              </Text>
            </View>
          </View>

          <ProgressMetricGrid
            startingWeight={startingWeight}
            targetWeight={targetWeight}
            remainingWeight={remainingWeight}
            weightChange={weightChange}
            goalType={memberWeightGoal?.goal_type!}
            isMovingAway={isMovingAway}
          />

          {/* WEIGHT TREND */}

          <WeightTrendChart
            chartData={chartData}
            isMovingAway={isMovingAway}
            goal={memberWeightGoal}
          />

          {/* WEIGHT HISTORY */}

          <WeightHistory history={history} />

          <View style={styles.bottomSpace} />
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
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
  container: {
    flex: 1,

    // Important:
    // Don't use a light background here.
    backgroundColor: "transparent",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  pageHeader: {
    marginBottom: 18,
  
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
  sectionHeader: {
    marginTop: 24,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",

    color: theme.text,
  },

  sectionSubtitle: {
    marginTop: 3,

    fontSize: 11,

    color: theme.textMuted,
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
    height: 35,
  },
});