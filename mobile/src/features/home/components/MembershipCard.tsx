import { View, Text } from "react-native";
import { Star } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  plan: string,
  membership_start: string,
  expiry: string,
  status: string
}

export function MembershipCard({ plan, membership_start, expiry, status }: Props) {
  return (
    <View style={{ marginHorizontal: 20, borderRadius: 20, overflow: "hidden" }}>
      {/* GRADIENT BACKGROUND */}
      <LinearGradient
        colors={["#10b981", "#059669", "#047857"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 20,
          borderRadius: 20,
        }}
      >
        {/* decorative circles */}
        <View
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        />

        <View
          style={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 110,
            height: 110,
            borderRadius: 55,
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        />

        {/* CONTENT */}
        <View style={{ position: "relative", zIndex: 10 }}>
          {/* TOP ROW */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View>
              <Text
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 11,
                  letterSpacing: 1.2,
                }}
              >
                MEMBERSHIP
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "700",
                  marginTop: 2,
                }}
              >
                {plan ?? "Standard Plan"}
              </Text>
            </View>

            {/* ACTIVE BADGE */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.2)",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 20,
              }}
            >
              <Star size={12} color="white" fill="white" />
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  fontWeight: "600",
                  marginLeft: 4,
                }}
              >
                {status ?? "Active"}
              </Text>
            </View>
          </View>

          {/* BOTTOM ROW */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 11,
                }}
              >
                Membership Started
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "600",
                  marginTop: 2,
                }}
              >
                {membership_start ?? new Date().toLocaleDateString('en-PH', { month: 'short', day: '2-digit', year: 'numeric'})}
              </Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 11,
                }}
              >
                Expires
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "600",
                  marginTop: 2,
                }}
              >
                {expiry ?? new Date().toLocaleDateString('en-PH', { month: 'short', day: '2-digit', year: 'numeric'})}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}