import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Pressable,
  Platform,
} from "react-native";
import { router } from "expo-router";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight } from "lucide-react-native";
import { theme } from "@/utils/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const backgroundImages = [
  require("@/assets/images/gymBG2.jpg"),
  require("@/assets/images/gymBG3.jpg"),
  require("@/assets/images/gymBG4.jpg"),
  require("@/assets/images/gymBG5.jpg"),
  require("@/assets/images/gymBG6.jpg"),
];

const FADE_DURATION = 1400;
const DISPLAY_DURATION = 4000;

export default function WelcomeScreen() {
  // Layer A starts visible, Layer B starts hidden
  const [indexA, setIndexA] = useState(0);
  const [indexB, setIndexB] = useState(1);

  const opacityA = useSharedValue(1);
  const opacityB = useSharedValue(0);

  // Which layer is currently on top (true = A)
  const activeIsA = useRef(true);
  // Current visible image index (ref so the interval never needs to re-run)
  const currentIdx = useRef(0);

  // Entrance animations (unchanged)
  const brandOpacity = useSharedValue(0);
  const brandY = useSharedValue(-20);
  const contentOpacity = useSharedValue(0);
  const contentY = useSharedValue(30);
  const buttonOpacity = useSharedValue(0);
  const buttonY = useSharedValue(35);

  useEffect(() => {
    brandOpacity.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.ease),
    });
    brandY.value = withTiming(0, {
      duration: 700,
      easing: Easing.out(Easing.cubic),
    });

    contentOpacity.value = withDelay(
      400,
      withTiming(1, { duration: 700, easing: Easing.out(Easing.ease) })
    );
    contentY.value = withDelay(
      400,
      withTiming(0, { duration: 700, easing: Easing.out(Easing.cubic) })
    );

    buttonOpacity.value = withDelay(
      650,
      withTiming(1, { duration: 700, easing: Easing.out(Easing.ease) })
    );
    buttonY.value = withDelay(
      650,
      withTiming(0, { duration: 700, easing: Easing.out(Easing.cubic) })
    );
  }, []);

  // Cross-fade loop – empty deps, everything driven by refs
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isMounted = true;

    const runTransition = () => {
      const nextIdx = (currentIdx.current + 1) % backgroundImages.length;

      if (activeIsA.current) {
        // Prepare Layer B (currently invisible) with the next image
        setIndexB(nextIdx);

        // Cross-fade A → B
        opacityA.value = withTiming(0, {
          duration: FADE_DURATION,
          easing: Easing.inOut(Easing.ease),
        });
        opacityB.value = withTiming(1, {
          duration: FADE_DURATION,
          easing: Easing.inOut(Easing.ease),
        });

        timeoutId = setTimeout(() => {
          if (!isMounted) return;
          activeIsA.current = false;
          currentIdx.current = nextIdx;

          // Now that B is fully visible, prepare A for the *following* image
          // so the next cycle has zero lag
          const following = (nextIdx + 1) % backgroundImages.length;
          setIndexA(following);
        }, FADE_DURATION);
      } else {
        // Symmetric path: prepare Layer A and fade B → A
        setIndexA(nextIdx);

        opacityB.value = withTiming(0, {
          duration: FADE_DURATION,
          easing: Easing.inOut(Easing.ease),
        });
        opacityA.value = withTiming(1, {
          duration: FADE_DURATION,
          easing: Easing.inOut(Easing.ease),
        });

        timeoutId = setTimeout(() => {
          if (!isMounted) return;
          activeIsA.current = true;
          currentIdx.current = nextIdx;

          const following = (nextIdx + 1) % backgroundImages.length;
          setIndexB(following);
        }, FADE_DURATION);
      }
    };

    const intervalId = setInterval(runTransition, DISPLAY_DURATION);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []); // ← empty – never restarts

  const styleA = useAnimatedStyle(() => ({
    opacity: opacityA.value,
  }));
  const styleB = useAnimatedStyle(() => ({
    opacity: opacityB.value,
  }));

  const brandStyle = useAnimatedStyle(() => ({
    opacity: brandOpacity.value,
    transform: [{ translateY: brandY.value }],
  }));
  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentY.value }],
  }));
  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonY.value }],
  }));

  const handleGetStarted = async () => {
    await AsyncStorage.setItem("onboarding_completed", "true");
    router.push("/(auth)/account-activation");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.backgroundContainer}>
        {/* Layer A */}
        <Animated.View
          pointerEvents="none"
          style={[styles.backgroundLayer, styleA]}
        >
          <ImageBackground
            source={backgroundImages[indexA]}
            resizeMode="cover"
            style={styles.background}
          />
        </Animated.View>

        {/* Layer B */}
        <Animated.View
          pointerEvents="none"
          style={[styles.backgroundLayer, styleB]}
        >
          <ImageBackground
            source={backgroundImages[indexB]}
            resizeMode="cover"
            style={styles.background}
          />
        </Animated.View>

        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0.42)",
            "rgba(0, 0, 0, 0.68)",
            "rgba(18, 8, 10, 0.98)",
          ]}
          locations={[0, 0.52, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.overlay}
        >
          <Animated.View style={[styles.brand, brandStyle]}>
            <Text style={styles.brandName}>JFitness</Text>
            <Text style={styles.brandTagline}>
              TRAIN SMARTER. LIVE STRONGER.
            </Text>
          </Animated.View>

          <View style={styles.contentContainer}>
            <Animated.View style={[styles.content, contentStyle]}>
              <View style={styles.accentLine} />
              <Text style={styles.title}>
                YOUR FITNESS{"\n"}
                JOURNEY STARTS HERE.
              </Text>
              <Text style={styles.description}>
                Activate your gym membership, track your progress, and stay
                connected with JFitness.
              </Text>
            </Animated.View>

            <Animated.View style={[styles.actions, buttonStyle]}>
              <Pressable
                style={({ pressed }) => [
                  styles.getStartedButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleGetStarted}
              >
                <Text style={styles.getStartedText}>GET STARTED</Text>
                <View style={styles.arrowContainer}>
                  <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
                </View>
              </Pressable>

              <Pressable
                style={styles.loginButton}
                onPress={() => router.push("/(auth)/login")}
              >
                <Text style={styles.loginText}>
                  Already activated?{" "}
                  <Text style={styles.loginHighlight}>Log In</Text>
                </Text>
              </Pressable>
            </Animated.View>
          </View>

          <Text style={styles.footer}>
            © {new Date().getFullYear()} JFitness Gym
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10090B",
  },
  backgroundContainer: {
    flex: 1,
    width: "100%",
    position: "relative",
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFill,
  },
  background: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  overlay: {
     ...StyleSheet.absoluteFill,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  brand: {
    alignItems: "center",
    marginTop: Platform.select({
      ios: 70,
      android: 55,
    }),
  },
  brandName: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  brandTagline: {
    color: "rgba(255, 255, 255, 0.62)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.8,
    marginTop: 5,
  },
  contentContainer: {
    width: "100%",
    marginTop: "auto",
    marginBottom: 72,
  },
  content: {
    alignItems: "center",
    marginBottom: 28,
  },
  accentLine: {
    width: 36,
    height: 3,
    borderRadius: 2,
    backgroundColor: theme.primary,
    marginBottom: 18,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 27,
    lineHeight: 31,
    fontWeight: "900",
    letterSpacing: -0.7,
    textAlign: "center",
  },
  description: {
    color: "rgba(255, 255, 255, 0.68)",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 12,
    maxWidth: 310,
  },
  actions: {
    width: "100%",
    alignItems: "center",
  },
  getStartedButton: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    backgroundColor: theme.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    elevation: 6,
    shadowColor: theme.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.28,
    shadowRadius: 10,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  getStartedText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  arrowContainer: {
    position: "absolute",
    right: 16,
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    marginTop: 17,
    paddingVertical: 8,
  },
  loginText: {
    color: "rgba(255, 255, 255, 0.58)",
    fontSize: 12,
    fontWeight: "500",
  },
  loginHighlight: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  footer: {
    position: "absolute",
    bottom: Platform.select({
      ios: 18,
      android: 12,
    }),
    color: "rgba(255, 255, 255, 0.32)",
    fontSize: 9,
    fontWeight: "500",
  },
});