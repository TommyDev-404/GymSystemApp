import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ShieldCheck, CheckCircle2 } from "lucide-react-native";
import { EaseView } from "react-native-ease";
import { AuthLayout } from "@/features/auth/layout/AuthLayout";
import * as api from "@/features/auth/api/auth.api";
import { theme } from "@/utils/theme";
import FormField from "@/features/auth/components/FormField";
import PrimaryButton from "@/features/auth/components/PrimaryButton";

export default function ActivateScreen() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCodeChange = (text: string) => {
    setCode(text);
    if (error) setError("");
  };

	const handleActivate = async () => {
    if (!code.trim()) {
      setError("Please enter your activation code.");
      return;
    }

    try {
      setError("");
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
        setError("Invalid or expired code. Please try again.");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Activate Membership"
      subtitle="Verify your membership before creating your account"
    >
      <EaseView
        initialAnimate={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 400,
          delay: 80,
          easing: "easeOut",
        }}
        style={styles.container}
      >
        <EaseView
          initialAnimate={{ opacity: 0, translateY: -15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 380,
            delay: 120,
            easing: "easeOut",
          }}
          style={styles.infoCard}
        >
          <EaseView
            initialAnimate={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "timing",
              duration: 320,
              delay: 160,
              easing: "easeOut",
            }}
            style={styles.iconContainer}
          >
            <ShieldCheck
              size={24}
              color={theme.primary}
              strokeWidth={2.2}
            />
          </EaseView>

          <Text style={styles.infoTitle}>Membership Verification</Text>

          <Text style={styles.infoText}>
            Enter the activation code provided by the gym staff to continue
            creating your account.
          </Text>
        </EaseView>

        {error ? (
          <EaseView
            initialAnimate={{ opacity: 0, translateY: -8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "timing",
              duration: 250,
              easing: "easeOut",
            }}
            style={styles.errorBox}
          >
            <Text style={styles.errorText}>{error}</Text>
          </EaseView>
        ) : null}

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 380,
            delay: 200,
            easing: "easeOut",
          }}
        >
          <FormField
            label="ACTIVATION CODE"
            value={code}
            onChangeText={handleCodeChange}
            placeholder="Enter 6-digit code"
            keyboardType="numeric"
            autoCapitalize="characters"
          />
        </EaseView>

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 380,
            delay: 260,
            easing: "easeOut",
          }}
          style={styles.buttonContainer}
        >
          <PrimaryButton
            title={isLoading ? "Verifying..." : "Verify Membership"}
            onPress={handleActivate}
            loading={isLoading}
            disabled={isLoading}
          />
        </EaseView>

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 350,
            delay: 320,
            easing: "easeOut",
          }}
          style={styles.howItWorks}
        >
          <View style={styles.howHeader}>
            <View style={styles.howIcon}>
              <CheckCircle2
                size={14}
                color={theme.primary}
                strokeWidth={2.2}
              />
            </View>

            <Text style={styles.howTitle}>How activation works</Text>
          </View>

          <Text style={styles.howText}>
            Enter your code, verify your membership, and continue to create
            your account.
          </Text>
        </EaseView>

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 350,
            delay: 370,
            easing: "easeOut",
          }}
        >
			<Text 
            onPress={() => router.replace("/(auth)/login")}
			 	style={styles.backText}
			>
            Already have an account?{" "}
            <Text style={styles.backHighlight}>
              Sign In
            </Text>
          </Text>
        </EaseView>
      </EaseView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  infoCard: {
    backgroundColor: theme.surface,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.border,
    paddingVertical: 13,
    paddingHorizontal: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7,
  },

  infoTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: theme.text,
    marginBottom: 3,
  },

  infoText: {
    textAlign: "center",
    color: theme.textSub,
    fontSize: 11.5,
    lineHeight: 16,
  },

  errorBox: {
    backgroundColor: theme.errorBg,
    borderWidth: 1,
    borderColor: theme.errorBorder,
    borderRadius: 9,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 8,
  },

  errorText: {
    color: theme.errorText,
    fontSize: 11.5,
    lineHeight: 15,
    textAlign: "center",
    fontWeight: "500",
  },

  buttonContainer: {
    marginTop: 7,
  },

  howItWorks: {
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    borderRadius: 11,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 9,
  },

  howHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },

  howIcon: {
    width: 23,
    height: 23,
    borderRadius: 6,
    backgroundColor: theme.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  howTitle: {
    color: theme.text,
    fontSize: 11.5,
    fontWeight: "700",
  },

  howText: {
    color: theme.textMuted,
    fontSize: 10.5,
    lineHeight: 14,
  },

  backText: {
    color: theme.textSub,
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },

  backHighlight: {
    color: theme.primary,
    fontWeight: "700",
  },
});