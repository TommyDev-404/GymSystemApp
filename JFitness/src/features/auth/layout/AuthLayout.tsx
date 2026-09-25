import React, { ReactNode, useEffect, useRef } from "react";
import {
  Dimensions,
  ImageBackground,
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
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import {
  KeyboardAwareScrollView,
  useKeyboardHandler,
} from "react-native-keyboard-controller";
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

export function AuthLayout({
  title = "JFitness Gym",
  subtitle = "Welcome back, let's train!",
  image,
  children,
}: Props) {
  const [onboardingCompleted, setOnboardingCompleted] = React.useState(false);

  const sheetY = useSharedValue(0);
  const keyboardHeight = useSharedValue(0);

  const headerOpacity = useSharedValue(0);
  const headerY = useSharedValue(-8);
  const mascotOpacity = useSharedValue(0);
  const mascotScale = useSharedValue(0.82);
  const mascotY = useSharedValue(8);
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(14);

  const sheetRef = useRef<View>(null);

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

    mascotOpacity.value = withTiming(1, {
      duration: 450,
      easing: ANIMATION_EASING,
    });

    mascotScale.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.back(1.15)),
    });

    mascotY.value = withTiming(0, {
      duration: 550,
      easing: ANIMATION_EASING,
    });

    titleOpacity.value = withTiming(1, {
      duration: 500,
      easing: ANIMATION_EASING,
    });

    titleY.value = withTiming(0, {
      duration: 550,
      easing: ANIMATION_EASING,
    });
  }, []);

  useKeyboardHandler(
    {
      onMove: (event) => {
        "worklet";

        keyboardHeight.value = event.height;
      },
      onEnd: (event) => {
        "worklet";

        keyboardHeight.value = event.height;
      },
    },
    [],
  );

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

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
  }));

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
          source={require("@/assets/images/gymBG.png")}
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

      <Animated.View
        ref={sheetRef}
        style={[styles.sheet, sheetStyle]}
      >
        <KeyboardAwareScrollView
          style={styles.keyboardScroll}
          contentContainerStyle={styles.keyboardContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bottomOffset={20}
          extraKeyboardSpace={0}
          disableScrollOnKeyboardHide
        >
          <Animated.View
            style={[styles.sheetMascotContainer, mascotStyle]}
          >
            <Animated.Image
              source={image}
              resizeMode="contain"
              style={styles.sheetMascot}
            />
          </Animated.View>

          <Animated.View
            style={[styles.sheetHeader, titleStyle]}
          >
            <Text style={styles.appTitle}>{title}</Text>

            {subtitle ? (
              <Text style={styles.appSubtitle}>
                {subtitle}
              </Text>
            ) : null}
          </Animated.View>

          <View style={styles.formContainer}>
            {children}
          </View>
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
    backgroundColor: "rgba(255,255,255,0.12)",
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
    color: "rgba(255,255,255,0.62)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.8,
    textAlign: "center",
  },
  sheet: {
    flex: 1,
    marginTop: -70,
    paddingHorizontal: 24,
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
    overflow: "hidden",
  },
  keyboardScroll: {
    flex: 1,
  },
  keyboardContent: {
    width: "100%",
    paddingTop: 38,
    paddingBottom: 80,
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
  formContainer: {
    width: "100%",
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