import { router } from "expo-router";
import { BotMessageSquare, Dumbbell, MessageCircle, Search } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppHeader({ isOnWorkout }: { isOnWorkout?: boolean}) {
 
  const handleSearch = () => {
    if (isOnWorkout) {
      router.push({
        pathname: "/(app)/search",
        params: {
          fromWorkout: "true",
        },
      });
    } else {
      router.push("/(app)/search");
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#fff" }}>
      <View
         style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 10,
            gap: 10,

            backgroundColor: "#fff",

            // Bottom border
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
         }}
      >
        {/* Logo */}
        <Pressable
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "#10b981",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Dumbbell size={20} color="white" />
        </Pressable>

         {/* Search */}
         <Pressable
            onPress={handleSearch}
            style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f8fafc",

                height: 36,
                borderRadius: 18,
                paddingHorizontal: 12,
                gap: 8,

                // Border
                borderWidth: 1,
                borderColor: "#e2e8f0", // slate-200
            }}
         >
          <Search size={16} color="#64748b" />

          <Text
              style={{
                color: "#94a3b8",
                fontSize: 14,
              }}
          >
            {!isOnWorkout ? "Search features..." : "Search exercises..."}
              
          </Text>
         </Pressable>

          {/* Chatbot */}
          <Pressable
            onPress={() => router.push("/(app)/ai-assistant")}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BotMessageSquare size={22} color="#475569" />

            {/* Badge */}
            <View
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: "#22c55e", // Green = AI online
              }}
            />
          </Pressable>
      </View>
    </SafeAreaView>
  );
}