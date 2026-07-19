import React from "react";
import { View, Text, Pressable } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

export function WorkoutTutorialsHeader({ onBack }: { onBack?: () => void }) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
      }}
    >
      <Pressable
        onPress={() => router.back()}
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: "#f1f5f9",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 12,
        }}
      >
        <ArrowLeft size={18} color="#334155" />
      </Pressable>

      <View>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a" }}>
          Workout Tutorials
        </Text>
        <Text style={{ fontSize: 12, color: "#64748b" }}>
          Step-by-step exercise guides
        </Text>
      </View>
    </View>
  );
}