import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BadgeCheck, Gift, X } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";
import { EmptyState } from "@/components/shared/EmptyState";
import { theme } from "@/utils/theme";
import { RedeemedReward } from "../types/RewardTypes";
import {
  useCancelRedeemReward,
  useFetchRedeemedRewards,
} from "../hook/useReward";

export default function RedeemedSection() {
  const { member } = useAuth();
  const { data: redeemedRewards = [] } = useFetchRedeemedRewards(
    member?.memberId!
  );
  const { mutate: cancelRedeeming, isPending } = useCancelRedeemReward();
  const [cancelingId, setCancelingId] = useState<number | null>(null);

  const handleCancelRedeemed = (redemptionId: number) => {
    setCancelingId(redemptionId);

    cancelRedeeming(
      {
        member_id: member?.memberId!,
        redemption_id: redemptionId,
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

  const renderItem = ({ item }: { item: RedeemedReward }) => (
    <View style={styles.card}>
      <LinearGradient
        colors={[theme.primaryDark, theme.primary, theme.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.glow} pointerEvents="none" />

        <View style={styles.iconBox}>
          <Gift size={18} color="#FFD6DE" strokeWidth={2} />
        </View>

        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>

            <View
              style={[
                styles.status,
                item.status === "Claimed" && styles.claimed,
                item.status === "Pending" && styles.pending,
                item.status === "Cancelled" && styles.cancelled,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  item.status === "Claimed" && styles.claimedText,
                  item.status === "Pending" && styles.pendingText,
                  item.status === "Cancelled" && styles.cancelledText,
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>

          <Text style={styles.desc}>
            {new Date(item.redeemed_at).toLocaleDateString("en-PH", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Text>

          <View style={styles.footer}>
            <Text style={styles.points}>-{item.points_used} pts</Text>

            {item.status === "Pending" && (
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={isPending}
                onPress={() => handleCancelRedeemed(item.id)}
                style={styles.cancelBtn}
              >
                {isPending && cancelingId === item.id ? (
                  <ActivityIndicator size="small" color={theme.errorText} />
                ) : (
                  <>
                    <X
                      size={12}
                      color={theme.errorText}
                      strokeWidth={2.5}
                    />
                    <Text style={styles.cancelText}>Cancel</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Redeemed Rewards</Text>
          <Text style={styles.subtitle}>
            View your redeemed rewards and track their status
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <BadgeCheck
            size={19}
            color={theme.primaryLight}
            strokeWidth={2.2}
          />
        </View>
      </View>

      <FlatList
        data={redeemedRewards}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmptyState
              icon={Gift}
              title="No rewards redeemed"
              subtitle="Rewards you redeem will appear here so you can track their status and points used."
            />
          </View>
        }
      />
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
  list: {
    gap: 10,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: theme.primaryDark,
    borderWidth: 1,
    borderColor: "rgba(255, 232, 237, 0.25)",
    shadowColor: theme.primaryDark,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 5,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    position: "relative",
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 100,
    right: -55,
    top: -55,
    backgroundColor: "#FFFFFF",
    opacity: 0.07,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    marginRight: 11,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  name: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  desc: {
    marginTop: 3,
    fontSize: 10,
    color: "rgba(255, 232, 237, 0.65)",
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  statusText: {
    fontSize: 8.5,
    fontWeight: "800",
    letterSpacing: 0.2,
    color: "#FFFFFF",
  },
  pending: {
    backgroundColor: "rgba(245, 158, 11, 0.16)",
    borderColor: "rgba(255, 214, 120, 0.28)",
  },
  pendingText: {
    color: "#FFE0A3",
  },
  claimed: {
    backgroundColor: "rgba(167, 243, 208, 0.14)",
    borderColor: "rgba(167, 243, 208, 0.24)",
  },
  claimedText: {
    color: "#D1FAE5",
  },
  cancelled: {
    backgroundColor: "rgba(248, 113, 113, 0.14)",
    borderColor: "rgba(248, 113, 113, 0.25)",
  },
  cancelledText: {
    color: "#FECACA",
  },
  footer: {
    marginTop: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  points: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFE8ED",
  },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minWidth: 60,
    height: 28,
    paddingHorizontal: 9,
    borderRadius: 8,
    backgroundColor: "rgba(248, 113, 113, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.3)",
  },
  cancelText: {
    fontSize: 9.5,
    fontWeight: "700",
    color: "#FECACA",
  },
});