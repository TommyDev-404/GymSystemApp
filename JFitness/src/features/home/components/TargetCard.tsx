import React from "react";
import { View, Text } from "react-native";
import { Target } from "lucide-react-native";

export function TargetCard() {
  return (
    <View
      style={{
        marginHorizontal: 20,
        padding: 14,
        borderRadius: 16,
        backgroundColor: "#fef3c7",
        flexDirection: "row",
        alignItems: "center",

        // iOS shadow
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },

        // Android shadow
        elevation: 3,
      }}
    >
      <Target size={20} color="#f59e0b" />

      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: "600", color: "#92400e" }}>
          Monthly Goal: 20 workouts
        </Text>
        <Text style={{ fontSize: 12, color: "#b45309" }}>
          18 done · 2 left to reach your goal!
        </Text>
      </View>
    </View>
  );
}