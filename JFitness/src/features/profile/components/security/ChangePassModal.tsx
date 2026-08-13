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
  ActivityIndicator,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Check } from "lucide-react-native";
import VerifyCodeModal from "./VerifyCodeModal";
import { sendOtpApi } from "@/features/auth/api/auth.api";
import { useAuth } from "@/context/AuthContext";
import Toast from "react-native-toast-message";

interface Props {
  modalRef: React.RefObject<BottomSheetModal | null>;
  title: string;
}

export function ChangePasswordModal({
  modalRef,
  title,
}: Props) {
  const { member } = useAuth();

  const snapPoints = useMemo(() => ["62%"], []);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Loading state for sending OTP
  const [isSendingCode, setIsSendingCode] = useState(false);

  useEffect(() => {
    const sub = Keyboard.addListener("keyboardDidHide", () => {
      modalRef.current?.snapToIndex(0);
    });

    return () => sub.remove();
  }, [modalRef]);

  const close = useCallback(() => {
    modalRef.current?.dismiss();
  }, [modalRef]);

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
  
  const save = useCallback(async () => {
    if (isSendingCode) return;
  
    setPasswordError("");
  
    if (!newPassword || !confirmPassword) {
      setPasswordError("Please enter and confirm your new password.");
      return;
    }
  
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
  
    if (!member?.email) {
      setPasswordError("Your email address could not be found.");
      return;
    }
  
    try {
      setIsSendingCode(true);
  
      const res = await sendOtpApi(member.email);
  
      if (!res.success) {
        setPasswordError("Unable to send the verification code. Please try again.");
        return;
      }
  
      setShowCodeModal(true);
      close();
  
    } catch (error) {
      console.error("Send OTP error:", error);
  
      setPasswordError(
        "Something went wrong while sending the verification code."
      );
    } finally {
      setIsSendingCode(false);
    }
  }, [
    newPassword,
    confirmPassword,
    member?.email,
    isSendingCode,
    close,
  ]);

  return (
    <>
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
          <Text style={styles.title}>
            {title}
          </Text>

          {/* NEW PASSWORD */}
          <Text style={styles.label}>
            New Password
          </Text>

          <BottomSheetTextInput
            value={newPassword}
            onChangeText={(value) => {
              setNewPassword(value);

              if (passwordError) {
                setPasswordError("");
              }
            }}
            placeholder="Enter new password"
            placeholderTextColor="#94a3b8"
            secureTextEntry={!showPassword}
            style={[
              styles.input,
              passwordError && styles.inputError,
            ]}
            editable={!isSendingCode}
          />

          {/* CONFIRM PASSWORD */}
          <Text style={styles.label}>
            Confirm Password
          </Text>

          <BottomSheetTextInput
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);

              if (passwordError) {
                setPasswordError("");
              }
            }}
            placeholder="Confirm new password"
            placeholderTextColor="#94a3b8"
            secureTextEntry={!showPassword}
            style={[
              styles.input,
              passwordError && styles.inputError,
            ]}
            editable={!isSendingCode}
          />

          {passwordError ? (
            <Text style={styles.errorText}>
              {passwordError}
            </Text>
          ) : null}

          {/* SHOW PASSWORD */}
          <Pressable
            onPress={() =>
              setShowPassword((prev) => !prev)
            }
            style={styles.checkboxRow}
            disabled={isSendingCode}
          >
            <View
              style={[
                styles.checkbox,
                showPassword && styles.checkboxActive,
              ]}
            >
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
            <Pressable
              onPress={close}
              style={styles.cancelBtn}
              disabled={isSendingCode}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={save}
              style={[
                styles.saveBtn,
                isSendingCode && styles.saveBtnLoading,
              ]}
              disabled={isSendingCode}
            >
              {isSendingCode ? (
                <View style={styles.loadingContent}>
                  <ActivityIndicator
                    size="small"
                    color="#ffffff"
                  />

                  <Text style={styles.saveText}>
                    Sending code...
                  </Text>
                </View>
              ) : (
                <Text style={styles.saveText}>
                  Update
                </Text>
              )}
            </Pressable>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>

      {/* OTP MODAL */}
      <VerifyCodeModal
        email={member?.email!}
        password={newPassword}
        visible={showCodeModal}
        onClose={() => setShowCodeModal(false)}
      />
    </>
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
    minWidth: 110,
    alignItems: "center",
    justifyContent: "center",
  },

  saveBtnLoading: {
    opacity: 0.85,
  },

  loadingContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  saveText: {
    color: "white",
    fontWeight: "700",
  },

  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: "#ef4444",
  },
});