import { formatNotificationTime } from "@/utils/timeAgoFormatter";
import { View, Text, TouchableOpacity } from "react-native";
import { theme } from "@/utils/theme";

type Props = {
  title: string;
  body: string;
  time: string;
  unread: boolean;
  icon: any;
  iconColor: string;
  iconBg: string;
  onMarkAsRead?: () => void;
};

export function NotificationCard({
  title,
  body,
  time,
  unread,
  icon: Icon,
  iconColor,
  iconBg,
  onMarkAsRead,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        padding: 14,
        borderRadius: 18,
        backgroundColor: unread ? theme.card : theme.surface,
        shadowColor: "#000",
        shadowOpacity: unread ? 0.08 : 0,
        shadowRadius: 8,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: unread ? 3 : 0,
        borderWidth: 1,
        borderColor: theme.borderAccent,
      }}
    >
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          backgroundColor: iconBg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={17} color={iconColor} />
      </View>

      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 13,
              fontWeight: unread ? "700" : "500",
              color: theme.text,
            }}
          >
            {title}
          </Text>

          {unread && (
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 99,
                backgroundColor: iconColor,
                marginTop: 4,
                marginLeft: 8,
              }}
            />
          )}
        </View>

        <Text
          style={{
            fontSize: 12,
            color: theme.textSub,
            marginTop: 4,
            lineHeight: 18,
          }}
        >
          {body}
        </Text>

        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 11,
              color: theme.textMuted,
            }}
          >
            {formatNotificationTime(time)}
          </Text>

          {unread && (
            <TouchableOpacity
              onPress={onMarkAsRead}
              activeOpacity={0.7}
              style={{
                marginTop: 8,
                backgroundColor: theme.primary,
                paddingHorizontal: 14,
                paddingVertical: 7,
                borderRadius: 10,
                alignSelf: "flex-end",
                borderWidth: 1,
                borderColor: theme.borderAccent,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                Mark as read
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}