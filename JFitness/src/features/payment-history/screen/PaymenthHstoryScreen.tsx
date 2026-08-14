import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/features/payment-history/components/Header";
import SummaryCard from "@/features/payment-history/components/SummaryCard";
import TransactionItem from "@/features/payment-history/components/TransactionItem";
import { StatusBar } from "react-native";
import { useFetchPaymentHistory } from "../hook/usePayments";
import { useAuth } from "@/context/AuthContext";
import { PaymentStats } from "../types/PaymentTypes";
import { Loading } from "@/components/shared/Loading";
import { EmptyState } from "@/components/shared/EmptyState";
import { Receipt } from "lucide-react-native";
import { useEffect } from "react";
import { useSocket } from "@/context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";


export default function PaymentHistoryScreen() {
	const socket = useSocket();
	const queryClient = useQueryClient();

	const { member } = useAuth();
	const { data: paymentData, isLoading } = useFetchPaymentHistory(member?.memberId!);

	const transactions = paymentData?.payments ?? [];
	const stats = paymentData?.stats ?? {} as PaymentStats;

	useEffect(() => {
		const handleIncomingSocket = () => {
			queryClient.invalidateQueries({
				queryKey: ["member-payment-history", member?.memberId],
			});
		};
	
		socket.on("payment:new", handleIncomingSocket);
		
		return () => {
			socket.off("payment:new", handleIncomingSocket);
		};
	}, [socket, queryClient]);
	
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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8fafc",
	},

	emptyWrapper: {
		height: 300, // adjust depending on your layout
		justifyContent: "center",
		alignItems: "center",
	},

	sectionTitle: {
		fontSize: 14,
		fontWeight: "700",
		color: "#0f172a",
		marginTop: 16,
		marginBottom: 10,
	},
});