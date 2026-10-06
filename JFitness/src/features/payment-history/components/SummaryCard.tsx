import { View, Text, StyleSheet } from "react-native";
import { ReceiptText, CreditCard } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
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
      <LinearGradient
        colors={[theme.primaryDark, theme.primary, theme.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.glow} />

        <View style={styles.topRow}>
          <View style={styles.heading}>
            <View style={styles.iconBox}>
              <ReceiptText
                size={18}
                color="#FFE0E7"
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.eyebrow}>PAYMENT HISTORY</Text>
              <Text style={styles.title}>Membership Payments</Text>
            </View>
          </View>

          <View style={styles.yearBadge}>
            <Text style={styles.yearText}>2026</Text>
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>TOTAL PAID</Text>

          <Text style={styles.amount}>
            {toPHP(summary.totalPaid.toString())}
          </Text>

          <View style={styles.paymentStatus}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Payments recorded</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <View style={styles.footerIcon}>
            <CreditCard
              size={15}
              color="#FFE0E7"
              strokeWidth={2}
            />
          </View>

          <Text style={styles.footerText}>
            Membership payments for 2026
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: theme.primaryDark,
    borderWidth: 1,
    borderColor: "rgba(255, 232, 237, 0.25)",
    shadowColor: theme.primaryDark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8,
  },

  gradient: {
    padding: 18,
  },

  glow: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 100,
    right: -90,
    top: -95,
    backgroundColor: "#FFFFFF",
    opacity: 0.07,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    color: "rgba(255, 232, 237, 0.72)",
  },

  title: {
    marginTop: 3,
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  yearBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)",
  },

  yearText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: "#FFE0E7",
  },

  totalSection: {
    marginTop: 25,
  },

  totalLabel: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
    color: "rgba(255, 232, 237, 0.65)",
  },

  amount: {
    marginTop: 4,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
    color: "#FFFFFF",
  },

  paymentStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 7,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFE0E7",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "500",
    color: "rgba(255, 232, 237, 0.72)",
  },

  divider: {
    height: 1,
    marginVertical: 18,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  footerIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  footerText: {
    fontSize: 10,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.68)",
  },
});
