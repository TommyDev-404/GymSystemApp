import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Receipt } from "lucide-react-native";
import { ReferralRecord } from "../types/ReferralTypes";
import { EmptyState } from "@/components/shared/EmptyState";
import { theme } from "@/utils/theme";

interface ReferralListProps {
  data: ReferralRecord[];
}

export default function ReferralList({ data }: ReferralListProps) {
  const getInitials = (name: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const renderItem = ({ item }: { item: ReferralRecord }) => {
    const isActive = item.status === "Active";

    return (
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          {item.profile ? (
            <Image source={{ uri: item.profile }} style={styles.img} resizeMode="cover" />
          ) : (
            <View style={styles.fallbackAvatar}>
              <Text style={styles.initials}>{getInitials(item.name)}</Text>
            </View>
          )}
        </View>

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.sub}>
            Joined{" "}
            {new Date(item.joined_date).toLocaleDateString("en-PH", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Text>
        </View>

        <View style={styles.rewardContainer}>
          <View
            style={[
              styles.statusBadge,
              isActive ? styles.activeBadge : styles.pendingBadge,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                isActive ? styles.activeDot : styles.pendingDot,
              ]}
            />
            <Text
              style={[
                styles.status,
                isActive ? styles.activeText : styles.pendingText,
              ]}
            >
              {item.status}
            </Text>
          </View>
          <Text style={styles.reward}>+{item.points_earned} pts</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Your Referrals</Text>
        <Text style={styles.subtitle}>
          Track friends you've invited and the points you've earned
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmptyState
              icon={Receipt}
              title="No referrals yet"
              subtitle="Invite your friends to join the gym and earn points when they sign up."
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.text,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 10.5,
    lineHeight: 15,
    color: theme.textMuted,
  },
  listContent: {
    gap: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarContainer: {
    width: 42,
    height: 42,
    borderRadius: 13,
    overflow: "hidden",
    marginRight: 11,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  fallbackAvatar: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
  },
  initials: {
    fontSize: 13,
    fontWeight: "800",
    color: theme.primaryLight,
  },
  info: {
    flex: 1,
    paddingRight: 8,
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
  },
  sub: {
    marginTop: 3,
    fontSize: 10,
    color: theme.textMuted,
  },
  rewardContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
  },
  activeBadge: {
    backgroundColor: "rgba(16,185,129,0.08)",
    borderColor: "rgba(16,185,129,0.20)",
  },
  pendingBadge: {
    backgroundColor: "rgba(245,158,11,0.08)",
    borderColor: "rgba(245,158,11,0.20)",
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    marginRight: 5,
  },
  activeDot: {
    backgroundColor: "#10B981",
  },
  pendingDot: {
    backgroundColor: "#F59E0B",
  },
  status: {
    fontSize: 9,
    fontWeight: "700",
  },
  activeText: {
    color: "#10B981",
  },
  pendingText: {
    color: "#F59E0B",
  },
  reward: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: "700",
    color: theme.textSub,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
});