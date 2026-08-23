import { View, Text, StyleSheet } from "react-native";
import {
  FileText,
  Heart,
  MessageCircle,
} from "lucide-react-native";
import { theme } from "@/utils/theme";

interface YourPostsHeaderProps {
  stats: {
    totalPosts: number;
    totalLikes: number;
    totalComments: number;
  };
}

export function YourPostsHeader({ stats }: YourPostsHeaderProps) {
  return (
    <View style={styles.container}>
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
  icon: typeof FileText;
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
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