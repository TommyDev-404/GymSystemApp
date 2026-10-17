import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { authenticated, loading } = useAuth();

  if (authenticated) {
    return <Redirect href="/(app)/(tabs)/home" />;
  }
  
  return <Redirect href="/welcome" />;
}