import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  ChevronLeft,
} from "lucide-react-native";

import { router } from "expo-router";

const SLATE_50 = "#F8FAFC";
const SLATE_100 = "#F1F5F9";
const SLATE_400 = "#94A3B8";
const SLATE_900 = "#0F172A";

export function BodyProgressHeader() {
  return (
    <View style={styles.header}>

      {/* BACK BUTTON */}

      <Pressable
        onPress={() => router.back()}
        hitSlop={8}
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
        ]}
      >
        <ChevronLeft
          size={22}
          color={SLATE_900}
          strokeWidth={2.2}
        />
      </Pressable>


      {/* TITLE */}

      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>
          Progress Information
        </Text>
      </View>


      {/* RIGHT SPACER */}

      <View style={styles.headerSpacer} />

    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    height: 58,

    paddingHorizontal: 16,

    backgroundColor: "#FFFFFF",

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: SLATE_100,
  },


  /* BACK BUTTON */

  backButton: {
    width: 38,
    height: 38,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: SLATE_50,
  },

  backButtonPressed: {
    backgroundColor: SLATE_100,
  },


  /* TITLE */

  titleContainer: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 16,

    fontWeight: "700",

    color: SLATE_900,

    letterSpacing: -0.2,
  },


  /* RIGHT SIDE */

  headerSpacer: {
    width: 38,
  },

});