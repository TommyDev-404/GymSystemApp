import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronRight } from "lucide-react-native";

interface Props {
  label: string;
  value: string;
  onPress: () => void;
  secure?: boolean;
}

export default function InfoItem({
  label,
  value,
  onPress,
  secure = false,
}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* LEFT SIDE */}
      <View style={styles.left}>
        <Text style={styles.label}>{label}</Text>

        <Text style={styles.value}>
          {secure ? "••••••••" : value || "Not set"}
        </Text>
      </View>

      {/* RIGHT ICON */}
      <ChevronRight size={18} color="#94a3b8" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,

    backgroundColor: "#ffffff",
    borderRadius: 14,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  left: {
    flexDirection: "column",
  },

  label: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 4,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
  },
});