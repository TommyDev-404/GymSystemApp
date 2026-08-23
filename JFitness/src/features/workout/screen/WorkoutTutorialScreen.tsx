import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Dumbbell,
  Flame,
  Heart,
  Star,
  Wind,
  Zap,
} from "lucide-react-native";
import { EmptyState } from "@/components/shared/EmptyState";
import { StackWrapper } from "@/components/shared/StackWrapper";
import { CategoryFilter } from "@/features/workout/components/tutorial/CategoryFilter";
import { WorkoutTutorialCard } from "@/features/workout/components/tutorial/WorkoutTutorialCard";
import { useWorkoutTutorials } from "../hook/useWorkout";

const categories = [
  {
    id: "all",
    label: "All",
    icon: Star,
    color: "#64748b",
  },
  {
    id: "Muscle Gain",
    label: "Muscle Gain",
    icon: Dumbbell,
    color: "#3b82f6",
  },
  {
    id: "Weight Loss",
    label: "Weight Loss",
    icon: Flame,
    color: "#ef4444",
  },
  {
    id: "Strength",
    label: "Strength",
    icon: Star,
    color: "#8b5cf6",
  },
  {
    id: "Endurance",
    label: "Endurance",
    icon: Zap,
    color: "#10b981",
  },
  {
    id: "Fat Loss",
    label: "Fat Loss",
    icon: Flame,
    color: "#f97316",
  },
  {
    id: "Flexibility",
    label: "Flexibility",
    icon: Wind,
    color: "#06b6d4",
  },
  {
    id: "General Fitness",
    label: "General Fitness",
    icon: Heart,
    color: "#ec4899",
  },
];

export function WorkoutTutorialsScreen() {
	const [activeCategory, setActiveCategory] = useState("All");
	const { data: tutorials = [], isLoading } = useWorkoutTutorials({
		category: activeCategory,
	});

	return (
		<StackWrapper
			title="Workout Tutorials"
			subtitle="Step-by-step exercise guides"
			headerContent={
				<View style={styles.categoryContainer}>
					<CategoryFilter
						categories={categories}
						activeCategory={activeCategory}
						setActiveCategory={setActiveCategory}
					/>
				</View>
			}
			loading={isLoading}
			scrollEnabled={false}
			useScrollView={false}
		>
			<FlatList
			data={tutorials}
			keyExtractor={(item: any) => String(item.id)}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.listContent}
			renderItem={({ item }: { item: any }) => (
				<WorkoutTutorialCard item={item} />
			)}
			ListEmptyComponent={
				<View style={styles.emptyList}>
					<EmptyState
					icon={Dumbbell}
					title="No workouts yet"
					subtitle="Workout tutorials for this category will appear here when available."
					/>
				</View>
			}
			/>
		</StackWrapper>
	);
}

const styles = StyleSheet.create({
  categoryContainer: {
    marginTop: 4,
  },
  listContent: {
    flexGrow: 1,
    gap: 14,
    paddingTop: 4,
  },
  emptyList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
});