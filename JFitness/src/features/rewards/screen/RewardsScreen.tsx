import React from "react";
import { View } from "react-native";
import PointsCard from "@/features/rewards/components/PointsCard";
import AvailableRewards from "@/features/rewards/components/AvailableRewards";
import RedeemedSection from "@/features/rewards/components/RedeemedSection";
import { MemberDashboard } from "@/features/home/types/HomeTypes";
import { useGetMemberDashboardData } from "@/features/home/hook/useHome";
import { useAuth } from "@/context/AuthContext";
import { useFetchAvailableRewards } from "../hook/useReward";
import { StackWrapper } from "@/components/shared/StackWrapper";

export default function RewardsScreen() {
  const { member } = useAuth();
  const { data: dashboardData = {} as MemberDashboard } =
    useGetMemberDashboardData(member?.memberId!);
  const { data: rewards = [], isLoading: rewardsLoading } =
    useFetchAvailableRewards();

  return (
    <StackWrapper
      title="Rewards"
      subtitle="Earn & redeem your points"
      loading={rewardsLoading}
    >
      <PointsCard points={dashboardData?.points ?? 0} />
      <AvailableRewards
        data={rewards}
        points={dashboardData?.points ?? 0}
      />
      <RedeemedSection />
      <View style={{ height: 35 }} />
    </StackWrapper>
  );
}