import { router } from "expo-router";
import { ChevronRight, Dumbbell, PlayCircle } from "lucide-react-native";
import {
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import { WorkoutTutorialCard } from "./tutorial/WorkoutTutorialCard";
import { EmptyState } from "@/components/shared/EmptyState";

interface Props {
  tutorials: any[];
  onPressTutorial?: (tutorial: any) => void;
}

export function WorkoutTutorials({
  tutorials,
  onPressTutorial,
}: Props) {
  return (
    <View style={{ marginTop: 5 }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#0f172a",
          }}
        >
          Workout Tutorials
        </Text>

        {tutorials.length > 0 &&
          <Pressable
            onPress={() => router.push("/(app)/workout-tutorial")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Text
              style={{
                color: "#10b981",
                fontWeight: "600",
              }}
            >
              See More
            </Text>

            <ChevronRight size={16} color="#10b981" />
          </Pressable>
        }
      </View>

      {/* Tutorial List */}
      <FlatList
        data={tutorials}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexGrow: 1,
          justifyContent: tutorials.length === 0 ? "center" : "flex-start",
        }}
        ItemSeparatorComponent={() => (
          <View style={{ width: 14 }} />
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <EmptyState
              icon={PlayCircle}
              title="No workout tutorials yet"
              subtitle="Explore guided exercises and training videos to improve your workouts."
            />
          </View>
        )}
        renderItem={({ item }) => (
          <View style={{ width: 260 }}>
            <WorkoutTutorialCard item={item} />
          </View>
        )}
      />
    </View>
  );
}
