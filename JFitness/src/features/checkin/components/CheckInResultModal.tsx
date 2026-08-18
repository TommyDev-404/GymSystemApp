import React from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	Check,
	Info,
} from "lucide-react-native";
import { theme } from "@/utils/theme";

type CheckInResultModalProps = {
	visible: boolean;
	type: "success" | "info";
	title?: string;
	message?: string;
	dateText?: string;
	onClose: () => void;
};

export function CheckInResultModal({
	visible,
	type,
	title,
	message,
	dateText,
	onClose,
}: CheckInResultModalProps) {
	const isSuccess = type === "success";

	const displayTitle =
		title ??
		(isSuccess
			? "Check-in Successful"
			: "Already Checked In");

	const displayMessage = isSuccess
		? dateText ??
			new Date().toLocaleDateString("en-PH", {
				month: "short",
				day: "2-digit",
				year: "numeric",
			})
		: message ?? "";

	const accent = isSuccess ? theme.primaryLight : "#fbbf24";

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			statusBarTranslucent
			onRequestClose={onClose}
		>
			<View style={styles.overlay}>
				<View style={styles.modal}>
					<View
						style={[
							styles.iconContainer,
							{
								backgroundColor: isSuccess
									? theme.accentWash
									: "rgba(245,158,11,0.10)",
								borderColor: isSuccess
									? theme.borderAccent
									: "rgba(245,158,11,0.22)",
							},
						]}
					>
						{isSuccess ? (
							<Check
								size={30}
								color={accent}
								strokeWidth={2.8}
							/>
						) : (
							<Info
								size={30}
								color={accent}
								strokeWidth={2.2}
							/>
						)}
					</View>

					<Text style={styles.title}>
						{displayTitle}
					</Text>

					{displayMessage ? (
						<Text style={styles.message}>
							{displayMessage}
						</Text>
					) : null}

					<View style={styles.divider} />

					<Pressable
						onPress={onClose}
						style={({ pressed }) => [
							styles.button,
							{
								backgroundColor: isSuccess
									? theme.accentWash
									: "rgba(245,158,11,0.10)",
								borderColor: isSuccess
									? theme.borderAccent
									: "rgba(245,158,11,0.28)",
							},
							pressed && styles.buttonPressed,
						]}
					>
						<Text
							style={[
								styles.buttonText,
								{ color: accent },
							]}
						>
							{isSuccess ? "OK" : "OK, Got It"}
						</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.68)",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 24,
	},

	modal: {
		width: "100%",
		maxWidth: 380,
		backgroundColor: theme.card,
		borderRadius: 24,
		padding: 24,
		alignItems: "center",
		borderWidth: 1,
		borderColor: theme.borderStrong,
	},

	iconContainer: {
		width: 62,
		height: 62,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		marginBottom: 16,
	},

	title: {
		fontSize: 19,
		fontWeight: "800",
		color: theme.text,
		textAlign: "center",
		letterSpacing: -0.2,
	},

	message: {
		marginTop: 9,
		fontSize: 13,
		lineHeight: 20,
		color: theme.textSub,
		textAlign: "center",
		maxWidth: 300,
	},

	divider: {
		width: "100%",
		height: 1,
		backgroundColor: theme.border,
		marginTop: 20,
		marginBottom: 16,
	},

	button: {
		width: "100%",
		height: 46,
		borderRadius: 13,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
	},

	buttonPressed: {
		opacity: 0.7,
		transform: [{ scale: 0.98 }],
	},

	buttonText: {
		fontSize: 13,
		fontWeight: "800",
	},
});