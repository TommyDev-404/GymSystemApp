import { useRef } from "react";
import { Pressable, StyleSheet } from "react-native";
import { AlarmClock } from "lucide-react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { WorkoutHeader } from "@/features/workout/components/WorkoutHeader";
import { WorkoutHistory } from "@/features/workout/components/WorkoutHistory";
import { WorkoutTutorials } from "@/features/workout/components/WorkoutTutorials";
import { BeginnerGuide } from "../components/BeginnerGuide";
import { AddWorkoutModal } from "../components/AddWorkoutModal";
import {
  useGetPersonalWorkoutHistory,
  useWorkoutTutorials,
} from "../hook/useWorkout";
import { TabWrapper } from "@/components/shared/TabWrapper";
import { theme } from "@/utils/theme";
import { useAuth } from "@/context/AuthContext";

export default function WorkoutScreen() {
  const { member } = useAuth();

  const {
    data: personalWorkoutHistory = [],
    isLoading: historyLoading,
  } = useGetPersonalWorkoutHistory(member?.memberId!);

  const {
    data: tutorials = [],
    isLoading: tutorialsLoading,
  } = useWorkoutTutorials({ limit: 3 });

  const sheetRef = useRef<BottomSheetModal>(null);

  const openSheet = () => {
    sheetRef.current?.present();
  };

  const closeSheet = () => {
    sheetRef.current?.dismiss();
  };

  return (
    <TabWrapper
      loading={historyLoading || tutorialsLoading}
      gap={22}
    >
      <WorkoutHeader onAddPress={openSheet} />

      <WorkoutHistory workouts={personalWorkoutHistory} />

      <WorkoutTutorials tutorials={tutorials} />

      <BeginnerGuide />

      <Pressable
        onPress={() => router.push("/timer")}
        style={({ pressed }) => [
          styles.timerButton,
          pressed && styles.timerButtonPressed,
        ]}
      >
        <AlarmClock
          size={24}
          color="#FFFFFF"
          strokeWidth={2.2}
        />
      </Pressable>

      <AddWorkoutModal
        modalRef={sheetRef}
        onClose={closeSheet}
        onSave={(data) => {
          console.log("Saved workout:", data);
        }}
      />
    </TabWrapper>
  );
}

const styles = StyleSheet.create({
  timerButton: {
    position: "absolute",
    right: 20,
    bottom: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.primary,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.35)",
    shadowColor: theme.primaryLight,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 7,
  },
  timerButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});