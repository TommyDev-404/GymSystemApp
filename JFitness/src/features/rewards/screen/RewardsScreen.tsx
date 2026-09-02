import { View } from "react-native";
import PointsCard from "@/features/rewards/components/PointsCard";
import AvailableRewards from "@/features/rewards/components/AvailableRewards";
import RedeemedSection from "@/features/rewards/components/RedeemedSection";
import { MemberDashboard } from "@/features/home/types/HomeTypes";
import { useGetMemberDashboardData } from "@/features/home/hook/useHome";
import { useAuth } from "@/context/AuthContext";
import { useFetchAvailableRewards, useFetchRedeemedRewards } from "../hook/useReward";
import { StackWrapper } from "@/components/shared/StackWrapper";

export default function RewardsScreen() {
  const { memberIDs } = useAuth();
  const memberId = memberIDs?.member_id!;

  const { data: dashboardData = {} as MemberDashboard } = useGetMemberDashboardData(memberId);
  const { data: rewards = [], isLoading: rewardsLoading } = useFetchAvailableRewards();
  const { data: redeemedRewards = [], isLoading: redeemedLoading } = useFetchRedeemedRewards(memberId);
  const points = dashboardData?.points ?? 0;

  return (
    <StackWrapper title="Rewards" subtitle="Earn & redeem your points">
      <PointsCard points={points} />

      <AvailableRewards data={rewards} points={points} loading={rewardsLoading} />
      
      <RedeemedSection data={redeemedRewards} loading={redeemedLoading} />
    </StackWrapper>
  );
}