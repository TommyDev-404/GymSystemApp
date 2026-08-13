import { View, Text, StyleSheet } from "react-native";
import { CreditCard } from "lucide-react-native";
import { toPHP } from "@/utils/moneyConverter";
import { PaymentStats } from "../types/PaymentTypes";

export default function SummaryCard({ summary }: { summary: PaymentStats }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>TOTAL PAID (2026)</Text>
          <Text style={styles.amount}>
            {toPHP(summary.totalPaid.toString())}
          </Text>
        </View>

        <View style={styles.iconBox}>
          <CreditCard size={22} color="#10b981" />
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.box}>
          <Text style={styles.small}>Current Plan</Text>
          <Text style={styles.bold}>{summary.plan}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.small}>Expires</Text>
          <Text style={[styles.bold, { color: "#10b981" }]}>
            {new Date(summary.expires).toLocaleDateString('en-PH', { month: 'short', day: '2-digit', year: 'numeric'})}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#0f172a",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
  },
  amount: {
    color: "white",
    fontSize: 26,
    fontWeight: "800",
    marginTop: 4,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(16,185,129,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  box: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
  },
  small: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
  },
  bold: {
    marginTop: 4,
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
});