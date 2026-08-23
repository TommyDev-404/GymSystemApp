import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { EaseView } from "react-native-ease";
import { AuthLayout } from "@/features/auth/layout/AuthLayout";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/utils/theme";
import FormField from "@/features/auth/components/FormField";
import PrimaryButton from "@/features/auth/components/PrimaryButton";
import { router } from "expo-router";

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      setErrorMessage("");
      setIsLoading(true);
      await login(username, password);
      
      router.push('/(app)/(tabs)/home')
    } catch (error: any) {
      setErrorMessage(error?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Let's train!">
      <EaseView
        initialAnimate={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 450,
          delay: 60,
          easing: "easeOut",
        }}
        style={styles.form}
      >
        {errorMessage ? (
          <EaseView
            initialAnimate={{ opacity: 0, translateY: -12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "timing",
              duration: 300,
              easing: "easeOut",
            }}
            style={styles.errorBox}
          >
            <Text style={styles.errorText}>{errorMessage}</Text>
          </EaseView>
        ) : null}

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 450,
            delay: 100,
            easing: "easeOut",
          }}
        >
          <FormField
            label="USERNAME"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (errorMessage) setErrorMessage("");
            }}
            placeholder="Enter your username"
            autoCapitalize="none"
          />
        </EaseView>

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 450,
            delay: 160,
            easing: "easeOut",
          }}
          style={styles.passwordField}
        >
          <FormField
            label="PASSWORD"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errorMessage) setErrorMessage("");
            }}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
        </EaseView>

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 450,
            delay: 220,
            easing: "easeOut",
          }}
          style={styles.optionsRow}
        >
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
              {showPassword ? (
                <Text style={styles.checkMark}>✓</Text>
              ) : null}
            </View>
            <Text style={styles.checkboxLabel}>Show password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/forgot-password")}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </EaseView>

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 450,
            delay: 280,
            easing: "easeOut",
          }}
        >
          <PrimaryButton
            title={isLoading ? "Signing in..." : "Login"}
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
          />
        </EaseView>

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 450,
            delay: 340,
            easing: "easeOut",
          }}
        >
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.activateButton}
            onPress={() => router.push("/(auth)/account-activation")}
            activeOpacity={0.75}
          >
            <Text style={styles.activateButtonText}>
              Activate Membership
            </Text>
          </TouchableOpacity>

          <Text style={styles.activateHint}>
            Already a gym member? Use your membership code
          </Text>
        </EaseView>
      </EaseView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  errorBox: {
    backgroundColor: theme.errorBg,
    borderWidth: 1,
    borderColor: theme.errorBorder,
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 13,
    marginBottom: 16,
  },
  errorText: {
    color: theme.errorText,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.05,
  },
  passwordField: {
    marginTop: 6,
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  showPasswordRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    lineHeight: 13,
  },
  checkboxLabel: {
    color: theme.textSub,
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.05,
  },
  forgotText: {
    color: theme.primary,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.05,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.border,
  },
  dividerText: {
    marginHorizontal: 12,
    color: theme.textMuted,
    fontSize: 10.5,
    fontWeight: "600",
    letterSpacing: 1,
  },
  activateButton: {
    minHeight: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    borderRadius: 12,
    backgroundColor: theme.accentWash,
    alignItems: "center",
    justifyContent: "center",
  },
  activateButtonText: {
    color: theme.primary,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.1,
  },
  activateHint: {
    marginTop: 9,
    paddingHorizontal: 10,
    color: theme.textMuted,
    fontSize: 11.5,
    fontWeight: "400",
    lineHeight: 16,
    textAlign: "center",
  },
});