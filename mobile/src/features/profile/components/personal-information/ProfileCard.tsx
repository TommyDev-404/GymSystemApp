import { View, Text, Image, StyleSheet } from "react-native";

export default function ProfileCard({ username }: { username: string }) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: "https://i.pravatar.cc/200",
        }}
        style={styles.avatar}
      />

      <Text style={styles.name}>
        {username ?? ""}
      </Text>

      <Text style={styles.member}>
        Premium Member
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 18,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  name: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },

  member: {
    marginTop: 3,
    fontSize: 13,
    color: "#64748b",
  },
});