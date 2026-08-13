import React from "react";
import { View, Text } from "react-native";

export function StatCard({ item }: any) {
  const Icon = item.icon;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        borderRadius: 16,
        paddingVertical: 12,
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      <Icon size={14} color="#10b981" />

      <Text
        style={{
          fontSize: 12,
          fontWeight: "700",
          color: "#0f172a",
          marginTop: 4,
        }}
      >
        {item.value}
      </Text>

      <Text style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>
        {item.label}
      </Text>
    </View>
  );
}