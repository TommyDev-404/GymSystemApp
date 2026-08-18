
import {
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import ReferralHero from "@/features/referral/components/ReferralHero";
import MilestonesSection from "@/features/referral/components/ReferrralRules";
import ReferralList from "@/features/referral/components/ReferralList";

import {
  Star,
  Gift,
} from "lucide-react-native";

import {
  useGetMemberReferralData,
  useGetMemberReferralRecords,
} from "../hook/useReferral";

import { useAuth } from "@/context/AuthContext";
import { ReferralData } from "../types/ReferralTypes";

import { AppBackground } from "@/components/shared/AppBackground";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { PageLoader } from "@/components/shared/PageLoader";

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
	const { member } = useAuth();

	const { data: referralData = {} as ReferralData, isLoading: dataLoading } = useGetMemberReferralData(member?.memberId!);
	const { data: referralHistory = [], isLoading: historyLoading } = useGetMemberReferralRecords(member?.memberId!);

	if (dataLoading || historyLoading) {
		return (
			<PageLoader
				title="Referral Program"
				subtitle="Invite friends. Earn rewards together."
			/>
		);
	}

	return (
		<AppBackground>
			<SafeAreaView style={styles.container}>
				<ScreenHeader
					title="Referral Program"
					subtitle="Invite friends. Earn rewards together."
				/>

				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.content}
				>

					<ReferralHero
						code={referralData?.referral_code}
						link="testing.com"
						activeReferrals={
							referralData?.total_referred
						}
						points={
							referralData?.points_earned
						}
					/>

					<MilestonesSection
						data={referralRules}
					/>

					<ReferralList
						data={referralHistory}
					/>

				</ScrollView>

			</SafeAreaView>
		</AppBackground>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    paddingTop: 14,
    paddingBottom: 40,
  },
});