import { Stack } from "expo-router";
import { theme } from "@/utils/theme";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.surface,
        },
        animation: "fade",
        animationDuration: 350,
        gestureEnabled: true,
      }}
    />
  );
}0