import { View, Text } from "react-native";
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

  const unreadCount = items.filter((i) => i.unread).length;

  const handleMarkRead = (notificationId: number) => {
    markAsRead({ notificationId, memberId });
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 18,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 8,
            backgroundColor: bg,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
            borderWidth: 1,
            borderColor: theme.borderAccent,
          }}
        >
          <Icon size={13} color={color} />
        </View>

        <Text
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: theme.textSub,
          }}
        >
          {label}
        </Text>

        {unreadCount > 0 && (
          <View
            style={{
              marginLeft: 8,
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 999,
              backgroundColor: color,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 10,
                fontWeight: "700",
              }}
            >
              {unreadCount}
            </Text>
          </View>
        )}
      </View>

      <View style={{ gap: 10 }}>
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