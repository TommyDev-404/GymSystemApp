import React from "react";
import { Pressable, View, Text } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export function MenuItem({ item, route }: any) {
  const { member } = useAuth();
  const Icon = item.icon;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: route,
          params: {
            memberId: member?.memberId,
          },
        })
      }
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",

        marginHorizontal: 8,
        marginVertical: 4,

        paddingHorizontal: 14,
        paddingVertical: 14,

        borderRadius: 16,

        backgroundColor: pressed ? "#f8fafc" : "#fff",

        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          backgroundColor: item.bg,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
        }}
      >
        <Icon size={17} color={item.color} />
      </View>

      <Text
        style={{
          flex: 1,
          fontSize: 14,
          color: "#334155",
          fontWeight: "500",
        }}
      >
        {item.label}
      </Text>

      <ChevronRight size={16} color="#cbd5e1" />
    </Pressable>
  );
}