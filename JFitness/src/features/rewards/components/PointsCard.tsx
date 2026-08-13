import { View, Text, StyleSheet } from "react-native";
import { Trophy } from "lucide-react-native";

interface PointsCardProps {
  points: number;
}

export default function PointsCard({ points }: PointsCardProps) {
  const MAX_POINTS = 1000;
  const progress = Math.min(points / MAX_POINTS, 1);
  const remaining = Math.max(MAX_POINTS - points, 0);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Reward Points</Text>
          <Text style={styles.points}>{points}</Text>
        </View>

        <View style={styles.iconBox}>
          <Trophy size={30} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress * 100}%`,
            },
          ]}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {points}/{MAX_POINTS} pts
        </Text>

        <Text style={styles.footerText}>
          {remaining} pts remaining
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "#F59E0B",

    shadowColor: "#B45309",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  label: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    fontWeight: "600",
  },

  points: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "800",
    marginTop: 4,
  },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  progressTrack: {
    height: 10,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
  },

  footer: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footerText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    fontWeight: "600",
  },
});