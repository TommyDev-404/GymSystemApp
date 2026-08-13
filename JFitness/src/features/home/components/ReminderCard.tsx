import React from "react";
import { View, Text } from "react-native";
import { Clock, Bell } from "lucide-react-native";

export function ReminderCard() {
  return (
    <View
      style={{
        marginHorizontal: 20,
        padding: 14,
        borderRadius: 16,
        backgroundColor: "#eff6ff",
        flexDirection: "row",
        alignItems: "center",

        // iOS shadow
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },

        // Android shadow
        elevation: 3,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: "#dbeafe",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Clock size={16} color="#3b82f6" />
      </View>

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontWeight: "600", color: "#1e40af" }}>
          Leg Day — Tomorrow
        </Text>
        <Text style={{ fontSize: 12, color: "#3b82f6" }}>
          6:00 AM · Remind me 30 min before
        </Text>
      </View>

      <Bell size={16} color="#3b82f6" />
    </View>
  );
}