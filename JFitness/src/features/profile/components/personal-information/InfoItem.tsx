import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function InfoItem({
  label,
  value,
  onPress,
}: any) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View>
        <Text style={styles.label}>
          {label}
        </Text>

        <Text style={styles.value}>
          {value}
        </Text>
      </View>

      <ChevronRight
        size={18}
        color="#94a3b8"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    
    borderWidth: 1,
    borderColor: "#e2e8f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    color: "#94a3b8",
    fontSize: 12,
    marginBottom: 4,
  },

  value: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "600",
  },
});