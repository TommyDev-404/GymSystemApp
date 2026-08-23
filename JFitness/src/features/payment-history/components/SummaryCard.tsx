import { View, Text, StyleSheet } from "react-native";
import { CreditCard, CalendarDays, ChevronRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { toPHP } from "@/utils/moneyConverter";
import { PaymentStats } from "../types/PaymentTypes";
import { theme } from "@/utils/theme";

export default function SummaryCard({
  summary,
}: {
  summary: PaymentStats;
}) {
  const expiry = new Date(summary.expires).toLocaleDateString("en-PH", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={[theme.primaryDark, theme.primary, theme.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.glow} />

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconBox}>
              <CreditCard
                size={17}
                color="#FFD6DE"
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.eyebrow}>PAYMENT SUMMARY</Text>
              <Text style={styles.title}>Membership Payments</Text>
            </View>
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>TOTAL PAID (2026)</Text>
          <Text style={styles.amount}>
            {toPHP(summary.totalPaid.toString())}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoContainer}>
          <View style={styles.infoBlock}>
            <View style={styles.infoIcon}>
              <CreditCard
                size={14}
                color="#FFD6DE"
                strokeWidth={2}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.label}>CURRENT PLAN</Text>
              <Text style={styles.value}>
                {summary.plan || "No Plan"}
              </Text>
            </View>
          </View>

          <View style={styles.arrow}>
            <ChevronRight
              size={16}
              color="rgba(255,232,237,0.5)"
            />
          </View>

          <View style={[styles.infoBlock, styles.expiryBlock]}>
            <View style={styles.infoIcon}>
              <CalendarDays
                size={14}
                color="#FFD6DE"
                strokeWidth={2}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.label}>EXPIRES</Text>
              <Text style={styles.expiry}>{expiry}</Text>
            </View>
          </View>
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
    width: 160,
    height: 160,
    borderRadius: 100,
    right: -70,
    top: -70,
    backgroundColor: "#FFFFFF",
    opacity: 0.07,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.9,
    color: "rgba(255, 232, 237, 0.75)",
  },
  title: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  totalSection: {
    marginTop: 22,
  },
  totalLabel: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: "rgba(255, 232, 237, 0.65)",
  },
  amount: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  divider: {
    height: 1,
    marginVertical: 18,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  expiryBlock: {
    justifyContent: "flex-end",
  },
  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)",
  },
  infoContent: {
    flexShrink: 1,
  },
  label: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 0.7,
    color: "rgba(255, 232, 237, 0.65)",
  },
  value: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
  },
  expiry: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "700",
    color: "#FFE8ED",
  },
  arrow: {
    width: 24,
    alignItems: "center",
  },
});