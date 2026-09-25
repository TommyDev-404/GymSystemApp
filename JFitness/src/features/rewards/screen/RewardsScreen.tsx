import { useState } from "react";
import PointsCard from "@/features/rewards/components/PointsCard";
import AvailableRewards from "@/features/rewards/components/AvailableRewards";
import RedeemedSection from "@/features/rewards/components/RedeemedSection";
import { MemberDashboard } from "@/features/home/types/HomeTypes";
import { useGetMemberDashboardData } from "@/features/home/hook/useHome";
import { useAuth } from "@/context/AuthContext";
import {
  useFetchAvailableRewards,
  useFetchRedeemedRewards,
} from "../hook/useReward";
import { StackWrapper } from "@/components/shared/StackWrapper";

export default function RewardsScreen() {
  const { memberIDs } = useAuth();
  const memberId = memberIDs?.member_id!;

  const [refreshing, setRefreshing] = useState(false);

  const {
    data: dashboardData = {} as MemberDashboard,
    refetch: refetchDashboardData,
  } = useGetMemberDashboardData(memberId);

  const {
    data: rewards = [],
    isLoading: rewardsLoading,
    refetch: refetchRewards,
  } = useFetchAvailableRewards();

  const {
    data: redeemedRewards = [],
    isLoading: redeemedLoading,
    refetch: refetchRedeemedRewards,
  } = useFetchRedeemedRewards(memberId);

  const points = dashboardData?.points ?? 0;

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await Promise.all([
        refetchDashboardData(),
        refetchRewards(),
        refetchRedeemedRewards(),
      ]);
    } catch (error) {
      console.error("❌ Rewards refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <StackWrapper
      title="Rewards"
      subtitle="Earn & redeem your points"
      refreshing={refreshing}
      onRefresh={handleRefresh}
    >
      <PointsCard points={points} />

      <AvailableRewards
        data={rewards}
        points={points}
        loading={rewardsLoading}
      />

      <RedeemedSection
        data={redeemedRewards}
        loading={redeemedLoading}
      />
    </StackWrapper>
  );
}