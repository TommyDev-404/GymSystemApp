import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  Dumbbell,
  ChevronRight,
} from "lucide-react-native";
import { router } from "expo-router";
import { EmptyState } from "@/components/shared/EmptyState";
import { theme } from "@/utils/theme";
import { WorkoutHistoryList } from "./history/WorkoutHistoryList";

interface WorkoutHistoryProps {
  workouts: any[];
}

export function WorkoutHistory({
  workouts,
}: WorkoutHistoryProps) {
  const previewWorkouts = workouts.slice(0, 3);

  return (
    <View style={styles.container}>
      {previewWorkouts.length > 0 ? (
        <WorkoutHistoryList workouts={previewWorkouts} />
      ) : (
        <View style={styles.emptyContainer}>
          <EmptyState
            icon={Dumbbell}
            title="No workouts yet"
            subtitle="Start your first workout to see your history here."
          />
        </View>
      )}

      {workouts.length > 0 && (
        <Pressable
          onPress={() => router.push("/(app)/workout-history")}
          style={({ pressed }) => [
            styles.viewHistoryButton,
            pressed && styles.viewHistoryPressed,
          ]}
        >
          <Text style={styles.viewHistoryText}>
            View Full Workout History
          </Text>
          <ChevronRight
            size={15}
            color={theme.primaryLight}
            strokeWidth={2.5}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  emptyContainer: {
    paddingVertical: 10,
  },
  viewHistoryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    marginTop: 15
  },
  viewHistoryPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  viewHistoryText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: theme.primaryLight,
  },
});