import { View, Text, StyleSheet } from "react-native";
import {
  Flame,
  Receipt,
  Trophy,
  Activity,
  Dumbbell,
  Tag,
  User,
  CreditCard,
} from "lucide-react-native";
import { theme } from "@/utils/theme";
import { EmptyState } from "@/components/shared/EmptyState";

function formatActivityDate(date: string | Date) {
  const activityDate = new Date(date);

  return activityDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getActivityIcon(type: string) {
  switch (type) {
    case "ATTENDANCE":
      return Flame;

    case "PAYMENT":
      return Receipt;

    case "MEMBERSHIP":
      return CreditCard;

    case "REWARD":
      return Trophy;

    case "MEMBER":
      return User;

    case "PRICING":
      return Tag;

    case "WORKOUT":
      return Dumbbell;

    default:
      return Activity;
  }
}

function getActivityColor(type: string) {
  switch (type) {
    case "CHECK_IN":
      return {
        color: "#34D399",
      };

    case "PAYMENT":
      return {
        color: "#60A5FA",
      };

    case "REWARD_CLAIM":
      return {
        color: "#FBBF24",
      };

    case "MEMBERSHIP":
      return {
        color: theme.primary,
      };

    case "WORKOUT":
      return {
        color: "#A78BFA",
      };

    default:
      return {
        color: theme.textMuted,
      };
  }
}

export function ActivityList({ activities }: any) {
  return (
    <View>
      <Text style={styles.title}>Recent Activity</Text>

      {activities.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="No activity yet"
          subtitle="Your check-ins, workouts, payments, and rewards will appear here."
        />
      ) : (
        activities.map((a: any, i: number) => {
          const Icon = getActivityIcon(a.type);
          const iconStyle = getActivityColor(a.type);

          return (
            <View key={i} style={styles.card}>
              {/* Icon */}
              <View
                style={[
                  styles.iconContainer,
                  {
                    borderColor: `${iconStyle.color}45`,
                    shadowColor: iconStyle.color,
                  },
                ]}
              >
                <Icon
                  size={18}
                  color={iconStyle.color}
                  strokeWidth={2.2}
                />
              </View>

              {/* Content */}
              <View style={styles.content}>
                <Text
                  style={styles.name}
                  numberOfLines={1}
                >
                  {a.name}
                </Text>

                <Text
                  style={styles.action}
                  numberOfLines={2}
                >
                  {a.action}
                </Text>

                <Text style={styles.date}>
                  {formatActivityDate(a.time)}
                </Text>
              </View>

              {/* Accent */}
              <View
                style={[
                  styles.accentLine,
                  {
                    backgroundColor: iconStyle.color,
                  },
                ]}
              />
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  title: {
    marginTop: 10,
    marginBottom: 12,

    fontSize: 16,
    fontWeight: "700",

    color: theme.text,
    letterSpacing: -0.2,
  },

  /* ================= CARD ================= */

  card: {
    position: "relative",

    flexDirection: "row",
    alignItems: "center",

    padding: 14,

    marginBottom: 10,

    borderRadius: 16,

    backgroundColor: theme.card,

    borderWidth: 1,
    borderColor: theme.primaryLight + "55",

    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,

    elevation: 3,
  },

  /* ================= ICON ================= */

  iconContainer: {
    width: 42,
    height: 42,

    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.surface,

    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowRadius: 10,
    shadowOpacity: 0.35,

    elevation: 3,
  },

  /* ================= CONTENT ================= */

  content: {
    flex: 1,
    marginLeft: 11,
    paddingRight: 8,
  },

  name: {
    fontSize: 14,
    fontWeight: "700",

    color: theme.text,
  },

  action: {
    marginTop: 3,

    fontSize: 12,
    lineHeight: 17,

    color: theme.textSub,
  },

  date: {
    marginTop: 5,

    fontSize: 10.5,

    color: theme.textMuted,
  },

  /* ================= ACCENT ================= */

  accentLine: {
    position: "absolute",

    bottom: 0,
    left: "50%",

    marginLeft: -14,

    width: 28,
    height: 2,

    borderRadius: 999,

    opacity: 0.8,
  },
});