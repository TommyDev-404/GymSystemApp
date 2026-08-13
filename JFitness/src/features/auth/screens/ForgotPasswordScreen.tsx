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
import {
  Eye,
  EyeOff,
  Check,
  Mail,
  ShieldCheck,
  Lock,
} from "lucide-react-native";

import { AuthLayout } from "@/features/auth/layout/AuthLayout";
import * as api from "@/features/auth/api/auth.api";

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState(1);

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSendEmail = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      
      const res = await api.sendOtpApi(email);
  
      if (res.success) {
        setStep(2);
      } else {
        setErrorMessage(
          res.message || "Failed to send recovery code."
        );
      }
  
    } catch (error: any) {
      setErrorMessage(
        error.message || "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeVerify = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      
      const res = await api.verifyOtpApi({
        email,
        code,
      });
  
      if (res.success) {
        setStep(3);
      } else {
        setErrorMessage(
          res.message || "Invalid verification code."
        );
      }
  
    } catch (error: any) {
      setErrorMessage(
        error.message || "Failed to verify code."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
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
        setErrorMessage(
          res.message || "Failed to update password."
        );
      }
  
    } catch (error: any) {
      setErrorMessage(
        error.message || "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getSubtitle = () => {
    if (step === 1)
      return "Enter your email to receive a recovery code";

    if (step === 2)
      return "Enter the 6-digit verification code";

    return "Create a new secure password";
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle={getSubtitle()}
    >
      {/* STEP INDICATOR */}
      <View style={styles.steps}>
        {[1,2,3].map((item) => (
          <View
            key={item}
            style={[
              styles.step,
              step >= item && styles.activeStep,
            ]}
          />
        ))}
      </View>

      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <Text style={styles.label}>
            Email Address
          </Text>

          <View style={styles.inputWrapper}>
            <Mail
              size={20}
              color="#64748b"
            />

            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <PrimaryButton
            loading={isLoading}
            text="Send Recovery Code"
            onPress={handleSendEmail}
          />
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <View style={styles.infoCard}>
            <ShieldCheck
              size={28}
              color="#10b981"
            />

            <Text style={styles.infoText}>
              We sent a verification code to
              {"\n"}
              {email}
            </Text>
          </View>

          <Text style={styles.label}>
            Verification Code
          </Text>

          <TextInput
            placeholder="------"
            placeholderTextColor="#94a3b8"
            value={code}
            onChangeText={(t) =>
              setCode(
                t.replace(/\D/g, "")
                .slice(0,6)
              )
            }
            keyboardType="numeric"
            maxLength={6}
            style={[
              styles.input,
              styles.codeInput,
            ]}
          />

          <PrimaryButton
            loading={isLoading}
            text="Verify Code"
            onPress={handleCodeVerify}
          />
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <Text style={styles.label}>
            New Password
          </Text>

          <PasswordInput
            value={password}
            onChangeText={setPassword}
            show={showPassword}
            setShow={setShowPassword}
          />

          <Text style={styles.label}>
            Confirm Password
          </Text>

          <PasswordInput
            value={confirm}
            onChangeText={setConfirm}
            show={showPassword}
            setShow={setShowPassword}
          />

          <TouchableOpacity
            style={styles.checkbox}
            onPress={() =>
              setShowPassword(!showPassword)
            }
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

          <PrimaryButton
            loading={isLoading}
            text="Reset Password"
            onPress={handleResetPassword}
          />
        </>
      )}

      <TouchableOpacity
        onPress={() =>
          router.replace("/(auth)/login")
        }
        style={styles.backButton}
      >
        <Text style={styles.backText}>
          Back to login
        </Text>
      </TouchableOpacity>


    </AuthLayout>
  );
}

function PrimaryButton({
  loading,
  text,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        loading && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff"/>
      ) : (
        <Text style={styles.buttonText}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

function PasswordInput({
  value,
  onChangeText,
  show,
  setShow,
}: any) {
  return (
    <View style={styles.passwordContainer}>
      <Lock
        size={20}
        color="#64748b"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter password"
        placeholderTextColor="#94a3b8"
        secureTextEntry={!show}
        style={styles.passwordInput}
      />

      <TouchableOpacity
        onPress={() => setShow(!show)}
      >
        {show ? (
          <EyeOff size={20} color="#64748b"/>
        ) : (
          <Eye size={20} color="#64748b"/>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  errorBox:{
    backgroundColor:"#fef2f2",
    borderWidth:1,
    borderColor:"#fecaca",
    padding:12,
    borderRadius:14,
    marginBottom:16,
  },
  
  errorText:{
    color:"#dc2626",
    fontSize:13,
    textAlign:"center",
    fontWeight:"500",
  },

  steps:{
    flexDirection:"row",
    gap:8,
    justifyContent:"center",
    marginBottom:30,
  },

  step:{
    width:45,
    height:5,
    borderRadius:10,
    backgroundColor:"#e2e8f0",
  },

  activeStep:{
    backgroundColor:"#10b981",
  },

  label:{
    fontSize:14,
    fontWeight:"600",
    color:"#1e293b",
    marginBottom:8,
  },

  inputWrapper:{
    flexDirection:"row",
    alignItems:"center",
    gap:10,
    backgroundColor:"#fff",
    borderWidth:1,
    borderColor:"#e2e8f0",
    borderRadius:16,
    paddingHorizontal:16,
    marginBottom:18,
  },

  input:{
    flex:1,
    paddingVertical:15,
    color:"#0f172a",
    fontSize:15,
  },

  codeInput:{
    textAlign:"center",
    fontSize:22,
    letterSpacing:8,
    backgroundColor:"#fff",
    borderWidth:1,
    borderColor:"#e2e8f0",
    borderRadius:16,
    marginBottom:20,
  },

  infoCard:{
    backgroundColor:"#ecfdf5",
    borderRadius:18,
    padding:18,
    alignItems:"center",
    marginBottom:25,
  },

  infoText:{
    marginTop:10,
    textAlign:"center",
    color:"#475569",
  },

  passwordContainer:{
    flexDirection:"row",
    alignItems:"center",
    gap:10,
    backgroundColor:"#fff",
    borderWidth:1,
    borderColor:"#e2e8f0",
    borderRadius:16,
    paddingHorizontal:16,
    marginBottom:18,
  },

  passwordInput:{
    flex:1,
    paddingVertical:15,
    color:"#0f172a",
  },

  button:{
    backgroundColor:"#10b981",
    paddingVertical:17,
    borderRadius:18,
    alignItems:"center",
    marginTop:8,
  },

  buttonDisabled:{
    opacity:.7,
  },

  buttonText:{
    color:"#fff",
    fontWeight:"700",
    fontSize:16,
  },

  checkbox:{
    flexDirection:"row",
    alignItems:"center",
    gap:10,
    marginBottom:15,
  },

  box:{
    width:18,
    height:18,
    borderRadius:4,
    borderWidth:1,
    borderColor:"#cbd5e1",
  },

  checkedBox:{
    width:18,
    height:18,
    borderRadius:4,
    backgroundColor:"#10b981",
    justifyContent:"center",
    alignItems:"center",
  },

  checkboxText:{
    color:"#64748b",
    fontSize:13,
  },

  backButton:{
    marginTop:24,
    alignItems:"center",
  },

  backText:{
    color:"#64748b",
    fontSize:14,
    fontWeight:"500",
  },

});