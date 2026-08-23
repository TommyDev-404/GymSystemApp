import { StyleSheet, Text, View } from "react-native";
import { NotificationCard } from "./NotificationCard";
import { useMarkNotificationRead } from "../hook/useNotification";
import { NotificationGroupType } from "../types/NotifTypes";
import { theme } from "@/utils/theme";

export function NotificationGroup({
  label,
  icon: Icon,
  color,
  bg,
  memberId,
  items,
}: NotificationGroupType) {
  const { mutate: markAsRead } = useMarkNotificationRead();

  const unreadCount = items.filter((item) => item.unread).length;

  const handleMarkRead = (notificationId: number) => {
    markAsRead({
      notificationId,
      memberId,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: bg,
              borderColor: theme.borderAccent,
            },
          ]}
        >
          <Icon size={13} color={color} />
        </View>

        <Text style={styles.label}>{label}</Text>

        {unreadCount > 0 && (
          <View
            style={[
              styles.badge,
              {
                backgroundColor: color,
              },
            ]}
          >
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      <View style={styles.items}>
        {items.map((item) => (
          <NotificationCard
            key={item.id}
            title={item.title}
            body={item.body}
            time={item.time}
            unread={item.unread}
            icon={Icon}
            iconColor={color}
            iconBg={bg}
            onMarkAsRead={() => handleMarkRead(item.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginBottom: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
    borderWidth: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.textSub,
  },
  badge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    borderRadius: 999,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
  },
  items: {
    gap: 10,
  },
});