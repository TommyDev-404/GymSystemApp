import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import { Star, Zap, Flame, Dumbbell, Heart, Wind } from "lucide-react-native";

const categories = [
  { id: "all", label: "All", icon: Star, color: "#64748b" },
  { id: "Muscle Gain", label: "Muscle Gain", icon: Dumbbell, color: "#3b82f6" },
  { id: "Weight Loss", label: "Weight Loss", icon: Flame, color: "#ef4444" },
  { id: "Strength", label: "Strength", icon: Star, color: "#8b5cf6" },
  { id: "Endurance", label: "Endurance", icon: Zap, color: "#10b981" },
  { id: "Fat Loss", label: "Fat Loss", icon: Flame, color: "#f97316" },
  { id: "Flexibility", label: "Flexibility", icon: Wind, color: "#06b6d4" },
  { id: "General Fitness", label: "General Fitness", icon: Heart, color: "#ec4899" },
];
 
import { WorkoutTutorialsHeader } from "@/features/workout/components/tutorial/WorkoutTutorialsHeader";
import { CategoryFilter } from "@/features/workout/components/tutorial/CategoryFilter";
import { WorkoutTutorialCard } from "@/features/workout/components/tutorial/WorkoutTutorialCard";
import { useWorkoutTutorials } from "../hook/useWorkout";
import { FlatList } from "react-native-gesture-handler";
import { EmptyState } from "@/components/shared/EmptyState";

export function WorkoutTutorialsScreen({ onBack }: any) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  const { data: tutorials = [], isLoading, error } = useWorkoutTutorials({ category: activeCategory });
  console.log(tutorials.length);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <WorkoutTutorialsHeader onBack={onBack} />
            
      <View style={{ marginTop: 4 }}>
         <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
         />
      </View>

      <FlatList
        data={tutorials}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WorkoutTutorialCard item={item} />
        )}
        contentContainerStyle={{
          padding: 16,
          flexGrow: 1,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 14 }} />
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EmptyState
              icon={Dumbbell}
              title="No workouts yet"
              subtitle="Start your first workout to see your history here."
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}