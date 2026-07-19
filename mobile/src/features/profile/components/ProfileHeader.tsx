import React from "react";
import { View, Text, Image } from "react-native";
import { Crown, User } from "lucide-react-native";
import { useAuth } from "@/context/AuthContext";
import { useGetMemberDashboardData } from "@/features/home/hook/useHome";
import { MemberDashboard } from "@/features/home/types/HomeTypes";

export function ProfileHeader() {
  const { member } = useAuth();
  const { data: memberData = {} as MemberDashboard } = useGetMemberDashboardData(member?.memberId!);


  return (
    <View
      style={{
        paddingTop: 50,
        paddingBottom: 24,
        alignItems: "center",
        backgroundColor: "#d1fae5",
      }}
    >
      <View>
      <View
    style={{
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: "#e2e8f0",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
      borderColor: "white",
    }}
  >
    <User
      size={42}
      color="#94a3b8"
    />
  </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 26,
            height: 26,
            borderRadius: 13,
            backgroundColor: "#f59e0b",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "white",
          }}
        >
          <Crown size={12} color="white" />
        </View>
      </View>

      <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 10 }}>
        {memberData?.username}
      </Text>

      <Text style={{ fontSize: 12, color: "#64748b" }}>
        Member ID: #GYM-00128
      </Text>

      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          backgroundColor: "#10b981",
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderRadius: 999,
          alignItems: "center",
          gap: 6,
        }}
      >
        <Crown size={13} color="white" />
        <Text style={{ color: "white", fontSize: 12, fontWeight: "600" }}>
          {memberData?.plan} Member
        </Text>
      </View>
    </View>
  );
}