import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SocketProvider>
              <Stack screenOptions={{ headerShown: false }}>
                {/* Auth group */}
                <Stack.Screen name="(auth)" />

                {/* Main app */}
                <Stack.Screen name="(tabs)" />

                {/* MODALS */}
                <Stack.Screen
                  name="ai-assistant"
                  options={{
                    presentation: "modal",
                    animation: "slide_from_bottom",
                  }}
                />

                <Stack.Screen
                  name="qr-scanner"
                  options={{
                    presentation: "fullScreenModal",
                    animation: "fade",
                    gestureEnabled: false,
                  }}
                />

                <Stack.Screen
                  name="workout-tutorial-play-video"
                  options={{
                    presentation: "fullScreenModal",
                    animation: "fade",
                    gestureEnabled: false,
                  }}
                />

              </Stack>
            </SocketProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}