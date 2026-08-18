import React from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { ChevronRight, PlayCircle } from "lucide-react-native";
import { router } from "expo-router";
import { WorkoutTutorialCard } from "./tutorial/WorkoutTutorialCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { theme } from "@/utils/theme";

interface Props {
  tutorials: any[];
}

export function WorkoutTutorials({ tutorials }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Workout Tutorials</Text>

          <Text style={styles.subtitle}>
            Learn proper form and techniques
          </Text>
        </View>

        {tutorials.length > 0 && (
          <Pressable
            onPress={() =>
              router.push("/(app)/workout-tutorial")
            }
            style={({ pressed }) => [
              styles.seeMoreButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.seeMoreText}>
              See More
            </Text>

            <ChevronRight
              size={15}
              color={theme.primaryLight}
              strokeWidth={2.5}
            />
          </Pressable>
        )}
      </View>

      {tutorials.length > 0 ? (
        <FlatList
          data={tutorials}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <WorkoutTutorialCard item={item} />
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <EmptyState
            icon={PlayCircle}
            title="No workout tutorials yet"
            subtitle="Explore guided exercises and training videos to improve your workouts."
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.text,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 10.5,
    fontWeight: "500",
    color: theme.textMuted,
  },
  seeMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingVertical: 6,
    paddingLeft: 8,
  },
  seeMoreText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: theme.primaryLight,
  },
  pressed: {
    opacity: 0.65,
  },
  list: {
    paddingVertical: 3,
  },
  separator: {
    width: 12,
  },
  cardWrapper: {
    width: 260,
  },
  emptyContainer: {
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

});