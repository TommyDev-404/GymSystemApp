import React from "react";
import {
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

import { theme } from "@/utils/theme";

export function CategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}: any) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat: any) => {
        const Icon = cat.icon;
        const active = activeCategory === cat.label;

        return (
          <Pressable
            key={cat.id}
            onPress={() => setActiveCategory(cat.label)}
            style={[
              styles.filter,
              active && styles.activeFilter,
            ]}
          >
            <Icon
              size={14}
              color={active ? "#FFFFFF" : theme.primaryLight}
              strokeWidth={2.2}
            />

            <Text
              style={[
                styles.label,
                active && styles.activeLabel,
              ]}
            >
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignItems: "center",
  },

  filter: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 12,
    paddingVertical: 7,

    borderRadius: 999,

    marginRight: 8,

    backgroundColor: theme.surface,

    borderWidth: 1,
    borderColor: "rgba(52, 211, 153, 0.25)",
  },

  activeFilter: {
    backgroundColor: theme.primary,
    borderColor: theme.primaryLight,
  },

  label: {
    marginLeft: 6,

    fontSize: 11.5,
    fontWeight: "600",

    color: theme.textSub,
  },

  activeLabel: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});