import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";

const ONBOARDING_KEY = "onboarding_completed";

export default function Index() {
  const { authenticated, loading } = useAuth();
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  
  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);

      setOnboardingCompleted(value === "true");
      setCheckingOnboarding(false);
    };

    checkOnboarding();
  }, []);

  if (loading || checkingOnboarding) {
    return null;
  }

  if (!onboardingCompleted) {
    return <Redirect href="/welcome" />;
  }
  
  if (authenticated) {
    return <Redirect href="/(app)/(tabs)/home" />;
  }


  return <Redirect href="/(auth)/login" />;
}