import { SafeAreaView } from "react-native-safe-area-context";
import {
	ScrollView,
	StyleSheet,
	View,
	Text,
	Pressable,
} from "react-native";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ShieldCheck, LockKeyhole } from "lucide-react-native";

import { ChangePasswordModal } from "../components/security/ChangePassModal";
import { useAuth } from "@/context/AuthContext";
import { AppBackground } from "@/components/shared/AppBackground";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { theme } from "@/utils/theme";

export default function SecurityScreen() {
	const { member } = useAuth();
	const sheetRef = useRef<BottomSheetModal>(null);

	const lastChanged = member?.pass_last_changed
		? new Date(member.pass_last_changed).toLocaleDateString(
				"en-PH",
				{
					month: "short",
					day: "2-digit",
					year: "numeric",
				}
		  )
		: "Not available";

	const openChangePassword = () => {
		sheetRef.current?.present();
	};

	return (
		<AppBackground>
			<SafeAreaView style={styles.container}>
				<ScreenHeader
					title="Security"
					subtitle="Manage your account security"
				/>

				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.content}
				>
					<View style={styles.card}>
						<View style={styles.sectionHeader}>
							<View style={styles.sectionIcon}>
								<ShieldCheck
									size={17}
									color={theme.primaryLight}
									strokeWidth={2.2}
								/>
							</View>

							<View style={styles.headerText}>
								<Text style={styles.title}>
									Password Security
								</Text>

								<Text style={styles.subtitle}>
									Keep your account protected with a
									secure password
								</Text>
							</View>
						</View>

						<View style={styles.divider} />

						<View style={styles.passwordInfo}>
							<View style={styles.passwordIcon}>
								<LockKeyhole
									size={16}
									color={theme.textSub}
									strokeWidth={2}
								/>
							</View>

							<View style={styles.passwordDetails}>
								<Text style={styles.infoLabel}>
									Last password change
								</Text>

								<Text style={styles.infoValue}>
									{lastChanged}
								</Text>
							</View>
						</View>

						<Pressable
							onPress={openChangePassword}
							style={({ pressed }) => [
								styles.button,
								pressed && styles.pressed,
							]}
						>
							<LockKeyhole
								size={16}
								color={theme.primaryLight}
								strokeWidth={2.2}
							/>

							<Text style={styles.buttonText}>
								Change Password
							</Text>
						</Pressable>
					</View>

					<View style={styles.securityNote}>
						<ShieldCheck
							size={15}
							color={theme.primaryLight}
							strokeWidth={2}
						/>

						<Text style={styles.noteText}>
							Use a strong password that you don't use
							for other accounts.
						</Text>
					</View>
				</ScrollView>

				<ChangePasswordModal
					modalRef={sheetRef}
					title="Change Password"
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

	card: {
		backgroundColor: theme.card,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: theme.borderAccent,
		padding: 18,
	},

	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
	},

	sectionIcon: {
		width: 38,
		height: 38,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 11,
		backgroundColor: theme.accentWash,
		borderWidth: 1,
		borderColor: theme.borderAccent,
	},

	headerText: {
		flex: 1,
	},

	title: {
		fontSize: 15,
		fontWeight: "800",
		color: theme.text,
		letterSpacing: -0.2,
	},

	subtitle: {
		marginTop: 3,
		fontSize: 10,
		lineHeight: 15,
		fontWeight: "500",
		color: theme.textMuted,
	},

	divider: {
		height: 1,
		backgroundColor: theme.border,
		marginVertical: 18,
	},

	passwordInfo: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 13,
		backgroundColor: theme.surface,
		borderWidth: 1,
		borderColor: theme.border,
	},

	passwordIcon: {
		width: 34,
		height: 34,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
		backgroundColor: theme.card,
		borderWidth: 1,
		borderColor: theme.border,
	},

	passwordDetails: {
		flex: 1,
	},

	infoLabel: {
		fontSize: 10,
		fontWeight: "600",
		color: theme.textMuted,
	},

	infoValue: {
		marginTop: 3,
		fontSize: 13,
		fontWeight: "700",
		color: theme.text,
	},

	button: {
		marginTop: 14,
		minHeight: 46,
		borderRadius: 13,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: theme.accentWash,
		borderWidth: 1,
		borderColor: theme.borderAccent,
	},

	buttonText: {
		fontSize: 12,
		fontWeight: "800",
		color: theme.primaryLight,
	},

	pressed: {
		opacity: 0.65,
		transform: [{ scale: 0.98 }],
	},

	securityNote: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginTop: 14,
		paddingHorizontal: 4,
		gap: 8,
	},

	noteText: {
		flex: 1,
		fontSize: 10,
		lineHeight: 15,
		color: theme.textMuted,
	},
});