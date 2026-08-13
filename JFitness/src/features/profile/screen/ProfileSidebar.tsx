import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Award,
  Calendar,
  ChevronRight,
  CreditCard,
  Flame,
  FileText,
  Info,
  LogOut,
  Settings,
  Share2,
  ShieldCheck,
  Trophy,
  Users,
  X,
  Heart,
  MessageCircle,
} from "lucide-react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { LogoutConfirmationModal } from "@/features/profile/components/LogoutConfirmationModal";
import { ProfileMenuSection } from "../components/ProfileMenuSection";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SIDEBAR_WIDTH = Math.min(SCREEN_WIDTH * 0.84, 320);
const GREEN = "#10b981";

const menuSections = [
  {
    title: "Community",
    items: [
      {
        label: "Your Posts",
        icon: FileText,
        screen: "/(app)/your-posts",
      },
    ],
  },
  {
    title: "Fitness & Finance",
    items: [
      { label: "Attendance History", icon: Calendar, screen: "/(app)/attendance-history" },
      { label: "Payment History", icon: CreditCard, screen: "/(app)/payment-history" },
    ],
  },
  {
    title: "Rewards & Referrals",
    items: [
      { label: "Rewards & Badges", icon: Award, screen: "/(app)/rewards" },
      { label: "Referral Program", icon: Share2, screen: "/(app)/referral" },
    ],
  },
 
  {
    title: "Account",
    items: [
      { label: "Personal Information", icon: Users, screen: "/(app)/personal-info" },
      { label: "Security", icon: Settings, screen: "/(app)/security" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Privacy Policy", icon: ShieldCheck, screen: "/(app)/privacy-policy" },
      { label: "Terms & Conditions", icon: FileText, screen: "/(app)/terms-and-conditions" },
      { label: "About", icon: Info, screen: "/(app)/about" },
    ],
  },
];

const communityStats = [
  {
    label: "Posts",
    value: "2",
    icon: FileText,
  },
  {
    label: "Likes",
    value: "10",
    icon: Heart,
  },
  {
    label: "Comments",
    value: "12",
    icon: MessageCircle,
  },
];

export function ProfileSidebar({ visible, onRequestClose, onClosed }: any) {
  const { logout, member } = useAuth();

  const translateX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const animateOut = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -SIDEBAR_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => finished && onClosed());
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      animateOut();
    }
  }, [visible]);

  // Drag left on the panel (or its handle) to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dx < -6 && Math.abs(g.dx) > Math.abs(g.dy),
      onPanResponderMove: (_, g) => {
        if (g.dx < 0) translateX.setValue(g.dx);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dx < -100 || g.vx < -0.9) {
          onRequestClose();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
          }).start();
        }
      },
    })
  ).current;

  const handleLogout = async () => {
    setShowLogoutModal(false);
    onRequestClose();
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* BACKDROP — tap anywhere outside the panel to close */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(15,23,42,0.5)", opacity: backdropOpacity },
        ]}
      >
        <Pressable style={{ flex: 1 }} onPress={onRequestClose} />
      </Animated.View>

      {/* SIDEBAR PANEL */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: SIDEBAR_WIDTH,
          backgroundColor: "#fff",
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          transform: [{ translateX }],
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 20,
          shadowOffset: { width: 4, height: 0 },
          elevation: 16,
        }}
      >
        {/* CLOSE BUTTON */}
        <View style={{ paddingTop: 52, paddingHorizontal: 16, paddingBottom: 4, alignItems: "flex-end" }}>
          <Pressable
            onPress={onRequestClose}
            hitSlop={12}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: "#f8fafc",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} color="#64748b" />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          
          {/* IDENTITY */}
          <View style={{ alignItems: "center", paddingHorizontal: 24 }}>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: "#ecfdf5",
                borderWidth: 2,
                borderColor: GREEN,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {member?.profile ? (
                <Image
                  source={{
                    uri: member.profile,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    color: GREEN,
                  }}
                >
                  {member?.username
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </Text>
              )}
            </View>


            <Text
              style={{
                marginTop: 12,
                fontSize: 18,
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              {member?.username || "Unknown"}
            </Text>


            <Text
              style={{
                marginTop: 2,
                fontSize: 13,
                color: "#94s3b8",
              }}
            >
              {member?.email || "No email."}
            </Text>

          </View>

          {/* MENU */}
          {menuSections.map((section) => (
            <ProfileMenuSection
              key={section.title}
              section={section}
            />
          ))}

        </ScrollView>

        <View style={{ paddingBottom: 10}}>
          {/* LOGOUT */}
          <View style={{ paddingHorizontal: 16, marginTop: 15}}>
            <Pressable
              onPress={() => setShowLogoutModal(true)}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                paddingVertical: 13,
                borderRadius: 14,
                backgroundColor: "#fef2f2",
                borderWidth: 1,
                borderColor: "#fecaca",
              }}
            >
              <LogOut size={16} color="#ef4444" />
              <Text style={{ color: "#ef4444", fontWeight: "600", fontSize: 14 }}>Log Out</Text>
            </Pressable>
          </View>

          <Text style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "#545556" }}>
            JFitness App v1.0.1
          </Text>
        </View>
      </Animated.View>

      <LogoutConfirmationModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
}