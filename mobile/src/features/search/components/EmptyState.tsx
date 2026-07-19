import { View, Text } from "react-native";
import { Search } from "lucide-react-native";

interface Props {
  hint?: string;
  title?: string;
}

export default function EmptyState({
  title = "No matching result found",
  hint,
}: Props) {
  return (
    <View style={{ alignItems: "center", marginTop: 80 }}>
      <Search size={50} color="#9CA3AF" />

      <Text style={{ marginTop: 10, fontWeight: "700" }}>
        {title}
      </Text>

      {hint ? (
        <Text style={{ textAlign: "center", color: "#9CA3AF", marginTop: 4 }}>
          Try searching: {hint}
        </Text>
      ) : null}
    </View>
  );
}