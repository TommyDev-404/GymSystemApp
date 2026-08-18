import { View, Text, StyleSheet } from "react-native";
import { theme } from "@/utils/theme";

export default function ReferralRulesSection({ data }: any) {
  return (
    <View style={styles.container}>
      {/* SECTION HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Referral Rules
          </Text>

          <Text style={styles.subtitle}>
            Earn points by inviting and connecting with friends
          </Text>
        </View>
      </View>

      {/* RULES */}
      {data.map((rule: any, index: number) => {
        const Icon = rule.icon;

        return (
          <View key={index} style={styles.card}>
            {/* ICON */}
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor:
                    rule.color + "18",
                  borderColor:
                    rule.color + "30",
                },
              ]}
            >
              <Icon
                size={19}
                color={rule.color}
                strokeWidth={2}
              />
            </View>

            {/* CONTENT */}
            <View style={styles.content}>
              <Text style={styles.ruleTitle}>
                {rule.title}
              </Text>

              <Text style={styles.description}>
                {rule.description}
              </Text>
            </View>

            {/* REWARD */}
            <View style={styles.rewardBox}>
              <Text
                style={[
                  styles.reward,
                  {
                    color:
                      rule.color ||
                      theme.primaryLight,
                  },
                ]}
              >
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
    paddingHorizontal: 20,

    paddingTop: 22,

    paddingBottom: 6,
  },

  /* ================= HEADER ================= */

  header: {
    marginBottom: 12,
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

  /* ================= CARD ================= */

  card: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: theme.card,

    padding: 14,

    borderRadius: 16,

    marginBottom: 10,

    borderWidth: 1,

    borderColor: theme.borderAccent,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.18,

    shadowRadius: 10,

    elevation: 4,
  },

  /* ================= ICON ================= */

  iconBox: {
    width: 40,

    height: 40,

    borderRadius: 12,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 11,

    borderWidth: 1,
  },

  /* ================= CONTENT ================= */

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

    color: theme.textMuted,

    lineHeight: 15,
  },

  /* ================= REWARD ================= */

  rewardBox: {
    paddingHorizontal: 8,

    paddingVertical: 6,

    borderRadius: 8,

    backgroundColor: theme.accentWash,

    borderWidth: 1,

    borderColor: theme.borderAccent,
  },

  reward: {
    fontSize: 10,

    fontWeight: "800",
  },
});