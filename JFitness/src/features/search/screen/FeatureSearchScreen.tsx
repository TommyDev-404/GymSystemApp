import { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import SearchHeader from "@/features/search/components/SearchHeader";
import FeatureItem from "@/features/search/components/FeatureItem";
import RecentSection from "@/features/search/components/RecentSection";
import EmptyState from "@/features/search/components/EmptyState";

import { AppBackground } from "@/components/shared/AppBackground";

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
    keywords: ["stats", "analytics"],
  },
  {
    id: "10",
    title: "AI Chatbot",
    subtitle: "Fitness assistant",
    icon: "chatbot",
    route: "/chatbot",
    keywords: ["ai", "bot", "assistant"],
  },
  {
    id: "11",
    title: "Settings",
    subtitle: "App settings",
    icon: "settings",
    route: "/settings",
    keywords: ["preferences", "configuration"],
  },
];

export const RECENT = [
  "Members",
  "Payments",
  "Attendance",
  "Chatbot",
];

export const QUICK_ACTIONS = [
  "Add Workout",
  "Check-in",
  "Timer",
  "Ai-Fitness Buddy",
];

export default function FeatureSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return [];

    return APP_FEATURES.filter((item) => {
      const titleMatch = item.title
        .toLowerCase()
        .includes(search);

      const subtitleMatch = item.subtitle
        .toLowerCase()
        .includes(search);

      const keywordMatch = item.keywords.some((keyword) =>
        keyword.toLowerCase().includes(search)
      );

      return titleMatch || subtitleMatch || keywordMatch;
    });
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <AppBackground>
      <SafeAreaView style={styles.container}>
        {/* SEARCH HEADER */}
        <SearchHeader
          query={query}
          setQuery={setQuery}
          placeholder="Search features..."
          onBack={() => router.back()}
        />

        {/* CONTENT */}
        {!hasQuery ? (
          <View style={styles.recentContainer}>
            <RecentSection
              recent={RECENT}
              quick={QUICK_ACTIONS}
            />
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              styles.resultsContent,
              results.length === 0 && styles.emptyContent,
            ]}
            renderItem={({ item }) => (
              <FeatureItem
                item={item}
                onPress={() =>
                  router.push(item.route as any)
                }
              />
            )}
            ListEmptyComponent={
              <EmptyState
                hint="Members, Payments, QR, Attendance, Reports"
              />
            }
          />
        )}
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  recentContainer: {
    flex: 1,
  },

  resultsContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 30,
  },

  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});