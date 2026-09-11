import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackWrapper } from "@/components/shared/StackWrapper";
import { theme } from "@/utils/theme";
import { useAuth } from "@/context/AuthContext";
import { useGetFitnessGoal } from "../../home/hook/useHome";
import {
  fitnessGuideData,
} from "../data/fitnessGuideData";
import {
  FitnessGuideType,
} from "../types/fitnessTypes";
import { GoalGuideCard } from "../components/GoalGuideCard";
import { WorkoutGuideCard } from "../components/WorkoutGuideCard";
import { NutritionGuideCard } from "../components/NutritionGuide";
import { DailyTipsCard } from "../components/DailyTipsCard";

export function FitnessGuideScreen() {
  const { memberIDs } = useAuth();

  const { data: memberWeightGoal } = useGetFitnessGoal(
    memberIDs?.member_id!
  );

  const guideType = useMemo<FitnessGuideType>(() => {
    const goalType = String(
      memberWeightGoal?.goal_type ?? ""
    ).toUpperCase();

    return goalType.includes("LOSS") ? "LOSS" : "GAIN";
  }, [memberWeightGoal?.goal_type]);

  const guide = fitnessGuideData[guideType];

  const currentWeight = Number(
    memberWeightGoal?.current_weight ?? 0
  );

  const targetWeight = Number(
    memberWeightGoal?.target_weight ?? 0
  );

  return (
    <StackWrapper
      title="Fitness Guide"
      subtitle="Goal-based workout and nutrition guidance"
    >
      <View style={styles.container}>

        <GoalGuideCard
          goalType={guideType}
          currentWeight={currentWeight}
          targetWeight={targetWeight}
          description={guide.goalDescription}
        />

        <WorkoutGuideCard guide={guide} />

        <NutritionGuideCard guide={guide} />

        <DailyTipsCard tips={guide.tips} />

        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimerTitle}>
            General Fitness Guidance
          </Text>

          <Text style={styles.disclaimerText}>
            These recommendations are general fitness and nutrition
            guidance intended to support your selected goal. Individual
            nutritional and exercise needs may vary.
          </Text>
        </View>

        <View style={styles.bottomSpace} />
      </View>
    </StackWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },

  disclaimerCard: {
    padding: 14,
    borderRadius: 15,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  disclaimerTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: theme.text,
  },

  disclaimerText: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 15,
    color: theme.textMuted,
  },

  bottomSpace: {
    height: 35,
  },
});