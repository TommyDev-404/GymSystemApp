import { Pressable, Text, StyleSheet } from "react-native";
import { Camera } from "lucide-react-native";

export default function ChangePhotoButton({
  onPress,
}: {
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
    >
      <Camera size={18} color="#fff" />

      <Text style={styles.text}>
        Change Profile Photo
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    backgroundColor: "#10b981",
    borderRadius: 16,

    paddingVertical: 14,
    paddingHorizontal: 18,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  pressed: {
    opacity: 0.7,
  },

  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});