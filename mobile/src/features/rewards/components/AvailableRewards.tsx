import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Lock, Gift, Check } from "lucide-react-native";
import { Reward } from "../types/RewardTypes";
import { useRedeemReward } from "../hook/useReward";
import { useAuth } from "@/context/AuthContext";
import Toast from "react-native-toast-message";
import { useState } from "react";

export default function AvailableRewards({ data, points }: {
	data: Reward[];
	points: number;
}) {
	const { member } = useAuth();
	const { mutate: redeem, isPending } = useRedeemReward();

	const [cancelingId, setCancelingId] = useState<number | null>(null);
	
	const handleRedeemReward = (reward_id: number) => {
		setCancelingId(reward_id);
	 
		redeem({ member_id: member?.memberId!, reward_id }, {
			onSuccess: () => {
				Toast.show({
					type: "success",
					text1: "Success",
					text2: "Reward redeemed successfully!",
				 });
			},
			
			onSettled: () => {
			  setCancelingId(null);
			},
		})
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Available Rewards</Text>
				<Gift size={20} color="#F59E0B" />
			</View>

			<View style={styles.grid}>
				{data.map((r: Reward) => {
					const canRedeem = points >= r.points_required;

					return (
						<View
							key={r.id}
							style={[
								styles.card,
								!canRedeem && styles.lockedCard,
							]}
						>
							{/* CATEGORY */}
							<View style={styles.categoryBadge}>
								<Text style={styles.categoryText}>
									{r.category}
								</Text>
							</View>
						
							{/* ICON */}
							<View style={styles.iconBox}>
								<Text style={styles.icon}>
									🎁
								</Text>
							</View>
						
							<Text style={styles.name}>
								{r.name}
							</Text>
						
							<Text
								style={styles.description}
								numberOfLines={2}
							>
								{r.description}
							</Text>
						
							<View style={styles.footer}>
								<Text style={styles.points}>
									{r.points_required} pts
								</Text>
							
								{canRedeem ? (
									<TouchableOpacity
										onPress={() => handleRedeemReward(r.id)}
										style={styles.redeemBtn}
									>
										{isPending && cancelingId === r.id ? (
											<ActivityIndicator/>
										) : (
											<>
												<Check size={12} color="#fff" />
												<Text style={styles.redeemText}>
													Redeem
												</Text>
											</>
										)}
									</TouchableOpacity>
								) : (
									<View style={styles.lock}>
										<Lock size={12} color="#94A3B8" />
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
		</View>
	);
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },


  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
  
    padding: 16,
    borderRadius: 20,
  
    alignItems: "center",
  
    position: "relative",
  
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  
    elevation: 4,
  },

  categoryBadge: {
    position: "absolute",
  
    top: 12,
    right: 12,
  
    backgroundColor: "#ECFDF5",
  
    paddingHorizontal: 8,
    paddingVertical: 4,
  
    borderRadius: 999,
  },
  
  
  categoryText: {
    fontSize: 9,
  
    fontWeight: "700",
  
    color: "#059669",
  
    textTransform: "uppercase",
  },

  lockedCard: {
    opacity: 0.55,
  },


  iconBox: {
    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: "#F1F5F9",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 12,
  },


  icon: {
    fontSize: 32,
  },


  name: {
    fontSize: 14,
    fontWeight: "700",

    color: "#0F172A",

    textAlign: "center",

    lineHeight: 18,

    minHeight: 36,
  },


  description: {
    marginTop: 6,

    fontSize: 11,

    color: "#64748B",

    textAlign: "center",

    lineHeight: 15,

    minHeight: 30,
  },


  footer: {
    width: "100%",

    marginTop: 14,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },


  points: {
    color: "#F59E0B",

    fontSize: 13,

    fontWeight: "800",
  },


  redeemBtn: {
    flexDirection: "row",

    alignItems: "center",

    gap: 4,

    backgroundColor: "#10B981",

    paddingHorizontal: 10,

    paddingVertical: 6,

    borderRadius: 10,
  },


  redeemText: {
    color: "#FFFFFF",

    fontSize: 11,

    fontWeight: "700",
  },


  lock: {
    flexDirection: "row",

    alignItems: "center",

    gap: 4,

    backgroundColor: "#F1F5F9",

    paddingHorizontal: 8,

    paddingVertical: 6,

    borderRadius: 10,
  },


  lockText: {
    color: "#94A3B8",

    fontSize: 10,

    fontWeight: "700",
  },
});