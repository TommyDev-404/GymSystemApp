import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { Info } from "lucide-react-native";

type Props = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export function CheckInInfoModal({
  visible,
  message,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
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
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 22,
            alignItems: "center",
          }}
        >

          {/* INFO ICON */}
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 999,
              backgroundColor: "rgba(245,158,11,0.12)",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Info
              size={34}
              color="#f59e0b"
            />
          </View>


          <Text
            style={{
              color: "#0f172a",
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Already Checked In
          </Text>


          <Text
            style={{
              color: "#64748b",
              fontSize: 13,
              marginTop: 8,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            {message}
          </Text>


          <Pressable
            onPress={onClose}
            style={{
              marginTop: 18,
              backgroundColor: "#f59e0b",
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
              }}
            >
              OK
            </Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}