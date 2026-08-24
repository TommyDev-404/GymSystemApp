import React, { ReactNode, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
  Keyboard,
  Dimensions,
  Image
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { theme } from "@/utils/theme";

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export function AuthLayout({
  title = "JFitness Gym",
  subtitle = "Welcome back, let's train!",
  children,
}: Props) {
  const keyboardHeight = useSharedValue(0);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";

    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(showEvent, (event) => {
      keyboardHeight.value = withTiming(event.endCoordinates.height, {
        duration: Platform.OS === "ios" ? 280 : 250,
        easing: Easing.out(Easing.ease),
      });
    });

    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      keyboardHeight.value = withTiming(0, {
        duration: Platform.OS === "ios" ? 280 : 250,
        easing: Easing.out(Easing.ease),
      });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const headerStyle = useAnimatedStyle(() => {
    const progress = Math.min(
      1,
      Math.max(0, keyboardHeight.value / 280)
    );

    return {
      opacity: 1 - progress * 0.55,
      transform: [
        { scale: 1 - progress * 0.16 },
        { translateY: -progress * 18 },
      ],
    };
  });

  const sheetStyle = useAnimatedStyle(() => {
    const progress = Math.min(
      1,
      Math.max(0, keyboardHeight.value / 280)
    );

    return {
      transform: [
        {
          translateY:
            Platform.OS === "ios"
              ? -progress * 8
              : -progress * 28,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <RNStatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <LinearGradient
        colors={[
          theme.primaryLight,
          theme.primary,
          theme.primaryDark,
        ]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Animated.Image
          source={require("@/assets/images/bear-lifting.png")}
          style={[styles.headerMascot, headerStyle]}
          resizeMode="contain"
        />
        
        <Animated.View
          style={[styles.headerContent, headerStyle]}
          pointerEvents="none"
        >
          <Text style={styles.brandName}>JFitness</Text>

          <Text style={styles.brandTagline}>
            Train smarter. Live stronger.
          </Text>
        </Animated.View>
      </LinearGradient>

      <Animated.View style={[styles.sheet, sheetStyle]}>
        <View style={styles.sheetHeader}>
          <Text style={styles.appTitle}>{title}</Text>

          {subtitle ? (
            <Text style={styles.appSubtitle}>{subtitle}</Text>
          ) : null}
        </View>

        <KeyboardAwareScrollView
          style={styles.keyboardScroll}
          contentContainerStyle={styles.keyboardContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bottomOffset={12}
          extraKeyboardSpace={0}
          disableScrollOnKeyboardHide
        >
          {children}
        </KeyboardAwareScrollView>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} JFitness Gym
        </Text>

        <Text style={styles.footerSubtext}>
          Train smarter. Live stronger.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
  },

  header: {
    height: SCREEN_HEIGHT * 0.32,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },

  headerContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    zIndex: 3,
    marginTop: 150,
  },
  
  headerMascot: {
    position: "absolute",
    top: 55,
    alignSelf: "center",
    width: 150,
    height: 150,
    zIndex: 2,
  },

  brandName: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.6,
    textAlign: "center",
  },

  brandTagline: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 6,
    textAlign: "center",
    letterSpacing: 0.2,
  },

  sheet: {
    flex: 1,
    marginTop: -28,
    backgroundColor: theme.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 10,
  },

  sheetHeader: {
    marginBottom: 18,
    zIndex: 20,
  },

  appTitle: {
    color: theme.text,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.4,
  },

  appSubtitle: {
    color: theme.textSub,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
    lineHeight: 20,
  },

  keyboardScroll: {
    flex: 1,
  },

  keyboardContent: {
    width: "100%",
    paddingBottom: 4,
  },

  footer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 18 : 12,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 30,
  },

  footerText: {
    color: theme.textMuted,
    fontSize: 11,
    fontWeight: "600",
  },

  footerSubtext: {
    color: theme.textMuted,
    fontSize: 10,
    marginTop: 3,
  },
});