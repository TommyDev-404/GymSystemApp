import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import {
	Lock,
	Gift,
	Check,
	Sparkles,
} from "lucide-react-native";
import { Reward } from "../types/RewardTypes";
import { useRedeemReward } from "../hook/useReward";
import { useAuth } from "@/context/AuthContext";
import Toast from "react-native-toast-message";
import { useState } from "react";

export default function AvailableRewards({
	data,
	points,
}: {
	data: Reward[];
	points: number;
}) {
	const { member } = useAuth();
	const { mutate: redeem, isPending } = useRedeemReward();

	const [redeemingId, setRedeemingId] = useState<number | null>(null);

	const handleRedeemReward = (reward_id: number) => {
		setRedeemingId(reward_id);

		redeem(
			{
				member_id: member?.memberId!,
				reward_id,
			},
			{
				onSuccess: () => {
					Toast.show({
						type: "success",
						text1: "Reward Redeemed!",
						text2: "Your reward has been successfully redeemed.",
					});
				},

				onSettled: () => {
					setRedeemingId(null);
				},
			}
		);
	};

	return (
		<View style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<View>
					<Text style={styles.title}>Available Rewards</Text>
					<Text style={styles.subtitle}>
						Use your points to claim rewards
					</Text>
				</View>

				<View style={styles.headerIcon}>
					<Gift size={19} color="#F59E0B" strokeWidth={2.2} />
				</View>
			</View>

			{/* EMPTY STATE */}
			{data.length === 0 ? (
				<View style={styles.emptyState}>
        <View style={styles.emptyIcon}>
          <Gift
            size={30}
            color="#F59E0B"
            strokeWidth={1.8}
          />
        </View>
    
        <Text style={styles.emptyTitle}>
          No Rewards Available
        </Text>
    
        <Text style={styles.emptyDescription}>
          There are no rewards available right now. New
          rewards will appear here when they become available.
        </Text>
      </View>
			) : (
				<View style={styles.grid}>
					{data.map((reward: Reward) => {
						const canRedeem =
							points >= reward.points_required;

						const isRedeeming =
							isPending && redeemingId === reward.id;

						return (
							<View
								key={reward.id}
								style={[
									styles.card,
									!canRedeem && styles.lockedCard,
								]}
							>
								{/* CATEGORY */}
								<View style={styles.categoryBadge}>
									<Text style={styles.categoryText}>
										{reward.category}
									</Text>
								</View>

								{/* REWARD ICON */}
								<View
									style={[
										styles.iconBox,
										!canRedeem &&
											styles.lockedIconBox,
									]}
								>
									<Gift
										size={30}
										color={
											canRedeem
												? "#F59E0B"
												: "#94A3B8"
										}
										strokeWidth={1.8}
									/>
								</View>

								{/* NAME */}
								<Text
									style={styles.name}
									numberOfLines={2}
								>
									{reward.name}
								</Text>

								{/* DESCRIPTION */}
								<Text
									style={styles.description}
									numberOfLines={2}
								>
									{reward.description}
								</Text>

								{/* DIVIDER */}
								<View style={styles.divider} />

								{/* FOOTER */}
								<View style={styles.footer}>
									<View style={styles.pointsContainer}>
										<Text style={styles.points}>
											{reward.points_required}
										</Text>

										<Text style={styles.pointsLabel}>
											pts
										</Text>
									</View>

									{canRedeem ? (
										<TouchableOpacity
											activeOpacity={0.8}
											disabled={isPending}
											onPress={() =>
												handleRedeemReward(
													reward.id
												)
											}
											style={styles.redeemBtn}
										>
											{isRedeeming ? (
												<ActivityIndicator
													size="small"
													color="#FFFFFF"
												/>
											) : (
												<>
													<Check
														size={13}
														color="#FFFFFF"
														strokeWidth={2.5}
													/>

													<Text
														style={
															styles.redeemText
														}
													>
														Redeem
													</Text>
												</>
											)}
										</TouchableOpacity>
									) : (
										<View style={styles.lock}>
											<Lock
												size={12}
												color="#94A3B8"
											/>

											<Text style={styles.lockText}>
												Locked
											</Text>
										</View>
									)}
								</View>
							</View>
						);
					})}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingTop: 8,
		paddingBottom: 20,
	},

	/* HEADER */

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16,
	},

	title: {
		fontSize: 18,
		fontWeight: "800",
		color: "#0F172A",
	},

	subtitle: {
		marginTop: 3,
		fontSize: 11,
		color: "#94A3B8",
	},

	headerIcon: {
		width: 40,
		height: 40,
		borderRadius: 13,
		backgroundColor: "#FFFBEB",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#FEF3C7",
	},

	/* GRID */

	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},

	/* CARD */

	card: {
		width: "48%",
		backgroundColor: "#FFFFFF",
		borderRadius: 18,
		padding: 14,
		borderWidth: 1,
		borderColor: "#F1F5F9",

		shadowColor: "#0F172A",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.06,
		shadowRadius: 8,

		elevation: 3,
	},

	lockedCard: {
		opacity: 0.6,
		backgroundColor: "#F8FAFC",
	},

	/* CATEGORY */

	categoryBadge: {
		position: "absolute",
		top: 11,
		right: 11,

		paddingHorizontal: 7,
		paddingVertical: 4,

		borderRadius: 8,
		backgroundColor: "#ECFDF5",
	},

	categoryText: {
		fontSize: 8,
		fontWeight: "800",
		color: "#059669",
		textTransform: "uppercase",
	},

	/* ICON */

	iconBox: {
		width: 58,
		height: 58,
		borderRadius: 18,

		backgroundColor: "#FFFBEB",

		alignItems: "center",
		justifyContent: "center",

		marginTop: 4,
		marginBottom: 11,

		borderWidth: 1,
		borderColor: "#FEF3C7",
	},

	lockedIconBox: {
		backgroundColor: "#F1F5F9",
		borderColor: "#E2E8F0",
	},

	/* TEXT */

	name: {
		fontSize: 14,
		fontWeight: "800",
		color: "#0F172A",
		textAlign: "center",
		lineHeight: 18,
		minHeight: 36,
	},

	description: {
		marginTop: 5,
		fontSize: 10.5,
		color: "#64748B",
		textAlign: "center",
		lineHeight: 15,
		minHeight: 30,
	},

	divider: {
		height: 1,
		backgroundColor: "#F1F5F9",
		marginTop: 12,
		marginBottom: 11,
	},

	/* FOOTER */

	footer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	pointsContainer: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: 2,
	},

	points: {
		fontSize: 14,
		fontWeight: "800",
		color: "#F59E0B",
	},

	pointsLabel: {
		fontSize: 10,
		fontWeight: "600",
		color: "#D97706",
	},

	redeemBtn: {
		minWidth: 68,
		height: 30,

		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",

		gap: 4,

		backgroundColor: "#10B981",

		paddingHorizontal: 9,
		borderRadius: 9,
	},

	redeemText: {
		color: "#FFFFFF",
		fontSize: 10,
		fontWeight: "800",
	},

	/* LOCKED */

	lock: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",

		gap: 4,

		backgroundColor: "#F1F5F9",

		paddingHorizontal: 8,
		height: 30,

		borderRadius: 9,
	},

	lockText: {
		color: "#94A3B8",
		fontSize: 10,
		fontWeight: "700",
	},

  /* EMPTY STATE */

emptyState: {
	minHeight: 230,

	alignItems: "center",
	justifyContent: "center",

	paddingHorizontal: 30,
	paddingVertical: 30,
},

emptyIcon: {
	width: 68,
	height: 68,
	borderRadius: 22,

	alignItems: "center",
	justifyContent: "center",

	backgroundColor: "#FFFBEB",

	borderWidth: 1,
	borderColor: "#FEF3C7",

	marginBottom: 16,
},

emptyTitle: {
	fontSize: 15,
	fontWeight: "800",

	color: "#334155",

	textAlign: "center",
},

emptyDescription: {
	marginTop: 7,

	fontSize: 11,
	lineHeight: 17,

	color: "#94A3B8",

	textAlign: "center",

	maxWidth: 280,
  },
});