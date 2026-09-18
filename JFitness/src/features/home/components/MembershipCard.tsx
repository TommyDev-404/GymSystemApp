import { theme } from "@/utils/theme";
import { View, Text, StyleSheet } from "react-native";
import {
  Star,
  Award,
  CalendarDays,
  ChevronRight,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  plan: string;
  membership_start: string;
  expiry: string;
  status: string;
  points?: number;
}

export function MembershipCard({
  plan,
  membership_start,
  expiry,
  status,
  points = 0,
}: Props) {
  const step = 1000;
  const isMilestone = points > 0 && points % step === 0;

  const maxPoints = isMilestone
    ? points
    : (Math.floor(points / step) + 1) * step;

  const previousMilestone = isMilestone
    ? points - step
    : Math.floor(points / step) * step;

  const progress = isMilestone
    ? 100
    : ((points - previousMilestone) / (maxPoints - previousMilestone)) * 100;

  const remainingPoints = Math.max(maxPoints - points, 0);

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
              <Star
                size={16}
                color="#FFD6DE"
                fill="#FFD6DE"
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.eyebrow}>
                CURRENT MEMBERSHIP
              </Text>

              <Text style={styles.plan}>
                {plan || "Standard Plan"}
              </Text>
            </View>
          </View>

          <View style={styles.status}>
            <View style={styles.statusDot} />

            <Text style={styles.statusText}>
              {status || "Active"}
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.dateBlock}>
            <View style={styles.dateIcon}>
              <CalendarDays
                size={14}
                color="#FFD6DE"
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.label}>
                STARTED
              </Text>

              <Text style={styles.date}>
                {membership_start ||
                  new Date().toLocaleDateString("en-PH", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
              </Text>
            </View>
          </View>

          <View style={styles.arrow}>
            <ChevronRight
              size={16}
              color="rgba(255,232,237,0.5)"
            />
          </View>

          <View style={[styles.dateBlock, styles.expiryBlock]}>
            <View style={styles.dateIcon}>
              <CalendarDays
                size={14}
                color="#FFD6DE"
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.label}>
                EXPIRES
              </Text>

              <Text style={styles.expiry}>
                {expiry ||
                  new Date().toLocaleDateString("en-PH", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.pointsHeader}>
          <View style={styles.pointsTitle}>
            <View style={styles.awardIcon}>
              <Award
                size={15}
                color="#FFD6DE"
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.pointsLabel}>
                REWARD POINTS
              </Text>

              <Text style={styles.pointsHint}>
                Keep training to earn more
              </Text>
            </View>
          </View>

          <Text style={styles.pointsValue}>
            {points.toLocaleString()}

            <Text style={styles.pointsMax}>
              {" / "}
              {maxPoints.toLocaleString()}
            </Text>
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
              },
            ]}
          />
        </View>

        <View style={styles.pointsFooter}>
          <Text style={styles.progressText}>
            {isMilestone
              ? "🎉 Milestone reached!"
              : `${remainingPoints.toLocaleString()} points until next reward`}
          </Text>

          <Text style={styles.progressPercent}>
            {Math.round(progress)}%
          </Text>
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
    borderColor: "rgba(255, 232, 237, 0.25)",
    shadowColor: theme.primaryDark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8,
  },
  gradient: {
    padding: 18,
  },
  glow: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 100,
    right: -70,
    top: -70,
    backgroundColor: "#FFFFFF",
    opacity: 0.07,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.9,
    color: "rgba(255, 232, 237, 0.75)",
  },
  plan: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.22)",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#A7F3D0",
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#F0FDF4",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
  },
  dateBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  expiryBlock: {
    justifyContent: "flex-end",
  },
  dateIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)",
  },
  label: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 0.7,
    color: "rgba(255, 232, 237, 0.65)",
  },
  date: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
  },
  expiry: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "700",
    color: "#FFE8ED",
  },
  arrow: {
    width: 24,
    alignItems: "center",
  },
  divider: {
    height: 1,
    marginVertical: 18,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  pointsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pointsTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  awardIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)",
  },
  pointsLabel: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.7,
    color: "rgba(255, 232, 237, 0.8)",
  },
  pointsHint: {
    marginTop: 2,
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.55)",
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  pointsMax: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.55)",
  },
  progressTrack: {
    height: 6,
    marginTop: 14,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#FFE8ED",
  },
  pointsFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 9,
  },
  progressText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.6)",
  },
  progressPercent: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255, 232, 237, 0.9)",
  },
});