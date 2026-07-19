import React, { useRef, useState } from "react";
import { ScrollView, StatusBar, View, Text, Pressable } from "react-native";
import { AlarmClock } from "lucide-react-native";

import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { WorkoutHeader } from "@/features/workout/components/WorkoutHeader";
import { WorkoutHistory } from "@/features/workout/components/WorkoutHistory";
import { WorkoutTutorials } from "@/features/workout/components/WorkoutTutorials";
import { BeginnerGuide } from "../components/BeginnerGuide";
import { AddWorkoutModal } from "../components/AddWorkoutModal";
import { useGetPersonalWorkoutHistory, useWorkoutTutorials } from "../hook/useWorkout";

const workouts = [
  {
    name: "Push Day A",
    date: "Today",
    duration: "52 min",
    calories: 384,
    exercises: [
      { name: "Bench Press", sets: "4×8", weight: "80 kg" },
      { name: "Incline Dumbbell Press", sets: "3×10", weight: "26 kg" },
      { name: "Cable Fly", sets: "3×12", weight: "15 kg" },
    ],
  },
  {
    name: "Leg Day",
    date: "Yesterday",
    duration: "65 min",
    calories: 420,
    exercises: [
      { name: "Squat", sets: "5×5", weight: "100 kg" },
      { name: "Leg Press", sets: "4×10", weight: "150 kg" },
      { name: "Leg Press", sets: "4×10", weight: "150 kg" },
    ],
  },
];

export default function WorkoutScreen() {
  const sheetRef = useRef<BottomSheetModal>(null);

  const { data: personalWorkoutHistory = [], isLoading: historyLoading } = useGetPersonalWorkoutHistory(1);
  const { data: tutorials = [], isLoading, error } = useWorkoutTutorials({ limit: 3});

  const openSheet = () => {
    sheetRef.current?.present();
  };  

  const closeSheet = () => {
    sheetRef.current?.dismiss();
  };

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
            console.log("Go to Timer Screen");
            // navigation.navigate("TimerScreen")
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
