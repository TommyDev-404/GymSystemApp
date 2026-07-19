import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bot } from "lucide-react-native";

export default function AiHeader() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255,255,255,0.1)",
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: "rgba(16,185,129,.2)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Bot size={20} color="#10B981" />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              fontSize: 15,
            }}
          >
            AI Fitness Coach
          </Text>

         <View
         style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 2,
         }}
         >
         <View
            style={{
               width: 6,
               height: 6,
               borderRadius: 3,
               backgroundColor: "#10B981", // green dot
               marginRight: 5,
            }}
         />

         <Text
            style={{
               color: "rgba(255,255,255,.5)",
               fontSize: 11,
            }}
         >
            Online
         </Text>
         </View>
        </View>
      </View>
    </SafeAreaView>
  );
}