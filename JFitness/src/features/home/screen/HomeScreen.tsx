import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StatusBar } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
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
import { RewardProgressCard } from "@/features/home/components/RewardProgressCard";
import { QuickActionsGrid } from "@/features/home/components/QuickActionsGrid";
import { ActivityList } from "@/features/home/components/ActivityList";
import { ProgressCard } from "../components/ProgressCard";
import { GoalStatusCard } from "../components/GoalStatusCard";
import { GoalBottomSheet } from "../components/GoalBottomSheet";
import { useGetFitnessGoal, useGetMemberDashboardData, useGetMemberRecentActivity } from "../hook/useHome";
import { useAuth } from "@/context/AuthContext";
import { MemberDashboard, WeightGoal } from "../types/HomeTypes";
import { Loading } from "@/components/shared/Loading";


export default function HomeScreen() {
	const { member } = useAuth();

	const { data: dashboardData = {} as MemberDashboard, isLoading: dashboardLoading } = useGetMemberDashboardData(member?.memberId!);
	const { data: recentActivity = [], isLoading: recentLoading } = useGetMemberRecentActivity(member?.memberId!);
	const { data: memberWeightGoal, isLoading: weightGoalLoading } = useGetFitnessGoal(member?.memberId!);
	
	const goalSheetRef = useRef<BottomSheetModal>(null);
	const updateGoalSheetRef = useRef<BottomSheetModal>(null);

	const [goal, setGoal] = useState<WeightGoal | null>(null);
	
	const stats = useMemo(
		() => [
			{ label: "Day Streak", value: dashboardData?.stats?.dayStreak, icon: Flame, color: "#f97316", bg: "#fff7ed" },
			{ label: "Total Visits", value: dashboardData?.stats?.totalVisits, icon: MapPin, color: "#3b82f6", bg: "#eff6ff" },
			{ label: "This Month", value: dashboardData?.stats?.thisMonth, icon: Calendar, color: "#10b981", bg: "#d1fae5" },
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
						params: { memberId: String(member?.memberId) },
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
						params: { memberId: String(member?.memberId) },
					}),
			},
			
			{
				label: "Workout Tutorials",
				icon: Dumbbell,
				bg: "#d1fae5",
				color: "#10b981",
				onPress: () => router.push({ pathname: "/(app)/workout-tutorial" }),
			},
		],
		[member?.memberId]
	);

	useEffect(() => {
		setGoal(memberWeightGoal ?? null);
	}, [memberWeightGoal]);

	if (dashboardLoading || recentLoading || weightGoalLoading ) return <Loading />;

	return (
		<>
			<StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 30, gap: 20 }}
			>
				<GreetingHeader memberName={dashboardData?.username} />

				<MembershipCard
					plan={dashboardData?.plan}
					membership_start={dashboardData?.membership_start!}
					expiry={dashboardData?.expiry!}
					status={dashboardData?.status}
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
								pathname:"/(app)/fitness-history",
								params:{
									goalId:String(goal.id)
								}
							})
						}
						 onNewGoalPress={() => {
							goalSheetRef.current?.present();
						}}
				 	/>
				) : (
					<GoalStatusCard onPress={() => goalSheetRef.current?.present()}/>
				)}

				<RewardProgressCard points={dashboardData?.points} />

				<QuickActionsGrid actions={actions} />

				<ActivityList activities={recentActivity} />
			</ScrollView>

			{/* Initial goal setup */}
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