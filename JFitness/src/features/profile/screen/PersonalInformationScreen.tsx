import { useRef, useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import { useAuth } from "@/context/AuthContext";
import { AppBackground } from "@/components/shared/AppBackground";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { theme } from "@/utils/theme";

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

		formData.append("image", {
			uri: imageUri,
			name: "profile.jpg",
			type: "image/jpeg",
		} as any);

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

	return (
		<AppBackground>
			<SafeAreaView style={styles.container}>
				<ScreenHeader
					title="Personal Information"
					subtitle="Manage your profile and account details"
				/>

				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.content}
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
								openEdit(
									"Username",
									member?.username ?? ""
								)
							}
						/>

						<InfoItem
							label="Email"
							value={member?.email ?? ""}
							onPress={() =>
								openEdit(
									"Email",
									member?.email ?? ""
								)
							}
						/>
					</View>

					<View style={styles.photoSection}>
						<ChangePhotoButton
							onPress={handleChangePhoto}
						/>
					</View>
				</ScrollView>

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
			</SafeAreaView>
		</AppBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	content: {
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 30,
	},

	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},

	sectionIcon: {
		width: 34,
		height: 34,
		borderRadius: 11,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
		backgroundColor: "rgba(16,185,129,0.08)",
		borderWidth: 1,
		borderColor: theme.borderAccent,
	},

	sectionTitle: {
		fontSize: 14,
		fontWeight: "800",
		color: theme.text,
		letterSpacing: -0.1,
	},

	sectionSubtitle: {
		marginTop: 2,
		fontSize: 10,
		fontWeight: "500",
		color: theme.textMuted,
	},

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