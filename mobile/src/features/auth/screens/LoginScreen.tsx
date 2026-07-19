import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
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
      title="Fitness Gym"
      subtitle="Welcome back, let’s train 💪"
    >
      {/* EMAIL */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/* PASSWORD */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
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
            <EyeOff size={20} color="#64748b" />
          ) : (
            <Eye size={20} color="#64748b" />
          )}
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>
          {errorMessage}
        </Text>
      ) : null}

      {/* BUTTON */}
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
            size="small"
            color="#fff"
          />
        ) : (
          <Text style={styles.buttonText}>
            Login
          </Text>
        )}
      </TouchableOpacity>


      {/* LINKS */}
      <View style={styles.links}>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/forgot-password")}
        >
          <Text style={styles.linkText}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/account-activation")}
        >
          <Text style={styles.linkTextBold}>
            Activate membership code
          </Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    color: "#0f172a",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    marginBottom: 12,
  },

  passwordInput: {
    flex: 1,
    padding: 14,
    color: "#0f172a",
  },

  eyeButton: {
    paddingHorizontal: 14,
  },

  button: {
    backgroundColor: "#10b981",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  links: {
    marginTop: 28,
    alignItems: "center",
    gap: 14,
  },

  linkText: {
    color: "#64748b",
    fontSize: 13,
  },

  linkTextBold: {
    color: "#10b981",
    fontWeight: "700",
    fontSize: 13,
  },
});