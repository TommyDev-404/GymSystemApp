import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  ChevronRight,
  LucideIcon,
} from "lucide-react-native";

export default function TransactionItem({ txn, config }: any) {
   const status = config[txn.status];
   
   const iconMap: Record<string, LucideIcon> = {
      paid: CheckCircle,
      upcoming: Clock,
      failed: AlertCircle,
   };

   const StatusIcon = iconMap[txn.status] ?? CheckCircle;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.iconBox, { backgroundColor: status.bg }]}>
          <StatusIcon size={18} color={status.color} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{txn.description}</Text>
          <Text style={styles.sub}>
            {txn.date} · {txn.method}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.amount}>₱{txn.amount}</Text>
          <View style={[styles.badge, { backgroundColor: status.bg }]}>
            <Text style={{ color: status.color, fontSize: 10 }}>
              {status.label}
            </Text>
          </View>
        </View>
      </View>

      {txn.status === "paid" && (
        <View style={styles.footer}>
          <Text style={styles.receipt}>{txn.receipt}</Text>

          <TouchableOpacity style={styles.btn}>
            <Download size={12} color="#64748b" />
            <Text style={styles.btnText}>Download</Text>
          </TouchableOpacity>
        </View>
      )}

      {txn.status === "upcoming" && (
        <View style={styles.footer}>
          <Text style={styles.receipt}>Auto-charge scheduled</Text>

          <TouchableOpacity style={[styles.btn, { backgroundColor: "#10b981" }]}>
            <Text style={[styles.btnText, { color: "white" }]}>
              Pay Now
            </Text>
            <ChevronRight size={12} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 13,
    color: "#0f172a",
  },
  sub: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 2,
  },
  amount: {
    fontWeight: "700",
    fontSize: 14,
  },
  badge: {
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  footer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#f1f5f9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  receipt: {
    fontSize: 11,
    color: "#94a3b8",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 11,
    color: "#64748b",
  },
});