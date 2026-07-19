import React from "react";
import { View } from "react-native";

import WorkoutScreen from "@/features/workout/screen/WorkoutScreen";

export default function Workout() {
  return (
    <View style={{ flex: 1 }}>
      <WorkoutScreen />
    </View>
  );
}