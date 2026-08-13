import React, { useState } from "react";
import { View, Text, Pressable, LayoutAnimation, Platform, UIManager } from "react-native";
import { Dumbbell, Clock, Flame, ChevronDown, ChevronRight } from "lucide-react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
  workouts: any[];
}

export function WorkoutHistoryList({ workouts }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === index ? null : index);
  };

  return (
    <View style={{ padding: 20, gap: 12 }}>
      {workouts.map((w, i) => {
        const isOpen = expanded === i;

        return (
          <View
            key={w.name}
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 3,
            }}
          >
            {/* HEADER */}
            <Pressable
              onPress={() => toggle(i)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
              }}
            >
              {/* ICON */}
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: "#d1fae5",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Dumbbell size={18} color="#10b981" />
              </View>

              {/* INFO */}
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#0f172a" }}>
                  {w.name}
                </Text>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 2, flexWrap: "wrap" }}>
                  <Text style={{ fontSize: 11, color: "#64748b" }}>{w.date}</Text>

                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Clock size={10} color="#64748b" />
                    <Text style={{ fontSize: 11, color: "#64748b" }}>
                      {w.duration}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Flame size={10} color="#10b981" />
                    <Text style={{ fontSize: 11, color: "#10b981" }}>
                      {w.calories} kcal
                    </Text>
                  </View>
                </View>
              </View>

              {/* TOGGLE ICON */}
              {isOpen ? (
                <ChevronDown size={16} color="#94a3b8" />
              ) : (
                <ChevronRight size={16} color="#94a3b8" />
              )}
            </Pressable>

            {/* EXPANDED CONTENT */}
            {isOpen && (
              <View style={{ paddingHorizontal: 12, paddingBottom: 12, gap: 8 }}>
                {w.exercises.map((ex: any) => (
                  <View
                    key={ex.name}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      borderRadius: 10,
                      backgroundColor: "#f8fafc",
                    }}
                  >
                    <Text style={{ fontSize: 13, color: "#334155", fontWeight: "500" }}>
                      {ex.name}
                    </Text>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <Text style={{ fontSize: 12, color: "#64748b" }}>
                        {ex.sets}
                      </Text>
                      <Text style={{ fontSize: 12, color: "#10b981", fontWeight: "600" }}>
                        {ex.weight}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}