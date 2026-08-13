import React, { useRef } from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  Plus,
  TrendingUp,
} from "lucide-react-native";

import {
  LineChart,
} from "react-native-gifted-charts";

import { GoalBottomSheet } from "@/features/home/components/GoalBottomSheet";

import {
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { WeightGoal } from "@/features/home/types/HomeTypes";


interface WeightTrendChartProps {
  chartData: any[];
  isMovingAway: boolean;
  goal?: WeightGoal;
}


const GREEN = "#10B981";
const GREEN_DARK = "#059669";
const RED = "#EF4444";

const SLATE_100 = "#F1F5F9";
const SLATE_200 = "#E2E8F0";
const SLATE_400 = "#94A3B8";
const SLATE_900 = "#0F172A";


export function WeightTrendChart({
  chartData,
  isMovingAway,
  goal,
}: WeightTrendChartProps) {

  const updateGoalSheetRef =
    useRef<BottomSheetModal>(null);


  const chartColor =
    isMovingAway
      ? RED
      : GREEN;


  const handleUpdateWeight = () => {

    if (!goal) {
      return;
    }

    updateGoalSheetRef.current?.present();
  };


  return (
    <>

      {/* SECTION HEADER */}

      <View style={styles.sectionHeader}>

        <View>

          <Text style={styles.title}>
            Weight Trend
          </Text>

          <Text style={styles.subtitle}>
            Your weight over time
          </Text>

        </View>


        <Pressable
          onPress={handleUpdateWeight}
          disabled={!goal}
          style={({ pressed }) => [
            styles.updateButton,

            !goal &&
              styles.updateButtonDisabled,

            pressed &&
              goal &&
              styles.updateButtonPressed,
          ]}
        >

          <Plus
            size={15}
            color="#FFFFFF"
            strokeWidth={2.5}
          />

          <Text style={styles.updateText}>
            Update
          </Text>

        </Pressable>

      </View>


      {/* CHART */}

      <View style={styles.chartCard}>

        {chartData.length >= 2 ? (

          <LineChart
            data={chartData}

            height={190}
            width={310}

            spacing={Math.max(
              45,
              310 / chartData.length
            )}

            initialSpacing={10}
            endSpacing={10}

            color={chartColor}

            thickness={2.5}

            dataPointsColor={chartColor}
            dataPointsRadius={4}

            curved
            areaChart

            startFillColor={chartColor}
            endFillColor="#FFFFFF"

            startOpacity={0.12}
            endOpacity={0.01}

            hideRules={false}

            rulesColor={SLATE_100}
            yAxisColor={SLATE_200}
            xAxisColor={SLATE_200}

            yAxisTextStyle={{
              color: SLATE_400,
              fontSize: 10,
            }}

            xAxisLabelTextStyle={{
              color: SLATE_400,
              fontSize: 9,
            }}

            hideDataPoints={false}

            focusEnabled

            pointerConfig={{
              pointerStripHeight: 160,

              pointerStripColor:
                SLATE_200,

              pointerStripWidth: 1,

              pointerColor:
                chartColor,

              radius: 5,

              pointerLabelWidth: 90,
              pointerLabelHeight: 45,

              activatePointersOnLongPress:
                true,

              autoAdjustPointerLabelPosition:
                true,

              pointerLabelComponent:
                (items: any[]) => {

                  const item =
                    items?.[0];

                  return (
                    <View
                      style={
                        styles.tooltip
                      }
                    >

                      <Text
                        style={
                          styles.tooltipText
                        }
                      >
                        {item?.value}
                        {" kg"}
                      </Text>

                    </View>
                  );
                },
            }}
          />

        ) : (

          <View style={styles.emptyChart}>

            <TrendingUp
              size={30}
              color={SLATE_400}
            />

            <Text
              style={
                styles.emptyChartTitle
              }
            >
              Not enough data yet
            </Text>

            <Text
              style={
                styles.emptyChartText
              }
            >
              Update your weight at least
              twice to see your trend.
            </Text>

          </View>

        )}

      </View>


      {/* UPDATE GOAL / WEIGHT */}

      <GoalBottomSheet
        modalRef={updateGoalSheetRef}

        title="Update Goal 📈"

        subtitle="Keep your fitness journey updated"

        buttonText="Update"

        initialCurrentWeight={
          goal?.current_weight
        }

        initialGoalWeight={
          goal?.target_weight
        }

        goalId={goal?.id}

        onClose={() => {}}

        mode="UPDATE"
      />

    </>
  );
}


const styles = StyleSheet.create({

  sectionHeader: {
    marginTop: 24,
    marginBottom: 10,

    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 15,

    fontWeight: "700",

    color: SLATE_900,
  },

  subtitle: {
    marginTop: 3,

    fontSize: 11,

    color: SLATE_400,
  },

  updateButton: {
    flexDirection: "row",

    alignItems: "center",

    gap: 4,

    paddingHorizontal: 11,
    paddingVertical: 8,

    borderRadius: 10,

    backgroundColor: GREEN,
  },

  updateButtonDisabled: {
    opacity: 0.5,
  },

  updateButtonPressed: {
    backgroundColor: GREEN_DARK,
  },

  updateText: {
    color: "#FFFFFF",

    fontSize: 11,

    fontWeight: "700",
  },

  chartCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    borderWidth: 1,
    borderColor: SLATE_100,

    paddingVertical: 16,
    paddingHorizontal: 7,

    minHeight: 225,

    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",
  },

  tooltip: {
    backgroundColor: SLATE_900,

    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 7,
  },

  tooltipText: {
    color: "#FFFFFF",

    fontSize: 11,

    fontWeight: "700",
  },

  emptyChart: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 35,
  },

  emptyChartTitle: {
    marginTop: 10,

    fontSize: 13,

    fontWeight: "700",

    color: "#334155",
  },

  emptyChartText: {
    marginTop: 4,

    fontSize: 11,

    color: SLATE_400,

    textAlign: "center",
  },

});