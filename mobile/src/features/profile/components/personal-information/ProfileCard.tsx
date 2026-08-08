import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function ProfileCard({
  username,
  image,
  uploading,
}: {
  username: string;
  image?: string;
  uploading: boolean;
}) {

  const initials = username
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();


  return (
    <View style={styles.card}>

      <View style={styles.avatarContainer}>

        {image ? (
          <Image
            source={{
              uri: image,
            }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.fallbackAvatar}>
            <Text style={styles.initials}>
              {initials || "U"}
            </Text>
          </View>
        )}

        {uploading && (
          <View style={styles.loader}>
            <ActivityIndicator
              size="small"
              color="#10b981"
            />
          </View>
        )}

      </View>


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
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },


  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },


  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 45,
  },


  fallbackAvatar: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ecfdf5",
    justifyContent: "center",
    alignItems: "center",
  },


  initials: {
    fontSize: 24,
    fontWeight: "700",
    color: "#10b981",
  },


  loader: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
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