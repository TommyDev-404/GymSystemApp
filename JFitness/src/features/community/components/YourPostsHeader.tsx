import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  ArrowLeft,
  FileText,
  Heart,
  MessageCircle,
} from "lucide-react-native";

import { theme } from "@/utils/theme";

interface Props {
  onBack?: () => void;
  stats: {
    totalPosts: number;
    totalLikes: number;
    totalComments: number;
  };
}

export function YourPostsHeader({ onBack, stats }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Pressable
          onPress={onBack}
          hitSlop={8}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <ArrowLeft
            size={17}
            color={theme.textSub}
            strokeWidth={2.2}
          />
        </Pressable>

        <Text style={styles.title}>Your Posts</Text>
      </View>

      <View style={styles.statsRow}>
        <MiniStat
          icon={FileText}
          value={stats.totalPosts}
          label="Posts"
        />

        <Divider />

        <MiniStat
          icon={Heart}
          value={stats.totalLikes}
          label="Likes"
        />

        <Divider />

        <MiniStat
          icon={MessageCircle}
          value={stats.totalComments}
          label="Comments"
        />
      </View>
    </View>
  );
}

function MiniStat({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: number;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <Icon
        size={13}
        color={theme.primaryLight}
        strokeWidth={2.2}
      />

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  pressed: {
    opacity: 0.65,
  },

  title: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "700",
    color: theme.text,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  stat: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  value: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "700",
    color: theme.text,
  },

  label: {
    marginLeft: 3,
    fontSize: 11,
    color: theme.textMuted,
  },

  divider: {
    width: 1,
    height: 18,
    backgroundColor: theme.borderAccent,
  },
});