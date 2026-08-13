import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Check } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AuthLayout } from "@/features/auth/layout/AuthLayout";
import * as api from "@/features/auth/api/auth.api";
import { useAuth } from "@/context/AuthContext";

export default function CreateAccountScreen() {
  const { createAccount } = useAuth();
  const { username, id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleCreate = async () => {
    if (!password || password !== confirm) {
      console.log("Password mismatch");
      return;
    }
  
    try {
      setIsLoading(true);
  
      await createAccount(Number(id), confirm);
  
      router.replace("/(app)/(tabs)/home");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Set your password to activate your membership"
    >
      {/* USERNAME */}
      <TextInput
        value={String(username || "")}
        editable={false}
        style={[styles.input, styles.disabled]}
      />

      {/* PASSWORD */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* CONFIRM PASSWORD */}
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry={!showPassword}
        value={confirm}
        onChangeText={setConfirm}
        style={styles.input}
      />

      {/* CHECKBOX */}
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setShowPassword(!showPassword)}
      >
        <View style={showPassword ? styles.checkedBox : styles.box}>
          {showPassword && <Check size={14} color="#fff" />}
        </View>

        <Text style={styles.checkboxText}>Show password</Text>
      </TouchableOpacity>

      {/* BUTTON */}
      <TouchableOpacity
        style={[
          styles.button,
          isLoading && styles.buttonDisabled,
        ]}
        onPress={handleCreate}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color="#fff"
          />
        ) : (
          <Text style={styles.buttonText}>
            Create Account
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
     padding: 14,
     borderRadius: 14,
     marginBottom: 12,
     color: "#0f172a",
   },
 
   disabled: {
     backgroundColor: "#f1f5f9",
     color: "#64748b",
    },
    
    buttonDisabled: {
      opacity: 0.7,
    },
 
   checkbox: {
     flexDirection: "row",
     alignItems: "center",
     gap: 10,
     marginBottom: 10,
   },
 
   box: {
     width: 18,
     height: 18,
     borderRadius: 4,
     borderWidth: 1,
     borderColor: "#cbd5e1",
     backgroundColor: "#fff",
     justifyContent: "center",
     alignItems: "center",
   },
 
   checkedBox: {
     width: 18,
     height: 18,
     borderRadius: 4,
     backgroundColor: "#10b981",
     borderWidth: 1,
     borderColor: "#10b981",
     justifyContent: "center",
     alignItems: "center",
   },
 
   checkboxText: {
     fontSize: 13,
     color: "#64748b",
   },
 
   button: {
     backgroundColor: "#10b981",
     padding: 16,
     borderRadius: 14,
     alignItems: "center",
     marginTop: 10,
   },
 
   buttonText: {
     color: "#fff",
     fontWeight: "700",
     fontSize: 15,
   },
 });