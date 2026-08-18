import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  Users,
  Copy,
  CheckCircle,
  Share2,
  Gift,
  UserPlus,
} from "lucide-react-native";

import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/utils/theme";

interface ReferralHeroProps {
  code?: string;
  link?: string;
  activeReferrals?: number;
  points?: number;
}

export default function ReferralHero({
  code,
  link,
  activeReferrals = 0,
  points = 0,
}: ReferralHeroProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <View style={styles.card}>
      {/* SUBTLE GLOW */}
      <View style={styles.glow} />

      <LinearGradient
        colors={[
          theme.card,
          "#111a19",
          theme.card,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* ================= HEADER ================= */}

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconBox}>
              <Users
                size={18}
                color={theme.primaryLight}
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.eyebrow}>
                REFERRAL PROGRAM
              </Text>

              <Text style={styles.title}>
                Invite & Earn
              </Text>
            </View>
          </View>

          <View style={styles.pointsBadge}>
            <Gift
              size={13}
              color={theme.primaryLight}
              strokeWidth={2}
            />

            <Text style={styles.pointsBadgeText}>
              {points.toLocaleString()} pts
            </Text>
          </View>
        </View>

        {/* ================= STATS ================= */}

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <View style={styles.statIcon}>
              <UserPlus
                size={14}
                color={theme.textSub}
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.statLabel}>
                ACTIVE REFERRALS
              </Text>

              <Text style={styles.statValue}>
                {activeReferrals}
              </Text>
            </View>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.stat}>
            <View style={styles.statIcon}>
              <Gift
                size={14}
                color={theme.primaryLight}
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.statLabel}>
                POINTS EARNED
              </Text>

              <Text style={styles.statValueGreen}>
                {points.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* ================= DIVIDER ================= */}

        <View style={styles.divider} />

        {/* ================= REFERRAL CODE ================= */}

        <View style={styles.codeSection}>
          <View style={styles.codeHeader}>
            <View>
              <Text style={styles.codeLabel}>
                YOUR REFERRAL CODE
              </Text>

              <Text style={styles.codeHint}>
                Share this code with your friends
              </Text>
            </View>

            <View style={styles.codeIcon}>
              <Users
                size={14}
                color={theme.primaryLight}
                strokeWidth={2}
              />
            </View>
          </View>

          <View style={styles.codeBox}>
            <Text style={styles.code}>
              {code || "------"}
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={copy}
              style={styles.copyButton}
            >
              {copied ? (
                <CheckCircle
                  size={14}
                  color={theme.primaryLight}
                  strokeWidth={2.2}
                />
              ) : (
                <Copy
                  size={14}
                  color={theme.primaryLight}
                  strokeWidth={2.2}
                />
              )}

              <Text style={styles.copyText}>
                {copied ? "Copied" : "Copy"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= SHARE ================= */}

        <View style={styles.shareRow}>
          <View style={styles.linkContainer}>
            <Text
              style={styles.link}
              numberOfLines={1}
            >
              {link || "Your referral link"}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.shareButton}
          >
            <Share2
              size={14}
              color="#FFFFFF"
              strokeWidth={2.2}
            />

            <Text style={styles.shareText}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,

    borderRadius: 20,

    overflow: "hidden",

    backgroundColor: theme.card,

    borderWidth: 1,
    borderColor: theme.borderAccent,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.25,
    shadowRadius: 20,

    elevation: 8,
  },

  gradient: {
    padding: 18,
  },

  /* ================= GLOW ================= */

  glow: {
    position: "absolute",

    width: 170,
    height: 170,

    borderRadius: 100,

    right: -90,
    top: -90,

    backgroundColor: theme.primary,

    opacity: 0.06,
  },

  /* ================= HEADER ================= */

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  headerLeft: {
    flexDirection: "row",

    alignItems: "center",

    gap: 11,

    flex: 1,
  },

  iconBox: {
    width: 40,
    height: 40,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.accentWash,

    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  eyebrow: {
    fontSize: 9,

    fontWeight: "700",

    letterSpacing: 1,

    color: theme.textMuted,
  },

  title: {
    marginTop: 2,

    fontSize: 17,

    fontWeight: "700",

    color: theme.text,
  },

  /* ================= POINTS BADGE ================= */

  pointsBadge: {
    flexDirection: "row",

    alignItems: "center",

    gap: 5,

    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 999,

    backgroundColor: theme.accentWash,

    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  pointsBadgeText: {
    fontSize: 9,

    fontWeight: "700",

    color: theme.primaryLight,
  },

  /* ================= STATS ================= */

  statsContainer: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 20,
  },

  stat: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    gap: 9,
  },

  statIcon: {
    width: 30,
    height: 30,

    borderRadius: 9,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.surface,

    borderWidth: 1,
    borderColor: theme.border,
  },

  statLabel: {
    fontSize: 8,

    fontWeight: "700",

    letterSpacing: 0.7,

    color: theme.textMuted,
  },

  statValue: {
    marginTop: 3,

    fontSize: 16,

    fontWeight: "800",

    color: theme.textSub,
  },

  statValueGreen: {
    marginTop: 3,

    fontSize: 16,

    fontWeight: "800",

    color: theme.primaryLight,
  },

  statDivider: {
    width: 1,

    height: 30,

    marginHorizontal: 12,

    backgroundColor: theme.border,
  },

  /* ================= DIVIDER ================= */

  divider: {
    height: 1,

    marginVertical: 18,

    backgroundColor: theme.border,
  },

  /* ================= CODE ================= */

  codeSection: {
    width: "100%",
  },

  codeHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 10,
  },

  codeLabel: {
    fontSize: 9,

    fontWeight: "700",

    letterSpacing: 0.8,

    color: theme.textSub,
  },

  codeHint: {
    marginTop: 2,

    fontSize: 9,

    color: theme.textMuted,
  },

  codeIcon: {
    width: 28,
    height: 28,

    borderRadius: 8,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.accentWash,
  },

  codeBox: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    padding: 12,

    borderRadius: 12,

    backgroundColor: theme.surface,

    borderWidth: 1,

    borderColor: theme.border,
  },

  code: {
    fontSize: 20,

    fontWeight: "800",

    letterSpacing: 2,

    color: theme.primaryLight,
  },

  copyButton: {
    flexDirection: "row",

    alignItems: "center",

    gap: 5,

    paddingHorizontal: 9,
    paddingVertical: 7,

    borderRadius: 8,

    backgroundColor: theme.accentWash,

    borderWidth: 1,

    borderColor: theme.borderAccent,
  },

  copyText: {
    fontSize: 10,

    fontWeight: "700",

    color: theme.primaryLight,
  },

  /* ================= SHARE ================= */

  shareRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,

    marginTop: 10,
  },

  linkContainer: {
    flex: 1,

    paddingHorizontal: 10,
    paddingVertical: 8,

    borderRadius: 9,

    backgroundColor: theme.surface,

    borderWidth: 1,

    borderColor: theme.border,
  },

  link: {
    fontSize: 9,

    color: theme.textMuted,
  },

  shareButton: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 5,

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 9,

    backgroundColor: theme.primary,
  },

  shareText: {
    fontSize: 10,

    fontWeight: "700",

    color: "#FFFFFF",
  },
});