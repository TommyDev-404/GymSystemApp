import { View, Text, StyleSheet } from "react-native";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
} from "lucide-react-native";
import { toPHP } from "@/utils/moneyConverter";
import { theme } from "@/utils/theme";

export default function TransactionItem({ txn }: any) {
  const statusConfig: any = {
    Paid: {
      color: theme.primaryLight,
      bg: "rgba(20,184,166,0.10)",
      icon: CheckCircle,
    },

    Pending: {
      color: "#FBBF24",
      bg: "rgba(245,158,11,0.10)",
      icon: Clock,
    },

    Failed: {
      color: "#F87171",
      bg: "rgba(239,68,68,0.10)",
      icon: AlertCircle,
    },
  };

  const config =
    statusConfig[txn.status] ?? statusConfig.Paid;

  const StatusIcon = config.icon;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.planIcon}>
          <CreditCard
            size={18}
            color={theme.primaryLight}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.plan}>
            {txn.plan}
          </Text>

          <Text style={styles.method}>
            {txn.paymentMethod}
          </Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.amount}>
            {toPHP(txn.amount)}
          </Text>

          <View
            style={[
              styles.status,
              {
                backgroundColor: config.bg,
              },
            ]}
          >
            <StatusIcon
              size={11}
              color={config.color}
            />

            <Text
              style={[
                styles.statusText,
                {
                  color: config.color,
                },
              ]}
            >
              {txn.status}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.label}>
          Payment Date
        </Text>

        <Text style={styles.date}>
          {new Date(txn.datePaid).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          )}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  planIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(20,184,166,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(20,184,166,0.14)",
  },

  info: {
    flex: 1,
  },

  plan: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.text,
  },

  method: {
    marginTop: 3,
    fontSize: 12,
    color: theme.textMuted,
  },

  right: {
    alignItems: "flex-end",
  },

  amount: {
    fontSize: 15,
    fontWeight: "800",
    color: theme.text,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 5,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },

  footer: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 11,
    color: theme.textMuted,
  },

  date: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.textSub,
  },
});