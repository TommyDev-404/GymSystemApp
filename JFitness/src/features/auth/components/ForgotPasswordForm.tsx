import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ShieldCheck } from "lucide-react-native";
import * as api from "@/features/auth/api/auth.api";
import { theme } from "@/utils/theme";
import FormField from "@/features/auth/components/FormField";
import PrimaryButton from "@/features/auth/components/PrimaryButton";

type Props = {
  onBack: () => void;
  onSuccess?: () => void; // optional – call this when password is reset
};

export function ForgotPasswordForm({ onBack, onSuccess }: Props) {
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const clearError = () => {
    if (errorMessage) setErrorMessage("");
  };

  const handleSendEmail = async () => {
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      setErrorMessage("");
      setIsLoading(true);
      const res = await api.sendOtpApi(email);
      if (res.success) {
        setStep(2);
      } else {
        setErrorMessage(res.message || "Failed to send recovery code.");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeVerify = async () => {
    if (code.length !== 6) {
      setErrorMessage("Please enter the 6-digit code.");
      return;
    }

    try {
      setErrorMessage("");
      setIsLoading(true);
      const res = await api.verifyOtpApi({ email, code });
      if (res.success) {
        setStep(3);
      } else {
        setErrorMessage(res.message || "Invalid verification code.");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to verify code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!password || !confirm) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setErrorMessage("");
      setIsLoading(true);
      const res = await api.resetPasswordApi({
        email,
        newPassword: confirm,
      });
      if (res.success) {
        onSuccess?.();
        onBack(); // go back to login after success
      } else {
        setErrorMessage(res.message || "Failed to update password.");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {/* ===== Step Indicator ===== */}
      <View style={styles.stepsContainer}>
        {[1, 2, 3].map((item, index) => {
          const isActive = step === item;
          const isCompleted = step > item;

          return (
            <React.Fragment key={item}>
              <View
                style={[
                  styles.stepCircle,
                  isCompleted && styles.stepCircleCompleted,
                  isActive && styles.stepCircleActive,
                ]}
              >
                {isCompleted ? (
                  <Text style={styles.stepCheck}>✓</Text>
                ) : (
                  <Text
                    style={[
                      styles.stepNumber,
                      (isActive || isCompleted) && styles.stepNumberActive,
                    ]}
                  >
                    {item}
                  </Text>
                )}
              </View>

              {index < 2 && (
                <View
                  style={[
                    styles.stepLine,
                    step > item && styles.stepLineActive,
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* ===== Error ===== */}
      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {/* ===== STEP 1 – Email ===== */}
      {step === 1 && (
        <View>
          <FormField
            label="EMAIL ADDRESS"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              clearError();
            }}
            placeholder="your@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.buttonSpacing}>
            <PrimaryButton
              title={isLoading ? "Sending..." : "Send Recovery Code"}
              onPress={handleSendEmail}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </View>
      )}

      {/* ===== STEP 2 – OTP ===== */}
      {step === 2 && (
        <View>
          <View style={styles.infoCard}>
            <View style={styles.iconBox}>
              <ShieldCheck
                size={22}
                color={theme.primary}
                strokeWidth={2.2}
              />
            </View>
            <Text style={styles.infoText}>
              We sent a verification code to{"\n"}
              <Text style={styles.emailHighlight}>{email}</Text>
            </Text>
          </View>

          <FormField
            label="VERIFICATION CODE"
            value={code}
            onChangeText={(t) => {
              setCode(t.replace(/\D/g, "").slice(0, 6));
              clearError();
            }}
            placeholder="------"
            keyboardType="numeric"
            autoCapitalize="none"
          />

          <View style={styles.buttonSpacing}>
            <PrimaryButton
              title={isLoading ? "Verifying..." : "Verify Code"}
              onPress={handleCodeVerify}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </View>
      )}

      {/* ===== STEP 3 – New Password ===== */}
      {step === 3 && (
        <View>
          <FormField
            label="NEW PASSWORD"
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              clearError();
            }}
            placeholder="Minimum 8 characters"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />

          <View style={{ marginTop: 6 }}>
            <FormField
              label="CONFIRM PASSWORD"
              value={confirm}
              onChangeText={(t) => {
                setConfirm(t);
                clearError();
              }}
              placeholder="Re-enter your password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={styles.showPasswordRow}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                showPassword && styles.checkboxChecked,
              ]}
            >
              {showPassword && <Text style={styles.checkMark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Show password</Text>
          </TouchableOpacity>

          <PrimaryButton
            title={isLoading ? "Updating..." : "Reset Password"}
            onPress={handleResetPassword}
            loading={isLoading}
            disabled={isLoading}
          />
        </View>
      )}

      {/* ===== Back to Login ===== */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Text style={styles.backText}>
          Remember your password?{" "}
          <Text style={styles.backHighlight}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: theme.borderStrong,
    backgroundColor: theme.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleActive: {
    borderColor: theme.primary,
    backgroundColor: theme.accentWash,
  },
  stepCircleCompleted: {
    borderColor: theme.primary,
    backgroundColor: theme.primary,
  },
  stepNumber: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.textMuted,
  },
  stepNumberActive: {
    color: theme.primary,
  },
  stepCheck: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ffffff",
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: theme.border,
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: theme.primary,
  },

  errorBox: {
    backgroundColor: theme.errorBg,
    borderWidth: 1,
    borderColor: theme.errorBorder,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  errorText: {
    color: theme.errorText,
    fontSize: 13.5,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 18,
  },

  infoCard: {
    backgroundColor: theme.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 16,
    alignItems: "center",
    marginBottom: 18,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  infoText: {
    textAlign: "center",
    color: theme.textSub,
    fontSize: 13.5,
    lineHeight: 19,
  },
  emailHighlight: {
    color: theme.primary,
    fontWeight: "700",
  },

  showPasswordRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
    marginBottom: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: theme.borderStrong,
    backgroundColor: theme.inputBg,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  checkMark: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
  },
  checkboxLabel: {
    fontSize: 13,
    color: theme.textSub,
    fontWeight: "500",
  },

  buttonSpacing: {
    marginTop: 8,
  },

  backButton: {
    marginTop: 28,
    alignItems: "center",
  },
  backText: {
    color: theme.textSub,
    fontSize: 13.5,
  },
  backHighlight: {
    color: theme.primary,
    fontWeight: "700",
  },
});