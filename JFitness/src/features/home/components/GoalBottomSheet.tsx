import React, {
	useMemo,
	useState,
	useEffect,
	useCallback,
	useRef,
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
import { ChevronDown, X } from "lucide-react-native";
import { useCreateFitnessGoal, useUpdateFitnessGoal } from "../hook/useHome";
import { useAuth } from "@/context/AuthContext";
import Toast from "react-native-toast-message";
import { theme } from "@/utils/theme";

interface GoalBottomSheetProps {
	title?: string;
	subtitle?: string;
	initialGoalType?: "LOSE_WEIGHT" | "GAIN_WEIGHT" | null;
	initialCurrentWeight?: number;
	initialGoalWeight?: number;
	goalId?: number;
	buttonText?: string;
	loading?: boolean;
	modalRef: React.RefObject<BottomSheetModal | null>;
	onClose: () => void;
	mode: "CREATE" | "UPDATE";
}

export function GoalBottomSheet({
	modalRef,
	title,
	subtitle,
	initialGoalType,
	initialCurrentWeight,
	initialGoalWeight,
	goalId,
	buttonText = "Save Goal",
	loading = false,
	onClose,
	mode,
}: GoalBottomSheetProps) {
	const snapPoints = useMemo(() => ["55%"], []);
	const isClosingRef = useRef(false);

	const { member } = useAuth();

	const { mutate: createGoal, isPending: creating } =
		useCreateFitnessGoal();

	const { mutate: updateGoal, isPending: updating } =
		useUpdateFitnessGoal();

	const [currentWeight, setCurrentWeight] = useState(
		initialCurrentWeight ? String(initialCurrentWeight) : ""
	);

	const [goalWeight, setGoalWeight] = useState(
		initialGoalWeight ? String(initialGoalWeight) : ""
	);

	const [goalType, setGoalType] = useState<
		"LOSE_WEIGHT" | "GAIN_WEIGHT"
	>(initialGoalType ?? "LOSE_WEIGHT");

	const [showGoalOptions, setShowGoalOptions] = useState(false);

	const [dirtyFields, setDirtyFields] = useState<{
		goalType?: boolean;
		currentWeight?: boolean;
		goalWeight?: boolean;
	}>({});

	const isLoading = loading || creating || updating;

	useEffect(() => {
		setCurrentWeight(
			initialCurrentWeight ? String(initialCurrentWeight) : ""
		);

		setGoalWeight(
			initialGoalWeight ? String(initialGoalWeight) : ""
		);

		setGoalType(initialGoalType ?? "LOSE_WEIGHT");
		setDirtyFields({});
	}, [initialCurrentWeight, initialGoalWeight, initialGoalType]);

	useEffect(() => {
		const sub = Keyboard.addListener("keyboardDidHide", () => {
			if (isClosingRef.current) return;

			modalRef.current?.snapToIndex(0);
		});

		return () => sub.remove();
	}, [modalRef]);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				opacity={0.65}
			/>
		),
		[]
	);

	const close = useCallback(() => {
		isClosingRef.current = true;

		Keyboard.dismiss();
		modalRef.current?.dismiss();

		setCurrentWeight("");
		setGoalWeight("");
		setGoalType("LOSE_WEIGHT");
		setDirtyFields({});
		setShowGoalOptions(false);

		onClose();

		setTimeout(() => {
			isClosingRef.current = false;
		}, 300);
	}, [modalRef, onClose]);

	const save = useCallback(() => {
		if (
			isLoading ||
			!currentWeight ||
			!goalWeight ||
			Object.keys(dirtyFields).length === 0
		) {
			return;
		}

		const payload = {
			...(dirtyFields.goalType && {
				goal_type: goalType,
			}),
			...(dirtyFields.currentWeight && {
				current_weight: Number(currentWeight),
			}),
			...(dirtyFields.goalWeight && {
				target_weight: Number(goalWeight),
			}),
		};

		if (mode === "CREATE") {
			createGoal({
				member_id: member?.memberId!,
				data: {
					goal_type: goalType,
					current_weight: Number(currentWeight),
					target_weight: Number(goalWeight),
				
				}
			},
			{
				onSuccess: () => {
					Toast.show({
						type: "success",
						text1: "Goal Saved 🎯",
						text2: "Your weight goal has been created",
					});

					close();
				},
			})
		}

		if (mode === "UPDATE" && goalId) {
			updateGoal(
				{
					id: goalId,
					data: payload,
				},
				{
					onSuccess: () => {
						Toast.show({
							type: "success",
							text1: "Goal Updated 🎯",
							text2: "Your weight goal has been updated",
						});

						close();
					},
				}
			);
		}
	}, [
		currentWeight,
		goalWeight,
		goalType,
		dirtyFields,
		isLoading,
		mode,
		goalId,
		createGoal,
		updateGoal,
		member?.memberId,
		close,
	]);

	const hasChanges = Object.keys(dirtyFields).length > 0;

	return (
		<BottomSheetModal
			ref={modalRef}
			snapPoints={snapPoints}
			backdropComponent={renderBackdrop}
			enablePanDownToClose
			keyboardBehavior="extend"
			backgroundStyle={styles.sheetBackground}
			handleIndicatorStyle={styles.handleIndicator}
			onDismiss={() => {
				isClosingRef.current = true;

				setTimeout(() => {
					isClosingRef.current = false;
				}, 300);
			}}
		>
			<BottomSheetScrollView
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps="handled"
			>
				{/* HEADER */}
				<View style={styles.header}>
					<View style={styles.headerContent}>
						<Text style={styles.title}>{title}</Text>

						<Text style={styles.subtitle}>{subtitle}</Text>
					</View>

					<Pressable
						onPress={close}
						style={styles.closeButton}
						hitSlop={8}
					>
						<X
							size={20}
							color={theme.textSub}
							strokeWidth={2}
						/>
					</Pressable>
				</View>

				{/* GOAL TYPE */}
				{mode === "CREATE" && (
					<>
						<Text style={styles.label}>FITNESS GOAL</Text>

						<Pressable
							style={[
								styles.input,
								showGoalOptions && styles.inputFocused,
							]}
							onPress={() =>
								setShowGoalOptions(!showGoalOptions)
							}
						>
							<Text style={styles.dropdownText}>
								{goalType === "LOSE_WEIGHT"
									? "Lose Weight"
									: "Gain Weight"}
							</Text>

							<ChevronDown
								size={19}
								color={theme.textSub}
							/>
						</Pressable>

						{showGoalOptions && (
							<View style={styles.dropdown}>
								<Pressable
									style={[
										styles.option,
										goalType === "LOSE_WEIGHT" &&
											styles.selectedOption,
									]}
									onPress={() => {
										setGoalType("LOSE_WEIGHT");

										setDirtyFields((prev) => ({
											...prev,
											goalType: true,
										}));

										setShowGoalOptions(false);
									}}
								>
									<Text
										style={[
											styles.optionText,
											goalType === "LOSE_WEIGHT" &&
												styles.selectedOptionText,
										]}
									>
										Lose Weight
									</Text>
								</Pressable>

								<Pressable
									style={[
										styles.option,
										goalType === "GAIN_WEIGHT" &&
											styles.selectedOption,
									]}
									onPress={() => {
										setGoalType("GAIN_WEIGHT");

										setDirtyFields((prev) => ({
											...prev,
											goalType: true,
										}));

										setShowGoalOptions(false);
									}}
								>
									<Text
										style={[
											styles.optionText,
											goalType === "GAIN_WEIGHT" &&
												styles.selectedOptionText,
										]}
									>
										Gain Weight
									</Text>
								</Pressable>
							</View>
						)}
					</>
				)}

				{/* CURRENT WEIGHT */}
				<Text style={styles.label}>CURRENT WEIGHT (KG)</Text>

				<BottomSheetTextInput
					value={currentWeight}
					onChangeText={(value) => {
						setCurrentWeight(value);

						setDirtyFields((prev) => ({
							...prev,
							currentWeight: true,
						}));
					}}
					keyboardType="numeric"
					placeholder="Enter current weight"
					placeholderTextColor={theme.textMuted}
					style={styles.textInput}
				/>

				{/* TARGET WEIGHT */}
				<Text style={styles.label}>TARGET WEIGHT (KG)</Text>

				<BottomSheetTextInput
					value={goalWeight}
					onChangeText={(value) => {
						setGoalWeight(value);

						setDirtyFields((prev) => ({
							...prev,
							goalWeight: true,
						}));
					}}
					keyboardType="numeric"
					placeholder="Enter target weight"
					placeholderTextColor={theme.textMuted}
					style={styles.textInput}
				/>

				{/* ACTIONS */}
				<View style={styles.actions}>
					<Pressable
						onPress={close}
						style={styles.cancelBtn}
					>
						<Text style={styles.cancelText}>Cancel</Text>
					</Pressable>

					<Pressable
						onPress={save}
						disabled={isLoading || !hasChanges}
						style={[
							styles.saveBtn,
							(isLoading || !hasChanges) &&
								styles.saveBtnDisabled,
						]}
					>
						<Text style={styles.saveText}>
							{isLoading ? "Saving..." : buttonText}
						</Text>
					</Pressable>
				</View>
			</BottomSheetScrollView>
		</BottomSheetModal>
	);
}

const styles = StyleSheet.create({
	sheetBackground: {
		backgroundColor: theme.card,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
	},

	handleIndicator: {
		backgroundColor: theme.textMuted,
		width: 40,
	},

	container: {
		paddingHorizontal: 20,
		paddingTop: 8,
		paddingBottom: 30,
	},

	header: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginBottom: 4,
	},

	headerContent: {
		flex: 1,
		paddingRight: 16,
	},

	title: {
		fontSize: 19,
		fontWeight: "700",
		color: theme.text,
		letterSpacing: -0.2,
	},

	subtitle: {
		marginTop: 5,
		fontSize: 13,
		lineHeight: 18,
		color: theme.textSub,
	},

	closeButton: {
		width: 36,
		height: 36,
		borderRadius: 12,
		backgroundColor: theme.surface,
		borderWidth: 1,
		borderColor: theme.border,
		alignItems: "center",
		justifyContent: "center",
	},

	label: {
		marginTop: 20,
		marginBottom: 8,
		fontSize: 11,
		color: theme.textMuted,
		fontWeight: "700",
		letterSpacing: 0.7,
	},

	input: {
		minHeight: 54,
		paddingHorizontal: 16,
		borderRadius: 15,
		backgroundColor: theme.inputBg,
		borderWidth: 1,
		borderColor: theme.inputBorder,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	inputFocused: {
		borderColor: theme.borderAccent,
		backgroundColor: theme.surface,
	},

	textInput: {
		minHeight: 54,
		paddingHorizontal: 16,
		paddingVertical: 14,
		borderRadius: 15,
		backgroundColor: theme.inputBg,
		borderWidth: 1,
		borderColor: theme.inputBorder,
		color: theme.text,
		fontSize: 15,
		fontWeight: "500",
	},

	dropdownText: {
		color: theme.text,
		fontSize: 15,
		fontWeight: "500",
	},

	dropdown: {
		marginTop: 8,
		backgroundColor: theme.surface,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: theme.borderStrong,
		overflow: "hidden",
	},

	option: {
		paddingHorizontal: 16,
		paddingVertical: 14,
	},

	selectedOption: {
		backgroundColor: theme.accentWash,
	},

	optionText: {
		color: theme.textSub,
		fontSize: 15,
		fontWeight: "500",
	},

	selectedOptionText: {
		color: theme.primaryLight,
		fontWeight: "600",
	},

	actions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		marginTop: 25,
		gap: 10,
	},

	cancelBtn: {
		paddingVertical: 12,
		paddingHorizontal: 15,
		borderRadius: 12,
	},

	cancelText: {
		color: theme.textSub,
		fontWeight: "600",
		fontSize: 14,
	},

	saveBtn: {
		backgroundColor: theme.primary,
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 13,
	},

	saveBtnDisabled: {
		opacity: 0.45,
	},

	saveText: {
		color: "#fff",
		fontWeight: "700",
		fontSize: 14,
	},
});