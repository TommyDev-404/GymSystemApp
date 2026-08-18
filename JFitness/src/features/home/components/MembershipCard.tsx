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
  const maxPoints = 1000;
  const progress = Math.min((points / maxPoints) * 100, 100);
  const remainingPoints = Math.max(maxPoints - points, 0);

  return (
    <View style={styles.card}>
      {/* Subtle accent glow */}
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
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconBox}>
              <Star
                size={17}
                color={theme.primaryLight}
                fill={theme.primaryLight}
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.eyebrow}>CURRENT MEMBERSHIP</Text>
              <Text style={styles.plan}>{plan || "Standard Plan"}</Text>
            </View>
          </View>

          {/* STATUS */}
          <View style={styles.status}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>
              {status || "Active"}
            </Text>
          </View>
        </View>

        {/* MEMBERSHIP INFO */}
        <View style={styles.infoContainer}>

          {/* START */}
          <View style={styles.dateBlock}>
            <View style={styles.dateIcon}>
              <CalendarDays
                size={14}
                color={theme.textSub}
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.label}>STARTED</Text>

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

          {/* ARROW */}
          <View style={styles.arrow}>
            <ChevronRight
              size={16}
              color={theme.textMuted}
            />
          </View>

          {/* EXPIRY */}
          <View style={[styles.dateBlock, styles.expiryBlock]}>
            <View style={styles.dateIcon}>
              <CalendarDays
                size={14}
                color={theme.primaryLight}
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.label}>EXPIRES</Text>

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

        {/* DIVIDER */}
        <View style={styles.divider} />

        {/* REWARD POINTS */}
        <View style={styles.pointsHeader}>
          <View style={styles.pointsTitle}>
            <View style={styles.awardIcon}>
              <Award
                size={15}
                color={theme.primaryLight}
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

        {/* PROGRESS */}
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={[
              theme.primaryDark,
              theme.primary,
              theme.primaryLight,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.progressFill,
              { width: `${progress}%` },
            ]}
          />
        </View>

        {/* BOTTOM INFO */}
        <View style={styles.pointsFooter}>
          <Text style={styles.progressText}>
            {remainingPoints > 0
              ? `${remainingPoints.toLocaleString()} points until next reward`
              : "Next reward unlocked"}
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

  glow: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 100,

    right: -80,
    top: -80,

    backgroundColor: theme.primary,
    opacity: 0.06,
  },

  /* HEADER */

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
    width: 38,
    height: 38,
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

  plan: {
    marginTop: 2,

    fontSize: 17,
    fontWeight: "700",

    color: theme.text,
  },

  /* STATUS */

  status: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 999,

    backgroundColor: theme.accentWash,

    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  statusDot: {
    width: 6,
    height: 6,

    borderRadius: 999,

    backgroundColor: theme.primaryLight,

    marginRight: 6,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",

    color: theme.primaryLight,
  },

  /* DATES */

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 22,
  },

  dateBlock: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",

    gap: 9,
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

    backgroundColor: theme.surface,

    borderWidth: 1,
    borderColor: theme.border,
  },

  label: {
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.8,

    color: theme.textMuted,
  },

  date: {
    marginTop: 3,

    fontSize: 12,
    fontWeight: "600",

    color: theme.textSub,
  },

  expiry: {
    marginTop: 3,

    fontSize: 12,
    fontWeight: "700",

    color: theme.primaryLight,
  },

  arrow: {
    width: 24,
    alignItems: "center",
  },

  /* DIVIDER */

  divider: {
    height: 1,

    marginVertical: 18,

    backgroundColor: theme.border,
  },

  /* POINTS */

  pointsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  pointsTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  awardIcon: {
    width: 30,
    height: 30,

    borderRadius: 9,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.accentWash,
  },

  pointsLabel: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,

    color: theme.textSub,
  },

  pointsHint: {
    marginTop: 2,

    fontSize: 9,

    color: theme.textMuted,
  },

  pointsValue: {
    fontSize: 15,
    fontWeight: "800",

    color: theme.primaryLight,
  },

  pointsMax: {
    fontSize: 10,
    fontWeight: "500",

    color: theme.textMuted,
  },

  /* PROGRESS */

  progressTrack: {
    height: 6,

    marginTop: 13,

    borderRadius: 999,

    backgroundColor: theme.surface3,

    overflow: "hidden",
  },

  progressFill: {
    height: "100%",

    borderRadius: 999,
  },

  /* FOOTER */

  pointsFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 8,
  },

  progressText: {
    fontSize: 10,

    color: theme.textMuted,
  },

  progressPercent: {
    fontSize: 10,
    fontWeight: "700",

    color: theme.textSub,
  },
});