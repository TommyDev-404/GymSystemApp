import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import {
	Star,
	Zap,
	Flame,
	Dumbbell,
	Heart,
	Wind,
} from "lucide-react-native";
import { FlatList } from "react-native-gesture-handler";
import { AppBackground } from "@/components/shared/AppBackground";
import { EmptyState } from "@/components/shared/EmptyState";
import { CategoryFilter } from "@/features/workout/components/tutorial/CategoryFilter";
import { WorkoutTutorialCard } from "@/features/workout/components/tutorial/WorkoutTutorialCard";
import { useWorkoutTutorials } from "../hook/useWorkout";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { theme } from "@/utils/theme";

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

	const {
		data: tutorials = [],
		isLoading
	} = useWorkoutTutorials({
		category: activeCategory,
	});

	return (
		<AppBackground>
			<SafeAreaView style={styles.container}>
				<ScreenHeader
					title="Workout Tutorials"
					subtitle="Step-by-step exercise guides"
				/>

				<View style={styles.categoryContainer}>
					<CategoryFilter
						categories={categories}
						activeCategory={activeCategory}
						setActiveCategory={setActiveCategory}
					/>
				</View>

				<View style={styles.listContainer}>
					{isLoading ? (
						<View style={styles.loaderContainer}>
							<ActivityIndicator
								size="small"
								color={theme.primaryLight}
							/>
						</View>
					) : (
						<FlatList
							data={tutorials}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<WorkoutTutorialCard item={item} />
							)}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={[
								styles.listContent,
								tutorials.length === 0 &&
									styles.emptyList,
							]}
							ItemSeparatorComponent={() => (
								<View style={styles.separator} />
							)}
							ListEmptyComponent={
								<EmptyState
									icon={Dumbbell}
									title="No workouts yet"
									subtitle="Workout tutorials for this category will appear here when available."
								/>
							}
						/>
					)}

				</View>
			</SafeAreaView>
		</AppBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "transparent",
	},
	categoryContainer: {
		marginTop: 4,
	},
	listContainer: {
		flex: 1,
		position: "relative",
	},
	listContent: {
		paddingHorizontal: 20,
		paddingTop: 16,
		paddingBottom: 35,
	},
	emptyList: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	separator: {
		height: 14,
	},
	loaderContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	fetchingIndicator: {
		position: "absolute",
		top: 8,
		right: 20,
		width: 28,
		height: 28,
		borderRadius: 14,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.card,
		borderWidth: 1,
		borderColor: theme.borderAccent,
	},
});