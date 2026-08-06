import React from "react";
import { View, Text } from "react-native";
import { Dumbbell } from "lucide-react-native";

export function GreetingHeader({ memberName }: { memberName: string}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 24,
        alignItems: "center",
      }}
    >
      {/* TEXT SECTION */}
      <View>
        <Text style={{ color: "#64748b", fontSize: 12 }}>
          Good morning 👋
        </Text>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#0f172a",
            marginTop: 2,
          }}
        >
         {memberName ?? "Jhon Doe"}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: "#10b981",
            marginTop: 4,
            fontWeight: "500",
          }}
        >
          Ready for today’s workout?
        </Text>
      </View>

      {/* ICON BADGE */}
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          backgroundColor: "#d1fae5",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Dumbbell size={22} color="#10b981" />
      </View>
    </View>
  );
}