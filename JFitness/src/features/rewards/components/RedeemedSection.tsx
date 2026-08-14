import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { BadgeCheck, Gift, X } from "lucide-react-native";
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
      <View style={styles.header}>
	<View>
		<Text style={styles.title}>Redeemed Rewards</Text>
		<Text style={styles.subtitle}>
			View your redeemed rewards and track their status
		</Text>
	</View>

	<View style={styles.headerIcon}>
  <BadgeCheck
			size={19}
			color="#10B981"
			strokeWidth={2.2}
		/>
        </View>
      </View>
      
			{data.length === 0 ? (
			<View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Gift
          size={30}
          color="#94A3B8"
          strokeWidth={1.8}
        />
      </View>
  
      <Text style={styles.emptyTitle}>
        No Rewards Redeemed Yet
      </Text>
  
      <Text style={styles.emptyText}>
        Rewards you redeem will appear here so you can
        track their status and points used.
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
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
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  
  title: {
    fontSize: 16,
    fontWeight: "700",
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

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
  
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
  
  emptyIcon: {
    width: 64,
    height: 64,
  
    borderRadius: 22,
  
    backgroundColor: "#F8FAFC",
  
    borderWidth: 1,
    borderColor: "#E2E8F0",
  
    alignItems: "center",
    justifyContent: "center",
  
    marginBottom: 14,
  },
  
  emptyTitle: {
    fontSize: 15,
    fontWeight: "800",
  
    color: "#334155",
  
    textAlign: "center",
  },
  
  emptyText: {
    marginTop: 6,
  
    fontSize: 11,
    lineHeight: 17,
  
    color: "#94A3B8",
  
    textAlign: "center",
  
    maxWidth: 270,
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