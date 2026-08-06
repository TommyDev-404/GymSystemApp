import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";

import { AuthLayout } from "@/features/auth/layout/AuthLayout";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);

      await login(email, password);

      router.replace("/(app)/(tabs)/home");
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="JFitness Gym"
      subtitle="Welcome back, let's train!"
    >
      {/* EMAIL */}
      <Text style={styles.label}>Email Address</Text>

      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/* PASSWORD */}
      <Text style={styles.label}>Password</Text>

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#94a3b8"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeButton}
        >
          {showPassword ? (
            <EyeOff
              size={20}
              color="#64748b"
            />
          ) : (
            <Eye
              size={20}
              color="#64748b"
            />
          )}
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>
          {errorMessage}
        </Text>
      ) : null}

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={[
          styles.button,
          isLoading && styles.buttonDisabled,
        ]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator
            color="#fff"
          />
        ) : (
          <Text style={styles.buttonText}>
            Login
          </Text>
        )}
      </TouchableOpacity>

      {/* FORGOT PASSWORD */}
      <TouchableOpacity
        style={styles.forgotContainer}
        onPress={() =>
          router.push("/(auth)/forgot-password")
        }
      >
        <Text style={styles.forgotText}>
          Forgot your password?
        </Text>
      </TouchableOpacity>

      {/* ACTIVATE ACCOUNT */}
      <View style={styles.activationCard}>
        <Text style={styles.activationTitle}>
          Already a gym member?
        </Text>

        <Text style={styles.activationSubtitle}>
          Activate your account using your membership code.
        </Text>

        <TouchableOpacity
          style={styles.activationButton}
          onPress={() =>
            router.push("/(auth)/account-activation")
          }
        >
          <Text style={styles.activationButtonText}>
            Activate Account
          </Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
    marginLeft: 2,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
    color: "#0f172a",
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
    color: "#0f172a",
    fontSize: 15,
  },

  eyeButton: {
    paddingHorizontal: 16,
  },

  errorText: {
    color: "#ef4444",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#10b981",
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 6,

    shadowColor: "#10b981",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  forgotContainer: {
    alignItems: "center",
    marginTop: 18,
  },

  forgotText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
  },

  activationCard: {
    marginTop: 30,
    backgroundColor: "#f8fafc",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },

  activationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },

  activationSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
  },

  activationButton: {
    marginTop: 18,
    backgroundColor: "#10b981",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },

  activationButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});