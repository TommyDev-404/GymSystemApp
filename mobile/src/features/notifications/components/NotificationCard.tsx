import React from "react";
import { View, Text } from "react-native";

type Props = {
  title: string;
  body: string;
  time: string;
  unread: boolean;
  icon: any;
  iconColor: string;
  iconBg: string;
};

function formatNotificationTime(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

export function NotificationCard({
  title,
  body,
  time,
  unread,
  icon: Icon,
  iconColor,
  iconBg,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        padding: 14,
        borderRadius: 18,
        backgroundColor: unread ? "#fff" : "#f8fafc",

        // shadow iOS
        shadowColor: "#000",
        shadowOpacity: unread ? 0.08 : 0,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },

        // shadow Android
        elevation: unread ? 3 : 0,

        borderWidth: unread ? 0 : 1,
        borderColor: "#e2e8f0",
      }}
    >
      {/* icon */}
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          backgroundColor: iconBg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={16} color={iconColor} />
      </View>

      {/* content */}
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: unread ? "700" : "500",
              color: "#0f172a",
              flex: 1,
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
              }}
            />
          )}
        </View>

        <Text style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
          {body}
        </Text>

        <Text style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
          {formatNotificationTime(time)}
        </Text>
      </View>
    </View>
  );
}