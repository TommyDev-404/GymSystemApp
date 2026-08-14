import { View, Text, Image, StyleSheet } from "react-native";
import { ReferralRecord } from "../types/ReferralTypes";
import { EmptyState } from "@/components/shared/EmptyState";
import { Receipt } from "lucide-react-native";

export default function ReferralList({
  data,
}: {
  data: ReferralRecord[];
}) {
  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Referrals</Text>

      {data.length > 0 ? (
        data.map((r: ReferralRecord) => (
          <View key={r.name} style={styles.card}>
            <View style={styles.avatarContainer}>
              {r.profile ? (
                <Image
                  source={{ uri: r.profile }}
                  style={styles.img}
                />
              ) : (
                <View style={styles.fallbackAvatar}>
                  <Text style={styles.initials}>
                    {getInitials(r.name)}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{r.name}</Text>

              <Text style={styles.sub}>
                Joined{" "}
                {new Date(r.joined_date).toLocaleDateString("en-PH", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </Text>
            </View>

            <View style={styles.rewardContainer}>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      r.status === "Active"
                        ? "#10b981"
                        : "#f59e0b",
                  },
                ]}
              >
                {r.status}
              </Text>

              <Text style={styles.reward}>
                +{r.points_earned} points
              </Text>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <EmptyState
            icon={Receipt}
            title="No referrals yet"
            subtitle="Invite your friends to join the gym and earn points when they sign up."
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },

  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 10,
  },

  img: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  fallbackAvatar: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ecfdf5",
    alignItems: "center",
    justifyContent: "center",
  },

  initials: {
    fontSize: 14,
    fontWeight: "700",
    color: "#10b981",
  },

  info: {
    flex: 1,
  },

  name: {
    fontWeight: "600",
    fontSize: 13,
  },

  sub: {
    fontSize: 11,
    color: "#64748b",
  },

  rewardContainer: {
    alignItems: "flex-end",
  },

  status: {
    fontSize: 12,
    fontWeight: "600",
  },

  reward: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 2,
  },
});