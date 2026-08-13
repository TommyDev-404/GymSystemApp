import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export function QuickActionsGrid({ actions }: any) {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text style={styles.title}>
        Quick Actions
      </Text>

      <View style={styles.row}>
        {actions.map((a: any, i: number) => {
          const Icon = a.icon;

          return (
            <Pressable
              key={i}
              onPress={a.onPress}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed,
              ]}
            >
              <View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor: a.bg,
                  },
                ]}
              >
                <Icon
                  size={22}
                  color={a.color}
                />
              </View>

              <Text
                style={styles.label}
                numberOfLines={2}
              >
                {a.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  card: {
    flex: 1,

    height: 105,

    borderRadius: 18,
    backgroundColor: "white",

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 8,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  pressed: {
    transform: [
      {
        scale: 0.96,
      },
    ],
  },

  iconBox: {
    width: 42,
    height: 42,

    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 8,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",

    textAlign: "center",
  },
});