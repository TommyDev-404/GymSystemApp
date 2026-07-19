import {
  View,
  Text,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import {
  CreditCard,
  Trophy,
  Star,
  Megaphone,
  AlertCircle,
  BellOff,
} from "lucide-react-native";

import { NotificationGroup } from "@/features/notifications/components/NotificationGroup";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetMemberNotifications } from "../hook/useNotification";
import { useAuth } from "@/context/AuthContext";
import { EmptyState } from "@/components/EmptyState";

function formatNotificationGroups(notifications: any[]) {
  const config: any = {
    REWARD: {
      label: "Rewards",
      icon: Star,
      color: "#f59e0b",
      bg: "#fef3c7",
    },

    PAYMENT: {
      label: "Payments",
      icon: CreditCard,
      color: "#8b5cf6",
      bg: "#ede9fe",
    },

    ANNOUNCEMENT: {
      label: "Announcements",
      icon: Megaphone,
      color: "#3b82f6",
      bg: "#dbeafe",
    },

    MEMBERSHIP: {
      label: "Membership",
      icon: AlertCircle,
      color: "#f97316",
      bg: "#fff7ed",
    },
  };


  const grouped: any = {};

  notifications.forEach((notif) => {

    const type = notif.type;

    if (!grouped[type]) {
      grouped[type] = {
        ...config[type],
        items: [],
      };
    }


    grouped[type].items.push({
      title: notif.title,
      body: notif.message,
      time: notif.created_at,
      unread: !notif.is_read,
    });

  });

  return Object.values(grouped);
}

export default function NotificationsScreen() {
  const { member } = useAuth();
  const { data: notifications = [], isLoading } = useGetMemberNotifications(member?.memberId!);

  console.log("NOtif: ", notifications)

  const groups = formatNotificationGroups(notifications);
    
    const totalUnread = notifications.filter(
      (n:any) => !n.is_read
    ).length;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    
      {/* header */}
      <View
        style={{
          paddingVertical: 10,
        paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: 'white'
        }}
      >
        
        <View>
          {totalUnread > 0 ? (
            <Text
              style={{
                fontSize: 14,
                color: "#64748b",
              }}
            >
              You have{" "}
              <Text
                style={{
                  fontWeight: "700",
                  color: "#0f172a",
                }}
              >
                {totalUnread}
              </Text>{" "}
              unread notification{totalUnread > 1 ? "s" : ""}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 14,
                color: "#64748b",
              }}
            >
              You're all caught up 🎉
            </Text>
          )}
        </View>

        <Pressable
          style={{
            backgroundColor: "#10b981",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 12, color: "#fff" }}>
            Mark all read
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {groups.length > 0 ? (
          groups.map((g, index) => (
            <NotificationGroup
              key={index}
              label={g.label}
              icon={g.icon}
              color={g.color}
              bg={g.bg}
              items={g.items}
            />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EmptyState
              icon={BellOff}
              title="No notifications yet"
              subtitle="You're all caught up. New updates and alerts will appear here."
            />
          </View>
        )}
      </ScrollView>
    </>
  );
}