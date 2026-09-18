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
  notifications: Notification[],
): NotificationGroupType[] {
  const grouped: Record<string, NotificationGroupType> = {};

  const getDateKey = (date: string) => {
    const parsed = new Date(date);

    return `${parsed.getFullYear()}-${String(
      parsed.getMonth() + 1,
    ).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
  };

  const getDateLabel = (date: string) => {
    const parsed = new Date(date);
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const isToday =
      parsed.getFullYear() === today.getFullYear() &&
      parsed.getMonth() === today.getMonth() &&
      parsed.getDate() === today.getDate();

    const isYesterday =
      parsed.getFullYear() === yesterday.getFullYear() &&
      parsed.getMonth() === yesterday.getMonth() &&
      parsed.getDate() === yesterday.getDate();

    if (isToday) {
      return "TODAY";
    }

    if (isYesterday) {
      return "YESTERDAY";
    }

    return parsed
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  notifications.forEach((notif) => {
    const key = getDateKey(notif.created_at);

    if (!grouped[key]) {
      grouped[key] = {
        label: getDateLabel(notif.created_at),
        icon: Bell,
        color: theme.primary,
        bg: theme.primaryLight,
        items: [],
      };
    }

    grouped[key].items.push({
      id: notif.id,
      title: notif.title,
      body: notif.description,
      time: notif.created_at,
      unread: !notif.is_read,
      category: notif.category,
    });
  });

  return Object.entries(grouped)
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .map(([, group]) => group);
}

export default function NotificationsScreen() {
  const { memberIDs } = useAuth();

  const { data: notifications = [], isLoading } = useGetMemberNotifications(memberIDs?.member_id!);
  const { mutate: markAllRead, isPending } = useMarkAllNotificationRead();

  const groups = useMemo(
    () => formatNotificationGroups(notifications),
    [notifications]
  );

  const totalUnread = useMemo(
    () => notifications.filter((notification: any) => !notification.is_read).length,
    [notifications]
  );

  const handleMarkAllRead = () => {
    if (!memberIDs?.member_id) {
      return;
    }

    markAllRead(
      { memberId: memberIDs.member_id },
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
      useScrollView={false}
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
            memberId={memberIDs?.member_id!}
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