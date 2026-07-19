import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";

import Header from "@/features/profile/components/personal-information/Header";
import ProfileCard from "@/features/profile/components/personal-information/ProfileCard";
import InfoItem from "@/features/profile/components/personal-information/InfoItem";
import ChangePhotoButton from "@/features/profile/components/personal-information/ChangePhotoButton";
import { EditInfoModal } from "../components/personal-information/EditInfoModal";
import { useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function PersonalInformationScreen() {
  const sheetRef = useRef<BottomSheetModal>(null);

  const [selectedField, setSelectedField] = useState("Username");
  const [value, setValue] = useState("JohnDoe");

  const openEdit = (field: string, currentValue: string) => {
    setSelectedField(field);
    setValue(currentValue);
    sheetRef.current?.present();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <ProfileCard />

        <InfoItem
          label="Username"
          value="JohnDoe"
          onPress={() => openEdit("Username", "JohnDoe")}
        />

        <InfoItem
          label="Email"
          value="john@email.com"
          onPress={() => openEdit("Email", "john@email.com")}
        />

        <InfoItem
          label="Phone Number"
          value="09123456789"
          onPress={() => openEdit("Phone Number", "09123456789")}
        />

        <InfoItem
          label="Address"
          value="Quezon City"
          onPress={() => openEdit("Address", "Quezon City")}
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