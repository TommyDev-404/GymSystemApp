import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { Loading } from "@/components/shared/Loading";
import { AppBackground } from "@/components/shared/AppBackground";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { PageLoader } from "@/components/shared/PageLoader";

export default function RewardsScreen() {
  const { member } = useAuth();

  const { data: dashboardData = {} as MemberDashboard } =
    useGetMemberDashboardData(member?.memberId!);

  const { data: rewards = [], isLoading: rewardsLoading } =
    useFetchAvailableRewards();

  const { data: redeemedRewards = [], isLoading: redeemedRewardsLoading } =
    useFetchRedeemedRewards(member?.memberId!);

  if (redeemedRewardsLoading || rewardsLoading) {
    return (
      <PageLoader
        title="Rewards"
        subtitle="Earn & redeem your points"
      />
    );
  }

  return (
    <AppBackground>
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Rewards"
          subtitle="Earn & redeem your points"
        />

        <FlatList
          data={[]}
          renderItem={null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <>
              {/* POINTS */}
              <View style={styles.section}>
                <PointsCard points={dashboardData?.points ?? 0} />
              </View>

              {/* AVAILABLE REWARDS */}
              <View style={styles.section}>
                <AvailableRewards
                  data={rewards}
                  points={dashboardData?.points ?? 0}
                />
              </View>

              {/* REDEEMED */}
              <View style={[styles.section, styles.lastSection]}>
                <RedeemedSection data={redeemedRewards} />
              </View>
            </>
          }
        />
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    paddingTop: 12,
    paddingBottom: 40
  },
  section: {
    marginBottom: 20, // spacing between components
  },
  lastSection: {
    marginBottom: 0, // no extra space after the last section
  },
});