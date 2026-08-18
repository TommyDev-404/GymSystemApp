import { useRef } from "react";
import {
  ScrollView,
  StatusBar,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
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

import { Loading } from "@/components/shared/Loading";
import { AppBackground } from "@/components/shared/AppBackground";
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

  if (historyLoading || tutorialsLoading) {
    return (
      <AppBackground>
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <WorkoutHeader onAddPress={openSheet} />

          <WorkoutHistory
            workouts={personalWorkoutHistory}
          />

          <WorkoutTutorials
            tutorials={tutorials}
          />

          <BeginnerGuide />

          <View style={styles.bottomSpace} />
        </ScrollView>

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
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },

  scrollContent: {
    paddingTop: 8,
    gap: 22,
  },

  bottomSpace: {
    height: 10,
  },

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