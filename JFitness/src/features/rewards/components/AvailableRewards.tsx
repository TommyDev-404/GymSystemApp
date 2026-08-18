import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
 } from "react-native";
 import { Lock, Gift, Check } from "lucide-react-native";
 import { Reward } from "../types/RewardTypes";
 import { useRedeemReward } from "../hook/useReward";
 import { useAuth } from "@/context/AuthContext";
 import Toast from "react-native-toast-message";
 import { useState } from "react";
 import { theme } from "@/utils/theme";
 import { EmptyState } from "@/components/shared/EmptyState";
 
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
		 {/* ================= HEADER ================= */}
		 <View style={styles.header}>
			<View>
			  <Text style={styles.title}>Available Rewards</Text>
			  <Text style={styles.subtitle}>
				 Use your points to claim rewards
			  </Text>
			</View>
			<View style={styles.headerIcon}>
			  <Gift size={18} color={theme.primaryLight} strokeWidth={2} />
			</View>
		 </View>
 
		 {/* ================= EMPTY ================= */}
		 {data.length === 0 ? (
			<EmptyState
			  icon={Gift}
			  title="No rewards available"
			  subtitle="New rewards will appear here when they become available."
			/>
		 ) : (
			/* ================= GRID ================= */
			<View style={styles.grid}>
			  {data.map((reward: Reward) => {
				 const canRedeem = points >= reward.points_required;
				 const isRedeeming = isPending && redeemingId === reward.id;
 
				 return (
					<View
					  key={reward.id}
					  style={[styles.card, !canRedeem && styles.lockedCard]}
					>
					  {/* CATEGORY */}
					  <View
						 style={[
							styles.categoryBadge,
							!canRedeem && styles.categoryBadgeLocked,
						 ]}
					  >
						 <Text
							style={[
							  styles.categoryText,
							  !canRedeem && styles.categoryTextLocked,
							]}
						 >
							{reward.category}
						 </Text>
					  </View>
 
					  {/* ICON */}
					  <View
						 style={[
							styles.iconBox,
							!canRedeem && styles.lockedIconBox,
						 ]}
					  >
						 <Gift
							size={29}
							color={
							  canRedeem ? theme.primaryLight : theme.textMuted
							}
							strokeWidth={1.8}
						 />
					  </View>
 
					  {/* NAME */}
					  <Text style={styles.name} numberOfLines={2}>
						 {reward.name}
					  </Text>
 
					  {/* DESCRIPTION */}
					  <Text style={styles.description} numberOfLines={2}>
						 {reward.description}
					  </Text>
 
					  {/* DIVIDER */}
					  <View style={styles.divider} />
 
					  {/* FOOTER */}
					  <View style={styles.footer}>
						 <View style={styles.pointsContainer}>
							<Text
							  style={[
								 styles.points,
								 !canRedeem && styles.pointsLocked,
							  ]}
							>
							  {reward.points_required}
							</Text>
							<Text style={styles.pointsLabel}>pts</Text>
						 </View>
 
						 {canRedeem ? (
							<TouchableOpacity
							  activeOpacity={0.8}
							  disabled={isPending}
							  onPress={() => handleRedeemReward(reward.id)}
							  style={styles.redeemBtn}
							>
							  {isRedeeming ? (
								 <ActivityIndicator size="small" color={theme.bg} />
							  ) : (
								 <>
									<Check
									  size={13}
									  color={theme.bg}
									  strokeWidth={2.8}
									/>
									<Text style={styles.redeemText}>Redeem</Text>
								 </>
							  )}
							</TouchableOpacity>
						 ) : (
							<View style={styles.lock}>
							  <Lock size={12} color={theme.textMuted} />
							  <Text style={styles.lockText}>Locked</Text>
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
	/* ================= CONTAINER ================= */
	container: {
	  paddingHorizontal: 20,
	  paddingTop: 12,        // was 30 → reduced for better section spacing
	  paddingBottom: 8,
	},
 
	/* ================= HEADER ================= */
	header: {
	  flexDirection: "row",
	  alignItems: "center",
	  justifyContent: "space-between",
	  marginBottom: 14,      // slightly tighter
	},
	title: {
	  fontSize: 15,
	  fontWeight: "700",
	  color: theme.text,
	  letterSpacing: -0.2,
	},
	subtitle: {
	  marginTop: 3,
	  fontSize: 10.5,
	  fontWeight: "500",
	  color: theme.textMuted,
	},
	headerIcon: {
	  width: 38,
	  height: 38,
	  borderRadius: 12,
	  alignItems: "center",
	  justifyContent: "center",
	  backgroundColor: theme.accentWash,
	  borderWidth: 1,
	  borderColor: theme.borderAccent,
	},
 
	/* ================= GRID ================= */
	grid: {
	  flexDirection: "row",
	  flexWrap: "wrap",
	  gap: 12,
	},
 
	/* ================= CARD ================= */
	card: {
	  width: "48%",
	  backgroundColor: theme.card,
	  borderRadius: 18,
	  padding: 14,
	  borderWidth: 1,
	  borderColor: theme.border,
	  shadowColor: "#000",
	  shadowOffset: { width: 0, height: 5 },
	  shadowOpacity: 0.2,
	  shadowRadius: 10,
	  elevation: 3,
	},
	lockedCard: {
	  backgroundColor: "#101318",
	  borderColor: theme.border,
	},
 
	/* ================= CATEGORY ================= */
	categoryBadge: {
	  position: "absolute",
	  top: 11,
	  right: 11,
	  paddingHorizontal: 7,
	  paddingVertical: 4,
	  borderRadius: 8,
	  backgroundColor: theme.accentWash,
	  borderWidth: 1,
	  borderColor: theme.borderAccent,
	},
	categoryBadgeLocked: {
	  backgroundColor: theme.surface,
	  borderColor: theme.border,
	},
	categoryText: {
	  fontSize: 8,
	  fontWeight: "800",
	  color: theme.primaryLight,
	  textTransform: "uppercase",
	  letterSpacing: 0.3,
	},
	categoryTextLocked: {
	  color: theme.textMuted,
	},
 
	/* ================= ICON ================= */
	iconBox: {
	  width: 58,
	  height: 58,
	  borderRadius: 18,
	  backgroundColor: theme.accentWash,
	  alignItems: "center",
	  justifyContent: "center",
	  marginTop: 4,
	  marginBottom: 11,
	  borderWidth: 1,
	  borderColor: theme.borderAccent,
	},
	lockedIconBox: {
	  backgroundColor: theme.surface,
	  borderColor: theme.border,
	},
 
	/* ================= TEXT ================= */
	name: {
	  fontSize: 14,
	  fontWeight: "800",
	  color: theme.text,
	  textAlign: "center",
	  lineHeight: 18,
	  minHeight: 36,
	},
	description: {
	  marginTop: 5,
	  fontSize: 10.5,
	  color: theme.textMuted,
	  textAlign: "center",
	  lineHeight: 15,
	  minHeight: 30,
	},
 
	/* ================= DIVIDER ================= */
	divider: {
	  height: 1,
	  backgroundColor: theme.border,
	  marginTop: 12,
	  marginBottom: 11,
	},
 
	/* ================= FOOTER ================= */
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
	  color: theme.primaryLight,
	},
	pointsLocked: {
	  color: theme.textMuted,
	},
	pointsLabel: {
	  fontSize: 10,
	  fontWeight: "600",
	  color: theme.textMuted,
	},
 
	/* ================= REDEEM ================= */
	redeemBtn: {
	  minWidth: 68,
	  height: 30,
	  flexDirection: "row",
	  alignItems: "center",
	  justifyContent: "center",
	  gap: 4,
	  backgroundColor: theme.primary,
	  paddingHorizontal: 9,
	  borderRadius: 9,
	  borderWidth: 1,
	  borderColor: theme.primaryLight,
	},
	redeemText: {
	  color: theme.bg,
	  fontSize: 10,
	  fontWeight: "800",
	},
 
	/* ================= LOCKED ================= */
	lock: {
	  flexDirection: "row",
	  alignItems: "center",
	  justifyContent: "center",
	  gap: 4,
	  backgroundColor: theme.surface,
	  paddingHorizontal: 8,
	  height: 30,
	  borderRadius: 9,
	  borderWidth: 1,
	  borderColor: theme.border,
	},
	lockText: {
	  color: theme.textMuted,
	  fontSize: 10,
	  fontWeight: "700",
	},
 });