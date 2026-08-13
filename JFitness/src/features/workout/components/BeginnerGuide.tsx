import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { ChevronRight } from "lucide-react-native";

const programs = [
  {
    id: 1,
    name: "Absolute Beginner Starter",
    level: "Beginner",
    duration: "4 Weeks",
    color: "#10b981",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
  },
  {
    id: 2,
    name: "Weight Loss Kickstart",
    level: "Beginner",
    duration: "6 Weeks",
    color: "#ef4444",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b",
  },
  {
    id: 3,
    name: "Muscle Foundation",
    level: "Beginner",
    duration: "8 Weeks",
    color: "#3b82f6",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
  },
];

export function BeginnerGuide({
  onViewAll,
}: {
  onViewAll?: () => void;
}) {
  return (
    <View style={{ marginTop: 22 }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#0f172a",
          }}
        >
          Beginner Programs
        </Text>

        
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Text
            style={{
              color: "#10b981",
              fontWeight: "600",
            }}
          >
            View All
          </Text>

          <ChevronRight size={16} color="#10b981" />
        </Pressable>
      </View>

      {/* Horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 5 }}
      >
        {programs.map((p) => (
          <Pressable
            key={p.id}
            style={{
              width: 220,
              marginRight: 12,
              borderRadius: 18,
              backgroundColor: "white",
              overflow: "hidden",

              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 3,
            }}
          >
            {/* Image */}
            <Image
              source={{ uri: p.image }}
              style={{ width: "100%", height: 110 }}
            />

            {/* Content */}
            <View style={{ padding: 12 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: "#0f172a",
                }}
              >
                {p.name}
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  color: "#64748b",
                  marginTop: 4,
                }}
              >
                {p.duration}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 20,
                    backgroundColor: p.color,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      fontWeight: "600",
                    }}
                  >
                    {p.level}
                  </Text>
                </View>

                <ChevronRight size={16} color="#94a3b8" />
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}