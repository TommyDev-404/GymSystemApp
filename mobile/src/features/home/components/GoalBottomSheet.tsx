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
	const { mutate: createGoal, isPending: creating } = useCreateFitnessGoal();
	const { mutate: updateGoal, isPending: updating } = useUpdateFitnessGoal();

	const [currentWeight,setCurrentWeight] = useState(initialCurrentWeight ? String(initialCurrentWeight) : "");
	const [goalWeight,setGoalWeight] = useState(initialGoalWeight ? String(initialGoalWeight) : "" );
	const [goalType,setGoalType] = useState<"LOSE_WEIGHT" | "GAIN_WEIGHT">(initialGoalType ?? "LOSE_WEIGHT");
	const [showGoalOptions,setShowGoalOptions] = useState(false);
	const [dirtyFields,setDirtyFields] = useState<{
		goalType?:boolean;
		currentWeight?:boolean;
		goalWeight?:boolean;
	}>({});

	const isLoading = loading || creating || updating;

	useEffect(()=>{
		setCurrentWeight(initialCurrentWeight ? String(initialCurrentWeight) : "");
		setGoalWeight(initialGoalWeight ? String(initialGoalWeight) : "");
		setGoalType(initialGoalType ?? "LOSE_WEIGHT");
		setDirtyFields({});
	},[initialCurrentWeight, initialGoalWeight, initialGoalType]);

	useEffect(()=>{
		const sub = Keyboard.addListener("keyboardDidHide", ()=>{
			if(isClosingRef.current) return;

			modalRef.current?.snapToIndex(0);
		});

		return ()=>sub.remove();
	},[modalRef]);

	const renderBackdrop = useCallback((props:any)=>(
		<BottomSheetBackdrop
			{...props}
			appearsOnIndex={0}
			disappearsOnIndex={-1}
			opacity={0.5}
		/>
	), []);

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
		if (isLoading || !currentWeight || !goalWeight || Object.keys(dirtyFields).length === 0) {
			return;
		}
	
		const payload = {
			...(dirtyFields.goalType && {goal_type: goalType }),
			...(dirtyFields.currentWeight && {current_weight: Number(currentWeight)}),
			...(dirtyFields.goalWeight && {target_weight: Number(goalWeight)}),
		};
	
		if (mode === "CREATE") {
			createGoal({
				member_id: member?.memberId!,
				goal_type: goalType,
				current_weight: Number(currentWeight),
				target_weight: Number(goalWeight),
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
			});
		}
	
		if (mode === "UPDATE" && goalId) {
			updateGoal({ id: goalId, data: payload },
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
	

	return (
		<BottomSheetModal
			ref={modalRef}
			snapPoints={snapPoints}
			backdropComponent={renderBackdrop}
			enablePanDownToClose
			keyboardBehavior="extend"
			onDismiss={()=>{
				isClosingRef.current=true;
				setTimeout(()=>{
					isClosingRef.current=false;
				},300);
			}}
		>
			<BottomSheetScrollView
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps="handled"
			>
				{/* HEADER */}
				<View style={styles.header}>
					<View>
						<Text style={styles.title}>
							{title}
						</Text>

						<Text style={styles.subtitle}>
							{subtitle}
						</Text>
					</View>

					<Pressable onPress={close}>
						<X size={22} color="#64748B"/>
					</Pressable>
				</View>

				{/* GOAL TYPE */}
				{mode === "CREATE" && (
					<>
						<Text style={styles.label}>
							Fitness Goal
						</Text>

						<Pressable
							style={styles.input}
							onPress={() => {setShowGoalOptions(!showGoalOptions)}}
						>
							<Text style={styles.dropdownText}>
								{goalType === "LOSE_WEIGHT" ? "Lose Weight": "Gain Weight"}
							</Text>

							<ChevronDown size={20} color="#64748B"/>
						</Pressable>

						{showGoalOptions && (
								<View style={styles.dropdown}>
									<Pressable
										style={styles.option}
										onPress={() => {
											setGoalType("LOSE_WEIGHT");
											setDirtyFields(prev=>({ ...prev, goalType:true }));
											setShowGoalOptions(false);
										}}
									>
										<Text style={styles.optionText}>
											Lose Weight
										</Text>
									</Pressable>

									<Pressable
										style={styles.option}
										onPress={() => {
											setGoalType("GAIN_WEIGHT");
											setDirtyFields(prev => ({...prev, goalType: true}));
											setShowGoalOptions(false);
										}}
									>
										<Text style={styles.optionText}>
											Gain Weight
										</Text>
									</Pressable>
								</View>
						)}
					</>
				)}

				{/* CURRENT WEIGHT */}
				<Text style={styles.label}>Current Weight (kg)</Text>

				<BottomSheetTextInput
					value={currentWeight}
					onChangeText={(value)=>{
						setCurrentWeight(value);
						setDirtyFields( prev => ({...prev, currentWeight: true }));
					}}
					keyboardType="numeric"
					placeholder="Enter current weight"
					placeholderTextColor="#94A3B8"
					style={styles.input}
				/>

				{/* TARGET WEIGHT */}
				<Text style={styles.label}>Target Weight (kg)</Text>

				<BottomSheetTextInput
					value={goalWeight}
					onChangeText={(value)=>{
						setGoalWeight(value);
						setDirtyFields( prev => ({ ...prev, goalWeight: true  }));
					}}
					keyboardType="numeric"
					placeholder="Enter target weight"
					placeholderTextColor="#94A3B8"
					style={styles.input}
				/>

				{/* ACTIONS */}
				<View style={styles.actions}>
					<Pressable
						onPress={close}
						style={styles.cancelBtn}
					>
						<Text style={styles.cancelText}>
							Cancel
						</Text>
					</Pressable>

					<Pressable
						onPress={save}
						disabled={ isLoading || Object.keys(dirtyFields).length === 0}
						style={[ styles.saveBtn,
							(
								isLoading ||
								Object.keys(dirtyFields).length === 0
							) && {
								opacity:0.5
							}
						]}
					>
						<Text style={styles.saveText}>
							{buttonText}
						</Text>
					</Pressable>
				</View>
			</BottomSheetScrollView>
		</BottomSheetModal>
	);
}

const styles = StyleSheet.create({
	container:{
		padding:20
	},

	header:{
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center"
	},

	title:{
		fontSize:18,
		fontWeight:"700",
		color:"#0F172A"
	},

	subtitle:{
		marginTop:5,
		fontSize:13,
		color:"#64748B"
	},

	label:{
		marginTop:22,
		marginBottom:8,
		fontSize:13,
		color:"#64748B",
		fontWeight:"600"
	},

	input:{
		padding:14,
		borderRadius:14,
		backgroundColor:"#F8FAFC",
		borderWidth:1,
		borderColor:"#E2E8F0",
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
		color:"#0F172A",
		fontSize:15
	},

	dropdownText:{
		color:"#0F172A",
		fontSize:15
	},

	dropdown:{
		marginTop:8,
		backgroundColor:"#FFFFFF",
		borderRadius:14,
		borderWidth:1,
		borderColor:"#E2E8F0",
		overflow:"hidden"
	},

	option:{
		padding:14
	},

	optionText:{
		color:"#0F172A",
		fontSize:15
	},

	actions:{
		flexDirection:"row",
		justifyContent:"flex-end",
		alignItems:"center",
		marginTop:25,
		gap:12
	},

	cancelBtn:{
		paddingVertical:11,
		paddingHorizontal:15
	},

	cancelText:{
		color:"#64748B",
		fontWeight:"600"
	},

	saveBtn:{
		backgroundColor:"#10B981",
		paddingVertical:11,
		paddingHorizontal:20,
		borderRadius:12
	},

	saveText:{
		color:"#FFFFFF",
		fontWeight:"700"
	}
});