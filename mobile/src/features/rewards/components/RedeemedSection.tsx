import { View, Text, StyleSheet } from "react-native";
import { Gift } from "lucide-react-native";

export default function RedeemedSection({ data }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redeemed</Text>

      <View style={{ gap: 10 }}>
        {data.map((r: any) => (
          <View key={r.name} style={styles.card}>
            <View style={styles.iconBox}>
              <Gift size={18} color="#f59e0b" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{r.name}</Text>
              <Text style={styles.desc}>{r.date}</Text>
            </View>

            <Text style={styles.points}>-{r.points} pts</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#0f172a",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 16,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#fef3c7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
  },
  desc: {
    fontSize: 11,
    color: "#64748b",
  },
  points: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
});