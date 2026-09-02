import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Check, CircleAlert, Info, X } from "lucide-react-native";
import { theme } from "@/utils/theme";

const ToastContent = ({
  type,
  text1,
  text2,
}: {
  type: "success" | "error" | "info" | "warning";
  text1?: string;
  text2?: string;
}) => {
  const config = {
    success: {
      icon: Check,
      iconBg: "#EAF7F0",
      iconColor: "#21864A",
    },
    error: {
      icon: X,
      iconBg: "#FEF2F2",
      iconColor: "#DC2626",
    },
    warning: {
      icon: CircleAlert,
      iconBg: "#FFF7E6",
      iconColor: "#D97706",
    },
    info: {
      icon: Info,
      iconBg: "#EFF6FF",
      iconColor: "#2563EB",
    },
  }[type];

  const Icon = config.icon;

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: config.iconBg }]}>
        <Icon size={18} color={config.iconColor} strokeWidth={2.5} />
      </View>

      <View style={styles.content}>
        {!!text1 && <Text style={styles.title}>{text1}</Text>}
        {!!text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
    </View>
  );
};

export const toastConfig = {
  success: (props: any) => (
    <ToastContent
      type="success"
      text1={props.text1}
      text2={props.text2}
    />
  ),
  error: (props: any) => (
    <ToastContent
      type="error"
      text1={props.text1}
      text2={props.text2}
    />
  ),
  warning: (props: any) => (
    <ToastContent
      type="warning"
      text1={props.text1}
      text2={props.text2}
    />
  ),
  info: (props: any) => (
    <ToastContent
      type="info"
      text1={props.text1}
      text2={props.text2}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#17181A",
  },
  message: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
    color: "#6B7280",
  },
});