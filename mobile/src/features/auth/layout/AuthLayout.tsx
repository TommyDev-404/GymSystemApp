import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dumbbell } from "lucide-react-native";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthLayout({ title, subtitle, children }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {/* STATUS BAR */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.wrapper}>

          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Dumbbell size={30} color="#10b981" />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          {/* CONTENT */}
          <View style={styles.content}>
            {children}
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#ffffff",
   },
 
   wrapper: {
     flex: 1,
     justifyContent: "center",
     paddingHorizontal: 24,
   },
 
   header: {
     alignItems: "center",
     marginBottom: 30,
   },
 
   iconCircle: {
     width: 64,
     height: 64,
     borderRadius: 32,
     backgroundColor: "#ecfdf5",
     justifyContent: "center",
     alignItems: "center",
     marginBottom: 12,
   },
 
   title: {
     fontSize: 26,
     fontWeight: "800",
     color: "#0f172a",
     textAlign: "center",
   },
 
   subtitle: {
     fontSize: 14,
     color: "#64748b",
     marginTop: 6,
     textAlign: "center",
     paddingHorizontal: 10,
   },
 
   content: {
     width: "100%",
     maxWidth: 420,
     alignSelf: "center",
   },
 });