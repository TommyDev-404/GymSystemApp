import { View, Text, TouchableOpacity } from "react-native";
import { History, Zap } from "lucide-react-native";

export default function RecentSection({ recent, quick }: { recent: string[], quick?:string[]}) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: "700", marginBottom: 10 }}>
        Recent Searches
      </Text>

      {recent.map((item: string) => (
        <TouchableOpacity
          key={item}
          style={{ flexDirection: "row", paddingVertical: 10 }}
        >
          <History size={18} color="#6B7280" />
          <Text style={{ marginLeft: 10 }}>{item}</Text>
        </TouchableOpacity>
      ))}

      <Text style={{ fontWeight: "700", marginTop: 20 }}>
        Quick Actions
      </Text>

      {quick && quick.map((item: string) => (
        <TouchableOpacity
          key={item}
          style={{ flexDirection: "row", paddingVertical: 10 }}
        >
          <Zap size={18} color="#2563EB" />
          <Text style={{ marginLeft: 10 }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}