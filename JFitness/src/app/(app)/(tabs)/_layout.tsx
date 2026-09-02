import AppHeader from "@/components/shared/AppHeader";
import { useAuth } from "@/context/AuthContext";
import { useGetTabBadges } from "@/features/home/hook/useHome";
import { ProfileSidebar } from "@/features/profile/screen/ProfileSidebar";
import { theme } from "@/utils/theme";
import { router, Tabs, usePathname } from "expo-router";
import { Bell, Dumbbell, House, QrCode, Users } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { memberIDs } = useAuth();
  const { data: badges } = useGetTabBadges(memberIDs?.member_id!);

  const [profileOpen, setProfileOpen] = useState(false);

  const alertCount = badges?.notificationCount;
  const communityCount =  badges?.communityCount;
  
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const openProfile = useCallback(() => {
    setProfileOpen(true);
  }, []);

  const closeProfile = useCallback(() => {
    setProfileOpen(false);
  }, []);

  const scanPress = useCallback(() => {
    router.push("/qr-scanner");
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <AppHeader
        pathname={pathname}
        onProfilePress={openProfile}
      />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSub,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "500",
            marginTop: -2,
          },
          tabBarItemStyle: {
            paddingTop: 4,
          },
          tabBarStyle: {
            height: 60,
            backgroundColor: theme.card,
            borderTopWidth: 1,
            borderTopColor: theme.border,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <House
                size={focused ? 23 : 22}
                color={color}
                strokeWidth={focused ? 2.4 : 2}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="workout"
          options={{
            title: "Workout",
            tabBarIcon: ({ color, focused }) => (
              <Dumbbell
                size={focused ? 23 : 22}
                color={color}
                strokeWidth={focused ? 2.4 : 2}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="checkin"
          options={{
            title: "Scan",
            tabBarLabel: "Scan",
            tabBarIcon: () => (
              <Pressable
                onPress={scanPress}
                style={styles.scanButton}
              >
                <QrCode
                  size={22}
                  color="#ffffff"
                  strokeWidth={2.2}
                />
              </Pressable>
            ),
            tabBarStyle: {
              display: "none",
            },
          }}
        />

        <Tabs.Screen
          name="community"
          options={{
            title: "Community",
            tabBarBadge: communityCount && communityCount > 0 ? communityCount : undefined,
            tabBarBadgeStyle: styles.badge,
            tabBarIcon: ({ color, focused }) => (
              <Users
                size={focused ? 23 : 22}
                color={color}
                strokeWidth={focused ? 2.4 : 2}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="notifications"
          options={{
            title: "Alerts",
            tabBarBadge: alertCount && alertCount > 0 ? alertCount : undefined,
            tabBarBadgeStyle: styles.badge,
            tabBarIcon: ({ color, focused }) => (
              <Bell
                size={focused ? 23 : 22}
                color={color}
                strokeWidth={focused ? 2.4 : 2}
              />
            ),
          }}
        />
        
      </Tabs>

      <ProfileSidebar
        visible={profileOpen}
        onRequestClose={closeProfile}
        onClosed={closeProfile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.card,
  },
  scanButton: {
    top: -14,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.primary,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 8,
    borderWidth: 1.5,
    borderColor: theme.borderAccent,
  },
  badge: {
    backgroundColor: theme.primary,
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "800",
    minWidth: 18,
    height: 18,
    lineHeight: 18,
    textAlign: "center",
    borderRadius: 9,
    overflow: "hidden",
  },
});