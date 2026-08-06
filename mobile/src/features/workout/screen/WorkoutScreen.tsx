import { useRef } from "react";
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

export default function WorkoutScreen() {
	const { data: personalWorkoutHistory = [], isLoading: historyLoading } = useGetPersonalWorkoutHistory(1);
	const { data: tutorials = [], isLoading: tutorialsLoading } = useWorkoutTutorials({ limit: 3});
	
	const sheetRef = useRef<BottomSheetModal>(null);

	const openSheet = () => {
		sheetRef.current?.present();
	};  

	const closeSheet = () => {
		sheetRef.current?.dismiss();
	};

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
