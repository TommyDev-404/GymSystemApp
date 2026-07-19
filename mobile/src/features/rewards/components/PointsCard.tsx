import { View, Text, StyleSheet } from "react-native";
import { Trophy } from "lucide-react-native";

export default function PointsCard({ points }: any) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.small}>Your Points</Text>
          <Text style={styles.points}>{points.toLocaleString()}</Text>
          <Text style={styles.sub}>660 pts to Gold Badge 🥇</Text>
        </View>

        <View style={styles.iconBox}>
          <Trophy size={28} color="white" />
        </View>
      </View>

      <View style={styles.bar}>
        <View style={styles.fill} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Silver</Text>
        <Text style={styles.footerText}>Gold — 3,000 pts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#f59e0b",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  small: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
  points: {
    fontSize: 34,
    fontWeight: "800",
    color: "white",
  },
  sub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 999,
    marginTop: 12,
  },
  fill: {
    width: "78%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 999,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  footerText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
  },
});