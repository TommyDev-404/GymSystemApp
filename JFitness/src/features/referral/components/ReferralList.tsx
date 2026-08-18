import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

import { ReferralRecord } from "../types/ReferralTypes";

import { EmptyState } from "@/components/shared/EmptyState";

import { Receipt } from "lucide-react-native";

import { theme } from "@/utils/theme";

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
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Your Referrals
          </Text>

          <Text style={styles.subtitle}>
            Track friends you've invited and the points you've earned
          </Text>
        </View>
      </View>

      {/* LIST */}

      {data.length > 0 ? (
        data.map((r: ReferralRecord) => {
          const isActive = r.status === "Active";

          return (
            <View
              key={r.name}
              style={styles.card}
            >
              {/* AVATAR */}

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

              {/* INFO */}

              <View style={styles.info}>
                <Text
                  style={styles.name}
                  numberOfLines={1}
                >
                  {r.name}
                </Text>

                <Text style={styles.sub}>
                  Joined{" "}
                  {new Date(
                    r.joined_date
                  ).toLocaleDateString("en-PH", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </Text>
              </View>

              {/* REWARD */}

              <View style={styles.rewardContainer}>
                <View
                  style={[
                    styles.statusBadge,
                    isActive
                      ? styles.activeBadge
                      : styles.pendingBadge,
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      isActive
                        ? styles.activeDot
                        : styles.pendingDot,
                    ]}
                  />

                  <Text
                    style={[
                      styles.status,
                      isActive
                        ? styles.activeText
                        : styles.pendingText,
                    ]}
                  >
                    {r.status}
                  </Text>
                </View>

                <Text style={styles.reward}>
                  +{r.points_earned} pts
                </Text>
              </View>
            </View>
          );
        })
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
  /* ================= CONTAINER ================= */

  container: {
    paddingHorizontal: 20,

    paddingTop: 22,

    paddingBottom: 20,
  },

  /* ================= HEADER ================= */

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

    color: theme.textMuted,
  },

  /* ================= CARD ================= */

  card: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: theme.card,

    padding: 13,

    borderRadius: 16,

    marginBottom: 10,

    borderWidth: 1,

    borderColor: theme.borderAccent,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.18,

    shadowRadius: 10,

    elevation: 4,
  },

  /* ================= AVATAR ================= */

  avatarContainer: {
    width: 42,

    height: 42,

    borderRadius: 14,

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

  /* ================= INFO ================= */

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

  /* ================= REWARD ================= */

  rewardContainer: {
    alignItems: "flex-end",
  },

  statusBadge: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 7,

    paddingVertical: 4,

    borderRadius: 999,

    borderWidth: 1,
  },

  activeBadge: {
    backgroundColor: theme.accentWash,

    borderColor: theme.borderAccent,
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
    backgroundColor: theme.primaryLight,
  },

  pendingDot: {
    backgroundColor: "#F59E0B",
  },

  status: {
    fontSize: 9,

    fontWeight: "700",
  },

  activeText: {
    color: theme.primaryLight,
  },

  pendingText: {
    color: "#F59E0B",
  },

  reward: {
    marginTop: 5,

    fontSize: 10,

    fontWeight: "700",

    color: theme.textMuted,
  },

  /* ================= EMPTY ================= */

  emptyContainer: {
    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 20,
  },
});