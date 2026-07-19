import React, { useState } from "react";
import { ScrollView, View, Text, StatusBar } from "react-native";

import {
  Calendar,
  CreditCard,
  Trophy,
  Award,
  Activity,
  Users,
  Settings,
  Info,
  Ruler,
  Weight,
  Phone,
  BookOpen,
  Star,
  TrendingUp,
  Timer,
  MessageCircle,
  Share2,
  ShieldCheck,
  FileText,
  LogOut,
} from "lucide-react-native";

import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { StatCard } from "@/features/profile/components/StatCard";
import { MenuItem } from "@/features/profile/components/MenuItem";
import { LogoutConfirmationModal } from "@/features/profile/components/LogoutConfirmationModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const menuSections = [
  {
    title: "Fitness & Finance",
    items: [
      {
        label: "Attendance History",
        icon: Calendar,
        color: "#10b981",
        bg: "#d1fae5",
        screen: "/(app)/attendance-history",
      },
      {
        label: "Payment History",
        icon: CreditCard,
        color: "#3b82f6",
        bg: "#dbeafe",
        screen: "/(app)/payment-history",
      },
    ],
  },
  {
    title: "Rewards & Referrals",
    items: [
      {
        label: "Rewards & Badges",
        icon: Award,
        color: "#8b5cf6",
        bg: "#ede9fe",
        screen: "/(app)/rewards",
      },
      {
        label: "Referral Program",
        icon: Share2,
        color: "#10b981",
        bg: "#d1fae5",
        screen: "/(app)/referral",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        label: "Personal Information",
        icon: Users,
        color: "#3b82f6",
        bg: "#dbeafe",
        screen: "/(app)/personal-info",
      },
      {
        label: "Security",
        icon: Settings,
        color: "#ef4444",
        bg: "#fee2e2",
        screen: "/(app)/security",
      }
    ],
  },
  {
    title: "Support",
    items: [
      {
        label: "Privacy Policy",
        icon: ShieldCheck,
        color: "#10b981", // Emerald
        bg: "#d1fae5",
        screen: "/(app)/privacy-policy",
      },
      {
        label: "Terms & Conditions",
        icon: FileText,
        color: "#3b82f6", // Blue
        bg: "#dbeafe",
        screen: "/(app)/terms-and-conditions",
      },
      {
        label: "About",
        icon: Info,
        color: "#64748b", // Slate
        bg: "#f1f5f9",
        screen: "/(app)/about",
      },
    ],
  }
];

export function ProfileScreen() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { logout } = useAuth(); // or wherever your logout function comes from

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    router.push('/(auth)/login')
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView style={{ flex: 1 }}>
        {/* HEADER */}
        <ProfileHeader />

        {/* MENU */}
        {menuSections.map((section) => (
          <View
            key={section.title}
            style={{
              marginTop: 24,
              paddingHorizontal: 16,
            }}
          >
            {/* Section title */}
            <Text
              style={{
                fontSize: 11,
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              {section.title}
            </Text>

            {/* Card */}
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,

                shadowColor: "#000",
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              {section.items.map((item, index) => (
                <MenuItem
                  key={item.label}
                  item={item}
                  isLast={index === section.items.length - 1}
                  route={item.screen}
                />
              ))}
            </View>
          </View>
        ))}
        
        {/* LOGOUT */}
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 24,
          }}
        >
          <Pressable
            onPress={() => setShowLogoutModal(true)}
            style={{
              marginTop: 16,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              paddingVertical: 14,
              borderRadius: 16,
              backgroundColor: "#fef2f2",
              borderWidth: 1,
              borderColor: "#fecaca",
            }}
          >
            <LogOut size={17} color="#ef4444" />
            <Text style={{ color: "#ef4444", fontWeight: "600", fontSize: 14 }}>
              Log Out
            </Text>
          </Pressable>
        </View>

        {/* FOOTER */}
        <Text
          style={{
            textAlign: "center",
            marginTop: 24,
            marginBottom: 30,
            fontSize: 11,
            color: "#94a3b8",
          }}
        >
          GymApp v2.4.1 · Member since Jan 2024
        </Text>

      </ScrollView>

      <LogoutConfirmationModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

    </SafeAreaView>
  );
}