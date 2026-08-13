import { useEffect, useRef } from "react";
import { ScrollView, StatusBar, View, Pressable } from "react-native";
import { AlarmClock } from "lucide-react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { WorkoutHeader } from "@/features/workout/components/WorkoutHeader";
import { WorkoutHistory } from "@/features/workout/components/WorkoutHistory";
import { WorkoutTutorials } from "@/features/workout/components/WorkoutTutorials";
import { BeginnerGuide } from "../components/BeginnerGuide";
import { AddWorkoutModal } from "../components/AddWorkoutModal";
import { useGetPersonalWorkoutHistory, useWorkoutTutorials } from "../hook/useWorkout";
import { router } from "expo-router";
import { Loading } from "@/components/Loading";
import { useSocket } from "@/context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";

export default function WorkoutScreen() {
	const socket = useSocket();
	const queryClient = useQueryClient();

	const { data: personalWorkoutHistory = [], isLoading: historyLoading } = useGetPersonalWorkoutHistory(1);
	const { data: tutorials = [], isLoading: tutorialsLoading } = useWorkoutTutorials({ limit: 3 });
	
	const sheetRef = useRef<BottomSheetModal>(null);

	const openSheet = () => {
		sheetRef.current?.present();
	};  

	const closeSheet = () => {
		sheetRef.current?.dismiss();
	};

	// live socket for real time appearing of tutorials created by admin
	useEffect(() => {
	  const handleIncomingSocket = () => {
		 queryClient.invalidateQueries({
			queryKey: ["workout-tutorials"],
		 });
	  };
	
	  socket.on("tutorial:new", handleIncomingSocket);
	  socket.on("tutorial:update", handleIncomingSocket);
	  socket.on("tutorial:delete", handleIncomingSocket);
	  
	  return () => {
		 socket.off("tutorial:new", handleIncomingSocket);
		 socket.off("tutorial:update", handleIncomingSocket);
		 socket.on("tutorial:delete", handleIncomingSocket);
	  };
	}, [socket, queryClient]);

	if (historyLoading || tutorialsLoading) return <Loading />;

	return (
		<>
			<StatusBar barStyle="dark-content" backgroundColor="#fff" />

			<View style={{ flex: 1 }}>
			{/* MAIN CONTENT */}
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: 8,
					paddingBottom: 50, // space for FAB
				}}
			>
				<WorkoutHeader onAddPress={openSheet}/>

				<WorkoutHistory workouts={personalWorkoutHistory} />

				<WorkoutTutorials tutorials={tutorials} />

				<BeginnerGuide/>
			</ScrollView>

			{/* FLOATING TIMER BUTTON */}
			<Pressable
				onPress={() => {
					router.push("/timer");
				}}
				style={{
					position: "absolute",
					bottom: 25,
					right: 20,

					width: 60,
					height: 60,
					borderRadius: 30,

					backgroundColor: "#10b981",
					justifyContent: "center",
					alignItems: "center",

					shadowColor: "#000",
					shadowOpacity: 0.2,
					shadowRadius: 10,
					shadowOffset: { width: 0, height: 4 },
					elevation: 6,
				}}
			>
				<AlarmClock size={24} color="white" />
			</Pressable>

			<AddWorkoutModal
				modalRef={sheetRef}
				onClose={closeSheet}
				onSave={(data) => {
					console.log("Saved workout:", data);
				}} 
			/> 
			</View>
		</>
	);
}
