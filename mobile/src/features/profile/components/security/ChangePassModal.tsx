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
import { Check } from "lucide-react-native";
 
 interface Props {
   modalRef: React.RefObject<BottomSheetModal | null>;
   title: string;
   onClose: () => void;
   onSave: (data: {
     currentPassword: string;
     newPassword: string;
     confirmPassword: string;
   }) => void;
 }
 
 export function ChangePasswordModal({
   modalRef,
   title,
   onClose,
   onSave,
 }: Props) {
   const snapPoints = useMemo(() => ["62%"], []);
 
   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
 
   // 👁 show/hide password toggle
   const [showPassword, setShowPassword] = useState(false);
 
   useEffect(() => {
     const sub = Keyboard.addListener("keyboardDidHide", () => {
       modalRef.current?.snapToIndex(0);
     });
 
     return () => sub.remove();
   }, []);
 
   const close = useCallback(() => {
     modalRef.current?.dismiss();
     onClose();
   }, []);
 
   const save = useCallback(() => {
     if (!currentPassword || !newPassword || !confirmPassword) return;
 
     if (newPassword !== confirmPassword) {
       console.log("❌ Passwords do not match");
       return;
     }
 
     onSave({
       currentPassword,
       newPassword,
       confirmPassword,
     });
 
     setCurrentPassword("");
     setNewPassword("");
     setConfirmPassword("");
 
     close();
   }, [currentPassword, newPassword, confirmPassword]);
 
   const renderBackdrop = useCallback((props: any) => {
     return (
       <BottomSheetBackdrop
         {...props}
         appearsOnIndex={0}
         disappearsOnIndex={-1}
         opacity={0.5}
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
     >
       <BottomSheetScrollView
         contentContainerStyle={styles.container}
         keyboardShouldPersistTaps="handled"
       >
         {/* TITLE */}
         <Text style={styles.title}>{title}</Text>

         {/* NEW */}
         <Text style={styles.label}>New Password</Text>
         <BottomSheetTextInput
           value={newPassword}
           onChangeText={setNewPassword}
           placeholder="Enter new password"
           placeholderTextColor="#94a3b8"
           secureTextEntry={!showPassword}
           style={styles.input}
         />
 
         {/* CONFIRM */}
         <Text style={styles.label}>Confirm Password</Text>
         <BottomSheetTextInput
           value={confirmPassword}
           onChangeText={setConfirmPassword}
           placeholder="Confirm new password"
           placeholderTextColor="#94a3b8"
           secureTextEntry={!showPassword}
           style={styles.input}
         />
 
         {/* 👁 SHOW PASSWORD TOGGLE */}
         <Pressable
         onPress={() => setShowPassword((prev) => !prev)}
         style={styles.checkboxRow}
         >
         <View style={[styles.checkbox, showPassword && styles.checkboxActive]}>
            {showPassword && (
               <Check size={14} color="#fff" />
            )}
         </View>

         <Text style={styles.checkboxText}>
            Show Password
         </Text>
         </Pressable>
 
         {/* ACTIONS */}
         <View style={styles.actions}>
           <Pressable onPress={close} style={styles.cancelBtn}>
             <Text style={styles.cancelText}>Cancel</Text>
           </Pressable>
 
           <Pressable onPress={save} style={styles.saveBtn}>
             <Text style={styles.saveText}>Update</Text>
           </Pressable>
         </View>
       </BottomSheetScrollView>
     </BottomSheetModal>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     padding: 20,
   },
 
   title: {
     fontSize: 16,
     fontWeight: "700",
     color: "#0f172a",
     marginBottom: 10,
   },
 
   label: {
     marginTop: 14,
     fontSize: 13,
     color: "#64748b",
   },
 
   input: {
     marginTop: 8,
     padding: 12,
     borderRadius: 12,
     backgroundColor: "#f8fafc",
     borderWidth: 1,
     borderColor: "#e2e8f0",
     color: "#0f172a",
   },
 
   checkboxRow: {
     flexDirection: "row",
     alignItems: "center",
     marginTop: 14,
     gap: 10,
   },
 
   checkbox: {
     width: 18,
     height: 18,
     borderRadius: 4,
     borderWidth: 1,
     borderColor: "#94a3b8",
   },
 
   checkboxActive: {
     backgroundColor: "#10b981",
     borderColor: "#10b981",
   },
 
   checkboxText: {
     color: "#64748b",
     fontSize: 13,
   },
 
   actions: {
     flexDirection: "row",
     justifyContent: "flex-end",
     marginTop: 20,
     gap: 10,
   },
 
   cancelBtn: {
     paddingVertical: 10,
     paddingHorizontal: 14,
   },
 
   cancelText: {
     color: "#64748b",
     fontWeight: "600",
   },
 
   saveBtn: {
     backgroundColor: "#10b981",
     paddingVertical: 10,
     paddingHorizontal: 16,
     borderRadius: 10,
   },
 
   saveText: {
     color: "white",
     fontWeight: "700",
   },
 });