import { formatNotificationTime } from "@/utils/timeAgoFormatter";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
    <View style={[styles.card, unread ? styles.unreadCard : styles.readCard]}>
      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
        <Icon size={17} color={iconColor} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            numberOfLines={2}
            style={[styles.title, unread ? styles.unreadTitle : styles.readTitle]}
          >
            {title}
          </Text>

          {unread && (
            <View style={[styles.unreadDot, { backgroundColor: iconColor }]} />
          )}
        </View>

        <Text style={styles.body}>{body}</Text>

        <View style={styles.footer}>
          <Text style={styles.time}>{formatNotificationTime(time)}</Text>

          {unread && onMarkAsRead && (
            <Pressable
              onPress={onMarkAsRead}
              style={({ pressed }) => [
                styles.markReadButton,
                pressed && styles.markReadPressed,
              ]}
            >
              <Text style={styles.markReadText}>Mark as read</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  unreadCard: {
    backgroundColor: theme.card,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },
  readCard: {
    backgroundColor: theme.surface,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    fontSize: 13,
    color: theme.text,
  },
  unreadTitle: {
    fontWeight: "700",
  },
  readTitle: {
    fontWeight: "500",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    marginTop: 4,
    marginLeft: 8,
  },
  body: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: theme.textSub,
  },
  footer: {
    marginTop: 10,
  },
  time: {
    fontSize: 11,
    color: theme.textMuted,
  },
  markReadButton: {
    alignSelf: "flex-end",
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: theme.primary,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  markReadPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  markReadText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});