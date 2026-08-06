import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAwareScrollView,
} from "react-native-keyboard-controller";
import { Dumbbell } from "lucide-react-native";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        bottomOffset={20}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>

          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Dumbbell
                size={30}
                color="#10b981"
              />
            </View>

            <Text style={styles.title}>
              {title}
            </Text>

            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          </View>


          {/* CONTENT */}
          <View style={styles.content}>
            {children}
          </View>

        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  wrapper: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  header: {
    alignItems: "center",
    marginBottom: 36,
  },

  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#ecfdf5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  content: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
});