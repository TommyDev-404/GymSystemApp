import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Camera } from "lucide-react-native";

export default function ChangePhotoButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Camera
        size={18}
        color="#fff"
      />

      <Text style={styles.text}>
        Change Profile Picture
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    backgroundColor: "#10b981",
    borderRadius: 16,
    paddingVertical: 15,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});