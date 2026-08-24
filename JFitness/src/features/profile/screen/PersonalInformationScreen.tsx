import { useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";
import { StackWrapper } from "@/components/shared/StackWrapper";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import ProfileCard from "@/features/profile/components/personal-information/ProfileCard";
import InfoItem from "@/features/profile/components/personal-information/InfoItem";
import ChangePhotoButton from "@/features/profile/components/personal-information/ChangePhotoButton";
import { EditInfoModal } from "../components/personal-information/EditInfoModal";
import { useUpdateProfileImage } from "../hook/useProfile";

export default function PersonalInformationScreen() {
  const { member, setMember } = useAuth();
  const { mutate: updateProfile, isPending } = useUpdateProfileImage();
  const sheetRef = useRef<BottomSheetModal>(null);
  const [selectedField, setSelectedField] = useState("Username");
  const [value, setValue] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(
    member?.profile ?? null
  );

  const openEdit = (field: string, currentValue: string) => {
    setSelectedField(field);
    setValue(currentValue);
    sheetRef.current?.present();
  };

  const handleChangePhoto = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

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

    if (result.canceled) return;

    const imageUri = result.assets[0].uri;
    setProfileImage(imageUri);

    const formData = new FormData();

    formData.append(
      "image",
      {
        uri: imageUri,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any
    );

    updateProfile(
      {
        userId: member?.id!,
        formData,
      },
      {
        onSuccess: (data) => {
          setMember({
            ...member!,
            profile: data.image,
          });

          setProfileImage(data.image);

          Toast.show({
            type: "success",
            text1: "Profile Updated",
            text2: data.message,
          });
        },
        onError: (error) => {
          setProfileImage(member?.profile ?? null);

          Toast.show({
            type: "error",
            text1: "Update Failed",
            text2: error.message,
          });
        },
      }
    );
  };

  const header = (
    <ScreenHeader
      title="Personal Information"
      subtitle="Manage your profile and account details"
    />
  );

  return (
    <StackWrapper
      title="Personal Information"
      showDefaultHeader={false}
      headerContent={header}
      horizontalPadding={20}
      paddingTop={10}
      paddingBottom={30}
      gap={0}
    >
      <View style={styles.profileCardWrapper}>
        <ProfileCard
          username={member?.username ?? ""}
          image={profileImage ?? ""}
          uploading={isPending}
        />
      </View>

      <View style={styles.infoSection}>
        <InfoItem
          label="Username"
          value={member?.username ?? ""}
          onPress={() =>
            openEdit("Username", member?.username ?? "")
          }
        />

        <InfoItem
          label="Email"
          value={member?.email ?? ""}
          onPress={() =>
            openEdit("Email", member?.email ?? "")
          }
        />
      </View>

      <View style={styles.photoSection}>
        <ChangePhotoButton onPress={handleChangePhoto} />
      </View>

      <EditInfoModal
        modalRef={sheetRef}
        title={`Edit ${selectedField}`}
        label={selectedField}
        initialValue={value}
        onClose={() => {}}
        onSave={(newValue) => {
          console.log("Saved:", newValue);
        }}
      />
    </StackWrapper>
  );
}

const styles = StyleSheet.create({
  profileCardWrapper: {
    marginBottom: 18,
  },
  infoSection: {
    gap: 10,
  },
  photoSection: {
    marginTop: 18,
  },
});