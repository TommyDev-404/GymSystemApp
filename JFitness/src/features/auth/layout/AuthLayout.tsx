import React, { ReactNode, useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  Platform,
  Pressable,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "@/utils/theme";

type Props = {
  title?: string;
  subtitle?: string;
  image?: any;
  children: ReactNode;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ONBOARDING_KEY = "onboarding_completed";

const ANIMATION_EASING = Easing.out(Easing.cubic);

const topImages = [
  require("@/assets/images/gymBG2.jpg"),
  require("@/assets/images/gymBG3.jpg"),
  require("@/assets/images/gymBG4.jpg"),
  require("@/assets/images/gymBG5.jpg"),
  require("@/assets/images/gymBG6.jpg"),
];


export function AuthLayout({
  title = "JFitness Gym",
  subtitle = "Welcome back, let's train!",
  image,
  children,
}: Props) {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  const keyboardHeight = useSharedValue(0);

  const headerOpacity = useSharedValue(0);
  const headerY = useSharedValue(-8);

  const mascotOpacity = useSharedValue(0);
  const mascotScale = useSharedValue(0.82);
  const mascotY = useSharedValue(8);

  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(14);

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      setOnboardingCompleted(value === "true");
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    headerOpacity.value = withTiming(1, {
      duration: 600,
      easing: ANIMATION_EASING,
    });

    headerY.value = withTiming(0, {
      duration: 650,
      easing: ANIMATION_EASING,
    });

    mascotOpacity.value = withDelay(
      180,
      withTiming(1, {
        duration: 450,
        easing: ANIMATION_EASING,
      })
    );

    mascotScale.value = withDelay(
      180,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.back(1.15)),
      })
    );

    mascotY.value = withDelay(
      180,
      withTiming(0, {
        duration: 550,
        easing: ANIMATION_EASING,
      })
    );

    titleOpacity.value = withDelay(
      280,
      withTiming(1, {
        duration: 500,
        easing: ANIMATION_EASING,
      })
    );

    titleY.value = withDelay(
      280,
      withTiming(0, {
        duration: 550,
        easing: ANIMATION_EASING,
      })
    );
  }, []);

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

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerY.value }],
  }));

  const mascotStyle = useAnimatedStyle(() => ({
    opacity: mascotOpacity.value,
    transform: [
      { translateY: mascotY.value },
      { scale: mascotScale.value },
    ],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

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

  const handleBackToWelcome = () => {
    router.replace("/welcome");
  };

  return (
    <View style={styles.container}>
      <RNStatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.header}>
        <ImageBackground
          source={require("@/assets/images/gymBG.jpg")}
          resizeMode="cover"
          style={styles.headerBackground}
        >
          <LinearGradient
            colors={[
              "rgba(0, 0, 0, 0.35)",
              "rgba(0, 0, 0, 0.65)",
              "rgba(0, 0, 0, 0.90)",
            ]}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerOverlay}
          >
            {onboardingCompleted && (
              <Pressable
                onPress={handleBackToWelcome}
                hitSlop={12}
                style={({ pressed }) => [
                  styles.backButton,
                  pressed && styles.backButtonPressed,
                ]}
              >
                <ChevronLeft
                  size={22}
                  color="#FFFFFF"
                  strokeWidth={2.4}
                />
              </Pressable>
            )}

            <Animated.View
              style={[styles.headerContent, headerStyle]}
              pointerEvents="none"
            >
              <Text style={styles.brandName}>JFitness</Text>

              <Text style={styles.brandTagline}>
                TRAIN SMARTER. LIVE STRONGER.
              </Text>
            </Animated.View>
          </LinearGradient>
        </ImageBackground>
      </View>

      <Animated.View style={[styles.sheet, sheetStyle]}>
        <Animated.View
          style={[styles.sheetMascotContainer, mascotStyle]}
        >
          <Animated.Image
            source={image}
            resizeMode="contain"
            style={styles.sheetMascot}
          />
        </Animated.View>

        <Animated.View style={[styles.sheetHeader, titleStyle]}>
          <Text style={styles.appTitle}>{title}</Text>

          {subtitle ? (
            <Text style={styles.appSubtitle}>{subtitle}</Text>
          ) : null}
        </Animated.View>

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
    height: SCREEN_HEIGHT * 0.25,
    zIndex: 0,
  },

  headerBackground: {
    flex: 1,
    width: "100%",
  },

  headerOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 54 : 42,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    zIndex: 20,
  },

  backButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.94 }],
  },

  headerContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  brandName: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: -0.8,
    textAlign: "center",
  },

  brandTagline: {
    marginTop: 7,
    color: "rgba(255, 255, 255, 0.62)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.8,
    textAlign: "center",
  },

  sheet: {
    flex: 1,
    marginTop: -28,
    paddingHorizontal: 24,
    paddingTop: 38,
    backgroundColor: theme.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
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

  sheetMascotContainer: {
    position: "relative",
    alignSelf: "center",
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  sheetMascot: {
    width: 120,
    height: 120,
  },

  sheetHeader: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 36,
    paddingHorizontal: 12,
    zIndex: 20,
  },

  appTitle: {
    color: theme.text,
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: -0.3,
    lineHeight: 24,
    textAlign: "center",
  },

  appSubtitle: {
    marginTop: 5,
    color: theme.textSub,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "center",
  },

  keyboardScroll: {
    flex: 1,
  },

  keyboardContent: {
    width: "100%",
    paddingBottom: 80,
  },

  footer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 18 : 12,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 30,
    pointerEvents: "none",
  },

  footerText: {
    color: theme.textMuted,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.1,
  },

  footerSubtext: {
    marginTop: 3,
    color: theme.textMuted,
    fontSize: 10,
    fontWeight: "500",
  },
});