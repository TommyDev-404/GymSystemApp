import AppHeader from "@/components/AppHeader";
import { router, Tabs } from "expo-router";
import { House, Dumbbell, QrCode, Bell, User } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "rgba(0,0,0,0.06)",
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="home"
        options={{
          header: () => <AppHeader />,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <House size={size} color={color} />
          ),
        }}
      />

      {/* WORKOUT */}
      <Tabs.Screen
        name="workout"
        options={{
          header: () => <AppHeader isOnWorkout={true}/>,
          title: "Workout",
          tabBarIcon: ({ color, size }) => (
            <Dumbbell size={size} color={color} />
          ),
        }}
      />

      {/* CHECK-IN (CENTER HIGHLIGHTED) */}
      <Tabs.Screen
        name="checkin"
        options={{
          title: "Scan",
          tabBarLabel: "Scan",
          tabBarIcon: ({ focused }) => (
            <Pressable
              onPress={() => router.push("/qr-scanner")}
              style={{
                top: -20,
              }}
            >
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 30,
                  backgroundColor: "#10b981",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#10b981",
                  shadowOpacity: 0.35,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: 8,
                }}
              >
                <QrCode size={26} color="white" />
              </View>
            </Pressable>
          ),
          tabBarStyle: { display: "none" }, // 👈 HIDE BOTTOM NAVBAR
        }}
      />

      {/* NOTIFICATIONS */}
      <Tabs.Screen
        name="notifications"
        options={{
          header: () => <AppHeader />,
          title: "Alerts",
          tabBarIcon: ({ color, size }) => (
            <Bell size={size} color={color} />
          ),
        }}
      />

      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}