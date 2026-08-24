import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import SearchHeader from "@/features/search/components/SearchHeader";
import FeatureItem from "@/features/search/components/FeatureItem";
import RecentSection from "@/features/search/components/RecentSection";
import EmptyState from "@/features/search/components/EmptyState";
import { StackWrapper } from "@/components/shared/StackWrapper";

const RECENT_SEARCHES_KEY = "@recent_feature_searches";
const MAX_RECENT_SEARCHES = 5;

export const APP_FEATURES = [
  {
    id: "1",
    title: "Progress History",
    subtitle: "Track your fitness progress",
    icon: "progress",
    route: "/(app)/fitness-history",
    keywords: ["progress", "weight", "body", "fitness", "history"],
  },
  {
    id: "2",
    title: "Referral",
    subtitle: "Invite friends and earn rewards",
    icon: "referral",
    route: "/(app)/referral",
    keywords: ["refer", "invite", "friend", "referral"],
  },
  {
    id: "3",
    title: "Rewards",
    subtitle: "View and redeem your rewards",
    icon: "rewards",
    route: "/(app)/rewards",
    keywords: ["reward", "points", "redeem", "prize"],
  },
  {
    id: "4",
    title: "Workout Tutorials",
    subtitle: "Learn proper exercise techniques",
    icon: "tutorials",
    route: "/(app)/workout-tutorial",
    keywords: ["workout", "exercise", "tutorial", "technique", "guide"],
  },
  {
    id: "5",
    title: "Attendance History",
    subtitle: "View your gym attendance",
    icon: "attendance",
    route: "/(app)/attendance-history",
    keywords: ["attendance", "check in", "check-in", "visit", "gym"],
  },
  {
    id: "6",
    title: "Payment History",
    subtitle: "View your payment records",
    icon: "payments",
    route: "/(app)/payment-history",
    keywords: ["payment", "payments", "billing", "transaction", "receipt"],
  },
  {
    id: "7",
    title: "Workout History",
    subtitle: "Review your completed workouts",
    icon: "workout-history",
    route: "/(app)/workout-history",
    keywords: ["workout", "exercise", "training", "history", "routine"],
  },
  {
    id: "8",
    title: "My Posts",
    subtitle: "View your shared posts",
    icon: "my-posts",
    route: "/(app)/your-posts",
    keywords: ["post", "posts", "my posts", "feed", "community"],
  },
  {
    id: "9",
    title: "QR Scanner",
    subtitle: "Scan your gym QR code",
    icon: "scanner",
    route: "/(app)/qr-scanner",
    keywords: ["qr", "scan", "scanner", "check in"],
  },
  {
    id: "10",
    title: "Create Post",
    subtitle: "Share your fitness journey",
    icon: "post",
    route: "/(app)/share-progress",
    keywords: ["post", "create", "share", "upload", "photo"],
  },
  {
    id: "11",
    title: "Workout Timer",
    subtitle: "Track your workout intervals",
    icon: "timer",
    route: "/(app)/timer",
    keywords: ["timer", "time", "interval", "rest", "stopwatch"],
  },
  {
    id: "12",
    title: "AI Fitness Buddy",
    subtitle: "Get your personal fitness assistant",
    icon: "ai-buddy",
    route: "/(app)/ai-assistant",
    keywords: ["ai", "buddy", "assistant", "fitness", "coach", "chat"],
  },
  {
    id: "13",
    title: "Personal Information",
    subtitle: "Manage your personal details",
    icon: "personal-info",
    route: "/(app)/personal-info",
    keywords: ["personal", "profile", "information", "name", "details"],
  },
  {
    id: "14",
    title: "Security",
    subtitle: "Manage your account security",
    icon: "security",
    route: "/(app)/security",
    keywords: ["security", "password", "account", "privacy", "login"],
  },
  {
    id: "15",
    title: "About",
    subtitle: "Learn more about the app",
    icon: "about",
    route: "/(app)/about",
    keywords: ["about", "app", "information", "version"],
  },
];

export const QUICK_ACTIONS = [
  "QR Scanner",
  "Workout Timer",
  "AI Fitness Buddy",
  "Create Post",
];

export default function FeatureSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);

      if (!stored) return;

      const parsed: unknown = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        const validRecent = parsed.filter(
          (item): item is string => typeof item === "string"
        );

        setRecent(validRecent);
      }
    } catch (error) {
      console.error("Failed to load recent searches:", error);
    }
  };

  const saveRecentSearch = async (title: string) => {
    const updated = [
      title,
      ...recent.filter((item) => item !== title),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecent(updated);

    try {
      await AsyncStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(updated)
      );
    } catch (error) {
      console.error("Failed to save recent search:", error);
    }
  };

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return [];

    return APP_FEATURES.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(search);
      const subtitleMatch = item.subtitle.toLowerCase().includes(search);
      const keywordMatch = item.keywords.some((keyword) =>
        keyword.toLowerCase().includes(search)
      );

      return titleMatch || subtitleMatch || keywordMatch;
    });
  }, [query]);

  const navigateToFeature = async (title: string) => {
    const feature = APP_FEATURES.find((item) => item.title === title);

    if (!feature) return;

    await saveRecentSearch(feature.title);
    router.push(feature.route as any);
  };

  const handleFeaturePress = async (
    item: (typeof APP_FEATURES)[number]
  ) => {
    await saveRecentSearch(item.title);
    router.push(item.route as any);
  };

  const handleRecentPress = async (title: string) => {
    await navigateToFeature(title);
  };

  const handleQuickPress = async (title: string) => {
    await navigateToFeature(title);
  };

  const hasQuery = query.trim().length > 0;

  const headerContent = (
    <SearchHeader
      query={query}
      setQuery={setQuery}
      placeholder="Search features..."
      onBack={() => router.back()}
    />
  );

  return (
    <StackWrapper
      title=""
      showDefaultHeader={false}
      headerContent={headerContent}
      useScrollView={false}
      horizontalPadding={0}
      paddingTop={0}
      paddingBottom={0}
      gap={0}
    >
      <FlatList
        data={hasQuery ? results : []}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={
          hasQuery
            ? results.length === 0
              ? styles.emptyContent
              : styles.resultsContent
            : styles.recentContent
        }
        renderItem={({ item }) => (
          <FeatureItem
            item={item}
            onPress={() => handleFeaturePress(item)}
          />
        )}
        ListHeaderComponent={
          !hasQuery ? (
            <RecentSection
              recent={recent}
              quick={QUICK_ACTIONS}
              onRecentPress={handleRecentPress}
              onQuickPress={handleQuickPress}
            />
          ) : null
        }
        ListEmptyComponent={
          hasQuery ? (
            <EmptyState hint="Progress, Rewards, QR, Attendance, Workout" />
          ) : null
        }
      />
    </StackWrapper>
  );
}

const styles = StyleSheet.create({
  recentContent: {
    paddingBottom: 30,
  },
  resultsContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 30,
  },
  emptyContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
});