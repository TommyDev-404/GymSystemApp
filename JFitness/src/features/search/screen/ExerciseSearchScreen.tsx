import { useMemo, useState } from "react";
import { FlatList, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";

import SearchHeader from "@/features/search/components/SearchHeader";
import EmptyState from "@/features/search/components/EmptyState";

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
    if (!query.trim()) return [];

    return EXERCISES.filter((ex) =>
      ex.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <SearchHeader
        query={query}
        setQuery={setQuery}
        onBack={() => router.back()}
        placeholder="Search exercises..."
      />

      <FlatList
        data={query.length ? results : []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<EmptyState hint="Plank, Push-up, Pull-up, Squat, Deadlift" />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => console.log(item.name)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              gap: 10,
            }}
          >
            <Search size={18} color="#64748b" />

            <Text style={{ fontSize: 15, color: "#0f172a" }}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}