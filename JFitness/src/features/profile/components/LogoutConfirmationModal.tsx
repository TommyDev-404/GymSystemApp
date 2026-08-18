import {
	ActivityIndicator,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { LogOut } from "lucide-react-native";
import { theme } from "@/utils/theme";

interface Props {
	visible: boolean;
	onCancel: () => void;
	onConfirm: () => void;
	loading: boolean;
}

export function LogoutConfirmationModal({
	visible,
	onCancel,
	onConfirm,
	loading,
}: Props) {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			statusBarTranslucent
			onRequestClose={loading ? undefined : onCancel}
		>
			<View style={styles.overlay}>
				<View style={styles.modal}>
					{/* ICON */}
					<View style={styles.iconContainer}>
						<LogOut
							size={26}
							color={theme.errorText}
							strokeWidth={2.2}
						/>
					</View>

					{/* TITLE */}
					<Text style={styles.title}>
						{loading ? "Logging out..." : "Log out?"}
					</Text>

					{/* DESCRIPTION */}
					<Text style={styles.description}>
						{loading
							? "Please wait while we securely sign you out."
							: "Are you sure you want to log out? You'll need to sign in again to access your account."}
					</Text>

					{/* ACTIONS */}
					<View style={styles.actions}>
						<Pressable
							onPress={onCancel}
							disabled={loading}
							style={({ pressed }) => [
								styles.cancelButton,
								loading && styles.disabledButton,
								pressed && !loading && styles.pressed,
							]}
						>
							<Text style={styles.cancelText}>
								Cancel
							</Text>
						</Pressable>

						<Pressable
							onPress={onConfirm}
							disabled={loading}
							style={({ pressed }) => [
								styles.logoutButton,
								loading && styles.logoutButtonLoading,
								pressed && !loading && styles.logoutPressed,
							]}
						>
							{loading ? (
								<>
									<ActivityIndicator
										size="small"
										color="#fff"
									/>

									<Text style={styles.logoutText}>
										Logging out...
									</Text>
								</>
							) : (
								<>
									<LogOut
										size={16}
										color="#fff"
										strokeWidth={2.2}
									/>

									<Text style={styles.logoutText}>
										Logout
									</Text>
								</>
							)}
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.65)",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},

	modal: {
		width: "100%",
		maxWidth: 380,
		backgroundColor: theme.card,
		borderRadius: 22,
		padding: 24,
		alignItems: "center",

		borderWidth: 1,
		borderColor: theme.borderStrong,
	},

	iconContainer: {
		width: 58,
		height: 58,
		borderRadius: 18,

		alignItems: "center",
		justifyContent: "center",

		backgroundColor: theme.errorBg,
		borderWidth: 1,
		borderColor: theme.errorBorder,

		marginBottom: 16,
	},

	title: {
		fontSize: 19,
		fontWeight: "800",
		color: theme.text,
		letterSpacing: -0.3,
	},

	description: {
		marginTop: 8,
		maxWidth: 300,

		fontSize: 12,
		lineHeight: 19,
		fontWeight: "500",

		color: theme.textSub,
		textAlign: "center",
	},

	actions: {
		width: "100%",
		flexDirection: "row",
		gap: 10,
		marginTop: 24,
	},

	cancelButton: {
		flex: 1,

		minHeight: 46,
		paddingHorizontal: 14,

		borderRadius: 12,

		alignItems: "center",
		justifyContent: "center",

		backgroundColor: theme.surface,
		borderWidth: 1,
		borderColor: theme.borderStrong,
	},

	cancelText: {
		fontSize: 13,
		fontWeight: "700",
		color: theme.textSub,
	},

	logoutButton: {
		flex: 1,

		minHeight: 46,
		paddingHorizontal: 14,

		borderRadius: 12,

		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",

		gap: 7,

		backgroundColor: "#dc2626",
	},

	logoutButtonLoading: {
		opacity: 0.8,
	},

	logoutText: {
		fontSize: 13,
		fontWeight: "700",
		color: "#ffffff",
	},

	disabledButton: {
		opacity: 0.45,
	},

	pressed: {
		opacity: 0.7,
	},

	logoutPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
});