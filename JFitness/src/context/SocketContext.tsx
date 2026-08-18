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
	const { member } = useAuth();
	const queryClient = useQueryClient();

	// Socket connection
	useEffect(() => {
		if (!member?.memberId) return;

		const handleConnect = () => {
			console.log("🟢 Socket connected:", socket.id);

			socket.emit("join-member", member.memberId);

			console.log("👤 Joined:", `member-${member.memberId}`);
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
	}, [member?.memberId]);

	
	// Global member socket events	
	useEffect(() => {
		if (!member?.memberId) return;

		// Membership renewed & upgrade
		const handleMembership = () => {
			queryClient.invalidateQueries({
				queryKey: ["member-dashboard-stat", member.memberId],
			});

			queryClient.invalidateQueries({
				queryKey: ["member-recent-activity", member.memberId],
			});

			queryClient.invalidateQueries({
				queryKey: ["notifications", member.memberId],
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

		// Register listeners
		socket.on("membership:renew", handleMembership);
		socket.on("membership:upgrade", handleMembership);
		socket.on("tutorial:new", handleWorkoutTutorials);
		socket.on("tutorial:update", handleWorkoutTutorials);
		socket.on("tutorial:delete", handleWorkoutTutorials);
		socket.on("reward:new", handleAvailableRewards);
		socket.on("reward:update", handleAvailableRewards);
		socket.on("reward:remove", handleAvailableRewards);

		// Cleanup listeners
		return () => {
			socket.off("membership:renew", handleMembership);
			socket.off("membership:upgrade", handleMembership);
			socket.off("tutorial:new", handleWorkoutTutorials);
			socket.off("tutorial:update", handleWorkoutTutorials);
			socket.off("tutorial:delete", handleWorkoutTutorials);
			socket.off("reward:new", handleAvailableRewards);
			socket.off("reward:update", handleAvailableRewards);
			socket.on("reward:remove", handleAvailableRewards);
		};
	}, [member?.memberId, queryClient]);

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
}

export function useSocket() {
	return useContext(SocketContext);
}