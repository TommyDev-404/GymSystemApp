
import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { member, loading } = useAuth();
  
  if (loading) {
    return null;
  }

  if (member) {
    return <Redirect href="/(app)/(tabs)/home"  />;
  }

  return <Redirect href="/(auth)/login" />;
}