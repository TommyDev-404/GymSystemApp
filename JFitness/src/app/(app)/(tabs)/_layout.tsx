import AppHeader from "@/components/shared/AppHeader";
import { ProfileSidebar } from "@/features/profile/screen/ProfileSidebar";
import { theme } from "@/utils/theme";
import { router, Tabs } from "expo-router";
import {
  House,
  Dumbbell,
  QrCode,
  Bell,
  Users,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";

export default function TabLayout() {
  const [profileOpen, setProfileOpen] = useState(false);

  const openProfile = () => setProfileOpen(true);
  const closeProfile = () => setProfileOpen(false);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
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
            header: () => (
              <AppHeader onProfilePress={openProfile} />
            ),
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
            header: () => (
              <AppHeader
                isOnWorkout
                onProfilePress={openProfile}
              />
            ),
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
                onPress={() => router.push("/qr-scanner")}
                style={{ top: -14 }}
              >
                <View
                  style={{
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
                  }}
                >
                  <QrCode
                    size={22}
                    color="#ffffff"
                    strokeWidth={2.2}
                  />
                </View>
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
            header: () => <AppHeader isOnCommunity />,
            title: "Community",
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
            header: () => (
              <AppHeader onProfilePress={openProfile} />
            ),
            title: "Alerts",
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
    </>
  );
}