import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BadgeCheck, Gift, X } from "lucide-react-native";
import { EaseView } from "react-native-ease";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";
import { EmptyState } from "@/components/shared/EmptyState";
import { theme } from "@/utils/theme";
import { RedeemedReward } from "../types/RewardTypes";
import { useCancelRedeemReward } from "../hook/useReward";

type RedeemedSectionProps = {
  data: RedeemedReward[];
  loading: boolean;
};

export default function RedeemedSection({ data, loading }: RedeemedSectionProps) {
  const { memberIDs } = useAuth();
  const { mutate: cancelRedeeming, isPending } = useCancelRedeemReward();
  const [cancelingId, setCancelingId] = useState<number | null>(null);

  const handleCancelRedeemed = (redemptionId: number) => {
    setCancelingId(redemptionId);
    cancelRedeeming(
      {
        member_id: memberIDs?.member_id!,
        redemption_id: redemptionId,
      },
      {
        onSuccess: (data) => {
          Toast.show({
            type: data.success ? "success" : "error",
            text1: data.success ? "Success" : "Unable to cancel",
            text2: data.message,
          });
        },
        onError: (error: any) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.response?.data?.message || "Failed to cancel reward",
          });
        },
        onSettled: () => {
          setCancelingId(null);
        },
      }
    );
  };

  const renderReward = (item: RedeemedReward) => {
    const statusStyle =
      item.status === "Claimed"
        ? styles.claimed
        : item.status === "Pending"
          ? styles.pending
          : styles.cancelled;

    const statusTextStyle =
      item.status === "Claimed"
        ? styles.claimedText
        : item.status === "Pending"
          ? styles.pendingText
          : styles.cancelledText;

    const isCanceling = isPending && cancelingId === item.id;

    return (
      <View key={item.id} style={styles.card}>
        <View style={styles.iconBox}>
          <Gift size={19} color={theme.primary} strokeWidth={2} />
        </View>
        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.nameContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.date}>
                {new Date(item.redeemed_at).toLocaleDateString("en-PH", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </Text>
            </View>
            <View style={[styles.status, statusStyle]}>
              <Text style={[styles.statusText, statusTextStyle]}>{item.status}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.footer}>
            <View style={styles.pointsContainer}>
              <Text style={styles.points}>-{item.points_used}</Text>
              <Text style={styles.pointsLabel}>pts used</Text>
            </View>
            {item.status === "Pending" && (
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={isPending}
                onPress={() => handleCancelRedeemed(item.id)}
                style={styles.cancelBtn}
              >
                {isCanceling ? (
                  <ActivityIndicator size="small" color={theme.errorText} />
                ) : (
                  <>
                    <X size={12} color={theme.errorText} strokeWidth={2.5} />
                    <Text style={styles.cancelText}>Cancel</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Redeemed Rewards</Text>
          <Text style={styles.subtitle}>View your redeemed rewards and track their status</Text>
        </View>
        <View style={styles.headerIcon}>
          <BadgeCheck size={19} color={theme.primary} strokeWidth={2.2} />
        </View>
      </View>

      <EaseView
        initialAnimate={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 350,
          easing: "easeOut",
        }}
        style={styles.rewardContainer}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.primary} />
          </View>
        ) : data.length === 0 ? (
          <View style={styles.emptyContainer}>
            <EmptyState
              icon={Gift}
              title="No rewards redeemed"
              subtitle="Rewards you redeem will appear here so you can track their status and points used."
            />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            nestedScrollEnabled
          >
            {data.map(renderReward)}
          </ScrollView>
        )}
      </EaseView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 12,
  },
  headerText: {
    flex: 1,
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
    lineHeight: 15,
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
  rewardContainer: {
    maxHeight: 700,
  },
  loadingContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    gap: 10,
    paddingBottom: 2,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.card,
    borderRadius: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: theme.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    marginRight: 11,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  nameContainer: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
  },
  date: {
    marginTop: 3,
    fontSize: 9.5,
    fontWeight: "500",
    color: theme.textMuted,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 8.5,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  pending: {
    backgroundColor: "#FFF8E7",
    borderColor: "#F3D38A",
  },
  pendingText: {
    color: "#A66B00",
  },
  claimed: {
    backgroundColor: "#ECFDF5",
    borderColor: "#B7E7D0",
  },
  claimedText: {
    color: "#15803D",
  },
  cancelled: {
    backgroundColor: "#FEF2F2",
    borderColor: "#F3C4C4",
  },
  cancelledText: {
    color: "#DC2626",
  },
  divider: {
    height: 1,
    backgroundColor: theme.border,
    marginTop: 10,
    marginBottom: 9,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 3,
  },
  points: {
    fontSize: 12,
    fontWeight: "800",
    color: theme.primary,
  },
  pointsLabel: {
    fontSize: 9.5,
    fontWeight: "500",
    color: theme.textMuted,
  },
  cancelBtn: {
    minWidth: 60,
    height: 28,
    paddingHorizontal: 9,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: theme.errorBg,
    borderWidth: 1,
    borderColor: "rgba(220, 38, 38, 0.16)",
  },
  cancelText: {
    fontSize: 9.5,
    fontWeight: "700",
    color: theme.errorText,
  },
});