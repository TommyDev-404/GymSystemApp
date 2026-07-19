import { View, Text, Image, StyleSheet } from "react-native";

export default function ReferralList({ data }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Referrals</Text>

      {data.map((r: any) => (
        <View key={r.name} style={styles.card}>
          <Image source={{ uri: r.photo }} style={styles.img} />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{r.name}</Text>
            <Text style={styles.sub}>Joined {r.date}</Text>
          </View>

          <View>
            <Text
              style={{
                color: r.status === "active" ? "#10b981" : "#f59e0b",
              }}
            >
              {r.status}
            </Text>
            <Text style={styles.reward}>{r.reward}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 15, fontWeight: "700", marginBottom: 10 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: { fontWeight: "600", fontSize: 13 },
  sub: { fontSize: 11, color: "#64748b" },
  reward: { fontSize: 11, color: "#64748b" },
});