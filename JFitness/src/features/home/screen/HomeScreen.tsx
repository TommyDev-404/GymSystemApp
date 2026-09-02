import { useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import {
  Calendar,
  Dumbbell,
  Flame,
  MapPin,
  Trophy,
  UsersRound,
} from "lucide-react-native";
import { TabWrapper } from "@/components/shared/TabWrapper";
import { useAuth } from "@/context/AuthContext";
import { GreetingHeader } from "@/features/home/components/GreetingHeader";
import { MembershipCard } from "@/features/home/components/MembershipCard";
import { StatsRow } from "@/features/home/components/StatsRow";
import { QuickActionsGrid } from "@/features/home/components/QuickActionsGrid";
import { ActivityList } from "@/features/home/components/ActivityList";
import { theme } from "@/utils/theme";
import { GoalBottomSheet } from "../components/GoalBottomSheet";
import { GoalStatusCard } from "../components/GoalStatusCard";
import { ProgressCard } from "../components/ProgressCard";
import {
  useGetFitnessGoal,
  useGetMemberDashboardData,
  useGetMemberRecentActivity,
} from "../hook/useHome";
import { MemberDashboard, WeightGoal } from "../types/HomeTypes";
import { useGetProfileInfo } from "@/features/profile/hook/useProfile";

export default function HomeScreen() {
  const { memberIDs } = useAuth();

  const [goal, setGoal] = useState<WeightGoal | null>(null);
  const goalSheetRef = useRef<BottomSheetModal>(null);
  const updateGoalSheetRef = useRef<BottomSheetModal>(null);

  const { data: profileInfo, isLoading: profileLoading, } = useGetProfileInfo(memberIDs?.user_id!);
  const { data: dashboardData = {} as MemberDashboard, isLoading: dashboardLoading } = useGetMemberDashboardData(profileInfo?.member_id!);
  const { data: recentActivity = [], isLoading: recentLoading } = useGetMemberRecentActivity(profileInfo?.member_id!);
  const { data: memberWeightGoal, isLoading: weightGoalLoading } = useGetFitnessGoal(profileInfo?.member_id!);

  useEffect(() => {
    setGoal(memberWeightGoal ?? null);
  }, [memberWeightGoal]);

  const stats = useMemo(
    () => [
      {
        label: "Day Streak",
        value: dashboardData?.stats?.dayStreak,
        icon: Flame,
        color: "#FB923C",
      },
      {
        label: "Total Visits",
        value: dashboardData?.stats?.totalVisits,
        icon: MapPin,
        color: "#60A5FA",
      },
      {
        label: "This Month",
        value: dashboardData?.stats?.thisMonth,
        icon: Calendar,
        color: theme.primary,
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
              memberId: String(profileInfo?.member_id!),
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
              memberId: String(profileInfo?.member_id!),
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
    [profileInfo?.member_id!]
  );

  const loading = dashboardLoading || recentLoading || weightGoalLoading || profileLoading;

  return (
    <>
      <TabWrapper
        loading={loading}
        horizontalPadding={15}
        gap={20}
      >
        <GreetingHeader username={profileInfo?.username!} />

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
            onNewGoalPress={() => goalSheetRef.current?.present()}
          />
        ) : (
          <GoalStatusCard
            onPress={() => goalSheetRef.current?.present()}
          />
        )}

        <QuickActionsGrid actions={actions} />

        <ActivityList activities={recentActivity} />
      </TabWrapper>

      <GoalBottomSheet
        modalRef={goalSheetRef}
        title="Set Weight Goal"
        subtitle="Define your target weight and start tracking progress"
        buttonText="Save Goal"
        onClose={() => {}}
        mode="CREATE"
      />
    </>
  );
}