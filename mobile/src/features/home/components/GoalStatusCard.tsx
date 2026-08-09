
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  Target,
  ChevronRight,
  Trophy,
} from "lucide-react-native";

import { WeightGoal } from "../types/HomeTypes";

interface GoalStatusCardProps {
  goal?: WeightGoal | null;
  onPress: () => void;
}

export function GoalStatusCard({
  goal,
  onPress,
}: GoalStatusCardProps) {
  const achieved = goal?.status === "ACHIEVED";

  const heading = !goal
    ? "Set Your Weight Goal"
    : achieved
    ? "Goal Achieved"
    : "Keep Going";

  const description = !goal
    ? "Set a target weight and track your progress over time."
    : achieved
    ? "Great job! You've reached your target weight."
    : `${goal.progress_percentage}% of the way to your target weight.`;

  const buttonLabel = !goal
    ? "Set Goal"
    : achieved
    ? "Set New Goal"
    : "View Progress";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          {achieved ? (
            <Trophy size={17} color="#10B981" />
          ) : (
            <Target size={17} color="#10B981" />
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.heading}>{heading}</Text>

          <Text style={styles.description}>
            {description}
          </Text>
        </View>
      </View>

      {!!goal && !achieved && (
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>
              Goal Progress
            </Text>

            <Text style={styles.progressPercentage}>
              {goal.progress_percentage}%
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(
                    Math.max(goal.progress_percentage, 0),
                    100
                  )}%`,
                },
              ]}
            />
          </View>
        </View>
      )}

      <View style={styles.actionRow}>
        <Text style={styles.actionText}>{buttonLabel}</Text>
        <ChevronRight size={15} color="#10B981" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  cardPressed: {
    opacity: 0.75,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  content: {
    flex: 1,
  },

  heading: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  description: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    color: "#64748B",
  },

  progressSection: {
    marginTop: 12,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  progressLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "500",
  },

  progressPercentage: {
    fontSize: 11,
    color: "#10B981",
    fontWeight: "700",
  },

  progressTrack: {
    height: 5,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#10B981",
  },

  actionRow: {
    marginTop: 11,
    paddingTop: 9,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10B981",
    marginRight: 1,
  },
});
