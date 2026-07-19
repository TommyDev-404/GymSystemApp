import { View, Text, StyleSheet } from "react-native";

export default function ChallengesSection({ data }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Challenges</Text>

      <View style={{ gap: 10 }}>
        {data.map((p: any) => {
          const Icon = p.icon;

          return (
            <View key={p.name} style={styles.card}>
              <View style={styles.row}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: p.color + "22" },
                  ]}
                >
                  <Icon size={18} color={p.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{p.name}</Text>
                  <Text style={styles.desc}>{p.desc}</Text>
                </View>

                <Text style={[styles.percent, { color: p.color }]}>
                  {p.progress}%
                </Text>
              </View>

              <View style={styles.bar}>
                <View
                  style={[
                    styles.fill,
                    { width: `${p.progress}%`, backgroundColor: p.color },
                  ]}
                />
              </View>
            </View>
          );
        })}
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
    backgroundColor: "white",
    padding: 14,
    borderRadius: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
  name: {
    fontSize: 13,
    fontWeight: "600",
  },
  desc: {
    fontSize: 11,
    color: "#64748b",
  },
  percent: {
    fontSize: 14,
    fontWeight: "700",
  },
  bar: {
    height: 6,
    backgroundColor: "#f1f5f9",
    borderRadius: 999,
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
});