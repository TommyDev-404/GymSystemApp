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
import { Check } from "lucide-react-native";


export default function ForgotPasswordScreen() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSendEmail = async () => {
    try {
      setIsLoading(true);
  
      const res = await api.sendOtpApi(email);
  
      if (res.success) {
        setStep(2);
      } else {
        console.log("Something went wrong.");
      }
  
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCodeVerify = async () => {
    try {
      setIsLoading(true);
  
      const res = await api.verifyOtpApi({
        email,
        code,
      });
  
      if (res.success) {
        setStep(3);
      } else {
        console.log(res.message);
      }
  
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResetPassword = async () => {
    if (password !== confirm) return;
  
    try {
      setIsLoading(true);
      
      const res = await api.resetPasswordApi({ email, newPassword: confirm });

      if (res.success) {
        router.replace("/(auth)/login");
      } else {
        console.log("Failed to update password");
      }
  
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSubtitle = () => {
    if (step === 1) return "Enter your email to receive a recovery code";
    if (step === 2) return "Enter the 6-digit recovery code";
    return "Create your new password";
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle={getSubtitle()}
    >
      {/* STEP 1: EMAIL */}
      {step === 1 && (
        <>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TouchableOpacity
            style={[
              styles.button,
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleSendEmail}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                Send Recovery Code
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}

      {/* STEP 2: CODE */}
      {step === 2 && (
        <>
          <TextInput
            placeholder="6-digit code"
            placeholderTextColor="#94a3b8"
            value={code}
            onChangeText={(t) =>
              setCode(t.replace(/\D/g, "").slice(0, 6))
            }
            keyboardType="numeric"
            maxLength={6}
            style={[styles.input, styles.codeInput]}
          />

          <TouchableOpacity
            style={[
              styles.button,
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleCodeVerify}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                Verify Code
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}

      {/* STEP 3: PASSWORD */}
      {step === 3 && (
        <>
          <TextInput
            placeholder="New Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry={!showPassword}
            value={confirm}
            onChangeText={setConfirm}
            style={styles.input}
          />

          {/* SHOW PASSWORD */}
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setShowPassword(!showPassword)}
          >
            <View
              style={
                showPassword
                  ? styles.checkedBox
                  : styles.box
              }
            >
              {showPassword && (
                <Check
                  size={14}
                  color="#fff"
                />
              )}
            </View>

            <Text style={styles.checkboxText}>
              Show password
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.button,
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                Reset Password
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}

      {/* BACK */}
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/login")}
        style={{ marginTop: 18 }}
      >
        <Text style={styles.backText}>Back to login</Text>
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
  
   buttonDisabled: {
    opacity: 0.7,
  },
   codeInput: {
     textAlign: "center",
     letterSpacing: 6,
     fontSize: 18,
   },
 
   button: {
     backgroundColor: "#10b981",
     padding: 16,
     borderRadius: 14,
     alignItems: "center",
     marginTop: 6,
   },
 
   buttonText: {
     color: "#fff",
     fontWeight: "700",
     fontSize: 15,
   },
 
   backText: {
     textAlign: "center",
     color: "#64748b",
     fontSize: 13,
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
 });