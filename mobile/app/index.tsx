import { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { member } = useAuth();

  useEffect(() => {
    if (member) {
      router.replace("/(app)/(tabs)" as any);
    } else {
      router.replace("/(auth)/login" as any);
    }
  }, []);

  return null;
}