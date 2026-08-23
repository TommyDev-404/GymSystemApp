import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckCircle, Copy, Gift, Share2, UserPlus, Users } from "lucide-react-native";
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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={[theme.primaryDark, theme.primary, theme.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.glow} />

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconBox}>
              <Users size={17} color="#FFFFFF" strokeWidth={2} />
            </View>
            <View>
              <Text style={styles.eyebrow}>REFERRAL PROGRAM</Text>
              <Text style={styles.title}>Invite & Earn</Text>
            </View>
          </View>

          <View style={styles.pointsBadge}>
            <Gift size={13} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.pointsBadgeText}>{points.toLocaleString()} pts</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <View style={styles.statIcon}>
              <UserPlus size={14} color="#FFFFFF" strokeWidth={2} />
            </View>
            <View>
              <Text style={styles.statLabel}>ACTIVE REFERRALS</Text>
              <Text style={styles.statValue}>{activeReferrals}</Text>
            </View>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.stat}>
            <View style={styles.statIcon}>
              <Gift size={14} color="#FFFFFF" strokeWidth={2} />
            </View>
            <View>
              <Text style={styles.statLabel}>POINTS EARNED</Text>
              <Text style={styles.statValue}>{points.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.codeHeader}>
          <View>
            <Text style={styles.codeLabel}>YOUR REFERRAL CODE</Text>
            <Text style={styles.codeHint}>Share this code with your friends</Text>
          </View>

          <View style={styles.codeIcon}>
            <Users size={14} color="#FFFFFF" strokeWidth={2} />
          </View>
        </View>

        <View style={styles.codeBox}>
          <Text style={styles.code}>{code || "------"}</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={copy}
            style={styles.copyButton}
          >
            {copied ? (
              <CheckCircle size={14} color="#FFFFFF" strokeWidth={2.2} />
            ) : (
              <Copy size={14} color="#FFFFFF" strokeWidth={2.2} />
            )}
            <Text style={styles.copyText}>{copied ? "Copied" : "Copy"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.shareRow}>
          <View style={styles.linkContainer}>
            <Text style={styles.link} numberOfLines={1}>
              {link || "Your referral link"}
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.shareButton}>
            <Share2 size={14} color="#FFFFFF" strokeWidth={2.2} />
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: theme.primaryDark,
    borderWidth: 1,
    borderColor: theme.primaryLight + "55",
    shadowColor: theme.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 7,
  },
  gradient: {
    padding: 18,
  },
  glow: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 100,
    right: -85,
    top: -85,
    backgroundColor: "#FFFFFF",
    opacity: 0.08,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF18",
    borderWidth: 1,
    borderColor: "#FFFFFF25",
  },
  eyebrow: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#FFFFFFB8",
  },
  title: {
    marginTop: 2,
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#FFFFFF18",
    borderWidth: 1,
    borderColor: "#FFFFFF30",
  },
  pointsBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 21,
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
    backgroundColor: "#FFFFFF18",
    borderWidth: 1,
    borderColor: "#FFFFFF25",
  },
  statLabel: {
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.7,
    color: "#FFFFFF99",
  },
  statValue: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  statDivider: {
    width: 1,
    height: 30,
    marginHorizontal: 12,
    backgroundColor: "#FFFFFF25",
  },
  divider: {
    height: 1,
    marginVertical: 18,
    backgroundColor: "#FFFFFF25",
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
    color: "#FFFFFFCC",
  },
  codeHint: {
    marginTop: 2,
    fontSize: 9,
    color: "#FFFFFF99",
  },
  codeIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF18",
    borderWidth: 1,
    borderColor: "#FFFFFF20",
  },
  codeBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#00000018",
    borderWidth: 1,
    borderColor: "#FFFFFF25",
  },
  code: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#FFFFFF",
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#FFFFFF18",
    borderWidth: 1,
    borderColor: "#FFFFFF30",
  },
  copyText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
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
    backgroundColor: "#00000012",
    borderWidth: 1,
    borderColor: "#FFFFFF20",
  },
  link: {
    fontSize: 9,
    color: "#FFFFFF99",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9,
    backgroundColor: "#10B981",
  },
  shareText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});