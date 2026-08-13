import React from "react";
import { View, Text, Pressable } from "react-native";
import { ChevronRight } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import { router } from "expo-router";

type MenuItem = {
  label: string;
  icon: LucideIcon;
  screen: string;
};

type MenuSectionData = {
  title: string;
  items: MenuItem[];
};

export function ProfileMenuSection({ section}: { section: MenuSectionData }) {
  return (
    <View style={{ marginTop: 22, paddingHorizontal: 16 }}>
      <Text
        style={{
          fontSize: 11,
          fontWeight: "600",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: 0.6,
          marginBottom: 8,
          marginLeft: 4,
        }}
      >
        {section.title}
      </Text>

      <View
        style={{
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#e6e8ea",
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        {section.items.map((item, index) => (
          <Pressable
            key={item.label}
            onPress={() => router.push(item.screen)}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 13,
              paddingHorizontal: 14,
              gap: 12,
              backgroundColor: pressed ? "#f8fafc" : "#fff",
              borderBottomWidth: index === section.items.length - 1 ? 0 : 1,
              borderBottomColor: "#f1f5f9",
            })}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                backgroundColor: "#f8fafc",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <item.icon size={16} color="#475569" />
            </View>
            <Text style={{ flex: 1, fontSize: 14, color: "#1e293b", fontWeight: "500" }}>
              {item.label}
            </Text>
            <ChevronRight size={16} color="#cbd5e1" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}