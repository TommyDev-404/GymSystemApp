import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/features/payment-history/components/Header";
import SummaryCard from "@/features/payment-history/components/SummaryCard";
import TransactionItem from "@/features/payment-history/components/TransactionItem";
import { StatusBar } from "react-native";
import { useFetchPaymentHistory } from "../hook/usePayments";
import { useAuth } from "@/context/AuthContext";
import { PaymentStats } from "../types/PaymentTypes";
import { Loading } from "@/components/Loading";


export default function PaymentHistoryScreen() {
  const { member } = useAuth();
  const { data: paymentData, isLoading } = useFetchPaymentHistory(member?.memberId!);
  
  const transactions = paymentData?.payments ?? [];
  const stats = paymentData?.stats ?? {} as PaymentStats;

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header totalTransactions={transactions.length ?? 0}/>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        
        ListHeaderComponent={() => (
          <View>
            <SummaryCard summary={stats} />

            {/* 👇 SECTION TITLE HERE */}
            <Text style={styles.sectionTitle}>Transactions</Text>
          </View>
        )}
        
        renderItem={({ item }) => (
          <TransactionItem txn={item} />
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