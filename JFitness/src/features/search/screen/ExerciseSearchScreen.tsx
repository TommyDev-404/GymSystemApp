import { useMemo, useState } from "react";
import {
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  Dumbbell,
  Search,
} from "lucide-react-native";

import SearchHeader from "@/features/search/components/SearchHeader";
import { AppBackground } from "@/components/shared/AppBackground";
import { theme } from "@/utils/theme";
import { EmptyState } from "@/components/shared/EmptyState";

export const EXERCISES = [
  { id: "1", name: "Push-Up" },
  { id: "2", name: "Pull-Up" },
  { id: "3", name: "Squat" },
  { id: "4", name: "Deadlift" },
  { id: "5", name: "Plank" },
  { id: "6", name: "Bicep Curl" },
];

export default function ExerciseSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return [];

    return EXERCISES.filter((exercise) =>
      exercise.name.toLowerCase().includes(search)
    );
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <AppBackground>
      <SafeAreaView style={styles.container}>

        {/* SEARCH HEADER */}
        <SearchHeader
          query={query}
          setQuery={setQuery}
          onBack={() => router.back()}
          placeholder="Search exercises..."
        />

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.list,
            !hasQuery && styles.emptyList,
          ]}

          /* RESULTS HEADER */
          ListHeaderComponent={
            hasQuery && results.length > 0 ? (
              <Text style={styles.resultLabel}>
                {results.length}{" "}
                {results.length === 1
                  ? "exercise"
                  : "exercises"}{" "}
                found
              </Text>
            ) : null
          }

          /* EMPTY STATE */
          ListEmptyComponent={
            hasQuery ? (
              <EmptyState
                icon={Search}
                title="No exercises found"
                subtitle={`We couldn't find an exercise matching "${query.trim()}". Try a different name.`}
              />
            ) : (
              <EmptyState
                icon={Dumbbell}
                title="Find an exercise"
                subtitle="Search for exercises like Push-Up, Squat, Deadlift, or Plank."
              />
            )
          }

          /* EXERCISE RESULT */
          renderItem={({ item }) => (
            <Pressable
              onPress={() => console.log(item.name)}
              style={({ pressed }) => [
                styles.exerciseCard,
                pressed && styles.exercisePressed,
              ]}
            >
              {/* ICON */}
              <View style={styles.exerciseIcon}>
                <Dumbbell
                  size={18}
                  color={theme.primaryLight}
                  strokeWidth={2.2}
                />
              </View>

              {/* NAME */}
              <View style={styles.exerciseContent}>
                <Text style={styles.exerciseName}>
                  {item.name}
                </Text>

                <Text style={styles.exerciseSubtitle}>
                  View exercise details
                </Text>
              </View>

              {/* ARROW */}
              <ChevronRight
                size={18}
                color={theme.textMuted}
                strokeWidth={2}
              />
            </Pressable>
          )}
        />

      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  /* EXERCISE CARD */

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

    transform: [
      {
        scale: 0.99,
      },
    ],
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