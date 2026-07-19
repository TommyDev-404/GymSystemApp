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
import { AuthLayout } from "@/features/auth/layout/AuthLayout";
import * as api from "@/features/auth/api/auth.api";

export default function ActivateScreen() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleActivate = async () => {
    try {
      setIsLoading(true);

      const res = await api.verifyActivationCodeApi(code);

      if (res.success) {
        router.push({
          pathname: "/(auth)/create-account",
          params: {
            username: res.data.username,
            id: res.data.memberId,
          },
        });
      } else {
        console.log("Invalid or expired code. Try again")
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Activate Membership"
      subtitle="Enter your activation code to continue"
    >
      {/* INPUT */}
      <TextInput
        placeholder="e.g. GYM-8K2P9X"
        placeholderTextColor="#94a3b8"
        keyboardType="numeric"
        value={code}
        onChangeText={setCode}
        style={styles.input}
        autoCapitalize="characters"
      />

      {/* BUTTON */}
      <TouchableOpacity
        style={[
          styles.button,
          isLoading && styles.buttonDisabled,
        ]}
        onPress={handleActivate}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator
            color="#fff"
            size="small"
          />
        ) : (
          <Text style={styles.buttonText}>
            Verify Code
          </Text>
        )}
      </TouchableOpacity>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
    color: "#0f172a",
  },

  button: {
    backgroundColor: "#10b981",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});