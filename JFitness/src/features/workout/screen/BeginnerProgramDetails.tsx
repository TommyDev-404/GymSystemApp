import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Check,
  ChevronDown,
  Clock3,
  Dumbbell,
  Target,
} from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import { StackWrapper } from "@/components/shared/StackWrapper";
import { theme } from "@/utils/theme";
import { beginnerPrograms } from "@/features/workout/data/beginnerPrograms";

export default function ProgramDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const program = beginnerPrograms.find(
    (item) => item.id.toString() === id,
  );

  const [expandedDay, setExpandedDay] = useState<string | null>(
    program?.workouts[0]?.day ?? null,
  );

  if (!program) {
    return (
      <StackWrapper
        title="Program"
        subtitle="Fitness guide"
      >
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Dumbbell
              size={22}
              color={theme.primary}
              strokeWidth={2}
            />
          </View>

          <Text style={styles.emptyTitle}>
            Program not found
          </Text>

          <Text style={styles.emptyText}>
            This training program is no longer available.
          </Text>
        </View>
      </StackWrapper>
    );
  }

  const toggleWorkout = (day: string) => {
    setExpandedDay((current) =>
      current === day ? null : day,
    );
  };

  return (
    <StackWrapper
      title={program.name}
      subtitle={`${program.level} • ${program.duration}`}
    >
      <View style={styles.hero}>
        <Image
          source={{ uri: program.image }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <View style={styles.heroOverlay} />

        <View style={styles.heroContent}>
          <View
            style={[
              styles.levelBadge,
              {
                borderColor: `${program.color}55`,
              },
            ]}
          >
            <View
              style={[
                styles.levelDot,
                {
                  backgroundColor: program.color,
                },
              ]}
            />

            <Text style={styles.levelText}>
              {program.level}
            </Text>
          </View>

          <Text style={styles.heroTitle}>
            {program.name}
          </Text>

          <View style={styles.heroMeta}>
            <View style={styles.heroMetaItem}>
              <Clock3
                size={13}
                color="#fff"
                strokeWidth={2}
              />

              <Text style={styles.heroMetaText}>
                {program.duration}
              </Text>
            </View>

            <View style={styles.heroMetaDivider} />

            <View style={styles.heroMetaItem}>
              <Dumbbell
                size={13}
                color="#fff"
                strokeWidth={2}
              />

              <Text style={styles.heroMetaText}>
                {program.frequency}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.description}>
          {program.description}
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIcon}>
            <Target
              size={16}
              color={theme.primary}
              strokeWidth={2}
            />
          </View>

          <View>
            <Text style={styles.sectionTitle}>
              Program Goals
            </Text>

            <Text style={styles.sectionSubtitle}>
              What this program is designed to help you achieve
            </Text>
          </View>
        </View>

        <View style={styles.goalsCard}>
          {program.goals.map((goal, index) => (
            <View
              key={goal}
              style={[
                styles.goalRow,
                index < program.goals.length - 1 &&
                  styles.goalRowBorder,
              ]}
            >
              <View style={styles.checkCircle}>
                <Check
                  size={12}
                  color={theme.primary}
                  strokeWidth={2.5}
                />
              </View>

              <Text style={styles.goalText}>
                {goal}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIcon}>
            <Dumbbell
              size={16}
              color={theme.primary}
              strokeWidth={2}
            />
          </View>

          <View>
            <Text style={styles.sectionTitle}>
              Weekly Training Plan
            </Text>

            <Text style={styles.sectionSubtitle}>
              Follow each session at your own pace
            </Text>
          </View>
        </View>

        <View style={styles.workoutList}>
          {program.workouts.map((workout) => {
            const isExpanded = expandedDay === workout.day;

            return (
              <View
                key={workout.day}
                style={[
                  styles.workoutCard,
                  isExpanded && styles.workoutCardExpanded,
                ]}
              >
                <Pressable
                  onPress={() =>
                    toggleWorkout(workout.day)
                  }
                  style={({ pressed }) => [
                    styles.workoutHeader,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.dayBadge}>
                    <Text style={styles.dayText}>
                      {workout.day
                        .slice(0, 3)
                        .toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.workoutHeaderContent}>
                    <Text style={styles.workoutTitle}>
                      {workout.title}
                    </Text>

                    <View style={styles.workoutMeta}>
                      <Text style={styles.workoutFocus}>
                        {workout.focus}
                      </Text>

                      <View style={styles.metaDivider} />

                      <View style={styles.durationRow}>
                        <Clock3
                          size={11}
                          color={theme.textMuted}
                          strokeWidth={2}
                        />

                        <Text style={styles.workoutDuration}>
                          {workout.duration}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.expandButton,
                      isExpanded &&
                        styles.expandButtonActive,
                    ]}
                  >
                    <ChevronDown
                      size={16}
                      color={theme.primary}
                      strokeWidth={2.2}
                      style={{
                        transform: [
                          {
                            rotate: isExpanded
                              ? "180deg"
                              : "0deg",
                          },
                        ],
                      }}
                    />
                  </View>
                </Pressable>

                {isExpanded && (
                  <View style={styles.workoutDetails}>
                    <View style={styles.focusBox}>
                      <Text style={styles.focusLabel}>
                        SESSION FOCUS
                      </Text>

                      <Text style={styles.focusText}>
                        {workout.focus}
                      </Text>
                    </View>

                    <View style={styles.exerciseHeader}>
                      <Text style={styles.exerciseTitle}>
                        Exercises
                      </Text>

                      <Text style={styles.exerciseCount}>
                        {workout.exercises.length} exercises
                      </Text>
                    </View>

                    <View style={styles.exerciseList}>
                      {workout.exercises.map(
                        (exercise, index) => (
                          <View
                            key={exercise}
                            style={styles.exerciseRow}
                          >
                            <View style={styles.exerciseNumber}>
                              <Text
                                style={styles.exerciseNumberText}
                              >
                                {index + 1}
                              </Text>
                            </View>

                            <Text style={styles.exerciseText}>
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

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIcon}>
            <Check
              size={16}
              color={theme.primary}
              strokeWidth={2.2}
            />
          </View>

          <View>
            <Text style={styles.sectionTitle}>
              Training Tips
            </Text>

            <Text style={styles.sectionSubtitle}>
              Keep these principles in mind
            </Text>
          </View>
        </View>

        <View style={styles.tipsCard}>
          {program.tips.map((tip, index) => (
            <View
              key={index}
              style={[
                styles.tipRow,
                index < program.tips.length - 1 &&
                  styles.tipRowBorder,
              ]}
            >
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>
                  {index + 1}
                </Text>
              </View>

              <Text style={styles.tipText}>
                {tip}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomNote}>
        <Dumbbell
          size={16}
          color={theme.primary}
          strokeWidth={2}
        />

        <Text style={styles.bottomNoteText}>
          Focus on consistency and proper technique before
          increasing training intensity.
        </Text>
      </View>
    </StackWrapper>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 205,
    overflow: "hidden",
    borderRadius: 18,
    position: "relative",
    backgroundColor: theme.surface,
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.42)",
  },

  heroContent: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
  },

  levelBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(15,23,42,0.8)",
    borderWidth: 1,
  },

  levelDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
  },

  levelText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#fff",
  },

  heroTitle: {
    marginTop: 9,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.4,
  },

  heroMeta: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  heroMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  heroMetaText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
  },

  heroMetaDivider: {
    width: 3,
    height: 3,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.6)",
  },

  descriptionSection: {
    marginTop: 15,
    paddingHorizontal: 2,
  },

  description: {
    fontSize: 11.5,
    lineHeight: 18,
    color: theme.textMuted,
  },

  section: {
    marginTop: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
  },

  sectionIcon: {
    width: 34,
    height: 34,
    marginRight: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: theme.text,
  },

  sectionSubtitle: {
    marginTop: 2,
    fontSize: 9.5,
    color: theme.textMuted,
  },

  goalsCard: {
    overflow: "hidden",
    borderRadius: 14,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

  goalRow: {
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  goalRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },

  checkCircle: {
    width: 25,
    height: 25,
    marginRight: 9,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  goalText: {
    flex: 1,
    fontSize: 10.5,
    lineHeight: 16,
    fontWeight: "600",
    color: theme.text,
  },

  workoutList: {
    gap: 9,
  },

  workoutCard: {
    overflow: "hidden",
    borderRadius: 14,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

  workoutCardExpanded: {
    borderColor: theme.borderAccent,
  },

  workoutHeader: {
    minHeight: 67,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  dayBadge: {
    width: 42,
    height: 42,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    marginRight: 10,
  },

  dayText: {
    fontSize: 10,
    fontWeight: "800",
    color: theme.primary,
  },

  workoutHeaderContent: {
    flex: 1,
  },

  workoutTitle: {
    fontSize: 11.5,
    fontWeight: "800",
    color: theme.text,
  },

  workoutMeta: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  workoutFocus: {
    flexShrink: 1,
    fontSize: 9,
    color: theme.textMuted,
  },

  metaDivider: {
    width: 3,
    height: 3,
    borderRadius: 999,
    backgroundColor: theme.textMuted,
  },

  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  workoutDuration: {
    fontSize: 9,
    color: theme.textMuted,
  },

  expandButton: {
    width: 29,
    height: 29,
    marginLeft: 8,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  expandButtonActive: {
    backgroundColor: theme.accentWash,
    borderColor: theme.borderAccent,
  },

  workoutDetails: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },

  focusBox: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  focusLabel: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: theme.primary,
  },

  focusText: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: "600",
    color: theme.text,
  },

  exerciseHeader: {
    marginTop: 13,
    marginBottom: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  exerciseTitle: {
    fontSize: 10.5,
    fontWeight: "800",
    color: theme.text,
  },

  exerciseCount: {
    fontSize: 9,
    fontWeight: "600",
    color: theme.textMuted,
  },

  exerciseList: {
    gap: 5,
  },

  exerciseRow: {
    minHeight: 36,
    paddingHorizontal: 7,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9,
    backgroundColor: theme.surface,
  },

  exerciseNumber: {
    width: 22,
    height: 22,
    marginRight: 8,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

  exerciseNumberText: {
    fontSize: 8.5,
    fontWeight: "800",
    color: theme.primary,
  },

  exerciseText: {
    flex: 1,
    fontSize: 9.5,
    fontWeight: "600",
    color: theme.text,
  },

  tipsCard: {
    overflow: "hidden",
    borderRadius: 14,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

  tipRow: {
    paddingHorizontal: 12,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
  },

  tipRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },

  tipNumber: {
    width: 25,
    height: 25,
    marginRight: 9,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
  },

  tipNumberText: {
    fontSize: 9,
    fontWeight: "800",
    color: theme.primary,
  },

  tipText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 15,
    color: theme.textMuted,
  },

  bottomNote: {
    marginTop: 18,
    marginBottom: 8,
    padding: 12,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  bottomNoteText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 15,
    color: theme.textMuted,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 70,
    paddingHorizontal: 30,
  },

  emptyIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  emptyTitle: {
    marginTop: 14,
    fontSize: 15,
    fontWeight: "800",
    color: theme.text,
  },

  emptyText: {
    marginTop: 5,
    fontSize: 10.5,
    lineHeight: 16,
    textAlign: "center",
    color: theme.textMuted,
  },

  pressed: {
    opacity: 0.7,
  },
});