import { View, Text, StyleSheet } from "react-native";

export default function MilestonesSection({ data, active }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Milestones</Text>

      {data.map((m: any) => {
        const Icon = m.icon;

        return (
          <View key={m.count} style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: m.achieved ? m.color + "20" : "#f1f5f9" }]}>
              <Icon size={18} color={m.achieved ? m.color : "#94a3b8"} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.reward}>{m.reward}</Text>
              <Text style={styles.desc}>
                Invite {m.count} friend{m.count > 1 ? "s" : ""}
              </Text>
            </View>

            <Text style={{ color: m.achieved ? "#10b981" : "#94a3b8" }}>
              {m.achieved ? "Done" : `${m.count - active} left`}
            </Text>
          </View>
        );
      })}
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
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  reward: { fontWeight: "600", fontSize: 13 },
  desc: { fontSize: 11, color: "#64748b" },
});