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
} from "react-native";
import {
	BottomSheetModal,
	BottomSheetScrollView,
	BottomSheetBackdrop,
	BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Pencil } from "lucide-react-native";
import { useUpdateProfileInfo } from "../../hook/useProfile";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/utils/theme";

interface Props {
	modalRef: React.RefObject<BottomSheetModal | null>;
	title: string;
	label: string;
	initialValue: string;
	onClose: () => void;
	onSave: (value: string) => void;
}

export function EditInfoModal({
	modalRef,
	title,
	label,
	initialValue,
	onClose,
	onSave,
}: Props) {
	const { setMember, member } = useAuth();
	const { mutate: updateProfile, isPending } =
		useUpdateProfileInfo();

	const snapPoints = useMemo(() => ["50%"], []);

	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const sub = Keyboard.addListener("keyboardDidHide", () => {
			modalRef.current?.snapToIndex(0);
		});

		return () => sub.remove();
	}, [modalRef]);

	const close = useCallback(() => {
		modalRef.current?.dismiss();
		onClose();
	}, [modalRef, onClose]);

	const save = useCallback(() => {
		const field = label.toLowerCase();

		updateProfile(
			{
				userId: member?.id!,
				memberId: member?.memberId!,
				[field]: value,
			},
			{
				onSuccess: () => {
					setMember({
						...member!,
						[field]: value,
					});

					onSave(value);
					close();
				},
				onError: (error: any) => {
					console.log(error.message);
				},
			}
		);
	}, [
		value,
		label,
		member,
		updateProfile,
		setMember,
		onSave,
		close,
	]);

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

	return (
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
					<View style={styles.headerLeft}>
						<View style={styles.iconBox}>
							<Pencil
								size={16}
								color={theme.primaryLight}
								strokeWidth={2.2}
							/>
						</View>

						<View>
							<Text style={styles.title}>
								{title}
							</Text>

							<Text style={styles.subtitle}>
								Update your account information
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.inputSection}>
					<Text style={styles.label}>{label}</Text>

					<BottomSheetTextInput
						value={value}
						onChangeText={setValue}
						placeholder={`Enter ${label}`}
						placeholderTextColor={theme.textMuted}
						autoCapitalize="none"
						style={styles.input}
					/>
				</View>

				<View style={styles.actions}>
					<Pressable
						onPress={close}
						disabled={isPending}
						style={({ pressed }) => [
							styles.cancelBtn,
							pressed && styles.pressed,
						]}
					>
						<Text style={styles.cancelText}>
							Cancel
						</Text>
					</Pressable>

					<Pressable
						onPress={save}
						disabled={isPending || !value.trim()}
						style={({ pressed }) => [
							styles.saveBtn,
							(isPending || !value.trim()) &&
								styles.disabledBtn,
							pressed && styles.pressed,
						]}
					>
						<Text style={styles.saveText}>
							{isPending ? "Saving..." : "Save Changes"}
						</Text>
					</Pressable>
				</View>
			</BottomSheetScrollView>
		</BottomSheetModal>
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
		paddingBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: theme.border,
	},

	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
	},

	iconBox: {
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

	title: {
		fontSize: 16,
		fontWeight: "800",
		color: theme.text,
		letterSpacing: -0.2,
	},

	subtitle: {
		marginTop: 3,
		fontSize: 10,
		fontWeight: "500",
		color: theme.textMuted,
	},

	inputSection: {
		marginTop: 20,
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

	actions: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
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
		paddingHorizontal: 18,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.primary,
	},

	saveText: {
		fontSize: 12,
		fontWeight: "800",
		color: theme.bg,
	},

	disabledBtn: {
		opacity: 0.45,
	},

	pressed: {
		opacity: 0.7,
		transform: [{ scale: 0.98 }],
	},
});