
import { View } from "react-native";

import HomeScreen from "@/features/home/screen/HomeScreen";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen onOpenAI={() => router.push('/(app)/ai-assistant')} />
    </View>
  );
}