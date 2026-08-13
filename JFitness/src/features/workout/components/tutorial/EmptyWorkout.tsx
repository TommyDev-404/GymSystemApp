import { View, Text } from "react-native";
import { Dumbbell } from "lucide-react-native";

export function EmptyWorkout() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
      }}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#dcfce7",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Dumbbell
          size={34}
          color="#10b981"
        />
      </View>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: "#0f172a",
        }}
      >
        No workouts available
      </Text>

      <Text
        style={{
          fontSize: 13,
          color: "#64748b",
          marginTop: 6,
          textAlign: "center",
        }}
      >
        No workout tutorials found for this category.
      </Text>
    </View>
  );
}