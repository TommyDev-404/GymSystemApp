import {
	createContext,
	useContext,
	useEffect,
	type ReactNode,
} from "react";

import { socket } from "../lib/socket-client";
import { useAuth } from "./AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const SocketContext = createContext(socket);

export function SocketProvider({ children }: { children: ReactNode }) {
	const { memberIDs } = useAuth();
	const queryClient = useQueryClient();

	// Socket connection
	useEffect(() => {
		if (!memberIDs?.member_id) return;

		const handleConnect = () => {
			console.log("🟢 Socket connected:", socket.id);

			socket.emit("join-member", memberIDs.member_id);

			console.log("👤 Joined:", `member-${memberIDs.member_id}`);
		};

		const handleDisconnect = (reason: string) => {
			console.log("🔴 Socket disconnected:", reason);
		};

		socket.on("connect", handleConnect);
		socket.on("disconnect", handleDisconnect);

		// Only connect if currently disconnected
		if (!socket.connected) {
		 socket.connect();
		}

		return () => {
			socket.off("connect", handleConnect);
			socket.off("disconnect", handleDisconnect);
		};
	}, [memberIDs?.member_id]);

	
	// Global member socket events	
	useEffect(() => {
		if (!memberIDs?.member_id) return;

		// Membership renewed & upgrade
		const handleMembership = () => {
			queryClient.invalidateQueries({
				queryKey: ["member-dashboard-stat", memberIDs.member_id],
			});

			queryClient.invalidateQueries({
				queryKey: ["member-recent-activity", memberIDs.member_id],
			});

			queryClient.invalidateQueries({
				queryKey: ["member-notifications", memberIDs.member_id],
			});
		  
			queryClient.invalidateQueries({
				queryKey: ["tab-badges", memberIDs.member_id],
			});
		};

		// Workout tutorials
		const handleWorkoutTutorials = () => {
			queryClient.invalidateQueries({
				queryKey: ["workout-tutorials"],
			});
	  	};

	  // Rewards available
		const handleAvailableRewards = () => {
		  queryClient.invalidateQueries({
			  queryKey: ["available-rewards"],
		  });
		};

		// Referral Notifications
		const handleReferralNotif = () => {
			queryClient.invalidateQueries({
				queryKey: ["member-notifications", memberIDs.member_id],
			});
		 
			queryClient.invalidateQueries({
			  queryKey: ["tab-badges", memberIDs.member_id],
			});
			
			queryClient.invalidateQueries({
			  queryKey: ["member-dashboard-stat", memberIDs.member_id],
			});
		};

		// Checkout Notifications
		const handleCheckoutNotif = () => {
			queryClient.invalidateQueries({
				queryKey: ["member-recent-activity", memberIDs.member_id],
			});
			
			queryClient.invalidateQueries({
				queryKey: ["member-notifications", memberIDs.member_id],
			});
		  
			queryClient.invalidateQueries({
				queryKey: ["tab-badges", memberIDs.member_id],
			});
		};

		// Checkout Notifications
		const handleRewardClaimed = () => {
			queryClient.invalidateQueries({
				queryKey: ["redeemed-rewards"],
			});
			
			queryClient.invalidateQueries({
			  queryKey: ["member-notifications", memberIDs.member_id],
			});
		 
			queryClient.invalidateQueries({
			  queryKey: ["tab-badges", memberIDs.member_id],
			});
		};
		
		// Register listeners
		socket.on("membership:renew", handleMembership);
		socket.on("membership:upgrade", handleMembership);
		socket.on("tutorial:new", handleWorkoutTutorials);
		socket.on("tutorial:update", handleWorkoutTutorials);
		socket.on("tutorial:delete", handleWorkoutTutorials);
		socket.on("reward:claimed", handleRewardClaimed);
		socket.on("reward:new", handleAvailableRewards);
		socket.on("reward:update", handleAvailableRewards);
		socket.on("reward:remove", handleAvailableRewards);
		socket.on("referral:notif", handleReferralNotif);
		socket.on("attendance:checkout", handleCheckoutNotif);

		// Cleanup listeners
		return () => {
			socket.off("membership:renew", handleMembership);
			socket.off("membership:upgrade", handleMembership);
			socket.off("tutorial:new", handleWorkoutTutorials);
			socket.off("tutorial:update", handleWorkoutTutorials);
			socket.off("tutorial:delete", handleWorkoutTutorials);
			socket.on("reward:claimed", handleRewardClaimed);
			socket.off("reward:new", handleAvailableRewards);
			socket.off("reward:update", handleAvailableRewards);
			socket.on("reward:remove", handleAvailableRewards);
			socket.on("referral:notif", handleReferralNotif);
			socket.on("attendance:checkout", handleCheckoutNotif);
		};
	}, [memberIDs?.member_id, queryClient]);

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
}

export function useSocket() {
	return useContext(SocketContext);
}