import { FlatList, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/features/rewards/components/Header";
import PointsCard from "@/features/rewards/components/PointsCard";
import AvailableRewards from "@/features/rewards/components/AvailableRewards";
import RedeemedSection from "@/features/rewards/components/RedeemedSection";

import { MemberDashboard } from "@/features/home/types/HomeTypes";
import { useGetMemberDashboardData } from "@/features/home/hook/useHome";
import { useAuth } from "@/context/AuthContext";
import { useFetchAvailableRewards, useFetchRedeemedRewards } from "../hook/useReward";
import { useEffect } from "react";
import { useSocket } from "@/context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
 

export const redeemed = [
{ name: "Free Shake", date: "Jun 1, 2026", points: 500 },
{ name: "Guest Pass", date: "May 15, 2026", points: 300 },
];
 
export const userPoints = 2340;

export default function RewardsScreen({ onBack }: any) {
	const socket = useSocket();
	const queryClient = useQueryClient();

	const { member } = useAuth();
	const { data: dashboardData = {} as MemberDashboard } = useGetMemberDashboardData(member?.memberId!);
	const { data: rewards = [], isLoading: rewardsLoading } = useFetchAvailableRewards();
	const { data: redeemedRewards = [], isLoading: redeemedRewardsLoading } = useFetchRedeemedRewards(member?.memberId!);
	
	// live socket for real time appearing of rewards created by admin
	useEffect(() => {
		const handleIncomingSocket = () => {
			queryClient.invalidateQueries({
				queryKey: ["available-rewards"],
			});
		};
	
		socket.on("reward:new", handleIncomingSocket);
		socket.on("reward:update", handleIncomingSocket);
		socket.on("reward:delete", handleIncomingSocket);
		
		return () => {
			socket.off("reward:new", handleIncomingSocket);
			socket.off("reward:update", handleIncomingSocket);
			socket.on("reward:delete", handleIncomingSocket);
		};
	}, [socket, queryClient]);
	
	if (redeemedRewardsLoading || rewardsLoading) return <Loading />;

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor="#fff" />

			<Header onBack={onBack} />

			<FlatList
				data={[]}
				ListHeaderComponent={
					<>
						<PointsCard points={dashboardData?.points} />
						<AvailableRewards data={rewards} points={dashboardData.points} />
						<RedeemedSection data={redeemedRewards} />
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