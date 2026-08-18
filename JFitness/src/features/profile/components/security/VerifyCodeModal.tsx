import React, { useEffect, useRef, useState } from "react";
import {
	Modal,
	View,
	Text,
	TextInput,
	Pressable,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { X, ShieldCheck } from "lucide-react-native";
import {
	resetPasswordApi,
	sendOtpApi,
	verifyOtpApi,
} from "@/features/auth/api/auth.api";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/utils/theme";

type VerifyCodeModalProps = {
	email: string;
	password: string;
	visible: boolean;
	onClose: () => void;
};

export default function VerifyCodeModal({
	email,
	password,
	visible,
	onClose,
}: VerifyCodeModalProps) {
	const { member, setMember } = useAuth();

	const [code, setCode] = useState("");
	const [timer, setTimer] = useState(30);
	const [isVerifying, setIsVerifying] = useState(false);
	const [isResending, setIsResending] = useState(false);

	const inputRef = useRef<TextInput>(null);

	const busy = isVerifying || isResending;

	useEffect(() => {
		if (!visible) {
			setCode("");
			setTimer(30);
			setIsVerifying(false);
			setIsResending(false);
			return;
		}

		const timeout = setTimeout(() => {
			inputRef.current?.focus();
		}, 300);

		return () => clearTimeout(timeout);
	}, [visible]);

	useEffect(() => {
		if (!visible || timer <= 0) return;

		const interval = setInterval(() => {
			setTimer((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [visible, timer]);

	const handleChange = (value: string) => {
		const numericValue = value.replace(/[^0-9]/g, "");

		if (numericValue.length <= 6) {
			setCode(numericValue);
		}
	};

	const handleVerify = async () => {
		if (code.length !== 6 || busy) return;

		try {
			setIsVerifying(true);

			const otpResponse = await verifyOtpApi({
				email,
				code,
			});

			if (!otpResponse.success) {
				Toast.show({
					type: "error",
					text1: "Invalid code",
					text2: "The verification code is incorrect or expired.",
				});
				return;
			}

			const resetResponse = await resetPasswordApi({
				email,
				newPassword: password,
			});

			if (!resetResponse.success) {
				Toast.show({
					type: "error",
					text1: "Password update failed",
					text2: "Unable to update your password. Please try again.",
				});
				return;
			}

			Toast.show({
				type: "success",
				text1: "Password updated",
				text2: "Your password has been changed successfully.",
			});

			setMember({
				...member!,
				pass_last_changed: resetResponse.data.updated_at,
			});

			setCode("");
			onClose();
		} catch (error) {
			console.error("Password reset error:", error);

			Toast.show({
				type: "error",
				text1: "Something went wrong",
				text2: "Please try again.",
			});
		} finally {
			setIsVerifying(false);
		}
	};

	const handleResend = async () => {
		if (timer > 0 || busy) return;

		try {
			setIsResending(true);

			await sendOtpApi(email);

			setCode("");
			setTimer(30);

			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		} catch (error) {
			console.error("Resend OTP error:", error);

			Toast.show({
				type: "error",
				text1: "Unable to resend code",
				text2: "Please try again.",
			});
		} finally {
			setIsResending(false);
		}
	};

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			statusBarTranslucent
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				style={styles.overlay}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<View style={styles.modal}>
					<Pressable
						onPress={onClose}
						style={styles.closeButton}
						hitSlop={10}
						disabled={busy}
					>
						<X
							size={19}
							color={theme.textSub}
							strokeWidth={2}
						/>
					</Pressable>

					<View style={styles.iconContainer}>
						<ShieldCheck
							size={25}
							color={theme.primaryLight}
							strokeWidth={2}
						/>
					</View>

					<Text style={styles.title}>
						Verify your identity
					</Text>

					<Text style={styles.description}>
						Enter the 6-digit verification code sent to your
						email to continue changing your password.
					</Text>

					<TextInput
						ref={inputRef}
						value={code}
						onChangeText={handleChange}
						keyboardType="number-pad"
						maxLength={6}
						autoComplete="one-time-code"
						textContentType="oneTimeCode"
						style={styles.hiddenInput}
						autoFocus={false}
					/>

					<Pressable
						style={styles.codeContainer}
						onPress={() => inputRef.current?.focus()}
						disabled={busy}
					>
						{Array.from({ length: 6 }).map((_, index) => {
							const digit = code[index];
							const isActive = index === code.length;

							return (
								<View
									key={index}
									style={[
										styles.codeBox,
										isActive && styles.codeBoxActive,
									]}
								>
									<Text style={styles.codeText}>
										{digit || ""}
									</Text>
								</View>
							);
						})}
					</Pressable>

					<Pressable
						onPress={handleVerify}
						disabled={code.length !== 6 || busy}
						style={[
							styles.verifyButton,
							(code.length !== 6 || busy) &&
								styles.verifyButtonDisabled,
						]}
					>
						<Text style={styles.verifyText}>
							{isVerifying ? "Verifying..." : "Verify code"}
						</Text>
					</Pressable>

					<View style={styles.resendContainer}>
						<Text style={styles.resendLabel}>
							Didn't receive the code?
						</Text>

						<Pressable
							onPress={handleResend}
							disabled={timer > 0 || busy}
						>
							<Text
								style={[
									styles.resendButton,
									(timer > 0 || busy) &&
										styles.resendButtonDisabled,
								]}
							>
								{isResending
									? "Sending..."
									: timer > 0
										? `Resend in ${timer}s`
										: "Resend code"}
							</Text>
						</Pressable>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.72)",
		alignItems: "center",
		justifyContent: "center",
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
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.35,
		shadowRadius: 20,
		elevation: 8,
	},

	closeButton: {
		position: "absolute",
		right: 14,
		top: 14,
		width: 34,
		height: 34,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.surface,
		borderWidth: 1,
		borderColor: theme.border,
	},

	iconContainer: {
		width: 54,
		height: 54,
		borderRadius: 16,
		backgroundColor: theme.accentWash,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 4,
		marginBottom: 14,
		borderWidth: 1,
		borderColor: theme.borderAccent,
	},

	title: {
		fontSize: 20,
		fontWeight: "800",
		color: theme.text,
		marginBottom: 8,
		letterSpacing: -0.4,
	},

	description: {
		fontSize: 12,
		lineHeight: 18,
		color: theme.textSub,
		textAlign: "center",
		maxWidth: 310,
	},

	hiddenInput: {
		position: "absolute",
		opacity: 0,
		width: 1,
		height: 1,
	},

	codeContainer: {
		flexDirection: "row",
		gap: 7,
		marginTop: 24,
		marginBottom: 22,
	},

	codeBox: {
		width: 43,
		height: 50,
		borderWidth: 1,
		borderColor: theme.borderStrong,
		borderRadius: 11,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.surface,
	},

	codeBoxActive: {
		borderColor: theme.primary,
		backgroundColor: theme.card,
		borderWidth: 1.5,
		shadowColor: theme.primary,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.2,
		shadowRadius: 5,
	},

	codeText: {
		fontSize: 20,
		fontWeight: "800",
		color: theme.text,
	},

	verifyButton: {
		width: "100%",
		height: 48,
		borderRadius: 12,
		backgroundColor: theme.primary,
		alignItems: "center",
		justifyContent: "center",
	},

	verifyButtonDisabled: {
		backgroundColor: theme.primaryDark,
		opacity: 0.5,
	},

	verifyText: {
		color: "#ffffff",
		fontSize: 14,
		fontWeight: "800",
	},

	resendContainer: {
		marginTop: 18,
		alignItems: "center",
	},

	resendLabel: {
		fontSize: 12,
		color: theme.textMuted,
		marginBottom: 5,
	},

	resendButton: {
		fontSize: 13,
		fontWeight: "800",
		color: theme.primaryLight,
	},

	resendButtonDisabled: {
		color: theme.textMuted,
	},
});