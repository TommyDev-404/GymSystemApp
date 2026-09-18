import { View, Text, StyleSheet } from "react-native";
import { Trophy } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/utils/theme";

interface PointsCardProps {
  points: number;
}

export default function PointsCard({ points }: PointsCardProps) {
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
              <Trophy
                size={17}
                color="#FFD6DE"
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.eyebrow}>
                REWARD POINTS
              </Text>

              <Text style={styles.points}>
                {points.toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.status}>
            <View style={styles.statusDot} />

            <Text style={styles.statusText}>
              {isMilestone ? "Unlocked" : "Active"}
            </Text>
          </View>
        </View>

        <View style={styles.pointsInfo}>
          <View>
            <Text style={styles.label}>
              CURRENT POINTS
            </Text>

            <Text style={styles.currentPoints}>
              {points.toLocaleString()}

              <Text style={styles.maxPoints}>
                {" / "}
                {maxPoints.toLocaleString()}
              </Text>
            </Text>
          </View>

          <Text style={styles.percent}>
            {Math.round(progress)}%
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

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isMilestone
              ? "🎉 Milestone reached!"
              : `${remainingPoints.toLocaleString()} points to next milestone`}
          </Text>

          <Text style={styles.footerPoints}>
            {points.toLocaleString()} pts
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
  points: {
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
  pointsInfo: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 0.7,
    color: "rgba(255, 232, 237, 0.65)",
  },
  currentPoints: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  maxPoints: {
    fontSize: 11,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.55)",
  },
  percent: {
    fontSize: 11,
    fontWeight: "800",
    color: "rgba(255, 232, 237, 0.9)",
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
  footer: {
    marginTop: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerText: {
    flex: 1,
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.6)",
  },
  footerPoints: {
    marginLeft: 10,
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255, 232, 237, 0.9)",
  },
});