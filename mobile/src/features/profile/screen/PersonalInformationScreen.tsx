import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StatusBar, StyleSheet } from "react-native";

import Header from "@/features/profile/components/personal-information/Header";
import ProfileCard from "@/features/profile/components/personal-information/ProfileCard";
import InfoItem from "@/features/profile/components/personal-information/InfoItem";
import ChangePhotoButton from "@/features/profile/components/personal-information/ChangePhotoButton";
import { EditInfoModal } from "../components/personal-information/EditInfoModal";
import { useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useAuth } from "@/context/AuthContext";

export default function PersonalInformationScreen() {
  const { member } = useAuth();
  const sheetRef = useRef<BottomSheetModal>(null);

  const [selectedField, setSelectedField] = useState("Username");
  const [value, setValue] = useState("");

  const openEdit = (field: string, currentValue: string) => {
    setSelectedField(field);
    setValue(currentValue);
    sheetRef.current?.present();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <ProfileCard
          username={member?.username!}
        />

        <InfoItem
          label="Username"
          value={member?.username ?? ""}
          onPress={() => openEdit("Username", member?.username ?? "")}
        />

        <InfoItem
          label="Email"
          value={member?.email ?? ""}
          onPress={() => openEdit("Email", member?.email ?? "")}
        />

        <ChangePhotoButton />
      </ScrollView>

      <EditInfoModal
        modalRef={sheetRef}
        title={`Edit ${selectedField}`}
        label={selectedField}
        initialValue={value}
        onClose={() => console.log("closed")}
        onSave={(newValue) => {
          console.log("Saved:", newValue);
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
});