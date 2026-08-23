import { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  BadgeCheck,
  Bell,
  BellOff,
  CreditCard,
  Flame,
  Star,
  User,
} from "lucide-react-native";
import Toast from "react-native-toast-message";
import { TabWrapper } from "@/components/shared/TabWrapper";
import { EmptyState } from "@/components/shared/EmptyState";
import { NotificationGroup } from "@/features/notifications/components/NotificationGroup";
import {
  useGetMemberNotifications,
  useMarkAllNotificationRead,
} from "../hook/useNotification";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/utils/theme";
import { Notification, NotificationGroupType } from "../types/NotifTypes";

function formatNotificationGroups(
  notifications: Notification[]
): NotificationGroupType[] {
  const config: Record<string, any> = {
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
    MEMBERSHIP: {
      label: "Membership",
      icon: BadgeCheck,
      color: "#f97316",
      bg: "#fff7ed",
    },
    MEMBER: {
      label: "Members",
      icon: User,
      color: "#3b82f6",
      bg: "#dbeafe",
    },
    ATTENDANCE: {
      label: "Attendance",
      icon: Flame,
      color: "#ef4444",
      bg: "#fee2e2",
    },
  };

  const grouped: Record<string, any> = {};

  notifications.forEach((notif) => {
    const type = notif.category;

    if (!grouped[type]) {
      grouped[type] = {
        ...(config[type] ?? {
          label: "Other",
          icon: Bell,
          color: "#64748b",
          bg: "#f1f5f9",
        }),
        items: [],
      };
    }

    grouped[type].items.push({
      id: notif.id,
      title: notif.title,
      body: notif.description,
      time: notif.created_at,
      unread: !notif.is_read,
    });
  });

  return Object.values(grouped);
}

export default function NotificationsScreen() {
  const { member } = useAuth();

  const {
    data: notifications = [],
    isLoading,
  } = useGetMemberNotifications(member?.memberId!);

  const { mutate: markAllRead, isPending } =
    useMarkAllNotificationRead();

  const groups = useMemo(
    () => formatNotificationGroups(notifications),
    [notifications]
  );

  const totalUnread = useMemo(
    () => notifications.filter((notification: any) => !notification.is_read).length,
    [notifications]
  );

  const handleMarkAllRead = () => {
    if (!member?.memberId) {
      return;
    }

    markAllRead(
      { memberId: member.memberId },
      {
        onSuccess: (data) => {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: data.message,
          });
        },
      }
    );
  };

  return (
    <TabWrapper
      loading={isLoading}
      loadingMinHeight={400}
      scrollEnabled={false}
      horizontalPadding={0}
      paddingTop={0}
      paddingBottom={0}
      gap={0}
    >
      {notifications.length > 0 && (
        <View style={styles.summary}>
          <View style={styles.summaryText}>
            {totalUnread > 0 ? (
              <Text style={styles.statusText}>
                You have{" "}
                <Text style={styles.statusCount}>{totalUnread}</Text>{" "}
                unread notification{totalUnread > 1 ? "s" : ""}
              </Text>
            ) : (
              <Text style={styles.statusText}>
                All notifications have been reviewed.
              </Text>
            )}
          </View>

          {totalUnread > 0 && (
            <Pressable
              onPress={handleMarkAllRead}
              disabled={isPending}
              style={[
                styles.markAllButton,
                { opacity: isPending ? 0.7 : 1 },
              ]}
            >
              {isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.markAllText}>Mark all read</Text>
              )}
            </Pressable>
          )}
        </View>
      )}

      <FlatList
        data={groups}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <NotificationGroup
            label={item.label}
            icon={item.icon}
            color={item.color}
            bg={item.bg}
            items={item.items}
            memberId={member?.memberId!}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmptyState
              icon={BellOff}
              title="No notifications yet"
              subtitle="You're all caught up. New updates and alerts will appear here."
            />
          </View>
        }
      />
    </TabWrapper>
  );
}

const styles = StyleSheet.create({
  summary: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  summaryText: {
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    color: theme.textSub,
  },
  statusCount: {
    fontWeight: "700",
    color: theme.text,
  },
  markAllButton: {
    minWidth: 94,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: theme.primary,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  markAllText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});