import React, {
	useMemo,
	useState,
	useCallback,
	useEffect,
} from "react";
import {
	View,
	Text,
	Pressable,
	StyleSheet,
	Keyboard,
	ActivityIndicator,
} from "react-native";
import {
	BottomSheetModal,
	BottomSheetScrollView,
	BottomSheetBackdrop,
	BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import {
	Check,
	LockKeyhole,
	ShieldCheck,
} from "lucide-react-native";
import VerifyCodeModal from "./VerifyCodeModal";
import { sendOtpApi } from "@/features/auth/api/auth.api";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/utils/theme";
import { useGetProfileInfo } from "../../hook/useProfile";

interface Props {
	modalRef: React.RefObject<BottomSheetModal | null>;
	title: string;
}

export function ChangePasswordModal({
	modalRef,
	title,
}: Props) {
	const { memberIDs } = useAuth();
	const { data: profileInfo, isLoading: profileLoading, } = useGetProfileInfo(memberIDs?.user_id!);

	const snapPoints = useMemo(() => ["62%"], []);

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showCodeModal, setShowCodeModal] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [passwordError, setPasswordError] = useState("");
	const [isSendingCode, setIsSendingCode] = useState(false);

	useEffect(() => {
		const sub = Keyboard.addListener("keyboardDidHide", () => {
			modalRef.current?.snapToIndex(0);
		});

		return () => sub.remove();
	}, [modalRef]);

	const close = useCallback(() => {
		modalRef.current?.dismiss();
	}, [modalRef]);

	const renderBackdrop = useCallback((props: any) => {
		return (
			<BottomSheetBackdrop
				{...props}
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				opacity={0.65}
			/>
		);
	}, []);

	const save = useCallback(async () => {
		if (isSendingCode) return;

		setPasswordError("");

		if (!newPassword || !confirmPassword) {
			setPasswordError(
				"Please enter and confirm your new password."
			);
			return;
		}

		if (newPassword.length < 8) {
			setPasswordError(
				"Password must be at least 8 characters."
			);
			return;
		}

		if (newPassword !== confirmPassword) {
			setPasswordError("Passwords do not match.");
			return;
		}

		if (!profileInfo?.email) {
			setPasswordError(
				"Your email address could not be found."
			);
			return;
		}

		try {
			setIsSendingCode(true);

			const res = await sendOtpApi(profileInfo.email);

			if (!res.success) {
				setPasswordError(
					"Unable to send the verification code. Please try again."
				);
				return;
			}

			setShowCodeModal(true);
			close();
		} catch (error) {
			console.error("Send OTP error:", error);

			setPasswordError(
				"Something went wrong while sending the verification code."
			);
		} finally {
			setIsSendingCode(false);
		}
	}, [
		newPassword,
		confirmPassword,
		profileInfo?.email,
		isSendingCode,
		close,
	]);

	return (
		<>
			<BottomSheetModal
				ref={modalRef}
				snapPoints={snapPoints}
				backdropComponent={renderBackdrop}
				enablePanDownToClose
				keyboardBehavior="extend"
				backgroundStyle={styles.sheet}
				handleIndicatorStyle={styles.handle}
			>
				<BottomSheetScrollView
					contentContainerStyle={styles.container}
					keyboardShouldPersistTaps="handled"
				>
					<View style={styles.header}>
						<View style={styles.iconBox}>
							<LockKeyhole
								size={17}
								color={theme.primaryLight}
								strokeWidth={2.2}
							/>
						</View>

						<View style={styles.headerText}>
							<Text style={styles.title}>
								{title}
							</Text>

							<Text style={styles.subtitle}>
								Update your password to keep your account secure
							</Text>
						</View>
					</View>

					<View style={styles.securityNotice}>
						<ShieldCheck
							size={15}
							color={theme.primaryLight}
							strokeWidth={2}
						/>

						<Text style={styles.noticeText}>
							You'll need to verify your email before the
							password can be changed.
						</Text>
					</View>

					<View style={styles.inputSection}>
						<Text style={styles.label}>
							New Password
						</Text>

						<BottomSheetTextInput
							value={newPassword}
							onChangeText={(value) => {
								setNewPassword(value);

								if (passwordError) {
									setPasswordError("");
								}
							}}
							placeholder="Enter new password"
							placeholderTextColor={theme.textMuted}
							secureTextEntry={!showPassword}
							style={[
								styles.input,
								passwordError && styles.inputError,
							]}
							editable={!isSendingCode}
						/>

						<Text style={styles.helperText}>
							Use at least 8 characters.
						</Text>
					</View>

					<View style={styles.inputSection}>
						<Text style={styles.label}>
							Confirm Password
						</Text>

						<BottomSheetTextInput
							value={confirmPassword}
							onChangeText={(value) => {
								setConfirmPassword(value);

								if (passwordError) {
									setPasswordError("");
								}
							}}
							placeholder="Confirm new password"
							placeholderTextColor={theme.textMuted}
							secureTextEntry={!showPassword}
							style={[
								styles.input,
								passwordError && styles.inputError,
							]}
							editable={!isSendingCode}
						/>
					</View>

					{passwordError ? (
						<View style={styles.errorBox}>
							<Text style={styles.errorText}>
								{passwordError}
							</Text>
						</View>
					) : null}

					<Pressable
						onPress={() =>
							setShowPassword((prev) => !prev)
						}
						style={styles.checkboxRow}
						disabled={isSendingCode}
					>
						<View
							style={[
								styles.checkbox,
								showPassword &&
									styles.checkboxActive,
							]}
						>
							{showPassword && (
								<Check
									size={13}
									color={theme.bg}
									strokeWidth={3}
								/>
							)}
						</View>

						<Text style={styles.checkboxText}>
							Show Password
						</Text>
					</Pressable>

					<View style={styles.actions}>
						<Pressable
							onPress={close}
							style={({ pressed }) => [
								styles.cancelBtn,
								pressed && styles.pressed,
							]}
							disabled={isSendingCode}
						>
							<Text style={styles.cancelText}>
								Cancel
							</Text>
						</Pressable>

						<Pressable
							onPress={save}
							style={({ pressed }) => [
								styles.saveBtn,
								isSendingCode &&
									styles.saveBtnLoading,
								pressed && styles.pressed,
							]}
							disabled={isSendingCode}
						>
							{isSendingCode ? (
								<View style={styles.loadingContent}>
									<ActivityIndicator
										size="small"
										color={theme.bg}
									/>

									<Text style={styles.saveText}>
										Sending...
									</Text>
								</View>
							) : (
								<Text style={styles.saveText}>
									Continue
								</Text>
							)}
						</Pressable>
					</View>
				</BottomSheetScrollView>
			</BottomSheetModal>

			<VerifyCodeModal
				email={profileInfo?.email!}
				password={newPassword}
				visible={showCodeModal}
				onClose={() => setShowCodeModal(false)}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	sheet: {
		backgroundColor: theme.card,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		borderWidth: 1,
		borderColor: theme.borderStrong,
	},

	handle: {
		width: 38,
		height: 4,
		borderRadius: 4,
		backgroundColor: theme.borderStrong,
	},

	container: {
		paddingHorizontal: 20,
		paddingTop: 8,
		paddingBottom: 30,
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 18,
		borderBottomWidth: 1,
		borderBottomColor: theme.border,
	},

	iconBox: {
		width: 40,
		height: 40,
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
		fontSize: 16,
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

	securityNotice: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginTop: 16,
		padding: 11,
		borderRadius: 12,
		backgroundColor: theme.accentWash,
		borderWidth: 1,
		borderColor: theme.borderAccent,
	},

	noticeText: {
		flex: 1,
		marginLeft: 8,
		fontSize: 10,
		lineHeight: 15,
		color: theme.textSub,
	},

	inputSection: {
		marginTop: 16,
	},

	label: {
		marginBottom: 8,
		fontSize: 11,
		fontWeight: "700",
		color: theme.textSub,
	},

	input: {
		minHeight: 50,
		paddingHorizontal: 14,
		paddingVertical: 12,
		borderRadius: 13,
		backgroundColor: theme.surface,
		borderWidth: 1,
		borderColor: theme.borderStrong,
		color: theme.text,
		fontSize: 14,
		fontWeight: "600",
	},

	inputError: {
		borderColor: theme.errorBorder,
		backgroundColor: theme.errorBg,
	},

	helperText: {
		marginTop: 5,
		fontSize: 9,
		color: theme.textMuted,
	},

	errorBox: {
		marginTop: 8,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderRadius: 9,
		backgroundColor: theme.errorBg,
		borderWidth: 1,
		borderColor: theme.errorBorder,
	},

	errorText: {
		fontSize: 10,
		lineHeight: 14,
		color: theme.errorText,
	},

	checkboxRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 15,
	},

	checkbox: {
		width: 19,
		height: 19,
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: theme.borderStrong,
		backgroundColor: theme.surface,
	},

	checkboxActive: {
		backgroundColor: theme.primaryLight,
		borderColor: theme.primaryLight,
	},

	checkboxText: {
		marginLeft: 9,
		fontSize: 11,
		fontWeight: "600",
		color: theme.textSub,
	},

	actions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		marginTop: 22,
		gap: 10,
	},

	cancelBtn: {
		minHeight: 44,
		paddingHorizontal: 16,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.surface,
		borderWidth: 1,
		borderColor: theme.borderStrong,
	},

	cancelText: {
		fontSize: 12,
		fontWeight: "700",
		color: theme.textSub,
	},

	saveBtn: {
		minHeight: 44,
		minWidth: 110,
		paddingHorizontal: 18,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.primary,
	},

	saveBtnLoading: {
		opacity: 0.75,
	},

	loadingContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},

	saveText: {
		fontSize: 12,
		fontWeight: "800",
		color: theme.bg,
	},

	pressed: {
		opacity: 0.7,
		transform: [{ scale: 0.98 }],
	},
});