import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function Header({ onBack }: any) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.btn}>
        <ArrowLeft size={20} color="#334155" />
      </TouchableOpacity>

      <View>
        <Text style={styles.title}>Referral Program</Text>
        <Text style={styles.sub}>Invite friends. Earn rewards together.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
  },
  btn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  sub: {
    fontSize: 12,
    color: "#64748b",
  },
});