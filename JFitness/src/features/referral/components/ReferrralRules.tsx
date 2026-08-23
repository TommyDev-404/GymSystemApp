import { View, Text, StyleSheet } from "react-native";
import { theme } from "@/utils/theme";

interface ReferralRule {
  title: string;
  reward: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface ReferralRulesSectionProps {
  data: ReferralRule[];
}

export default function ReferralRulesSection({ data }: ReferralRulesSectionProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Referral Rules</Text>
        <Text style={styles.subtitle}>
          Earn points by inviting and connecting with friends
        </Text>
      </View>

      {data.map((rule, index) => {
        const Icon = rule.icon;

        return (
          <View key={index} style={styles.card}>
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor: `${rule.color}18`,
                  borderColor: `${rule.color}30`,
                },
              ]}
            >
              <Icon size={18} color={rule.color} strokeWidth={2} />
            </View>

            <View style={styles.content}>
              <Text style={styles.ruleTitle}>{rule.title}</Text>
              <Text style={styles.description}>{rule.description}</Text>
            </View>

            <View
              style={[
                styles.rewardBox,
                {
                  backgroundColor: `${rule.color}12`,
                  borderColor: `${rule.color}28`,
                },
              ]}
            >
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
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.text,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 10.5,
    color: theme.textMuted,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
    borderWidth: 1,
  },
  content: {
    flex: 1,
    paddingRight: 8,
  },
  ruleTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
    marginBottom: 3,
  },
  description: {
    fontSize: 10.5,
    lineHeight: 15,
    color: theme.textMuted,
  },
  rewardBox: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  reward: {
    fontSize: 10,
    fontWeight: "800",
  },
});