import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CreditCard,
  Dumbbell,
  BookOpen,
  ScanLine,
  Megaphone,
  ChartColumn,
  BotMessageSquare,
  Settings,
  ChevronRight,
} from "lucide-react-native";

export default function FeatureItem({ item, onPress }: any) {
  const ICONS: any = {
    dashboard: LayoutDashboard,
    members: Users,
    attendance: CalendarCheck,
    payments: CreditCard,
    workouts: Dumbbell,
    exercises: BookOpen,
    scanner: ScanLine,
    announcements: Megaphone,
    reports: ChartColumn,
    chatbot: BotMessageSquare,
    settings: Settings,
  };

  const Icon = ICONS[item.icon];

  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.iconBox}>
        <Icon size={22} color="#2563EB" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.sub}>{item.subtitle}</Text>
      </View>

      <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  title: {
    fontWeight: "600",
    fontSize: 15,
  },
  sub: {
    fontSize: 12,
    color: "#6B7280",
  },
});