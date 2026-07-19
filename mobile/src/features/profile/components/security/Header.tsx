import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => router.back()}
      >
        <ArrowLeft
          size={18}
          color="#334155"
        />
      </TouchableOpacity>

      <View>
        <Text style={styles.title}>
          Security
        </Text>

        <Text style={styles.subtitle}>
          Secure your account
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  back: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },

  subtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
});