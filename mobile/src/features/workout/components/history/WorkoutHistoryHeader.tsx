import React from "react";
import { View, Text, Pressable } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

interface Props {
  onBack?: () => void;
}

export function WorkoutHistoryHeader({ onBack }: Props) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
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
        }}
      >
        <ArrowLeft size={18} color="#334155" />
      </Pressable>

      <View>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a" }}>
          Workout History
        </Text>

        <Text style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
          Your completed training sessions
        </Text>
      </View>
    </View>
  );
}