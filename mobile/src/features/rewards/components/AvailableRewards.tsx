import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Lock } from "lucide-react-native";

export default function AvailableRewards({ data }: any) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={styles.title}>Available Rewards</Text>

      <View style={styles.grid}>
        {data.map((r: any) => (
          <View key={r.name} style={[styles.card, { opacity: r.available ? 1 : 0.6 }]}>
            <Text style={{ fontSize: 26 }}>{r.img}</Text>
            <Text style={styles.name}>{r.name}</Text>

            <View style={styles.row}>
              <Text style={styles.points}>{r.points} pts</Text>

              {r.available ? (
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnText}>Redeem</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.lock}>
                  <Lock size={10} color="#94a3b8" />
                  <Text style={styles.lockText}>Locked</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    width: "48%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 16,
  },
  name: {
    fontWeight: "600",
    fontSize: 13,
    marginTop: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  points: {
    color: "#f59e0b",
    fontWeight: "700",
    fontSize: 12,
  },
  btn: {
    backgroundColor: "#10b981",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  btnText: {
    color: "white",
    fontSize: 11,
  },
  lock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  lockText: {
    fontSize: 10,
    color: "#94a3b8",
  },
});