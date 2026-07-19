import React from "react";
import { View, Text, Pressable } from "react-native";
import { Plus } from "lucide-react-native";

export function WorkoutHeader({
  onAddPress,
}: {
  onAddPress: () => void;
}) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 12,
      }}
    >
      {/* Top Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Title */}
        <View>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "800",
              color: "#0f172a",
            }}
          >
            Workouts
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: "#64748b",
              marginTop: 2,
            }}
          >
            Track • Train • Improve
          </Text>
        </View>

        {/* Add Button */}
        <Pressable
          onPress={onAddPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#10b981",
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderRadius: 14,

            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <Plus size={16} color="white" />

          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 13,
            }}
          >
            Add Workout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}