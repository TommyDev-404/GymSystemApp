import React from "react";
import { View, Text, Modal, Pressable } from "react-native";

type Props = {
  visible: boolean;
  dateText: string;
  onClose: () => void;
};

export function CheckInSuccessModal({
  visible,
  dateText,
  onClose,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: 20,
            padding: 22,
            alignItems: "center",
          }}
        >
          {/* icon */}
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 999,
              backgroundColor: "rgba(16,185,129,0.12)",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ color: "#10b981", fontSize: 28 }}>✓</Text>
          </View>

          <Text style={{ color: "#0f172a", fontSize: 18, fontWeight: "700" }}>
            Check-in Successful
          </Text>

          <Text
            style={{
              color: "#64748b",
              fontSize: 12,
              marginTop: 6,
              textAlign: "center",
            }}
          >
            {dateText}
          </Text>

          <Pressable
            onPress={onClose}
            style={{
              marginTop: 18,
              backgroundColor: "#10b981",
              paddingVertical: 10,
              paddingHorizontal: 28,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}