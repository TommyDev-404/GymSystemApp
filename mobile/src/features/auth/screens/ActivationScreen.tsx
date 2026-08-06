import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { ShieldCheck } from "lucide-react-native";

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
        console.log("Invalid or expired code. Try again");
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
      subtitle="Verify your membership before creating your account."
    >
      <View style={styles.infoCard}>
        <View style={styles.iconContainer}>
          <ShieldCheck
            size={28}
            color="#10b981"
          />
        </View>

        <Text style={styles.infoTitle}>
          Membership Verification
        </Text>

        <Text style={styles.infoText}>
          Enter the activation code provided by the gym staff to continue creating
          your account.
        </Text>
      </View>

      <Text style={styles.label}>
        Activation Code
      </Text>

      <TextInput
        keyboardType="numeric"
        placeholder="Enter 6-digit code"
        placeholderTextColor="#94a3b8"
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
        autoCorrect={false}
        style={styles.input}
      />

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
          />
        ) : (
          <Text style={styles.buttonText}>
            Verify Membership
          </Text>
        )}
      </TouchableOpacity>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 22,
    alignItems: "center",
    marginBottom: 26,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ecfdf5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },

  infoText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 14,
    lineHeight: 22,
  },

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
    fontSize: 16,
    color: "#0f172a",
    marginBottom: 22,
    letterSpacing: 1,

    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  button: {
    backgroundColor: "#10b981",
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: "center",

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
    fontWeight: "700",
    fontSize: 16,
  },
});