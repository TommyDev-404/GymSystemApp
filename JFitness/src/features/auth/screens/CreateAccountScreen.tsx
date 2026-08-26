import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { EaseView } from "react-native-ease";
import { AuthLayout } from "@/features/auth/layout/AuthLayout";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/utils/theme";
import FormField from "@/features/auth/components/FormField";
import PrimaryButton from "@/features/auth/components/PrimaryButton";

type CreateAccountForm = {
  username: string;
  password: string;
  confirm: string;
};

export default function CreateAccountScreen() {
  const { createAccount } = useAuth();
  const { id } = useLocalSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateAccountForm>({
    defaultValues: {
      username: "",
      password: "",
      confirm: "",
    },
  });

  const handleCreate = async (data: CreateAccountForm) => {
    try {
      setIsLoading(true);

      await createAccount(
        Number(id),
        data.username,
        data.confirm
      );

      router.replace("/(app)/(tabs)/home");
    } catch (err: any) {
      setError("root", {
        message:
          err?.message || "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const errorMessage =
    errors.root?.message ||
    errors.password?.message ||
    errors.confirm?.message;

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Set your password to activate your membership"
      image={require("@/assets/images/create-acc.png")}
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
        {errorMessage ? (
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
            <Text style={styles.errorText}>{errorMessage}</Text>
          </EaseView>
        ) : null}

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 380,
            delay: 160,
            easing: "easeOut",
          }}
        >
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Please enter a username.",
              minLength: {
                value: 8,
                message: "Username must be unique.",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <FormField
                label="USERNAME"
                value={value}
                placeholder="Username"
                onChangeText={onChange}
                autoCapitalize="none"
              />
            )}
          />
        </EaseView>

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 380,
            delay: 210,
            easing: "easeOut",
          }}
        >
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Please enter a password.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <FormField
                label="PASSWORD"
                value={value}
                onChangeText={onChange}
                placeholder="Minimum 8 characters"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            )}
          />
        </EaseView>

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 380,
            delay: 260,
            easing: "easeOut",
          }}
        >
          <Controller
            control={control}
            name="confirm"
            rules={{
              required: "Please confirm your password.",
              validate: (value, formValues) =>
                value === formValues.password ||
                "Passwords do not match.",
            }}
            render={({ field: { onChange, value } }) => (
              <FormField
                label="CONFIRM PASSWORD"
                value={value}
                onChangeText={onChange}
                placeholder="Re-enter your password"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            )}
          />
        </EaseView>

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 350,
            delay: 310,
            easing: "easeOut",
          }}
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
              {showPassword && (
                <Text style={styles.checkMark}>✓</Text>
              )}
            </View>

            <Text style={styles.checkboxLabel}>
              Show password
            </Text>
          </TouchableOpacity>
        </EaseView>

        <EaseView
          initialAnimate={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 380,
            delay: 360,
            easing: "easeOut",
          }}
        >
          <PrimaryButton
            title={
              isLoading
                ? "Creating account..."
                : "Create Account"
            }
            onPress={handleSubmit(handleCreate)}
            loading={isLoading}
            disabled={isLoading}
          />
        </EaseView>
      </EaseView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  errorBox: {
    backgroundColor: theme.errorBg,
    borderWidth: 1,
    borderColor: theme.errorBorder,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 11,
    marginBottom: 10,
  },

  errorText: {
    color: theme.errorText,
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    fontWeight: "500",
  },

  showPasswordRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
    marginBottom: 10,
    paddingVertical: 3,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: theme.border,
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
    fontSize: 12.5,
    color: theme.textSub,
    fontWeight: "500",
  },
});