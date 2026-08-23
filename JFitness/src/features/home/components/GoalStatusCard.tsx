import { theme } from "@/utils/theme";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Target, ChevronRight, Trophy } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { WeightGoal } from "../types/HomeTypes";

interface GoalStatusCardProps {
  goal?: WeightGoal | null;
  onPress: () => void;
}

const SUCCESS = "#10B981";
const SUCCESS_DARK = "#059669";
const WARNING = "#F59E0B";
const WARNING_DARK = "#D97706";
const DANGER = "#EF4444";
const DANGER_DARK = "#DC2626";

export function GoalStatusCard({ goal, onPress }: GoalStatusCardProps) {
  const achieved = goal?.status === "ACHIEVED";
  const offTrack = !!goal && goal.progress_percentage < 0;
  const hasGoal = !!goal;

  const accent = achieved
    ? SUCCESS
    : offTrack
      ? DANGER
      : hasGoal
        ? SUCCESS
        : WARNING;

  const heading = !goal
    ? "Set Your Weight Goal"
    : achieved
      ? "Goal Achieved"
      : offTrack
        ? "Let's Get Back on Track"
        : "Keep Going";

  const description = !goal
    ? "Set a target weight and track your progress over time."
    : achieved
      ? "Great job! You've reached your target weight."
      : offTrack
        ? "Your current progress is moving away from your target."
        : `${goal.progress_percentage}% of the way to your target weight.`;

  const buttonLabel = !goal
    ? "Set Goal"
    : achieved
      ? "Set New Goal"
      : "View Progress";

  const progress = goal
    ? Math.min(Math.max(goal.progress_percentage, 0), 100)
    : 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {/* Soft status glow */}
      <LinearGradient
        colors={
          achieved
            ? ["rgba(16,185,129,0.12)", "rgba(16,185,129,0.04)", "transparent"]
            : offTrack
              ? ["rgba(239,68,68,0.10)", "rgba(239,68,68,0.03)", "transparent"]
              : !goal
                ? ["rgba(245,158,11,0.10)", "rgba(245,158,11,0.03)", "transparent"]
                : ["rgba(16,185,129,0.09)", "rgba(16,185,129,0.03)", "transparent"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
        pointerEvents="none"
      />

      {/* Top content */}
      <View style={styles.topRow}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: `${accent}14`,
              borderColor: `${accent}28`,
            },
          ]}
        >
          {achieved ? (
            <Trophy size={18} color={SUCCESS} strokeWidth={2.2} />
          ) : (
            <Target size={18} color={accent} strokeWidth={2.2} />
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.headingRow}>
            <Text style={styles.heading}>{heading}</Text>

            {!goal && (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: `${WARNING}14`,
                    borderColor: `${WARNING}30`,
                  },
                ]}
              >
                <Text style={[styles.badgeText, { color: WARNING_DARK }]}>
                  GET STARTED
                </Text>
              </View>
            )}

            {goal && !achieved && !offTrack && (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: `${SUCCESS}14`,
                    borderColor: `${SUCCESS}28`,
                  },
                ]}
              >
                <View style={[styles.badgeDot, { backgroundColor: SUCCESS }]} />
                <Text style={[styles.badgeText, { color: SUCCESS_DARK }]}>
                  ON TRACK
                </Text>
              </View>
            )}

            {offTrack && (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: `${DANGER}12`,
                    borderColor: `${DANGER}26`,
                  },
                ]}
              >
                <View style={[styles.badgeDot, { backgroundColor: DANGER }]} />
                <Text style={[styles.badgeText, { color: DANGER_DARK }]}>
                  OFF TRACK
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      {/* Progress (only when active goal) */}
      {!!goal && !achieved && (
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Goal Progress</Text>
            <Text style={[styles.progressPercentage, { color: accent }]}>
              {goal.progress_percentage}%
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <LinearGradient
              colors={
                offTrack
                  ? [DANGER, "#F87171"]
                  : [SUCCESS_DARK, SUCCESS, "#34D399"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${progress}%` }]}
            />
          </View>
        </View>
      )}

      {/* Action */}
      <View style={styles.actionRow}>
        <Text style={[styles.actionText, { color: theme.primaryDark }]}>
          {buttonLabel}
        </Text>
        <View style={[styles.actionIcon, { backgroundColor: theme.accentWash }]}>
          <ChevronRight size={15} color={theme.primary} strokeWidth={2.5} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "relative",
    padding: 16,
    borderRadius: 18,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    overflow: "hidden",
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  backgroundGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 140,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  heading: {
    flex: 1,
    fontSize: 15.5,
    fontWeight: "700",
    color: theme.text, // primary text
    letterSpacing: -0.25,
  },
  description: {
    marginTop: 5,
    fontSize: 12.5,
    lineHeight: 18,
    color: theme.textSub, // secondary supporting text
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  progressSection: {
    marginTop: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 11.5,
    color: theme.textMuted, // quiet label
    fontWeight: "500",
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: "800",
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: theme.surface3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },

  actionRow: {
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  actionText: {
    fontSize: 13,
    fontWeight: "700",
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginLeft: 6,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});