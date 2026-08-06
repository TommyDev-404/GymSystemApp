import React from "react";
import { View, Text } from "react-native";
import { Award } from "lucide-react-native";

interface RewardProgressCardProps {
  points: number;
}

export function RewardProgressCard({
  points,
}: RewardProgressCardProps) {
  const maxPoints = 1000;

  const progress = Math.min(
    (points / maxPoints) * 100,
    100
  );

  const remainingPoints = Math.max(
    maxPoints - (points),
    0
  );

  return (
    <View
      style={{
        marginHorizontal: 20,
        padding: 14,
        borderRadius: 16,
        backgroundColor: "white",

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },

        elevation: 3,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Award size={16} color="#f59e0b" />

          <Text
            style={{
              marginLeft: 6,
              fontWeight: "600",
              color: "#0f172a",
            }}
          >
            Reward Points
          </Text>
        </View>

        <Text
          style={{
            color: "#10b981",
            fontWeight: "600",
          }}
        >
          {points ?? 0} / {maxPoints.toLocaleString()}
        </Text>
      </View>


      {/* Progress Bar */}
      <View
        style={{
          height: 10,
          backgroundColor: "#f1f5f9",
          borderRadius: 10,
          marginTop: 10,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#10b981",
            borderRadius: 10,
          }}
        />
      </View>


      <Text
        style={{
          fontSize: 11,
          color: "#64748b",
          marginTop: 6,
        }}
      >
        {remainingPoints > 0
          ? `${remainingPoints} points to next reward`
          : "Congratulations! You unlocked the next reward 🎉"}
      </Text>
    </View>
  );
}