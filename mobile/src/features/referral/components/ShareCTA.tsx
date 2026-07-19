import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Share2, ChevronRight } from "lucide-react-native";

export default function ShareCTA() {
  return (
    <TouchableOpacity style={styles.btn}>
      <Share2 size={18} color="white" />
      <Text style={styles.text}>Invite a Friend</Text>
      <ChevronRight size={16} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#10b981",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: "white",
    fontWeight: "700",
  },
});