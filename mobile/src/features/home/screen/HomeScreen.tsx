import { ScrollView, StatusBar } from "react-native";

import { GreetingHeader } from "@/features/home/components/GreetingHeader";
import { MembershipCard } from "@/features/home/components/MembershipCard";
import { StatsRow } from "@/features/home/components/StatsRow";
import { RewardProgressCard } from "@/features/home/components/RewardProgressCard";
import { QuickActionsGrid } from "@/features/home/components/QuickActionsGrid";
import { ActivityList } from "@/features/home/components/ActivityList";

import {
  Flame,
  MapPin,
  Calendar,
  Trophy,
  Dumbbell,
  Activity,
  Zap,
  UsersRound
} from "lucide-react-native";
import { useGetMemberDashboardData, useGetMemberRecentActivity } from "../hook/useHome";
import { MemberDashboard } from "../types/HomeTypes";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

const activities = [
  {
    title: "Completed Chest Workout",
    description: "Workout completed • 52 min • 384 kcal",
    created_at: new Date(),
    icon: Dumbbell,
  },
  {
    title: "Completed Leg Workout",
    description: "Workout completed • 65 min • 420 kcal",
    created_at: new Date(
      Date.now() - 24 * 60 * 60 * 1000
    ),
    icon: Activity,
  },
  {
    title: "Completed HIIT Workout",
    description: "Workout completed • 30 min • 310 kcal",
    created_at: new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000
    ),
    icon: Zap,
  },
];

const formattedActivities = activities.map(activity => ({
  name: activity.title,
  action: activity.description,
  time: activity.created_at.toISOString(),
}));

interface HomeScreenProps {
  onOpenAI: () => void;
}

export default function HomeScreen({ onOpenAI }: HomeScreenProps) {
  const { member } = useAuth();

  const { data: dashboardData = {} as MemberDashboard, isLoading } = useGetMemberDashboardData(member?.memberId!);
  const { data: recentActivity = [], isLoading: recentLoading } = useGetMemberRecentActivity(member?.memberId!);

  const stats = [
    { label: "Day Streak", value: dashboardData?.stats?.dayStreak, icon: Flame, color: "#f97316", bg: "#fff7ed" },
    { label: "Total Visits", value: dashboardData?.stats?.totalVisits, icon: MapPin, color: "#3b82f6", bg: "#eff6ff" },
    { label: "This Month", value: dashboardData?.stats?.thisMonth, icon: Calendar, color: "#10b981", bg: "#d1fae5" },
  ];
  
  const actions = [
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
  ];

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f8fafc"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          gap: 20,
        }}
      >
        <GreetingHeader memberName={dashboardData?.username} />

        <MembershipCard
          plan={dashboardData?.plan}
          join_date={dashboardData?.join_date!}
          expiry={dashboardData?.expiry!}
          status={dashboardData?.status}
        />

        <StatsRow stats={stats} />

        <RewardProgressCard points={dashboardData?.points}/>

        <QuickActionsGrid actions={actions} />

        <ActivityList activities={recentActivity} />

      </ScrollView>
    </>
  );
}