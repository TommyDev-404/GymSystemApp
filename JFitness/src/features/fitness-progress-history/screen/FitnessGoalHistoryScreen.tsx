import React from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Scale,
} from "lucide-react-native";

import {
	useGetFitnessGoal,
  useGetFitnessGoalHistory,
} from "../../home/hook/useHome";

import {
  useAuth,
} from "@/context/AuthContext";

import {
  BodyProgressHeader,
} from "../components/Header";

import {
	WeighProgressCard,
} from "../components/WeightProgressCard";

import {
  ProgressMetricGrid,
} from "../components/ProgressMetricGrid";

import {
  WeightTrendChart,
} from "../components/WeightTrendChart";

import {
  WeightHistory,
} from "../components/WeightHistory";

const GREEN = "#10B981";

const SLATE_50 = "#F8FAFC";
const SLATE_400 = "#94A3B8";
const SLATE_500 = "#64748B";
const SLATE_900 = "#0F172A";

export function FitnessGoalHistoryScreen() {

  const { member } = useAuth();

  const {
    data: history = [],
    isLoading,
  } = useGetFitnessGoalHistory(
    Number(member?.memberId!)
	  );
	const { data: memberWeightGoal, isLoading: weightGoalLoading } = useGetFitnessGoal(member?.memberId!);
	
  const startingWeight = Number(memberWeightGoal?.start_weight ?? 0);
  const currentWeight = Number(memberWeightGoal?.current_weight ?? 0);
  const targetWeight = Number(memberWeightGoal?.target_weight ?? 0);
  const percentage = Number(memberWeightGoal?.progress_percentage ?? 0);

  const isMovingAway = percentage < 0;
  const remainingWeight = Math.abs(
      currentWeight -
      targetWeight
    );
	const weightChange = currentWeight - startingWeight;

  const chartHistory = [...history].reverse();
  const chartData =
    chartHistory.map(
      (item) => ({
        value: Number(
          item.current_weight
        ),

        label:
          formatShortDate(
            item.recorded_at
          ),

        dataPointText:
          Number(
            item.current_weight
          ).toFixed(1),
      })
    );

  if (isLoading) {

    return (
      <SafeAreaView
        style={styles.container}
      >

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
        />

        <BodyProgressHeader />

        <View
          style={
            styles.loadingContainer
          }
        >
          <ActivityIndicator
            size="small"
            color={GREEN}
          />

          <Text
            style={
              styles.loadingText
            }
          >
            Loading your progress...
          </Text>

        </View>

      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <BodyProgressHeader />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }
      >

        {/* PAGE INTRO */}

        <View
          style={styles.pageHeader}
        >

          <View>

            <Text
              style={styles.pageTitle}
            >
              Body Progress
            </Text>

            <Text
              style={styles.pageSubtitle}
            >
              Monitor your weight journey
            </Text>

          </View>

          <View
            style={styles.scaleBadge}
          >

            <Scale
              size={19}
              color={GREEN}
              strokeWidth={2}
            />

          </View>

        </View>

        {/* CURRENT WEIGHT */}

        <WeighProgressCard
				  currentWeight={
					  currentWeight
				  }
				  startingWeight={
					  startingWeight
				  }
				  isMovingAway={
					  isMovingAway
				  }
				  goalType={memberWeightGoal?.goal_type!}
        />

        {/* PROGRESS SUMMARY */}

        <View
          style={
            styles.sectionHeader
          }
        >

          <View>

            <Text
              style={
                styles.sectionTitle
              }
            >
              Progress Summary
            </Text>

            <Text
              style={
                styles.sectionSubtitle
              }
            >
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
          chartData={
            chartData
          }
          isMovingAway={
            isMovingAway
          }
         
			goal={memberWeightGoal}
        />

        {/* WEIGHT HISTORY */}

        <WeightHistory
          history={history}
        />

        <View
          style={styles.bottomSpace}
        />

      </ScrollView>

    </SafeAreaView>
  );
}

function formatShortDate(
  date?: string
) {

  if (!date) {
    return "";
  }

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return "";
  }

  return parsed.toLocaleDateString(
    "en-PH",
    {
      month: "short",
      day: "numeric",
    }
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor: SLATE_50,
  },

  scrollContent: {
    paddingHorizontal: 20,

    paddingTop: 20,
  },

  pageHeader: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: 18,
  },

  pageTitle: {
    fontSize: 25,

    fontWeight: "800",

    color: SLATE_900,

    letterSpacing: -0.5,
  },

  pageSubtitle: {
    marginTop: 3,

    fontSize: 12,

    color: SLATE_500,
  },

  scaleBadge: {
    width: 42,
    height: 42,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#ECFDF5",
  },

  sectionHeader: {
    marginTop: 24,

    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 15,

    fontWeight: "700",

    color: SLATE_900,
  },

  sectionSubtitle: {
    marginTop: 3,

    fontSize: 11,

    color: SLATE_400,
  },

  loadingContainer: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",
  },

  loadingText: {
    marginTop: 10,

    fontSize: 12,

    color: SLATE_500,
  },

  bottomSpace: {
    height: 35,
  },

});