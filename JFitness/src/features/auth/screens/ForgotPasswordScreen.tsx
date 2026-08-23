import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import {
  ShieldCheck,
  Mail,
  KeyRound,
  LockKeyhole,
  CircleCheck,
} from "lucide-react-native";
import { EaseView } from "react-native-ease";
import { AuthLayout } from "@/features/auth/layout/AuthLayout";
import * as api from "@/features/auth/api/auth.api";
import { theme } from "@/utils/theme";
import FormField from "@/features/auth/components/FormField";
import PrimaryButton from "@/features/auth/components/PrimaryButton";

export default function ForgotPasswordScreen() {
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
      setErrorMessage(error?.message || "Something went wrong.");
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
      setErrorMessage(error?.message || "Failed to verify code.");
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
        router.replace("/(auth)/login");
      } else {
        setErrorMessage(res.message || "Failed to update password.");
      }
    } catch (error: any) {
      setErrorMessage(error?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    if (step === 1) return "Forgot Password";
    if (step === 2) return "Verify Your Email";
    return "Create New Password";
  };

  const getSubtitle = () => {
    if (step === 1) return "Enter your email to receive a verification code";
    if (step === 2) return "Enter the 6-digit code we sent to your email";
    return "Create a new secure password";
  };

  const animation = (delay = 0) => ({
    initialAnimate: { opacity: 0, translateY: -24 },
    animate: { opacity: 1, translateY: 0 },
    transition: {
      type: "timing" as const,
      duration: 450,
      delay,
      easing: "easeOut" as const,
    },
  });

  return (
    <AuthLayout title={getTitle()} subtitle={getSubtitle()}>
      <View style={styles.container}>
        <EaseView {...animation(60)} style={styles.stepsContainer}>
          {[1, 2, 3].map((item, index) => {
            const isActive = step === item;
            const isCompleted = step > item;

            return (
              <React.Fragment key={item}>
                <EaseView
                  initialAnimate={{ opacity: 0, translateY: -12 }}
                  animate={{
                    opacity: 1,
                    translateY: 0,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{
                    type: "timing",
                    duration: 300,
                    delay: 100 + index * 60,
                    easing: "easeOut",
                  }}
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
                        isActive && styles.stepNumberActive,
                      ]}
                    >
                      {item}
                    </Text>
                  )}
                </EaseView>

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
        </EaseView>

        {errorMessage ? (
          <EaseView
            {...animation(80)}
            transition={{
              type: "timing",
              duration: 280,
              delay: 0,
              easing: "easeOut",
            }}
            style={styles.errorBox}
          >
            <Text style={styles.errorText}>{errorMessage}</Text>
          </EaseView>
        ) : null}

        {step === 1 && (
          <EaseView {...animation(120)} style={styles.formSection}>
            <FormField
              label="EMAIL ADDRESS"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                clearError();
              }}
              placeholder="your@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <EaseView {...animation(180)} style={styles.buttonSpacing}>
              <PrimaryButton
                title={isLoading ? "Sending..." : "Send Recovery Code"}
                onPress={handleSendEmail}
                loading={isLoading}
                disabled={isLoading}
              />
            </EaseView>
          </EaseView>
        )}

        {step === 2 && (
          <EaseView {...animation(120)} style={styles.formSection}>
            <EaseView {...animation(170)} style={styles.infoCard}>
              <View style={styles.iconBox}>
                <ShieldCheck
                  size={20}
                  color={theme.primary}
                  strokeWidth={2.2}
                />
              </View>

              <Text style={styles.infoText}>
                We sent a verification code to{"\n"}
                <Text style={styles.emailHighlight}>{email}</Text>
              </Text>
            </EaseView>

            <EaseView {...animation(220)}>
              <FormField
                label="VERIFICATION CODE"
                value={code}
                onChangeText={(text) => {
                  setCode(text.replace(/\D/g, "").slice(0, 6));
                  clearError();
                }}
                placeholder="------"
                keyboardType="numeric"
                autoCapitalize="none"
              />
            </EaseView>

            <EaseView {...animation(280)} style={styles.buttonSpacing}>
              <PrimaryButton
                title={isLoading ? "Verifying..." : "Verify Code"}
                onPress={handleCodeVerify}
                loading={isLoading}
                disabled={isLoading}
              />
            </EaseView>
          </EaseView>
        )}

        {step === 3 && (
          <EaseView {...animation(120)} style={styles.formSection}>
            <EaseView {...animation(170)}>
              <FormField
                label="NEW PASSWORD"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  clearError();
                }}
                placeholder="Minimum 8 characters"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            </EaseView>

            <EaseView {...animation(220)} style={styles.confirmPassword}>
              <FormField
                label="CONFIRM PASSWORD"
                value={confirm}
                onChangeText={(text) => {
                  setConfirm(text);
                  clearError();
                }}
                placeholder="Re-enter your password"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            </EaseView>

            <EaseView {...animation(270)}>
              <TouchableOpacity
                style={styles.showPasswordRow}
                onPress={() => setShowPassword((prev) => !prev)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    showPassword && styles.checkboxChecked,
                  ]}
                >
                  {showPassword && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>

                <Text style={styles.checkboxLabel}>Show password</Text>
              </TouchableOpacity>
            </EaseView>

            <EaseView {...animation(320)}>
              <PrimaryButton
                title={isLoading ? "Updating..." : "Reset Password"}
                onPress={handleResetPassword}
                loading={isLoading}
                disabled={isLoading}
              />
            </EaseView>
          </EaseView>
        )}

        <EaseView {...animation(220)} style={styles.bottomSection}>
          {step === 1 && (
            <EaseView {...animation(260)} style={styles.helpSection}>
              <View style={styles.helpHeader}>
                <View style={styles.helpIcon}>
                  <LockKeyhole
                    size={16}
                    color={theme.primary}
                    strokeWidth={2.2}
                  />
                </View>

                <View style={styles.helpHeaderText}>
                  <Text style={styles.helpTitle}>
                    Secure account recovery
                  </Text>
                  <Text style={styles.helpSubtitle}>
                    Follow these steps to regain access.
                  </Text>
                </View>
              </View>

              <View style={styles.recoverySteps}>
                <RecoveryStep
                  icon={<Mail size={14} color={theme.primary} />}
                  title="Check your email"
                  description="We'll send a verification code to your registered email."
                />
                <RecoveryStep
                  icon={<KeyRound size={14} color={theme.primary} />}
                  title="Verify your identity"
                  description="Enter the 6-digit code we send you."
                />
                <RecoveryStep
                  icon={<LockKeyhole size={14} color={theme.primary} />}
                  title="Create a new password"
                  description="Set a strong password and regain access."
                />
              </View>
            </EaseView>
          )}

          {step === 2 && (
            <EaseView {...animation(260)} style={styles.securityNote}>
              <CircleCheck
                size={16}
                color={theme.primary}
                strokeWidth={2.2}
              />
              <Text style={styles.securityNoteText}>
                Your verification code helps make sure only you can reset this
                account.
              </Text>
            </EaseView>
          )}

          {step === 3 && (
            <EaseView {...animation(260)} style={styles.securityNote}>
              <ShieldCheck
                size={16}
                color={theme.primary}
                strokeWidth={2.2}
              />
              <Text style={styles.securityNoteText}>
                Use a password with at least 8 characters and avoid reusing old
                passwords.
              </Text>
            </EaseView>
          )}

          <EaseView {...animation(320)}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.replace("/(auth)/login")}
              activeOpacity={0.7}
            >
              <Text style={styles.backText}>
                Remember your password{" "}
                <Text style={styles.backHighlight}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </EaseView>
        </EaseView>
      </View>
    </AuthLayout>
  );
}

function RecoveryStep({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <EaseView
      initialAnimate={{ opacity: 0, translateY: -12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 350,
        delay: 80,
        easing: "easeOut",
      }}
      style={styles.recoveryStep}
    >
      <View style={styles.recoveryIcon}>{icon}</View>
      <View style={styles.recoveryContent}>
        <Text style={styles.recoveryTitle}>{title}</Text>
        <Text style={styles.recoveryDescription}>{description}</Text>
      </View>
    </EaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: "100%",
  },
  formSection: {
    width: "100%",
  },
  bottomSection: {
    marginTop: 16,
  },
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
    fontSize: 12.5,
    fontWeight: "700",
    color: theme.textMuted,
  },
  stepNumberActive: {
    color: theme.primary,
  },
  stepCheck: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  stepLine: {
    flex: 1,
    maxWidth: 48,
    height: 2,
    backgroundColor: theme.border,
    marginHorizontal: 6,
  },
  stepLineActive: {
    backgroundColor: theme.primary,
  },
  errorBox: {
    backgroundColor: theme.errorBg,
    borderWidth: 1,
    borderColor: theme.errorBorder,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  errorText: {
    color: theme.errorText,
    fontSize: 13,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 17,
  },
  infoCard: {
    backgroundColor: theme.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.border,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    marginBottom: 14,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  infoText: {
    textAlign: "center",
    color: theme.textSub,
    fontSize: 13,
    lineHeight: 18,
  },
  emailHighlight: {
    color: theme.primary,
    fontWeight: "700",
  },
  helpSection: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    borderRadius: 14,
    padding: 12,
  },
  helpHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  helpIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  helpHeaderText: {
    flex: 1,
  },
  helpTitle: {
    color: theme.text,
    fontSize: 13.5,
    fontWeight: "700",
  },
  helpSubtitle: {
    color: theme.textMuted,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 1,
  },
  recoverySteps: {
    gap: 8,
  },
  recoveryStep: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  recoveryIcon: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: theme.accentWash,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  recoveryContent: {
    flex: 1,
    paddingTop: 1,
  },
  recoveryTitle: {
    color: theme.text,
    fontSize: 12,
    fontWeight: "700",
  },
  recoveryDescription: {
    color: theme.textMuted,
    fontSize: 11,
    lineHeight: 14.5,
    marginTop: 1,
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  securityNoteText: {
    flex: 1,
    color: theme.textSub,
    fontSize: 11.5,
    lineHeight: 16,
  },
  confirmPassword: {
    marginTop: 4,
  },
  showPasswordRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
    marginBottom: 14,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 4,
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
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  checkboxLabel: {
    fontSize: 12.5,
    color: theme.textSub,
    fontWeight: "500",
  },
  buttonSpacing: {
    marginTop: 6,
  },
  backButton: {
    marginTop: 14,
    alignItems: "center",
    paddingVertical: 4,
  },
  backText: {
    color: theme.textSub,
    fontSize: 13,
  },
  backHighlight: {
    color: theme.primary,
    fontWeight: "700",
  },
});