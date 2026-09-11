import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  ChevronDown,
  ChevronRight,
  Dumbbell,
} from "lucide-react-native";
import { theme } from "@/utils/theme";
import { FitnessGuide } from "../types/fitnessTypes";

const GREEN = theme.primary;

interface WorkoutGuideCardProps {
  guide: FitnessGuide;
}


export function WorkoutGuideCard({
  guide,
}: WorkoutGuideCardProps) {
   const [expandedDay, setExpandedDay] = useState<string | null>(
      guide.workouts[0]?.day ?? null,
    );

  const getDayShortName = (day: string) => {
   return day.slice(0, 3).toUpperCase();
  };
   
  const toggleDay = (day: string) => {
    setExpandedDay((current) =>
      current === day ? null : day,
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Dumbbell
            size={19}
            color={GREEN}
            strokeWidth={2.2}
          />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>WORKOUT PLAN</Text>

          <Text style={styles.title}>
            Weekly Training Guide
          </Text>

          <Text style={styles.description}>
            {guide.workoutDescription}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        {guide.workouts.map((workout) => {
          const isExpanded = expandedDay === workout.day;

          return (
            <View
              key={workout.day}
              style={[
                styles.workoutItem,
                isExpanded && styles.workoutItemExpanded,
              ]}
            >
              <Pressable
                onPress={() => toggleDay(workout.day)}
                style={({ pressed }) => [
                  styles.dayRow,
                  pressed && styles.dayRowPressed,
                ]}
              >
                <View style={styles.dayBadge}>
                <Text style={styles.day}>
                  {getDayShortName(workout.day)}
               </Text>
                </View>

                <View style={styles.dayInfo}>
                  <Text style={styles.dayTitle}>
                    {workout.title}
                  </Text>

                  {!isExpanded && (
                    <Text
                      style={styles.dayFocus}
                      numberOfLines={1}
                    >
                      {workout.focus}
                    </Text>
                  )}
                </View>

                <View style={styles.chevronContainer}>
                  {isExpanded ? (
                    <ChevronDown
                      size={17}
                      color={GREEN}
                      strokeWidth={2.3}
                    />
                  ) : (
                    <ChevronRight
                      size={17}
                      color={theme.textMuted}
                      strokeWidth={2.3}
                    />
                  )}
                </View>
              </Pressable>

              {isExpanded && (
                <View style={styles.dropdownContent}>
                  <View style={styles.focusContainer}>
                    <Text style={styles.focusLabel}>
                      FOCUS
                    </Text>

                    <Text style={styles.focus}>
                      {workout.focus}
                    </Text>
                  </View>

                  <View style={styles.exerciseList}>
                    {workout.exercises.map(
                      (exercise, exerciseIndex) => (
                        <View
                          key={exercise}
                          style={styles.exerciseItem}
                        >
                          <View style={styles.exerciseNumber}>
                            <Text
                              style={styles.exerciseNumberText}
                            >
                              {exerciseIndex + 1}
                            </Text>
                          </View>

                          <Text style={styles.exercise}>
                            {exercise}
                          </Text>
                        </View>
                      ),
                    )}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: `${GREEN}20`,
    marginRight: 11,
  },

  headerText: {
    flex: 1,
    paddingTop: 1,
  },

  eyebrow: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
    color: GREEN,
  },

  title: {
    marginTop: 3,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.2,
  },

  description: {
    marginTop: 3,
    fontSize: 11.5,
    lineHeight: 17,
    fontWeight: "500",
    color: theme.textMuted,
  },

  divider: {
    height: 1,
    marginHorizontal: 16,
    backgroundColor: theme.border,
  },

  content: {
    padding: 12,
    gap: 8,
  },

  workoutItem: {
    borderRadius: 14,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    overflow: "hidden",
  },

  workoutItemExpanded: {
    borderColor: `${GREEN}30`,
  },

  dayRow: {
    minHeight: 57,
    paddingHorizontal: 11,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  dayRowPressed: {
    opacity: 0.7,
  },

  dayBadge: {
    width: 44,
    height: 32,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: `${GREEN}20`,
    marginRight: 10,
  },

  day: {
    fontSize: 9,
    fontWeight: "800",
    color: GREEN,
    letterSpacing: 0.3,
  },

  dayInfo: {
    flex: 1,
    minWidth: 0,
  },

  dayTitle: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "700",
    color: theme.text,
  },

  dayFocus: {
    marginTop: 2,
    fontSize: 10.5,
    lineHeight: 15,
    color: theme.textMuted,
  },

  chevronContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  dropdownContent: {
    paddingHorizontal: 12,
    paddingBottom: 13,
  },

  focusContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

  focusLabel: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: GREEN,
  },

  focus: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "500",
    color: theme.textSub,
  },

  exerciseList: {
    marginTop: 10,
    gap: 6,
  },

  exerciseItem: {
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
  },

  exerciseNumber: {
    width: 22,
    height: 22,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    marginRight: 8,
  },

  exerciseNumberText: {
    fontSize: 9,
    fontWeight: "800",
    color: GREEN,
  },

  exercise: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "500",
    color: theme.textSub,
  },
});