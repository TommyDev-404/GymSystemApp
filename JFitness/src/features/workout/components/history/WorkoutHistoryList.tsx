import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
} from "react-native";
import {
  Dumbbell,
  Clock3,
  ChevronDown,
  ChevronRight,
  ListChecks,
} from "lucide-react-native";
import { theme } from "@/utils/theme";
import { EmptyState } from "@/components/shared/EmptyState";
import { Workout } from "../../types/WorkoutTypes";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
  workouts: Workout[];
}

export function WorkoutHistoryList({ workouts }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (index: number) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setExpanded(expanded === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Workout History</Text>
          <Text style={styles.subtitle}>
            Your completed training sessions
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>{workouts.length}</Text>
          <Text style={styles.countLabel}>sessions</Text>
        </View>
      </View>

      {workouts.length > 0 ? (
        <View style={styles.list}>
        {workouts.map((workout, index) => {
          const isOpen = expanded === index;
          const exercises = workout.exercises ?? [];

          return (
            <View
              key={workout.id ?? `${workout.name}-${index}`}
              style={styles.card}
            >
              <Pressable
                onPress={() => toggle(index)}
                style={({ pressed }) => [
                  styles.cardHeader,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.iconBox}>
                  <Dumbbell
                    size={18}
                    color={theme.primaryLight}
                    strokeWidth={2.2}
                  />
                </View>

                <View style={styles.info}>
                  <Text
                    style={styles.workoutName}
                    numberOfLines={1}
                  >
                    {workout.name}
                  </Text>

                  <View style={styles.metaRow}>
                    <Text style={styles.dateText}>
                      {workout.date}
                    </Text>

                    <View style={styles.metaItem}>
                      <Clock3
                        size={11}
                        color={theme.textMuted}
                        strokeWidth={2}
                      />
                      <Text style={styles.metaText}>
                        {workout.duration}
                      </Text>
                    </View>

                    {exercises.length > 0 && (
                      <View style={styles.metaItem}>
                        <ListChecks
                          size={11}
                          color={theme.primaryLight}
                          strokeWidth={2}
                        />
                        <Text style={styles.exerciseCount}>
                          {exercises.length}{" "}
                          {exercises.length === 1
                            ? "exercise"
                            : "exercises"}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.chevronBox}>
                  {isOpen ? (
                    <ChevronDown
                      size={16}
                      color={theme.primaryLight}
                      strokeWidth={2.2}
                    />
                  ) : (
                    <ChevronRight
                      size={16}
                      color={theme.textMuted}
                      strokeWidth={2.2}
                    />
                  )}
                </View>
              </Pressable>

              {isOpen && (
                <View style={styles.expandedContainer}>
                  <View style={styles.divider} />

                  <View style={styles.exerciseHeader}>
                    <View style={styles.exerciseHeaderLeft}>
                      <View style={styles.smallIconBox}>
                        <ListChecks
                          size={13}
                          color={theme.primaryLight}
                          strokeWidth={2.2}
                        />
                      </View>

                      <Text style={styles.exerciseHeaderText}>
                        Workout Details
                      </Text>
                    </View>

                    <Text style={styles.exerciseHeaderCount}>
                      {exercises.length}
                    </Text>
                  </View>

                  <View style={styles.exerciseList}>
                    {exercises.length > 0 ? (
                      exercises.map((exercise, exerciseIndex) => (
                        <View
                          key={`${exercise.name}-${exerciseIndex}`}
                          style={styles.exerciseCard}
                        >
                          <View style={styles.exerciseNumber}>
                            <Text style={styles.exerciseNumberText}>
                              {exerciseIndex + 1}
                            </Text>
                          </View>

                          <View style={styles.exerciseInfo}>
                            <Text
                              style={styles.exerciseName}
                              numberOfLines={1}
                            >
                              {exercise.name}
                            </Text>

                            <Text style={styles.exerciseSets}>
                              {exercise.sets}
                            </Text>
                          </View>

                          {exercise.weight && (
                            <View style={styles.weightBadge}>
                              <Text style={styles.weightText}>
                                {exercise.weight}
                              </Text>
                            </View>
                          )}
                        </View>
                      ))
                    ) : (
                      <View style={styles.emptyExercises}>
                        <Text style={styles.emptyText}>
                          No exercise details available.
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          );
        })}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <EmptyState
            icon={Dumbbell}
            title="No workouts yet"
            subtitle="Complete your first workout to see your training history here."
          />
        </View>
      )}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.text,
    letterSpacing: -0.2,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 11,
    color: theme.textMuted,
  },

  countBadge: {
    minWidth: 48,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  countText: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: "800",
    color: theme.primaryLight,
  },

  countLabel: {
    marginTop: 1,
    fontSize: 7.5,
    fontWeight: "600",
    color: theme.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  emptyContainer: {
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

  list: {
    gap: 10,
  },

  card: {
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    minHeight: 74,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    paddingVertical: 12,
  },

  pressed: {
    opacity: 0.78,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  info: {
    flex: 1,
    marginLeft: 11,
    marginRight: 8,
  },

  workoutName: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
    letterSpacing: -0.1,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 9,
    marginTop: 5,
  },

  dateText: {
    fontSize: 10.5,
    color: theme.textMuted,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  metaText: {
    fontSize: 10.5,
    color: theme.textMuted,
  },

  exerciseCount: {
    fontSize: 10.5,
    fontWeight: "600",
    color: theme.primaryLight,
  },

  chevronBox: {
    width: 29,
    height: 29,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  expandedContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },

  divider: {
    height: 1,
    backgroundColor: theme.border,
    marginBottom: 11,
  },

  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 2,
  },

  exerciseHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  smallIconBox: {
    width: 25,
    height: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  exerciseHeaderText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: theme.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  exerciseHeaderCount: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 7,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 9,
    fontWeight: "800",
    color: theme.primaryLight,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  exerciseList: {
    gap: 7,
  },

  exerciseCard: {
    minHeight: 49,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderRadius: 11,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  exerciseNumber: {
    width: 27,
    height: 27,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  exerciseNumberText: {
    fontSize: 9,
    fontWeight: "800",
    color: theme.primaryLight,
  },

  exerciseInfo: {
    flex: 1,
    marginLeft: 9,
  },

  exerciseName: {
    fontSize: 11.5,
    fontWeight: "600",
    color: theme.textSub,
  },

  exerciseSets: {
    marginTop: 2,
    fontSize: 9.5,
    color: theme.textMuted,
  },

  weightBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  weightText: {
    fontSize: 9.5,
    fontWeight: "700",
    color: theme.primaryLight,
  },

  emptyExercises: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  emptyText: {
    fontSize: 10,
    color: theme.textMuted,
  },
});