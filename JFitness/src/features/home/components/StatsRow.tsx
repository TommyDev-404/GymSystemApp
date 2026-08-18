import { View, Text, StyleSheet } from "react-native";
import { theme } from "@/utils/theme";

interface Stat {
  value?: number;
  label: string;
  color: string;
  icon: React.ComponentType<any>;
}

interface Props {
  stats: Stat[];
}

export function StatsRow({ stats }: Props) {
  return (
    <View style={styles.container}>
      {stats.map((s, i) => {
        const Icon = s.icon;

        return (
          <View key={i} style={styles.card}>
            {/* Icon + indicator */}
            <View style={styles.topRow}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: s.color + "22",
                    borderColor: s.color + "35",
                  },
                ]}
              >
                <Icon
                  size={17}
                  color={s.color}
                  strokeWidth={2.2}
                />
              </View>

              <View
                style={[
                  styles.indicator,
                  { backgroundColor: s.color },
                ]}
              />
            </View>

            {/* Value */}
            <Text style={styles.value}>
              {s.value ?? 0}
            </Text>

            {/* Label */}
            <Text
              numberOfLines={1}
              style={styles.label}
            >
              {s.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },

  card: {
    flex: 1,
    minHeight: 100,
    padding: 14,
    borderRadius: 16,

    // Dark theme
    backgroundColor: theme.card,

    // Same accent border style as MembershipCard
    borderWidth: 1,
    borderColor: theme.borderAccent,

    // Subtle elevation
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
  },

  indicator: {
    width: 5,
    height: 5,
    borderRadius: 999,
    opacity: 0.8,
  },

  value: {
    marginTop: 10,

    fontSize: 21,
    fontWeight: "700",
    letterSpacing: -0.4,

    color: theme.text,
  },

  label: {
    marginTop: 2,

    fontSize: 10.5,
    fontWeight: "500",

    color: theme.textSub,
  },
});