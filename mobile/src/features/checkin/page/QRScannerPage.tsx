import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { CameraScanner } from "@/features/checkin/components/CameraScanner";
import { useRouter } from "expo-router";
import { CheckInSuccessModal } from "@/features/checkin/components/CheckInSuccessModal";
import { useCheckIn } from "@/features/checkin/hooks/useCheckin";
import { CheckInInfoModal } from "../components/CheckinInfoModal";
import { useAuth } from "@/context/AuthContext";


export default function QRScannerPage() {
  const { member } = useAuth();

  const router = useRouter();
  const [isScanning, setIsScanning] = useState(true);
   const [showModal, setShowModal] = useState(false);

   const [showError, setShowError] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

  const [today] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  const { mutate: checkIn } = useCheckIn();

  const handleScan = (value: string) => {
   if (!isScanning) return;
 
   setIsScanning(false);
 
   try {
     const data = JSON.parse(value);
 
     if (!data.session_id) {
       throw new Error("Invalid QR Code");
     }
 
     checkIn({ member_id: member?.memberId!, sessionId: data.session_id }, {
       onSuccess: (res) => {
         console.log("CHECK-IN SUCCESS:", res);
 
         setShowModal(true);
       },
 
       onError: (err: any) => {
         const message =
           err.response?.data?.message ||
           "Something went wrong";
 
         setErrorMessage(message);
         setShowError(true);
       },
     });
 
   } catch (err) {
     console.log("Invalid QR format");
     setIsScanning(true);
   }
  };

  const handleConfirm = () => {
    setShowModal(false);
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" translucent />

      {/* CAMERA */}
      {isScanning && <CameraScanner onScanned={handleScan} isScanning={isScanning}  />}

      {/* TOP UI */}
      {isScanning && (
        <View style={{ position: "absolute", top: 0, paddingTop: 60, paddingHorizontal: 20 }}>
          <View style={{ backgroundColor: "rgba(0,0,0,0.35)", padding: 14, borderRadius: 16 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
              Scan QR Code
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>
              Align the QR code within the frame
            </Text>
          </View>
        </View>
      )}

      {/* SUCCESS MODAL */}
      <CheckInSuccessModal
        visible={showModal}
        dateText={today}
        onClose={handleConfirm}
        />

        <CheckInInfoModal
            visible={showError}
            message={errorMessage}
            onClose={() => {
               setShowError(false);
               setErrorMessage("");
               setIsScanning(true);
               router.back();
            }}
         />
    </View>
  );
}