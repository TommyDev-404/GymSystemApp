import { useState, useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { ProfileSidebar } from "@/features/profile/screen/ProfileSidebar";

export default function ProfilePage() {
  const [visible, setVisible] = useState(true);

  const handleClose = () => setVisible(false);
  const handleClosed = () => router.back();

  return (
    <View style={{ flex: 1 }}>
      <ProfileSidebar
        visible={visible}
        onRequestClose={handleClose}
        onClosed={handleClosed}
      />
    </View>
  );
}