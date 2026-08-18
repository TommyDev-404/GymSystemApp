import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SummaryCard from "@/features/payment-history/components/SummaryCard";
import TransactionItem from "@/features/payment-history/components/TransactionItem";
import { useFetchPaymentHistory } from "../hook/usePayments";
import { useAuth } from "@/context/AuthContext";
import { PaymentStats } from "../types/PaymentTypes";
import { EmptyState } from "@/components/shared/EmptyState";
import { Receipt } from "lucide-react-native";
import { AppBackground } from "@/components/shared/AppBackground";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { theme } from "@/utils/theme";
import { PageLoader } from "@/components/shared/PageLoader";

export default function PaymentHistoryScreen() {
	const { member } = useAuth();

	const { data: paymentData, isLoading } = useFetchPaymentHistory(member?.memberId!);
	const transactions = paymentData?.payments ?? [];

	const stats: PaymentStats = paymentData?.stats ?? {
		totalPaid: 0,
		plan: "No Plan",
		expires: new Date()
	};

	if (isLoading) {
		 return (
			<PageLoader
			  title="Check-in History"
			  subtitle="Your gym attendance records"
			/>
		 );
	  }

	return (
		<AppBackground>
			<SafeAreaView style={styles.container}>
				<ScreenHeader
					title="Payment History"
					subtitle="View your membership payments and transactions"
				/>

				<FlatList
					data={transactions}
					keyExtractor={(item) => item.id.toString()}
					contentContainerStyle={styles.listContent}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={
						<View style={styles.listHeader}>
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
									<Text style={styles.sectionTitle}>
										Transactions
									</Text>

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
			</SafeAreaView>
		</AppBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	listContent: {
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 24
	},
	listHeader: {
		gap: 18
	},
	transactionItem: {
		marginTop: 10
	},
	emptyWrapper: {
		minHeight: 280,
		justifyContent: "center",
		alignItems: "center"
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 2,
		marginTop: 2
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
		borderColor: theme.borderAccent
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "800",
		color: theme.text,
		letterSpacing: -0.1
	},
	sectionSubtitle: {
		marginTop: 2,
		fontSize: 10,
		fontWeight: "500",
		color: theme.textMuted
	},
});