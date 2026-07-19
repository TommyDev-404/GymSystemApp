import React from "react";
import { View, Text } from "react-native";
import { NotificationCard } from "./NotificationCard";

type Props = {
  label: string;
  icon: any;
  color: string;
  bg: string;
  items: any[];
};

export function NotificationGroup({
  label,
  icon: Icon,
  color,
  bg,
  items,
}: Props) {
  const unreadCount = items.filter((i) => i.unread).length;

  return (
    <View style={{ paddingHorizontal: 20, marginBottom: 18, paddingTop: 10 }}>
      {/* header */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 8,
            backgroundColor: bg,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
          }}
        >
          <Icon size={13} color={color} />
        </View>

        <Text style={{ fontSize: 13, fontWeight: "600", color: "#334155" }}>
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
            <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }}>
              {unreadCount}
            </Text>
          </View>
        )}
      </View>

      {/* items */}
      <View style={{ gap: 10 }}>
        {items.map((item, i) => (
          <NotificationCard
            key={i}
            title={item.title}
            body={item.body}
            time={item.time}
            unread={item.unread}
            icon={Icon}
            iconColor={color}
            iconBg={bg}
          />
        ))}
      </View>
    </View>
  );
}