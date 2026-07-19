import React from "react";
import { ScrollView, Pressable, Text } from "react-native";

export function CategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}: any) {
   return (
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 4,
        alignItems: "center",
      }}
    >
      {categories.map((cat: any) => {
        const Icon = cat.icon;
        const active = activeCategory === cat.label;
    
        return (
          <Pressable
            key={cat.id}
            onPress={() => setActiveCategory(cat.label)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: active ? cat.color : "#f1f5f9",
              marginRight: 8,
            }}
          >
            <Icon size={14} color={active ? "white" : cat.color} />
            <Text
              style={{
                marginLeft: 6,
                fontSize: 12,
                fontWeight: "600",
                color: active ? "white" : "#64748b",
              }}
            >
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}