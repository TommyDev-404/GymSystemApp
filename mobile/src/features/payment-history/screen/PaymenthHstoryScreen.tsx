import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/features/payment-history/components/Header";
import SummaryCard from "@/features/payment-history/components/SummaryCard";
import TransactionItem from "@/features/payment-history/components/TransactionItem";

export const transactions = [
  {
    id: "TXN-20260601",
    description: "Monthly Membership — Premium Plan",
    amount: 2500,
    date: "Jun 1, 2026",
    status: "paid",
    method: "GCash",
    receipt: "#RCT-8821",
  },
  {
    id: "TXN-20260501",
    description: "Monthly Membership — Premium Plan",
    amount: 2500,
    date: "May 1, 2026",
    status: "paid",
    method: "Credit Card ••4521",
    receipt: "#RCT-7654",
  },
  {
    id: "TXN-20260415",
    description: "Personal Training Session — Marcus Rivera",
    amount: 1200,
    date: "Apr 15, 2026",
    status: "paid",
    method: "Credit Card ••4521",
    receipt: "#RCT-6332",
  },
  {
    id: "TXN-20260701-DUE",
    description: "Monthly Membership — Premium Plan",
    amount: 2500,
    date: "Jul 1, 2026",
    status: "upcoming",
    method: "Auto-charge",
    receipt: null,
  },
];

export const summary = {
  totalPaid: 9050,
  totalTransactions: 5,
  currentPlan: "Premium Plan",
  nextDue: "Jul 1, 2026",
};

export const statusConfig = {
  paid: {
    label: "Paid",
    color: "#10b981",
    bg: "#d1fae5",
    icon: "check-circle",
  },
  upcoming: {
    label: "Due Soon",
    color: "#f59e0b",
    bg: "#fef3c7",
    icon: "clock",
  },
  failed: {
    label: "Failed",
    color: "#ef4444",
    bg: "#fef2f2",
    icon: "alert-circle",
  },
};

export default function PaymentHistoryScreen({ onBack }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onBack={onBack}
        totalTransactions={summary.totalTransactions}
      />

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View>
            <SummaryCard summary={summary} />

            {/* 👇 SECTION TITLE HERE */}
            <Text style={styles.sectionTitle}>Transactions</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TransactionItem txn={item} config={statusConfig} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 16,
    marginBottom: 10,
  },
});