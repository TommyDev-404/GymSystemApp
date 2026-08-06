import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="qr-scanner"
        options={{
          presentation: "fullScreenModal",
          animation: "fade",
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="ai-assistant"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="share-progress"
        options={{
          presentation: "modal", // full screen slide-up, standard for compose flows
          headerShown: false,
        }}
      />
    </Stack>
  );
}