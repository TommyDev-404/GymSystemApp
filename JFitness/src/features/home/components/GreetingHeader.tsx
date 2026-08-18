import { theme } from "@/utils/theme";
import { View, Text } from "react-native";
import { Dumbbell } from "lucide-react-native";

export function GreetingHeader({ memberName }: { memberName: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 24,
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ color: theme.textSub, fontSize: 13, fontWeight: "500" }}>
          Good morning 👋
        </Text>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: theme.text,
            marginTop: 3,
            letterSpacing: -0.3,
          }}
        >
          {memberName ?? "John Doe"}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: theme.primary,
            marginTop: 5,
            fontWeight: "500",
          }}
        >
          Ready for today’s workout?
        </Text>
      </View>

      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          backgroundColor: theme.accentWash,
          borderWidth: 1,
          borderColor: theme.primaryLight + "55",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Dumbbell size={22} color={theme.primary} strokeWidth={2.2} />
      </View>
    </View>
  );
}