import { useEffect, useState } from "react";
import { FlatList, Text, Pressable, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ChevronRight, Dumbbell, Search } from "lucide-react-native";
import SearchHeader from "@/features/search/components/SearchHeader";
import RecentSection from "@/features/search/components/RecentSection";
import { EmptyState } from "@/components/shared/EmptyState";
import { StackWrapper } from "@/components/shared/StackWrapper";
import { theme } from "@/utils/theme";
import { useSearchExercises } from "@/features/workout/hook/useWorkout";

const RECENT_EXERCISES_KEY = "@recent_exercises_searches";
const MAX_RECENT_EXERCISES = 5;

interface RecentExercise {
  id: number;
  name: string;
}

export default function ExerciseSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recentExercises, setRecentExercises] = useState<RecentExercise[]>([]);

  const { data: exercises = [], isLoading } = useSearchExercises(query);

  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    loadRecentExercises();
  }, []);

  const loadRecentExercises = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_EXERCISES_KEY);

      if (!stored) return;

      const parsed: unknown = JSON.parse(stored);

      if (!Array.isArray(parsed)) return;

      const valid = parsed.filter(
        (item): item is RecentExercise =>
          typeof item === "object" &&
          item !== null &&
          "id" in item &&
          "name" in item &&
          typeof item.id === "number" &&
          typeof item.name === "string"
      );

      setRecentExercises(valid);
    } catch (error) {
      console.error("Failed to load recent exercises:", error);
    }
  };

  const saveRecentExercise = async (exercise: RecentExercise) => {
    const updated = [
      exercise,
      ...recentExercises.filter((item) => item.id !== exercise.id),
    ].slice(0, MAX_RECENT_EXERCISES);

    setRecentExercises(updated);

    try {
      await AsyncStorage.setItem(
        RECENT_EXERCISES_KEY,
        JSON.stringify(updated)
      );
    } catch (error) {
      console.error("Failed to save recent exercise:", error);
    }
  };

  const openExercise = async (exercise: RecentExercise) => {
    await saveRecentExercise(exercise);

    router.push({
      pathname: "/(app)/workout-details",
      params: {
        fetch: "true",
        workoutId: String(exercise.id),
      },
    });
  };

  const handleRecentPress = async (name: string) => {
    const exercise = recentExercises.find((item) => item.name === name);

    if (!exercise) return;

    await openExercise(exercise);
  };

  const headerContent = (
    <SearchHeader
      query={query}
      setQuery={setQuery}
      onBack={() => router.back()}
      placeholder="Search exercises..."
    />
  );

  return (
    <StackWrapper
      title=""
      showDefaultHeader={false}
      headerContent={headerContent}
      useScrollView={false}
      horizontalPadding={0}
      paddingTop={0}
      paddingBottom={0}
      gap={0}
    >
      {!hasQuery ? (
        <FlatList
          data={[]}
          renderItem={null}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.recentContent}
          ListEmptyComponent={
            <RecentSection
              recent={recentExercises.map((item) => item.name)}
              onRecentPress={handleRecentPress}
            />
          }
        />
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.list,
            exercises.length === 0 && styles.emptyList,
          ]}
          ListHeaderComponent={
            exercises.length > 0 ? (
              <Text style={styles.resultLabel}>
                {exercises.length}{" "}
                {exercises.length === 1 ? "exercise" : "exercises"} found
              </Text>
            ) : null
          }
          ListEmptyComponent={
            isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                  Searching exercises...
                </Text>
              </View>
            ) : (
              <EmptyState
                icon={Search}
                title="No exercises found"
                subtitle={`We couldn't find an exercise matching "${query.trim()}". Try a different name.`}
              />
            )
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                openExercise({
                  id: Number(item.id),
                  name: item.name,
                })
              }
              style={({ pressed }) => [
                styles.exerciseCard,
                pressed && styles.exercisePressed,
              ]}
            >
              <View style={styles.exerciseIcon}>
                <Dumbbell
                  size={18}
                  color={theme.primaryLight}
                  strokeWidth={2.2}
                />
              </View>

              <View style={styles.exerciseContent}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseSubtitle}>
                  View exercise details
                </Text>
              </View>

              <ChevronRight
                size={18}
                color={theme.textMuted}
                strokeWidth={2}
              />
            </Pressable>
          )}
        />
      )}
    </StackWrapper>
  );
}

const styles = StyleSheet.create({
  recentContent: {
    flexGrow: 1,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },
  resultLabel: {
    marginBottom: 10,
    marginLeft: 2,
    fontSize: 11,
    fontWeight: "600",
    color: theme.textMuted,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  loadingText: {
    fontSize: 11,
    fontWeight: "500",
    color: theme.textMuted,
  },
  exerciseCard: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 8,
    backgroundColor: theme.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
  },
  exercisePressed: {
    backgroundColor: theme.surface,
    borderColor: theme.borderAccent,
    transform: [{ scale: 0.99 }],
  },
  exerciseIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
  },
  exerciseSubtitle: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: "500",
    color: theme.textMuted,
  },
});