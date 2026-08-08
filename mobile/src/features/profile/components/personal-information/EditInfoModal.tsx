import React, {
   useMemo,
   useState,
   useCallback,
   useEffect,
 } from "react";
 import { View, Text, Pressable, StyleSheet, Keyboard } from "react-native";
 import {
   BottomSheetModal,
   BottomSheetScrollView,
   BottomSheetBackdrop,
   BottomSheetTextInput,
 } from "@gorhom/bottom-sheet";
import { useUpdateProfileInfo } from "../../hook/useProfile";
import { useAuth } from "@/context/AuthContext";
 
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
  const { mutate: updateProfile, isPending } = useUpdateProfileInfo();
   
   const snapPoints = useMemo(() => ["50%"], []);
 
   const [value, setValue] = useState(initialValue);
 
   // reset value when modal opens
   useEffect(() => {
     setValue(initialValue);
   }, [initialValue]);
 
   // keyboard behavior (optional reset / safety)
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
         {/* HEADER */}
         <View style={styles.header}>
           <Text style={styles.title}>{title}</Text>

         </View>
 
         {/* LABEL */}
         <Text style={styles.label}>{label}</Text>
 
         {/* INPUT */}
         <BottomSheetTextInput
           value={value}
           onChangeText={setValue}
           placeholder={`Enter ${label}`}
           placeholderTextColor="#94a3b8"
           style={styles.input}
         />
 
         {/* ACTIONS */}
         <View style={styles.actions}>
           <Pressable onPress={close} style={styles.cancelBtn}>
             <Text style={styles.cancelText}>Cancel</Text>
           </Pressable>
 
           <Pressable onPress={save} style={styles.saveBtn}>
             <Text style={styles.saveText}>Save</Text>
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
 
   header: {
     flexDirection: "row",
     justifyContent: "space-between",
     alignItems: "center",
   },
 
   title: {
     fontSize: 16,
     fontWeight: "700",
     color: "#0f172a",
   },
 
   label: {
     marginTop: 20,
     color: "#64748b",
     fontSize: 13,
   },
 
   input: {
     marginTop: 10,
     padding: 12,
     borderRadius: 12,
     backgroundColor: "#f8fafc",
     borderWidth: 1,
     borderColor: "#e2e8f0",
     color: "#0f172a",
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