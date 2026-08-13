import { Modal, Pressable, Text, View } from "react-native";
import { LogOut } from "lucide-react-native";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmationModal({
  visible,
  onCancel,
  onConfirm,
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
          backgroundColor: "rgba(0,0,0,0.45)",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "#FEE2E2",
              padding: 16,
              borderRadius: 999,
              marginBottom: 16,
            }}
          >
            <LogOut
              color="#DC2626"
              size={28}
            />
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Logout
          </Text>

          <Text
            style={{
              textAlign: "center",
              color: "#6B7280",
              marginTop: 10,
              lineHeight: 22,
            }}
          >
            Are you sure you want to logout? You'll need to sign in again to
            access your account.
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginTop: 24,
            }}
          >
            <Pressable
              onPress={onCancel}
              style={{
                flex: 1,
                paddingVertical: 14,
                borderRadius: 12,
                backgroundColor: "#F3F4F6",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                }}
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              style={{
                flex: 1,
                paddingVertical: 14,
                borderRadius: 12,
                backgroundColor: "#EF4444",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Logout
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}