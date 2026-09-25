import { useState } from "react";
import { Star, Gift } from "lucide-react-native";
import ReferralHero from "@/features/referral/components/ReferralHero";
import MilestonesSection from "@/features/referral/components/ReferrralRules";
import ReferralList from "@/features/referral/components/ReferralList";
import {
  useGetMemberReferralData,
  useGetMemberReferralRecords,
} from "../hook/useReferral";
import { useAuth } from "@/context/AuthContext";
import { ReferralData } from "../types/ReferralTypes";
import { StackWrapper } from "@/components/shared/StackWrapper";

export const referralRules = [
  {
    title: "Invite a Friend",
    reward: "+100 Points",
    description:
      "Earn 100 points every time a friend joins using your referral code.",
    icon: Star,
    color: "#10b981",
  },
  {
    title: "Use a Referral Code",
    reward: "+50 Points",
    description:
      "Enter a co-member's referral code during registration and earn 50 points.",
    icon: Gift,
    color: "#3b82f6",
  },
];

export default function ReferralScreen() {
  const { memberIDs } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: referralData = {} as ReferralData,
    isLoading: dataLoading,
    refetch: refetchReferralData,
  } = useGetMemberReferralData(memberIDs?.member_id!);

  const {
    data: referralHistory = [],
    isLoading: historyLoading,
    refetch: refetchReferralHistory,
  } = useGetMemberReferralRecords(memberIDs?.member_id!);

  const isLoading = dataLoading;

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await Promise.all([
        refetchReferralData(),
        refetchReferralHistory(),
      ]);
    } catch (error) {
      console.error("❌ Referral refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <StackWrapper
      title="Referral Program"
      subtitle="Invite friends. Earn rewards together."
      loading={isLoading}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    >
      <ReferralHero
        code={referralData?.referral_code}
        link="testing.com"
        activeReferrals={referralData?.total_referred}
        points={referralData?.points_earned}
      />

      <MilestonesSection data={referralRules} />

      <ReferralList
        data={referralHistory}
        loading={historyLoading}
      />
    </StackWrapper>
  );
}