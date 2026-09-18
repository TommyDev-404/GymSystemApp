import { StyleSheet, Text, View } from "react-native";
import { NotificationCard } from "./NotificationCard";
import { useMarkNotificationRead } from "../hook/useNotification";
import { NotificationGroupType } from "../types/NotifTypes";
import { theme } from "@/utils/theme";

interface NotificationGroupProps extends NotificationGroupType {
  memberId: number;
}

export function NotificationGroup({
  label,
  memberId,
  items,
}: NotificationGroupProps) {
  const { mutate: markAsRead } = useMarkNotificationRead();

  const handleMarkRead = (notificationId: number) => {
    markAsRead({
      notificationId,
      memberId,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.line} />

        <Text style={styles.label}>{label}</Text>

        <View style={styles.line} />
      </View>

      <View style={styles.items}>
        {items.map((item) => (
          <NotificationCard
            key={item.id}
            title={item.title}
            body={item.body}
            time={item.time}
            unread={item.unread}
            category={item.category}
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
    gap: 10,
    marginBottom: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.border,
  },
  label: {
    fontSize: 11,
    fontWeight: "800",
    color: theme.textMuted,
    letterSpacing: 1.2,
  },
  items: {
    gap: 10,
  },
});