import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";

export function CameraScanner({ onScanned, isScanning }: any) {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const scannedRef = useRef(false);

  // 🎯 lighthouse scan animation
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  if (!permission?.granted) {
    requestPermission();

    return (
      <View style={styles.center}>
        <Text style={{ color: "white" }}>
          Requesting camera permission...
        </Text>
      </View>
    );
  }

  const handleBarcode = ({ data }: any) => {
    if (scannedRef.current) return;

    scannedRef.current = true;

    setTimeout(() => {
      onScanned(data);
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* CAMERA */}
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={isScanning ? handleBarcode : undefined}
      />

      {/* ❌ CLOSE BUTTON */}
      <Pressable onPress={() => router.back()} style={styles.closeBtn}>
        <X size={22} color="#fff" />
      </Pressable>

      {/* DARK OVERLAY */}
      <View style={styles.mask} pointerEvents="none" />

      {/* SCANNER UI */}
      <View style={styles.overlay} pointerEvents="none">
        {/* 🌊 LITHOUSE BEAM */}
        <Animated.View
          style={[
            styles.beamWrapper,
            {
              transform: [
                {
                  translateY: scanAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-140, 140],
                  }),
                },
                {
                  scaleX: scanAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.95, 1.1, 0.95],
                  }),
                },
              ],
              opacity: scanAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.3, 1, 0.3],
              }),
            },
          ]}
        >
          {/* Glow beam */}
          <LinearGradient
            colors={[
              "rgba(16,185,129,0)",
              "rgba(16,185,129,0.25)",
              "rgba(16,185,129,0.85)",
              "rgba(16,185,129,0.25)",
              "rgba(16,185,129,0)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.beam}
          />

          {/* Bright core */}
          <View style={styles.coreLine} />
        </Animated.View>

        {/* hint text */}
        <Text style={styles.text}>Scanning for QR code...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
  },

  mask: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  /* ❌ close button */
  closeBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 20,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 25,
  },

  /* 🌊 beam container */
  beamWrapper: {
    width: "100%",
    alignItems: "center",
  },

  /* soft glowing beam */
  beam: {
    width: "75%",
    height: 22,
    borderRadius: 30,
  },

  /* bright center line */
  coreLine: {
    position: "absolute",
    width: "70%",
    height: 2,
    backgroundColor: "#34d399",
    shadowColor: "#34d399",
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 10,
  },

  text: {
    position: "absolute",
    bottom: 120,
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
  },

  center: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});