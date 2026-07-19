import { View, Text, StyleSheet } from "react-native";

export default function BadgesSection({ data }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Badges</Text>

      <View style={styles.grid}>
        {data.map((b: any) => {
          const Icon = b.icon;

          return (
            <View
              key={b.name}
              style={[
                styles.card,
                { opacity: b.earned ? 1 : 0.4 },
              ]}
            >
              <View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor: b.earned
                      ? b.color + "22"
                      : "#f1f5f9",
                  },
                ]}
              >
                <Icon
                  size={20}
                  color={b.earned ? b.color : "#94a3b8"}
                />
              </View>

              <Text style={styles.name}>{b.name}</Text>
              <Text style={styles.desc}>{b.desc}</Text>

              {b.earned && (
                <Text style={styles.earned}>EARNED</Text>
              )}
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    width: "31%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 14,
    alignItems: "center",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  name: {
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    color: "#0f172a",
  },
  desc: {
    fontSize: 10,
    textAlign: "center",
    color: "#94a3b8",
    marginTop: 2,
  },
  earned: {
    marginTop: 6,
    fontSize: 9,
    fontWeight: "700",
    color: "#065f46",
    backgroundColor: "#d1fae5",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
});