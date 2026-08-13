import AppHeader from "@/components/AppHeader";
import { router, Tabs } from "expo-router";
import { House, Dumbbell, QrCode, Bell, Users } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";

export default function TabLayout() {
  const [profileOpen, setProfileOpen] = useState(false);
  const openProfile = () => setProfileOpen(true);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#10b981",
          tabBarInactiveTintColor: "#8e8e93",
          tabBarLabelStyle: { fontSize: 11, fontWeight: "500", marginTop: -2 },
          tabBarItemStyle: { paddingTop: 4 },
          tabBarStyle: {
            height: 60,
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "rgba(0,0,0,0.06)",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            header: () => <AppHeader onProfilePress={openProfile} />,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <House size={focused ? 23 : 22} color={color} strokeWidth={focused ? 2.4 : 2} />
            ),
          }}
        />

        <Tabs.Screen
          name="workout"
          options={{
            header: () => <AppHeader isOnWorkout onProfilePress={openProfile} />,
            title: "Workout",
            tabBarIcon: ({ color, focused }) => (
              <Dumbbell size={focused ? 23 : 22} color={color} strokeWidth={focused ? 2.4 : 2} />
            ),
          }}
        />

        <Tabs.Screen
          name="checkin"
          options={{
            title: "Scan",
            tabBarLabel: "Scan",
            tabBarIcon: () => (
              <Pressable onPress={() => router.push("/qr-scanner")} style={{ top: -14 }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#10b981",
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#10b981",
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 6,
                  }}
                >
                  <QrCode size={22} color="white" />
                </View>
              </Pressable>
            ),
            tabBarStyle: { display: "none" },
          }}
        />

        <Tabs.Screen
          name="community" // Community tab
          options={{
            header: () => <AppHeader isOnCommunity />,
            title: "Community",
            tabBarIcon: ({ color, focused }) => (
              <Users size={focused ? 23 : 22} color={color} strokeWidth={focused ? 2.4 : 2} />
            ),
          }}
        />

        <Tabs.Screen
          name="notifications" // now shows Notifications
          options={{
            header: () => <AppHeader onProfilePress={openProfile} />,
            title: "Alerts",
            tabBarIcon: ({ color, focused }) => (
              <Bell size={focused ? 23 : 22} color={color} strokeWidth={focused ? 2.4 : 2} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}