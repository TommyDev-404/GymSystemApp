import React, { useState } from "react";
import { View, StatusBar } from "react-native";
import { useRouter } from "expo-router";

import { CameraScanner } from "@/features/checkin/components/CameraScanner";
import { CheckInResultModal } from "@/features/checkin/components/CheckInResultModal";
import { useCheckIn } from "@/features/checkin/hooks/useCheckin";
import { useAuth } from "@/context/AuthContext";

type CheckInResult = {
  type: "success" | "info";
  title: string;
  message: string;
};

export default function QRScannerPage() {
  const { member } = useAuth();
  const router = useRouter();

  const [isScanning, setIsScanning] = useState(true);

  const [checkInResult, setCheckInResult] =
    useState<CheckInResult | null>(null);

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

      checkIn(
        {
          member_id: member?.memberId!,
          sessionId: data.session_id,
        },
        {
          onSuccess: (data) => {
            setCheckInResult({
              type: "success",
              title: data.message,
              message: today,
            });
          },

          onError: (err: any) => {
            const message = err.response?.data?.message || "Something went wrong";

            setCheckInResult({
              type: "info",
              title: "Already Checked In",
              message,
            });
          },
        }
      );
    } catch (err) {
      console.log("Invalid QR format");

      // Allow scanning again if the QR itself is invalid
      setIsScanning(true);
    }
  };

  const handleResultClose = () => {
    const wasSuccess = checkInResult?.type === "success";

    setCheckInResult(null);

    if (wasSuccess) {
      router.back();
      return;
    }

    // Error/info result
    setIsScanning(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
      />

      {/* CAMERA */}
      {isScanning && (
        <CameraScanner
          onScanned={handleScan}
          isScanning={isScanning}
        />
      )}

      {/* CHECK-IN RESULT */}
      <CheckInResultModal
        visible={!!checkInResult}
        type={checkInResult?.type ?? "info"}
        title={checkInResult?.title ?? ""}
        message={checkInResult?.message ?? ""}
        onClose={handleResultClose}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
};