import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { X, ShieldCheck } from "lucide-react-native";
import {
  resetPasswordApi,
  sendOtpApi,
  verifyOtpApi,
} from "@/features/auth/api/auth.api";
import Toast from "react-native-toast-message";
import { MemberInfo, useAuth } from "@/context/AuthContext";

type VerifyCodeModalProps = {
  email: string;
  password: string;
  visible: boolean;
  onClose: () => void;
};

export default function VerifyCodeModal({
  email,
  password,
  visible,
  onClose
}: VerifyCodeModalProps) {
  const { member, setMember } = useAuth();

  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const busy = isVerifying || isResending;

  useEffect(() => {
    if (!visible) {
      setCode("");
      setTimer(30);
      setIsVerifying(false);
      setIsResending(false);
      return;
    }

    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => clearTimeout(timeout);
  }, [visible]);

  useEffect(() => {
    if (!visible || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [visible, timer]);

  const handleChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue.length <= 6) {
      setCode(numericValue);
    }
  };

  const handleVerify = async () => {
    if (code.length !== 6 || busy) return;

    try {
      setIsVerifying(true);

      // 1. Verify OTP
      const otpResponse = await verifyOtpApi({
        email,
        code,
      });

      if (!otpResponse.success) {
        Toast.show({
          type: "error",
          text1: "Invalid code",
          text2: "The verification code is incorrect or expired.",
        });

        return;
      }

      // 2. OTP is valid → update password
      const resetResponse = await resetPasswordApi({
        email,
        newPassword: password,
      });

      if (!resetResponse.success) {
        Toast.show({
          type: "error",
          text1: "Password update failed",
          text2: "Unable to update your password. Please try again.",
        });

        return;
      }

      // 3. Success
      Toast.show({
        type: "success",
        text1: "Password updated",
        text2: "Your password has been changed successfully.",
      });

      // update password last changed date
      setMember({
        ...member!,
        pass_last_changed: resetResponse.data.updated_at,
      });

      setCode("");
      onClose();
    } catch (error) {
      console.error("Password reset error:", error);

      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || busy) return;

    try {
      setIsResending(true);

      await sendOtpApi(email);

      setCode("");
      setTimer(30);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } catch (error) {
      console.error("Resend OTP error:", error);

      Toast.show({
        type: "error",
        text1: "Unable to resend code",
        text2: "Please try again.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.modal}>
          {/* Close */}
          <Pressable
            onPress={onClose}
            style={styles.closeButton}
            hitSlop={10}
            disabled={busy}
          >
            <X size={20} color="#64748b" />
          </Pressable>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <ShieldCheck size={25} color="#10b981" />
          </View>

          {/* Header */}
          <Text style={styles.title}>Verify your identity</Text>

          <Text style={styles.description}>
            Enter the 6-digit verification code sent to your email to
            continue changing your password.
          </Text>

          {/* Hidden input */}
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleChange}
            keyboardType="number-pad"
            maxLength={6}
            autoComplete="one-time-code"
            textContentType="oneTimeCode"
            style={styles.hiddenInput}
            autoFocus={false}
          />

          {/* Code boxes */}
          <Pressable
            style={styles.codeContainer}
            onPress={() => inputRef.current?.focus()}
            disabled={busy}
          >
            {Array.from({ length: 6 }).map((_, index) => {
              const digit = code[index];
              const isActive = index === code.length;

              return (
                <View
                  key={index}
                  style={[
                    styles.codeBox,
                    isActive && styles.codeBoxActive,
                  ]}
                >
                  <Text style={styles.codeText}>
                    {digit || ""}
                  </Text>
                </View>
              );
            })}
          </Pressable>

          {/* Verify */}
          <Pressable
            onPress={handleVerify}
            disabled={code.length !== 6 || busy}
            style={[
              styles.verifyButton,
              (code.length !== 6 || busy) &&
                styles.verifyButtonDisabled,
            ]}
          >
            <Text style={styles.verifyText}>
              {isVerifying ? "Verifying..." : "Verify code"}
            </Text>
          </Pressable>

          {/* Resend */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendLabel}>
              Didn't receive the code?
            </Text>

            <Pressable
              onPress={handleResend}
              disabled={timer > 0 || busy}
            >
              <Text
                style={[
                  styles.resendButton,
                  (timer > 0 || busy) &&
                    styles.resendButtonDisabled,
                ]}
              >
                {isResending
                  ? "Sending..."
                  : timer > 0
                    ? `Resend in ${timer}s`
                    : "Resend code"}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#ecfdf5",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 14,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },

  description: {
    fontSize: 13,
    lineHeight: 19,
    color: "#64748b",
    textAlign: "center",
    maxWidth: 310,
  },

  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },

  codeContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 24,
    marginBottom: 22,
  },

  codeBox: {
    width: 43,
    height: 50,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },

  codeBoxActive: {
    borderColor: "#10b981",
    backgroundColor: "#ffffff",
    borderWidth: 2,
  },

  codeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },

  verifyButton: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
  },

  verifyButtonDisabled: {
    backgroundColor: "#a7f3d0",
  },

  verifyText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  resendContainer: {
    marginTop: 18,
    alignItems: "center",
  },

  resendLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 5,
  },

  resendButton: {
    fontSize: 13,
    fontWeight: "700",
    color: "#10b981",
  },

  resendButtonDisabled: {
    color: "#94a3b8",
  },
});