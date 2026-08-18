import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import {
  Flame,
  MapPin,
  Calendar,
  Trophy,
  Dumbbell,
  UsersRound,
} from "lucide-react-native";

import { GreetingHeader } from "@/features/home/components/GreetingHeader";
import { MembershipCard } from "@/features/home/components/MembershipCard";
import { StatsRow } from "@/features/home/components/StatsRow";
import { QuickActionsGrid } from "@/features/home/components/QuickActionsGrid";
import { ActivityList } from "@/features/home/components/ActivityList";
import { ProgressCard } from "../components/ProgressCard";
import { GoalStatusCard } from "../components/GoalStatusCard";
import { GoalBottomSheet } from "../components/GoalBottomSheet";

import {
  useGetFitnessGoal,
  useGetMemberDashboardData,
  useGetMemberRecentActivity,
} from "../hook/useHome";

import { useAuth } from "@/context/AuthContext";
import { MemberDashboard, WeightGoal } from "../types/HomeTypes";
import { Loading } from "@/components/shared/Loading";
import { theme } from "@/utils/theme";
import { AppBackground } from "@/components/shared/AppBackground";

export default function HomeScreen() {
  const { member } = useAuth();

  const {
    data: dashboardData = {} as MemberDashboard,
    isLoading: dashboardLoading,
  } = useGetMemberDashboardData(member?.memberId!);

  const {
    data: recentActivity = [],
    isLoading: recentLoading,
  } = useGetMemberRecentActivity(member?.memberId!);

  const {
    data: memberWeightGoal,
    isLoading: weightGoalLoading,
  } = useGetFitnessGoal(member?.memberId!);

  const goalSheetRef = useRef<BottomSheetModal>(null);
  const updateGoalSheetRef = useRef<BottomSheetModal>(null);

  const [goal, setGoal] = useState<WeightGoal | null>(null);
  const stats = useMemo(
	() => [
	  {
		 label: "Day Streak",
		 value: dashboardData?.stats?.dayStreak,
		 icon: Flame,
		 color: "#FB923C", // soft orange
	  },
	  {
		 label: "Total Visits",
		 value: dashboardData?.stats?.totalVisits,
		 icon: MapPin,
		 color: "#60A5FA", // soft blue
	  },
	  {
		 label: "This Month",
		 value: dashboardData?.stats?.thisMonth,
		 icon: Calendar,
		 color: theme.primary, // emerald
	  },
	],
	[dashboardData?.stats]
 );

  const actions = useMemo(
    () => [
      {
        label: "Refer a Friend",
        icon: UsersRound,
        bg: "#dbeafe",
        color: "#3b82f6",
        onPress: () =>
          router.push({
            pathname: "/(app)/referral",
            params: {
              memberId: String(member?.memberId),
            },
          }),
      },
      {
        label: "Rewards",
        icon: Trophy,
        bg: "#fef3c7",
        color: "#d97706",
        onPress: () =>
          router.push({
            pathname: "/(app)/rewards",
            params: {
              memberId: String(member?.memberId),
            },
          }),
      },
      {
        label: "Workout Tutorials",
        icon: Dumbbell,
        bg: "#d1fae5",
        color: "#10b981",
        onPress: () =>
          router.push({
            pathname: "/(app)/workout-tutorial",
          }),
      },
    ],
    [member?.memberId]
  );

  useEffect(() => {
    setGoal(memberWeightGoal ?? null);
  }, [memberWeightGoal]);

  if (dashboardLoading || recentLoading || weightGoalLoading) {
    return <Loading />;
  }

	return (
		<>
			<AppBackground>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollContent}
				>
				<GreetingHeader memberName={dashboardData?.username} />

				<MembershipCard
					plan={dashboardData?.plan}
					membership_start={dashboardData?.membership_start!}
					expiry={dashboardData?.expiry!}
					status={dashboardData?.status}
					points={dashboardData?.points}
				/>

				<StatsRow stats={stats} />

				{goal ? (
					<ProgressCard
						goalType={goal.goal_type}
						startingWeight={goal.start_weight}
						currentWeight={goal.current_weight}
						goalWeight={goal.target_weight}
						percentage={goal.progress_percentage}
						onPress={() => updateGoalSheetRef.current?.present()}
						onHistoryPress={() =>
						router.push({
							pathname: "/(app)/fitness-history",
							params: {
								goalId: String(goal.id),
							},
						})
						}
						onNewGoalPress={() => {
						goalSheetRef.current?.present();
						}}
					/>
				) : (
					<GoalStatusCard
						onPress={() => goalSheetRef.current?.present()}
					/>
				)}

				<QuickActionsGrid actions={actions} />

				<ActivityList activities={recentActivity} />
				</ScrollView>
			</AppBackground>

			<GoalBottomSheet
				modalRef={goalSheetRef}
				title="Set Weight Goal 🎯"
				subtitle="Define your target weight and start tracking progress"
				buttonText="Save Goal"
				onClose={() => {}}
				mode="CREATE"
			/>
		</>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		paddingBottom: 30,
		paddingHorizontal: 20,
	  gap: 20,
	},
 });