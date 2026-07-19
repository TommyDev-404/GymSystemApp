import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  FlatList,
} from "react-native";
import {
  Dumbbell,
  Clock,
  Flame,
  ChevronRight,
  ChevronDown,
} from "lucide-react-native";
import { router } from "expo-router";
import { EmptyState } from "@/components/EmptyState";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface WorkoutHistoryProps {
  workouts: any[];
}

export function WorkoutHistory({
  workouts,
}: WorkoutHistoryProps) {
  const [expandedWorkout, setExpandedWorkout] = useState<number | null>(0);

  const toggle = (i: number) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setExpandedWorkout(
      expandedWorkout === i ? null : i
    );
  };

  const previewWorkouts = workouts.slice(0, 3);

  return (
    <View style={{ padding: 20, marginTop: 2 }}>

      {/* Title */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#0f172a",
          marginBottom: 12,
        }}
      >
        History
      </Text>


      <FlatList
        data={previewWorkouts}
        keyExtractor={(item, index) =>
          `${item.name}-${index}`
        }
        contentContainerStyle={{
          paddingHorizontal: 3,
          paddingVertical: 10,
        }}
        scrollEnabled={false}

        ListEmptyComponent={
          <EmptyState
            icon={Dumbbell}
            title="No workouts yet"
            subtitle="Start your first workout to see your history here."
          />
        }

        renderItem={({ item: w, index: i }) => {
          const isOpen = expandedWorkout === i;

          return (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                overflow: "hidden",
                marginBottom: 12,
                shadowColor: "#000",
                shadowOpacity: 0.06,
                shadowRadius: 8,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                elevation: 3,
              }}
            >

              {/* Header */}
              <Pressable
                onPress={() => toggle(i)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                }}
              >

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
                  <Dumbbell
                    size={18}
                    color="#10b981"
                  />
                </View>


                <View
                  style={{
                    flex: 1,
                    marginLeft: 12,
                  }}
                >

                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#0f172a",
                    }}
                  >
                    {w.name}
                  </Text>


                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      marginTop: 2,
                      flexWrap: "wrap",
                    }}
                  >

                    <Text
                      style={{
                        fontSize: 11,
                        color: "#64748b",
                      }}
                    >
                      {w.date}
                    </Text>


                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Clock size={10} color="#64748b" />

                      <Text
                        style={{
                          fontSize: 11,
                          color: "#64748b",
                        }}
                      >
                        {w.duration}
                      </Text>
                    </View>


                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Flame size={10} color="#10b981" />

                      <Text
                        style={{
                          fontSize: 11,
                          color: "#10b981",
                        }}
                      >
                        {w.calories} kcal
                      </Text>
                    </View>

                  </View>
                </View>


                {isOpen ? (
                  <ChevronDown size={16} color="#94a3b8" />
                ) : (
                  <ChevronRight size={16} color="#94a3b8" />
                )}

              </Pressable>


              {/* Expanded */}
              {isOpen && (
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingBottom: 12,
                    gap: 8,
                  }}
                >

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

                      <Text
                        style={{
                          fontSize: 13,
                          color: "#334155",
                          fontWeight: "500",
                        }}
                      >
                        {ex.name}
                      </Text>


                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#64748b",
                          }}
                        >
                          {ex.sets}
                        </Text>

                        <Text
                          style={{
                            fontSize: 12,
                            color: "#10b981",
                            fontWeight: "600",
                          }}
                        >
                          {ex.weight}
                        </Text>

                      </View>

                    </View>
                  ))}

                </View>
              )}
            </View>
          );
        }}
      />

      {/* VIEW FULL HISTORY */}
      {workouts.length > 0 && (
        <Pressable
          onPress={() =>
            router.push("/(app)/workout-history")
          }
          style={{
            marginTop: 14,
            paddingVertical: 12,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#10b981",
              fontWeight: "600",
              fontSize: 13,
            }}
          >
            View Full Workout History →
          </Text>
        </Pressable>
      )}

    </View>
  );
}