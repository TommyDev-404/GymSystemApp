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
  CreditCard,
  FileText,
  Info,
  LogOut,
  Settings,
  Share2,
  ShieldCheck,
  Users,
  X,
} from "lucide-react-native";

import { router } from "expo-router";

import { useAuth } from "@/context/AuthContext";
import { theme } from "@/utils/theme";

import { LogoutConfirmationModal } from "@/features/profile/components/LogoutConfirmationModal";
import { ProfileMenuSection } from "../components/ProfileMenuSection";
import { useGetProfileInfo } from "../hook/useProfile";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SIDEBAR_WIDTH = Math.min(SCREEN_WIDTH * 0.84, 320);

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
      {
        label: "Attendance History",
        icon: Calendar,
        screen: "/(app)/attendance-history",
      },
      {
        label: "Payment History",
        icon: CreditCard,
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
        screen: "/(app)/rewards",
      },
      {
        label: "Referral Program",
        icon: Share2,
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
        screen: "/(app)/personal-info",
      },
      {
        label: "Security",
        icon: Settings,
        screen: "/(app)/security",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        label: "About",
        icon: Info,
        screen: "/(app)/about",
      },
    ],
  },
];

interface ProfileSidebarProps {
  visible: boolean;
  onRequestClose: () => void;
  onClosed: () => void;
}

export function ProfileSidebar({
  visible,
  onRequestClose,
  onClosed,
}: ProfileSidebarProps) {
  const { logout, memberIDs } = useAuth();

  const { data: profileInfo, isLoading: profileLoading, } = useGetProfileInfo(memberIDs?.user_id!);

  const translateX = useRef(
    new Animated.Value(-SIDEBAR_WIDTH)
  ).current;

  const backdropOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setLoggingOut] = useState(false);

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
    ]).start(({ finished }) => {
      if (finished) {
        onClosed();
      }
    });
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      animateOut();
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        gesture.dx < -6 &&
        Math.abs(gesture.dx) > Math.abs(gesture.dy),

      onPanResponderMove: (_, gesture) => {
        if (gesture.dx < 0) {
          translateX.setValue(gesture.dx);
        }
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -100 || gesture.vx < -0.9) {
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
    setLoggingOut(true);

    await logout();
    setLoggingOut(false);

    router.replace("/(auth)/login");
    setShowLogoutModal(false);
  };

  const initials =
    profileInfo?.username
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <View
      pointerEvents={visible ? "auto" : "none"}
      style={StyleSheet.absoluteFill}
    >

      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.backdrop,
          {
            opacity: backdropOpacity,
          },
        ]}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onRequestClose}
        />
      </Animated.View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.sidebar,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.profileHeader}>
            <Pressable
              onPress={onRequestClose}
              hitSlop={12}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.pressed,
              ]}
            >
              <X
                size={17}
                color={theme.textSub}
                strokeWidth={2.2}
              />
            </Pressable>

            <View style={styles.profileSection}>
              <View style={styles.avatarWrapper}>
                {profileInfo?.profile ? (
                  <Image
                    source={{
                      uri: profileInfo.profile,
                    }}
                    style={styles.avatar}
                  />
                ) : (
                  <Text style={styles.avatarText}>
                    {initials}
                  </Text>
                )}

                <View style={styles.onlineIndicator} />
              </View>

              <Text
                style={styles.username}
                numberOfLines={1}
              >
                {profileInfo?.username || "Unknown"}
              </Text>

              <Text
                style={styles.email}
                numberOfLines={1}
              >
                {profileInfo?.email || "No email"}
              </Text>

              <View style={styles.memberBadge}>
                <View style={styles.badgeDot} />

                <Text style={styles.memberBadgeText}>
                  MEMBER
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.profileDivider} />

          <View style={styles.menuContainer}>
            {menuSections.map((section) => (
              <ProfileMenuSection
                key={section.title}
                section={section}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            onPress={() => setShowLogoutModal(true)}
            style={({ pressed }) => [
              styles.logoutButton,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.logoutIcon}>
              <LogOut
                size={16}
                color={theme.errorText}
                strokeWidth={2}
              />
            </View>

            <Text style={styles.logoutText}>
              Log Out
            </Text>
          </Pressable>

          <View style={styles.versionRow}>
            <View style={styles.versionLine} />

            <Text style={styles.versionText}>
              JFitness App v1.0.1
            </Text>

            <View style={styles.versionLine} />
          </View>
        </View>
      </Animated.View>

      <LogoutConfirmationModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        loading={isLoggingOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.62)",
  },

  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: theme.card,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderRightWidth: 1,
    borderRightColor: theme.borderStrong,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: {
      width: 6,
      height: 0,
    },
    elevation: 18,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  profileHeader: {
    position: "relative",
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },

  closeButton: {
    position: "absolute",
    top: 54,
    right: 16,
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    zIndex: 10,
  },

  pressed: {
    opacity: 0.65,
  },

  profileSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 20,
  },

  avatarWrapper: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 2,
    borderColor: theme.borderAccent,
    shadowColor: theme.primary,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 38,
  },

  avatarText: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.primaryLight,
  },

  onlineIndicator: {
    position: "absolute",
    right: 1,
    bottom: 2,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: theme.primaryLight,
    borderWidth: 3,
    borderColor: theme.card,
  },

  username: {
    marginTop: 12,
    maxWidth: 250,
    fontSize: 18,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.3,
  },

  email: {
    marginTop: 3,
    maxWidth: 250,
    fontSize: 11,
    color: theme.textMuted,
  },

  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 9,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.primaryLight,
  },

  memberBadgeText: {
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.7,
    color: theme.primaryLight,
  },

  profileDivider: {
    height: 1,
    marginHorizontal: 16,
    backgroundColor: theme.border,
  },

  menuContainer: {
    paddingTop: 8,
  },

  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: theme.card,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },

  logoutButton: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 13,
    backgroundColor: theme.errorBg,
    borderWidth: 1,
    borderColor: theme.errorBorder,
  },

  logoutIcon: {
    width: 27,
    height: 27,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(252,165,165,0.08)",
  },

  logoutText: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.errorText,
  },

  versionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 13,
  },

  versionLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.border,
  },

  versionText: {
    fontSize: 8.5,
    color: theme.textMuted,
    fontWeight: "500",
  },
});