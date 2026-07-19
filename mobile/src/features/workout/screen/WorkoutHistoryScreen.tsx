import React from "react";
import { View, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { WorkoutHistoryHeader } from "@/features/workout/components/history/WorkoutHistoryHeader";
import { WorkoutHistoryList } from "@/features/workout/components/history/WorkoutHistoryList";

interface Props {
  onBack?: () => void;
}

const workouts = [
  {
    name: "Push Day A",
    date: "Today",
    duration: "52 min",
    calories: 384,
    exercises: [
      { name: "Bench Press", sets: "4×8", weight: "80 kg" },
      { name: "Incline DB Press", sets: "3×10", weight: "26 kg" },
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
    ],
  },
];

export function WorkoutHistoryScreen({ onBack }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <WorkoutHistoryHeader onBack={onBack} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <WorkoutHistoryList workouts={workouts} />
      </ScrollView>
    </SafeAreaView>
  );
}