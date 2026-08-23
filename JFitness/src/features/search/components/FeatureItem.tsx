import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import {
  Activity,
  Award,
  BotMessageSquare,
  CalendarCheck,
  ChartNoAxesColumn,
  ChevronRight,
  Clock3,
  CreditCard,
  Dumbbell,
  FileText,
  Info,
  LockKeyhole,
  QrCode,
  ScanLine,
  Share2,
  ShieldCheck,
  User,
  Users,
} from "lucide-react-native";
import { theme } from "@/utils/theme";

interface FeatureItemData {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  keywords: string[];
}

interface Props {
  item: FeatureItemData;
  onPress: () => void;
}

const ICONS: Record<string, React.ComponentType<any>> = {
  progress: Activity,
  referral: Users,
  rewards: Award,
  tutorials: Dumbbell,
  attendance: CalendarCheck,
  payments: CreditCard,
  "workout-history": FileText,
  "my-posts": FileText,
  scanner: ScanLine,
  post: Share2,
  timer: Clock3,
  "ai-buddy": BotMessageSquare,
  "personal-info": User,
  security: ShieldCheck,
  about: Info,
};

export default function FeatureItem({
  item,
  onPress,
}: Props) {
  const Icon = ICONS[item.icon] ?? Activity;

  return (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.iconBox}>
        <Icon
          size={21}
          color={theme.primaryLight}
          strokeWidth={2}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.sub}>
          {item.subtitle}
        </Text>
      </View>

      <ChevronRight
        size={19}
        color={theme.textMuted}
        strokeWidth={2}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
  },
  sub: {
    marginTop: 3,
    fontSize: 10.5,
    fontWeight: "500",
    color: theme.textMuted,
  },
});