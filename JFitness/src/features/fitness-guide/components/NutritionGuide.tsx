import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Apple, Utensils } from "lucide-react-native";
import { theme } from "@/utils/theme";
import { FitnessGuide } from "../types/fitnessTypes";

const GREEN = theme.primary;

interface NutritionGuideCardProps {
  guide: FitnessGuide;
}

export function NutritionGuideCard({
  guide,
}: NutritionGuideCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Utensils
            size={18}
            color={GREEN}
            strokeWidth={2.2}
          />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.label}>NUTRITION</Text>

          <Text style={styles.description}>
            {guide.nutritionDescription}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {guide.nutrition.map((category) => (
          <View
            key={category.title}
            style={styles.category}
          >
            <View style={styles.categoryHeader}>
              <View style={styles.foodIcon}>
                <Apple
                  size={14}
                  color={GREEN}
                  strokeWidth={2.2}
                />
              </View>

              <Text style={styles.categoryTitle}>
                {category.title}
              </Text>
            </View>

            <Text style={styles.categoryDescription}>
              {category.description}
            </Text>

            <View style={styles.foodList}>
              {category.foods.map((food) => (
                <View
                  key={food}
                  style={styles.foodChip}
                >
                  <Text style={styles.foodText}>
                    {food}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: `${GREEN}20`,
    marginRight: 10,
  },

  headerText: {
    flex: 1,
  },

  label: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.7,
    color: GREEN,
  },

  description: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
    color: theme.textSub,
  },

  content: {
    marginTop: 16,
    gap: 10,
  },

  category: {
    padding: 12,
    borderRadius: 13,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  foodIcon: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    marginRight: 8,
  },

  categoryTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
  },

  categoryDescription: {
    marginTop: 5,
    fontSize: 10.5,
    lineHeight: 15,
    color: theme.textMuted,
  },

  foodList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 9,
  },

  foodChip: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

  foodText: {
    fontSize: 10,
    fontWeight: "600",
    color: theme.textSub,
  },
});