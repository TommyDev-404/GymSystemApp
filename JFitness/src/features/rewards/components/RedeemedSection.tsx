import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {
  BadgeCheck,
  Gift,
  X,
} from "lucide-react-native";

import { RedeemedReward } from "../types/RewardTypes";

import { useAuth } from "@/context/AuthContext";
import { useCancelRedeemReward } from "../hook/useReward";

import Toast from "react-native-toast-message";
import { useState } from "react";

import { EmptyState } from "@/components/shared/EmptyState";
import { theme } from "@/utils/theme";

export default function RedeemedSection({
  data,
}: {
  data: RedeemedReward[];
}) {
  const { member } = useAuth();

  const {
    mutate: cancelRedeeming,
    isPending,
  } = useCancelRedeemReward();

  const [cancelingId, setCancelingId] =
    useState<number | null>(null);

  const handleCancelRedeemed = (
    redemption_id: number
  ) => {
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

      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        <View style={styles.headerText}>

          <Text style={styles.title}>
            Redeemed Rewards
          </Text>

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


      {/* ================= EMPTY ================= */}

      {data.length === 0 ? (

        <EmptyState
          icon={Gift}
          title="No rewards redeemed"
          subtitle="Rewards you redeem will appear here so you can track their status and points used."
        />

      ) : (

        /* ================= REDEEMED LIST ================= */

        <View style={styles.list}>

          {data.map((reward: RedeemedReward) => (

            <View
              key={reward.id}
              style={styles.card}
            >

              {/* ICON */}

              <View style={styles.iconBox}>

                <Gift
                  size={18}
                  color={theme.primaryLight}
                  strokeWidth={2}
                />

              </View>


              {/* CONTENT */}

              <View style={styles.content}>

                {/* NAME + STATUS */}

                <View style={styles.row}>

                  <Text
                    style={styles.name}
                    numberOfLines={1}
                  >
                    {reward.name}
                  </Text>


                  <View
                    style={[
                      styles.status,

                      reward.status === "Claimed" &&
                        styles.claimed,

                      reward.status === "Pending" &&
                        styles.pending,

                      reward.status === "Cancelled" &&
                        styles.cancelled,
                    ]}
                  >

                    <Text
                      style={[
                        styles.statusText,

                        reward.status === "Claimed" &&
                          styles.claimedText,

                        reward.status === "Pending" &&
                          styles.pendingText,

                        reward.status === "Cancelled" &&
                          styles.cancelledText,
                      ]}
                    >
                      {reward.status}
                    </Text>

                  </View>

                </View>


                {/* DATE */}

                <Text style={styles.desc}>
                  {new Date(
                    reward.redeemed_at
                  ).toLocaleDateString(
                    "en-PH",
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }
                  )}
                </Text>


                {/* FOOTER */}

                <View style={styles.footer}>

                  <Text style={styles.points}>
                    -{reward.points_used} pts
                  </Text>


                  {/* CANCEL */}

                  {reward.status === "Pending" && (

                    <TouchableOpacity
                      activeOpacity={0.8}
                      disabled={isPending}
                      onPress={() =>
                        handleCancelRedeemed(
                          reward.id
                        )
                      }
                      style={styles.cancelBtn}
                    >

                      {isPending &&
                      cancelingId === reward.id ? (

                        <ActivityIndicator
                          size="small"
                          color={theme.errorText}
                        />

                      ) : (

                        <>
                          <X
                            size={12}
                            color={theme.errorText}
                            strokeWidth={2.5}
                          />

                          <Text
                            style={styles.cancelText}
                          >
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

  /* ================= CONTAINER ================= */

  container: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 20,
  },


  /* ================= HEADER ================= */

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


  /* ================= HEADER ICON ================= */

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


  /* ================= LIST ================= */

  list: {
    gap: 10,
  },


  /* ================= CARD ================= */

  card: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: theme.card,

    padding: 13,

    borderRadius: 16,

    borderWidth: 1,
    borderColor: theme.border,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.18,

    shadowRadius: 12,

    elevation: 3,
  },


  /* ================= ICON ================= */

  iconBox: {
    width: 38,
    height: 38,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.accentWash,

    borderWidth: 1,
    borderColor: theme.borderAccent,

    marginRight: 11,
  },


  /* ================= CONTENT ================= */

  content: {
    flex: 1,
  },


  /* ================= TOP ROW ================= */

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

    color: theme.text,
  },


  /* ================= DATE ================= */

  desc: {
    marginTop: 3,

    fontSize: 10,

    color: theme.textMuted,
  },


  /* ================= STATUS ================= */

  status: {
    paddingHorizontal: 8,

    paddingVertical: 4,

    borderRadius: 999,

    borderWidth: 1,
  },

  statusText: {
    fontSize: 8.5,

    fontWeight: "800",

    letterSpacing: 0.2,
  },


  /* PENDING */

  pending: {
    backgroundColor: "rgba(245,158,11,0.08)",

    borderColor: "rgba(245,158,11,0.18)",
  },

  pendingText: {
    color: "#FBBF24",
  },


  /* CLAIMED */

  claimed: {
    backgroundColor: "rgba(20,184,166,0.08)",

    borderColor: "rgba(20,184,166,0.18)",
  },

  claimedText: {
    color: theme.primaryLight,
  },


  /* CANCELLED */

  cancelled: {
    backgroundColor: theme.errorBg,

    borderColor: theme.errorBorder,
  },

  cancelledText: {
    color: theme.errorText,
  },


  /* ================= FOOTER ================= */

  footer: {
    marginTop: 9,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },


  points: {
    fontSize: 11,

    fontWeight: "700",

    color: theme.textSub,
  },


  /* ================= CANCEL ================= */

  cancelBtn: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 4,

    minWidth: 60,

    height: 28,

    paddingHorizontal: 9,

    borderRadius: 8,

    backgroundColor: theme.errorBg,

    borderWidth: 1,

    borderColor: theme.errorBorder,
  },

  cancelText: {
    fontSize: 9.5,

    fontWeight: "700",

    color: theme.errorText,
  },

});