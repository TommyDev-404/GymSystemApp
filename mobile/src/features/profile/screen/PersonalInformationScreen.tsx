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
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { useUpdateProfileImage } from "../hook/useProfile";
import Toast from "react-native-toast-message";

export default function PersonalInformationScreen() {
  const { member, setMember } = useAuth();
  const { mutate: updateProfile, isPending } = useUpdateProfileImage();

  const sheetRef = useRef<BottomSheetModal>(null);

  const [selectedField, setSelectedField] = useState("Username");
  const [value, setValue] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(member?.profile ?? null);

  const openEdit = (field: string, currentValue: string) => {
    setSelectedField(field);
    setValue(currentValue);
    sheetRef.current?.present();
  };

  const handleChangePhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Please allow access to your photos to change your profile picture."
      );
  
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
  
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      setProfileImage(imageUri);
  
      console.log("Selected image:", imageUri);
  
      const formData = new FormData();
  
      formData.append("image", {
        uri: imageUri,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);
  
      updateProfile({
        userId: member?.id!,
        formData,
      },
      {
        onSuccess: (data) => {
          setMember({
            ...member!,
            profile: data.image,
          });

          Toast.show({
            type: "success",
            text1: "Profile Updated",
            text2: data.message
          });
        },

        onError: (error) => {
          Toast.show({
            type: "error",
            text1: "Update Failed",
            text2: error.message,
          });
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <ProfileCard
          username={member?.username!}
          image={profileImage ?? ""}
          uploading={isPending}
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

        <ChangePhotoButton
          onPress={handleChangePhoto}
        />
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