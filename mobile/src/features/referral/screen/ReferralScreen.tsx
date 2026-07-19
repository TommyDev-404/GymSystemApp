import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/features/referral/components/Header";
import ReferralHero from "@/features/referral/components/ReferralHero";
import MilestonesSection from "@/features/referral/components/MilestonesSection";
import ReferralList from "@/features/referral/components/ReferralList";
import ShareCTA from "@/features/referral/components/ShareCTA";

import { Star, Gift, Trophy } from "lucide-react-native";

export const referralCode = "ALEX2026";
export const referralLink = "gymapp.io/join?ref=ALEX2026";

export const referrals = [
  {
    name: "Jake Santos",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80",
    date: "Jun 10, 2026",
    status: "active",
    reward: "500 pts earned",
  },
  {
    name: "Maria Cruz",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80",
    date: "May 22, 2026",
    status: "active",
    reward: "500 pts earned",
  },
  {
    name: "Kevin Lim",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80",
    date: "Jun 14, 2026",
    status: "pending",
    reward: "Waiting for registration",
  },
];

export const milestones = [
  { count: 1, reward: "500 Points", icon: Star, achieved: true, color: "#10b981" },
  { count: 3, reward: "1-Month Extension", icon: Gift, achieved: true, color: "#3b82f6" },
  { count: 5, reward: "PT Session", icon: Trophy, achieved: false, color: "#8b5cf6" },
];

export const howItWorks = [
  "Share your referral code",
  "Friend registers using your code",
  "Earn 500 points per referral",
  "Unlock milestone rewards",
];

export default function ReferralScreen({ onBack }: any) {
  const activeReferrals = referrals.filter(r => r.status === "active").length;
  const points = activeReferrals * 500;

  return (
    <SafeAreaView style={styles.container}>
      <Header onBack={onBack} />

      <ScrollView>
        <ReferralHero
          code={referralCode}
          link={referralLink}
          activeReferrals={activeReferrals}
          points={points}
        />

        <MilestonesSection data={milestones} active={activeReferrals} />

        <ReferralList data={referrals} />

        <ShareCTA />
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