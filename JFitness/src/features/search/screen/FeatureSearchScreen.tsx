import { useMemo, useState } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import SearchHeader from "@/features/search/components/SearchHeader";
import FeatureItem from "@/features/search/components/FeatureItem";
import RecentSection from "@/features/search/components/RecentSection";
import EmptyState from "@/features/search/components/EmptyState";

export const APP_FEATURES = [
   {
     id: "1",
     title: "Dashboard",
     subtitle: "Overview of your gym",
     icon: "dashboard",
     route: "/dashboard",
     keywords: ["home", "overview"],
   },
   {
     id: "2",
     title: "Members",
     subtitle: "Manage gym members",
     icon: "members",
     route: "/members",
     keywords: ["member", "users"],
   },
   {
     id: "3",
     title: "Attendance",
     subtitle: "QR check-in records",
     icon: "attendance",
     route: "/attendance",
     keywords: ["scan", "qr", "check in"],
   },
   {
     id: "4",
     title: "Payments",
     subtitle: "Billing system",
     icon: "payments",
     route: "/payments",
     keywords: ["cash", "payment"],
   },
   {
     id: "5",
     title: "Workout Plans",
     subtitle: "Training routines",
     icon: "workouts",
     route: "/workouts",
     keywords: ["fitness", "routine"],
   },
   {
     id: "6",
     title: "Exercise Library",
     subtitle: "Browse exercises",
     icon: "exercises",
     route: "/exercise-library",
     keywords: ["exercise"],
   },
   {
     id: "7",
     title: "QR Scanner",
     subtitle: "Scan member QR",
     icon: "scanner",
     route: "/scanner",
     keywords: ["qr", "scan"],
   },
   {
     id: "8",
     title: "Announcements",
     subtitle: "Notify members",
     icon: "announcements",
     route: "/announcements",
     keywords: ["news"],
   },
   {
     id: "9",
     title: "Reports",
     subtitle: "Analytics",
     icon: "reports",
     route: "/reports",
     keywords: ["stats"],
   },
   {
     id: "10",
     title: "AI Chatbot",
     subtitle: "Fitness assistant",
     icon: "chatbot",
     route: "/chatbot",
     keywords: ["ai", "bot"],
   },
   {
     id: "11",
     title: "Settings",
     subtitle: "App settings",
     icon: "settings",
     route: "/settings",
     keywords: ["preferences"],
   },
 ];
 
 export const RECENT = ["Members", "Payments", "Attendance", "Chatbot"];
 
 export const QUICK_ACTIONS = ["Add Workout", "Check-in", "Timer", "Ai-Fitness Buddy"];

export default function FeatureSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    return APP_FEATURES.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
    );
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <SearchHeader query={query} setQuery={setQuery} placeholder={"Search features..."} onBack={() => router.back()} />

      {query.length === 0 ? (
        <RecentSection recent={RECENT} quick={QUICK_ACTIONS} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={<EmptyState hint="Members, Payments, QR, Attendance, Reports" />}
          renderItem={({ item }) => (
            <FeatureItem
              item={item}
              onPress={() => router.push(item.route as any)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}