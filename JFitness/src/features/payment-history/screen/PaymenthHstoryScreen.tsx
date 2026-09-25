import { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Receipt } from "lucide-react-native";
import SummaryCard from "@/features/payment-history/components/SummaryCard";
import TransactionItem from "@/features/payment-history/components/TransactionItem";
import { useFetchPaymentHistory } from "../hook/usePayments";
import { useAuth } from "@/context/AuthContext";
import { PaymentStats } from "../types/PaymentTypes";
import { EmptyState } from "@/components/shared/EmptyState";
import { StackWrapper } from "@/components/shared/StackWrapper";
import { theme } from "@/utils/theme";

export default function PaymentHistoryScreen() {
  const { memberIDs } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: paymentData,
    isLoading,
    refetch,
  } = useFetchPaymentHistory(memberIDs?.member_id!);

  const transactions = paymentData?.payments ?? [];

  const stats: PaymentStats = paymentData?.stats ?? {
    totalPaid: 0,
    plan: "No Plan",
    expires: new Date(),
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await refetch();
    } catch (error) {
      console.error("❌ Payment history refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <StackWrapper
      title="Payment History"
      subtitle="View your membership payments and transactions"
      loading={isLoading}
      useScrollView={false}
    >
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <SummaryCard summary={stats} />

            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Receipt
                  size={15}
                  color={theme.primaryLight}
                  strokeWidth={2.2}
                />
              </View>

              <View>
                <Text style={styles.sectionTitle}>Transactions</Text>
                <Text style={styles.sectionSubtitle}>
                  Your recent membership activity
                </Text>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <TransactionItem txn={item} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrapper}>
            <EmptyState
              icon={Receipt}
              title="No transactions found"
              subtitle="Your payment history and membership transactions will appear here."
            />
          </View>
        }
      />
    </StackWrapper>
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContent: {
    gap: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 2,
    marginTop: 2,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
    backgroundColor: "rgba(16,185,129,0.08)",
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.1,
  },
  sectionSubtitle: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: "500",
    color: theme.textMuted,
  },
  transactionItem: {
    marginTop: 10,
  },
  emptyWrapper: {
    minHeight: 280,
    justifyContent: "center",
    alignItems: "center",
  },
});
