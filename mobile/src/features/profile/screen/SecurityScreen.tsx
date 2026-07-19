import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Header from "@/features/profile/components/security/Header";
import { EditInfoModal } from "../components/personal-information/EditInfoModal";
import { ChangePasswordModal } from "../components/security/ChangePassModal";

export default function SecurityScreen() {
  const sheetRef = useRef<BottomSheetModal>(null);

  const [newPassword, setNewPassword] = useState("");

  // mock last password update (replace with API later)
  const [lastChanged] = useState("June 20, 2026");

  const openChangePassword = () => {
    sheetRef.current?.present();
  };

  const handleSave = (value: string) => {
    setNewPassword(value);
    console.log("New password set:", value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.content}>
        {/* SECURITY CARD */}
        <View style={styles.card}>
          <Text style={styles.title}>Password Security</Text>

          <Text style={styles.subtitle}>
            Last password change: {lastChanged}
          </Text>

          <Pressable onPress={openChangePassword} style={styles.button}>
            <Text style={styles.buttonText}>Change Password</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* MODAL */}
      <ChangePasswordModal
        modalRef={sheetRef}
        title="Change Password"
         onClose={() => console.log("closed")}
         onSave={(data) => {
         console.log("Password data:", data);
      
         // 👉 here you call your API
         // await api.changePassword(data)
         }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  content: {
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748b",
  },

  button: {
    marginTop: 16,
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});