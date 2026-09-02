import React, { useRef } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { Plus, TrendingUp } from "lucide-react-native";
import { LineChart } from "react-native-gifted-charts";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GoalBottomSheet } from "@/features/home/components/GoalBottomSheet";
import { WeightGoal } from "@/features/home/types/HomeTypes";
import { theme } from "@/utils/theme";

interface WeightTrendChartProps {
  chartData: any[];
  isMovingAway: boolean;
  goal?: WeightGoal;
  loading: boolean;
}

const GREEN = theme.primary;
const GREEN_DARK = theme.primaryDark;
const RED = "#EF4444";

export function WeightTrendChart({
  chartData,
  isMovingAway,
  goal,
  loading,
}: WeightTrendChartProps) {
  const updateGoalSheetRef = useRef<BottomSheetModal>(null);
  const chartColor = isMovingAway ? RED : GREEN;

  const handleUpdateWeight = () => {
    if (!goal) {
      return;
    }

    updateGoalSheetRef.current?.present();
  };

  return (
    <>
      <View style={styles.sectionHeader}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Weight Trend</Text>
          <Text style={styles.subtitle}>Your weight over time</Text>
        </View>

        <Pressable
          onPress={handleUpdateWeight}
          disabled={!goal}
          style={({ pressed }) => [
            styles.updateButton,
            !goal && styles.updateButtonDisabled,
            pressed && goal && styles.updateButtonPressed,
          ]}
        >
          <Plus size={15} color="#FFFFFF" strokeWidth={2.5} />
          <Text style={styles.updateText}>Update</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.chartCard,
          {
            borderColor: isMovingAway ? `${RED}45` : `${GREEN}45`,
          },
        ]}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={chartColor} />
            <Text style={styles.loadingText}>Loading weight trend...</Text>
          </View>
        ) : chartData.length >= 2 ? (
          <LineChart
            data={chartData}
            height={190}
            width={310}
            spacing={Math.max(45, 310 / chartData.length)}
            initialSpacing={10}
            endSpacing={10}
            color={chartColor}
            thickness={2.5}
            dataPointsColor={chartColor}
            dataPointsRadius={3.5}
            curved
            areaChart
            startFillColor={chartColor}
            endFillColor={theme.card}
            startOpacity={0.12}
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
              pointerStripHeight: 160,
              pointerStripColor: theme.borderStrong,
              pointerStripWidth: 1,
              pointerColor: chartColor,
              radius: 5,
              pointerLabelWidth: 90,
              pointerLabelHeight: 45,
              activatePointersOnLongPress: true,
              autoAdjustPointerLabelPosition: true,
              pointerLabelComponent: (items: any[]) => {
                const item = items?.[0];

                return (
                  <View
                    style={[
                      styles.tooltip,
                      {
                        borderColor: `${chartColor}45`,
                      },
                    ]}
                  >
                    <Text style={styles.tooltipText}>{item?.value} kg</Text>
                  </View>
                );
              },
            }}
          />
        ) : (
          <View style={styles.emptyChart}>
            <View
              style={[
                styles.emptyIcon,
                {
                  borderColor: `${GREEN}35`,
                },
              ]}
            >
              <TrendingUp size={20} color={GREEN} strokeWidth={2} />
            </View>

            <Text style={styles.emptyChartTitle}>Not enough data yet</Text>

            <Text style={styles.emptyChartText}>
              Update your weight at least twice to see your trend.
            </Text>
          </View>
        )}
      </View>

      <GoalBottomSheet
        modalRef={updateGoalSheetRef}
        title="Update Goal"
        subtitle="Keep your fitness journey updated"
        buttonText="Update"
        initialCurrentWeight={goal?.current_weight}
        initialGoalWeight={goal?.target_weight}
        goalId={goal?.id}
        onClose={() => {}}
        mode="UPDATE"
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.text,
    letterSpacing: -0.2,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 11,
    color: theme.textMuted,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: GREEN,
    borderWidth: 1,
    borderColor: `${GREEN}55`,
  },
  updateButtonDisabled: {
    opacity: 0.45,
  },
  updateButtonPressed: {
    backgroundColor: GREEN_DARK,
    transform: [{ scale: 0.97 }],
  },
  updateText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  chartCard: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 7,
    minHeight: 225,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  loadingContainer: {
    minHeight: 190,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 10.5,
    fontWeight: "500",
    color: theme.textMuted,
  },
  tooltip: {
    backgroundColor: theme.surface,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  tooltipText: {
    color: theme.text,
    fontSize: 11,
    fontWeight: "700",
  },
  emptyChart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 35,
  },
  emptyIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
    borderWidth: 1,
    marginBottom: 9,
  },
  emptyChartTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
  },
  emptyChartText: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 16,
    color: theme.textMuted,
    textAlign: "center",
    maxWidth: 230,
  },
});