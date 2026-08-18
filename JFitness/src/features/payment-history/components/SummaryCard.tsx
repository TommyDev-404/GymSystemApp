import { View, Text, StyleSheet } from "react-native";
import { CreditCard } from "lucide-react-native";
import { toPHP } from "@/utils/moneyConverter";
import { PaymentStats } from "../types/PaymentTypes";
import { theme } from "@/utils/theme";

export default function SummaryCard({
  summary,
}: {
  summary: PaymentStats;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>
            TOTAL PAID (2026)
          </Text>

          <Text style={styles.amount}>
            {toPHP(summary.totalPaid.toString())}
          </Text>
        </View>

        <View style={styles.iconBox}>
          <CreditCard
            size={22}
            color={theme.primaryLight}
          />
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.box}>
          <Text style={styles.small}>
            Current Plan
          </Text>

          <Text style={styles.bold}>
            {summary.plan}
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.small}>
            Expires
          </Text>

          <Text
            style={[
              styles.bold,
              styles.expiry,
            ]}
          >
            {new Date(
              summary.expires
            ).toLocaleDateString("en-PH", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    color: theme.textMuted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  amount: {
    color: theme.text,
    fontSize: 26,
    fontWeight: "800",
    marginTop: 4,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(20,184,166,0.10)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(20,184,166,0.16)",
  },

  grid: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },

  box: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
  },

  small: {
    fontSize: 10,
    color: theme.textMuted,
  },

  bold: {
    marginTop: 4,
    color: theme.textSub,
    fontWeight: "600",
    fontSize: 13,
  },

  expiry: {
    color: theme.primaryLight,
  },
});