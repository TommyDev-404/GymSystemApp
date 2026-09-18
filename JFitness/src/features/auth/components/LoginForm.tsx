import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/utils/theme";
import FormField from "@/features/auth/components/FormField";
import PrimaryButton from "@/features/auth/components/PrimaryButton";

type Props = {
  onForgotPassword: () => void;
};

export function LoginForm({ onForgotPassword }: Props) {
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

    } catch (error: unknown) {
      console.log("LOGIN FORM CATCH:", error);
    
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

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

      <View style={styles.passwordField}>
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
      </View>

      <View style={styles.optionsRow}>
        <TouchableOpacity
          style={styles.showPasswordRow}
          onPress={() => setShowPassword((prev) => !prev)}
          activeOpacity={0.7}
        >
          <View
            style={[styles.checkbox, showPassword && styles.checkboxChecked]}
          >
            {showPassword ? <Text style={styles.checkMark}>✓</Text> : null}
          </View>
          <Text style={styles.checkboxLabel}>Show password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton
        title={isLoading ? "Signing in..." : "Login"}
        onPress={() => {
          console.log("BUTTON CALLBACK");
          handleLogin();
        }}
        loading={isLoading}
        disabled={isLoading}
      />

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.activateButton} activeOpacity={0.75}>
        <Text style={styles.activateButtonText}>Activate Membership</Text>
      </TouchableOpacity>

      <Text style={styles.activateHint}>
        Already a gym member? Use your membership code
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  checkboxLabel: {
    color: theme.textSub,
    fontSize: 13,
    fontWeight: "500",
  },
  forgotText: {
    color: theme.primary,
    fontSize: 13,
    fontWeight: "600",
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
    borderWidth: 1,
    borderColor: theme.borderStrong,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activateButtonText: {
    color: theme.text,
    fontSize: 14,
    fontWeight: "700",
  },
  activateHint: {
    marginTop: 9,
    color: theme.textMuted,
    fontSize: 11.5,
    textAlign: "center",
    lineHeight: 16,
  },
});