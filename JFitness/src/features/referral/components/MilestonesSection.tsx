import { View, Text, StyleSheet } from "react-native";

export default function ReferralRulesSection({ data }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Referral Rules</Text>

      {data.map((rule: any, index: number) => {
        const Icon = rule.icon;

        return (
          <View key={index} style={styles.card}>
            
            <View
              style={[
                styles.iconBox,
                { backgroundColor: rule.color + "20" },
              ]}
            >
              <Icon size={20} color={rule.color} />
            </View>


            <View style={styles.content}>
              <Text style={styles.ruleTitle}>
                {rule.title}
              </Text>

              <Text style={styles.description}>
                {rule.description}
              </Text>
            </View>


            <View style={styles.rewardBox}>
              <Text style={[styles.reward, { color: rule.color }]}>
                {rule.reward}
              </Text>
            </View>

          </View>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  ruleTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 3,
  },

  description: {
    fontSize: 12,
    color: "#64748b",
    lineHeight: 17,
  },

  rewardBox: {
    marginLeft: 8,
  },

  reward: {
    fontSize: 13,
    fontWeight: "800",
  },
});