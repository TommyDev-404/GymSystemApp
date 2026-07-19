import { useEffect } from "react";
import { router } from "expo-router";

export default function Index() {
  const isLoggedIn = false; // replace later with AsyncStorage / Zustand

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/(app)/(tabs)" as any);
    } else {
      router.replace("/(auth)/login" as any);
    }
  }, []);

  return null;
}