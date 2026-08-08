import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/features/referral/components/Header";
import ReferralHero from "@/features/referral/components/ReferralHero";
import MilestonesSection from "@/features/referral/components/MilestonesSection";
import ReferralList from "@/features/referral/components/ReferralList";
import { Star, Gift, Trophy } from "lucide-react-native";
import { useGetMemberReferralData, useGetMemberReferralRecords } from "../hook/useReferral";
import { useAuth } from "@/context/AuthContext";
import { ReferralData } from "../types/ReferralTypes";

export const referralRules = [
  {
    title: "Invite a Friend",
    reward: "+100 Points",
    description: "Earn 100 points every time a friend joins using your referral code.",
    icon: Star,
    color: "#10b981",
  },
  {
    title: "Use a Referral Code",
    reward: "+50 Points",
    description: "Enter a co-member's referral code during registration and earn 50 points.",
    icon: Gift,
    color: "#3b82f6",
  },
];

export default function ReferralScreen({ onBack }: any) {
  const { member } = useAuth();
  const { data: referralData = {} as ReferralData, isLoading: dataLoading } = useGetMemberReferralData(member?.memberId!);
  const { data: referralHistory = [], isLoading: historyLoading } = useGetMemberReferralRecords(member?.memberId!);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header onBack={onBack} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <ReferralHero
          code={referralData?.referral_code}
          link={"testing.com"}
          activeReferrals={referralData?.total_referred}
          points={referralData?.points_earned}
        />

        <MilestonesSection data={referralRules} />

        <ReferralList data={referralHistory} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
});