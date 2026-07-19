import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/features/rewards/components/Header";
import PointsCard from "@/features/rewards/components/PointsCard";
import AvailableRewards from "@/features/rewards/components/AvailableRewards";
import BadgesSection from "@/features/rewards/components/BadgesSection";
import ChallengesSection from "@/features/rewards/components/ChallengesSection";
import RedeemedSection from "@/features/rewards/components/RedeemedSection";

import {
   Trophy,
   Star,
   Gift,
   Award,
   Zap,
   Shield,
   Crown,
   Target,
 } from "lucide-react-native";
 
 export const available = [
   { name: "Free Protein Shake", points: 500, img: "🥤", available: true },
   { name: "1 Month Extension", points: 2000, img: "📅", available: true },
   { name: "Personal Training Session", points: 1500, img: "🏋️", available: true },
   { name: "Gym Merchandise", points: 800, img: "👕", available: false },
 ];
 
 export const progress = [
   { name: "Consistency King", desc: "Visit 20 days this month", progress: 90, color: "#f59e0b", icon: Crown },
   { name: "Iron Will", desc: "Complete 50 workouts", progress: 64, color: "#8b5cf6", icon: Shield },
   { name: "Cardio Crusher", desc: "Burn 5,000 calories", progress: 47, color: "#ef4444", icon: Zap },
 ];
 
 export const badges = [
   { name: "Early Bird", desc: "10 morning sessions", icon: Star, earned: true, color: "#f59e0b" },
   { name: "Iron Athlete", desc: "100 workouts", icon: Trophy, earned: true, color: "#6366f1" },
   { name: "Streak Master", desc: "30-day streak", icon: Zap, earned: false, color: "#10b981" },
   { name: "Elite Member", desc: "1 year membership", icon: Crown, earned: false, color: "#f97316" },
   { name: "PR Breaker", desc: "Set 10 records", icon: Target, earned: true, color: "#3b82f6" },
   { name: "Team Player", desc: "5 group classes", icon: Award, earned: false, color: "#ec4899" },
 ];
 
 export const redeemed = [
   { name: "Free Shake", date: "Jun 1, 2026", points: 500 },
   { name: "Guest Pass", date: "May 15, 2026", points: 300 },
 ];
 
 export const userPoints = 2340;

export default function RewardsScreen({ onBack }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header onBack={onBack} />

      <FlatList
        data={[]}
        ListHeaderComponent={
          <>
            <PointsCard points={userPoints} />
            <AvailableRewards data={available} />
            <BadgesSection data={badges} />
            <ChallengesSection data={progress} />
            <RedeemedSection data={redeemed} />
          </>
        }
        renderItem={null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
});