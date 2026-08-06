import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Gift, X } from "lucide-react-native";
import { RedeemedReward } from "../types/RewardTypes";
import { useAuth } from "@/context/AuthContext";
import { useCancelRedeemReward } from "../hook/useReward";
import Toast from "react-native-toast-message";
import { useState } from "react";

export default function RedeemedSection({ data }: { data: RedeemedReward[] }) {
	const { member } = useAuth();
	const { mutate: cancelRedeeming, isPending } = useCancelRedeemReward();

	const [cancelingId, setCancelingId] = useState<number | null>(null);

	const handleCancelRedeemed = (redemption_id: number) => {
		setCancelingId(redemption_id);
	 
		cancelRedeeming(
		  {
			 member_id: member?.memberId!,
			 redemption_id,
		  },
		  {
			 onSuccess: (data) => {
				Toast.show({
				  type: "success",
				  text1: "Success",
				  text2: data.message,
				});
			 },
	 
			 onSettled: () => {
				setCancelingId(null);
			 },
		  }
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Redeemed</Text>

			{data.length === 0 ? (
			<View style={styles.emptyCard}>
				<View style={styles.emptyIcon}>
					<Gift size={28} color="#94A3B8" />
				</View>

				<Text style={styles.emptyTitle}>
					No Rewards Redeemed
				</Text>

				<Text style={styles.emptyText}>
					Your redeemed rewards will appear here.
				</Text>
			</View>
			) : (
			<View style={{ gap: 10 }}>
				{data.map((r: RedeemedReward) => (
					<View key={r.id} style={styles.card}>

					<View style={styles.iconBox}>
						<Gift size={18} color="#f59e0b" />
					</View>


					<View style={styles.content}>

						<View style={styles.row}>
							<Text style={styles.name}>
							{r.name}
							</Text>


							<View
							style={[
								styles.status,
								r.status === "Claimed" && styles.claimed,
								r.status === "Pending" && styles.pending,
								r.status === "Cancelled" && styles.cancelled,
							]}
							>
							<Text
								style={[
									styles.statusText,
									r.status === "Claimed" && styles.claimedText,
									r.status === "Pending" && styles.pendingText,
									r.status === "Cancelled" && styles.cancelledText,
								]}
							>
								{r.status}
							</Text>
							</View>
						</View>


						<Text style={styles.desc}>
							{new Date(r.redeemed_at).toLocaleDateString(
							"en-PH",
							{
								month: "short",
								day: "2-digit",
								year: "numeric",
							}
							)}
						</Text>


						<View style={styles.footer}>
							<Text style={styles.points}>
							-{r.points_used} pts
							</Text>


							{r.status === "Pending" && (
								<TouchableOpacity 
									onPress={() => handleCancelRedeemed(r.id)}
									style={styles.cancelBtn}
								>
									{isPending && cancelingId === r.id ? (
										<ActivityIndicator color="white"/>
									): (
										<>
											<X size={12} color="#EF4444" />
											<Text style={styles.cancelText}>
												Cancel
											</Text>
										</>
									)}
								</TouchableOpacity>
							)}

						</View>

					</View>

					</View>
				))}
			</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#0f172a",
  },


  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "white",

    padding: 14,

    borderRadius: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },


  iconBox: {
    width: 36,
    height: 36,

    borderRadius: 12,

    backgroundColor: "#fef3c7",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },


  name: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0f172a",
  },


  desc: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 2,
  },


  points: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748b",
  },


  // EMPTY STATE

  emptyCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 24,

    alignItems: "center",

    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },


  emptyIcon: {
    width: 60,
    height: 60,

    borderRadius: 30,

    backgroundColor: "#F1F5F9",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 12,
  },


  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },


  emptyText: {
    marginTop: 4,

    fontSize: 12,

    color: "#64748B",

    textAlign: "center",
  },

    content: {
      flex: 1,
    },
  
  
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
    },
  
  
    status: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 20,
    },
  
  
    statusText: {
      fontSize: 10,
      fontWeight: "700",
    },
  
  
    pending: {
      backgroundColor: "#FEF3C7",
    },
  
    pendingText: {
      color: "#D97706",
    },
  
  
    claimed: {
      backgroundColor: "#DCFCE7",
    },
  
    claimedText: {
      color: "#16A34A",
    },
  
  
    cancelled: {
      backgroundColor: "#FEE2E2",
    },
  
    cancelledText: {
      color: "#DC2626",
    },
  
  
    footer: {
      marginTop: 8,
  
      flexDirection: "row",
  
      justifyContent: "space-between",
  
      alignItems: "center",
    },
  
  
    cancelBtn: {
      flexDirection: "row",
  
      alignItems: "center",
  
      gap: 4,
  
      backgroundColor: "#FEE2E2",
  
      paddingHorizontal: 10,
  
      paddingVertical: 5,
  
      borderRadius: 8,
    },
  
  
    cancelText: {
      fontSize: 11,
  
      fontWeight: "700",
  
      color: "#EF4444",
    },
  
});