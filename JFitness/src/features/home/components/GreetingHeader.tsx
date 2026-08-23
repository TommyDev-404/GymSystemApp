import { theme } from "@/utils/theme";
import { EaseView } from "react-native-ease";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GreetingHeaderProps {
  memberName: string;
}

const messages = [
  "Ready to get stronger today?",
  "You’re doing great. Keep pushing!",
  "One workout at a time. You’ve got this!",
  "Stay consistent and trust the process.",
  "Let’s make today count!",
  "Your goals are closer than you think.",
];

function getGreeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      hour12: false,
    }).format(new Date())
  );

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  }

  if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

function getDate() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    weekday: "long",
    month: "long",
    day: "numeric",
  })
    .format(new Date())
    .toUpperCase();
}

export function GreetingHeader({ memberName }: GreetingHeaderProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [greeting, setGreeting] = useState(getGreeting());
  const [date, setDate] = useState(getDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setGreeting(getGreeting());
      setDate(getDate());
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient
      colors={["#FFF8F9", "#FCEDEF", "#F9E4E7", "#FCEDEF", "#FFF8F9"]}
      locations={[0, 0.25, 0.5, 0.75, 1]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    >
      <View style={styles.greeting}>
        <Text style={styles.date}>{date}</Text>

        <Text
          style={styles.greetingText}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {greeting},{" "}
          <Text style={styles.name}>{memberName}.</Text>
        </Text>
      </View>

      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <View style={styles.bubble}>
        <View style={styles.bubbleHeader}>
          <View style={styles.dogoDot} />
          <Text style={styles.dogoName}>DOGO</Text>
        </View>

        <EaseView
          key={messageIndex}
          initialAnimate={{
            opacity: 0,
            translateY: 7,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            type: "timing",
            duration: 350,
            easing: "easeOut",
          }}
        >
          <Text style={styles.message}>{messages[messageIndex]}</Text>
        </EaseView>

        <View style={styles.bubbleTail} />
      </View>

      <Image
        source={require("@/assets/images/home-mascot.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 240,
    position: "relative",
    overflow: "visible",
  },
  greeting: {
    position: "absolute",
    top: 20,
    left: 15,
    right: 20,
    zIndex: 2,
  },
  date: {
    color: theme.textSub,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 5,
  },
  greetingText: {
    color: theme.text,
    fontSize: 23,
    fontWeight: "normal",
    letterSpacing: -1.5,
  },
  name: {
    color: theme.primary,
    fontWeight: "900",
    letterSpacing: -1.5,
  },
  bubble: {
    position: "absolute",
    top: 112,
    left: 15,
    right: 140,
    minHeight: 112,
    backgroundColor: theme.primary,
    borderRadius: 22,
    paddingHorizontal: 17,
    paddingVertical: 15,
    zIndex: 5,
    shadowColor: theme.primaryDark,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 7,
  },
  bubbleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dogoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginRight: 7,
  },
  dogoName: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.6,
  },
  message: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 24,
    letterSpacing: -0.3,
  },
  bubbleTail: {
    position: "absolute",
    right: -7,
    bottom: 60,
    width: 16,
    height: 16,
    backgroundColor: theme.primary,
    transform: [{ rotate: "45deg" }],
  },
  image: {
    position: "absolute",
    width: 175,
    height: 200,
    right: -10,
    bottom: -12,
    zIndex: 6,
  },
  glowOne: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "rgba(139,30,45,0.035)",
    top: -110,
    right: -60,
  },
  glowTwo: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(139,30,45,0.025)",
    bottom: -80,
    left: -60,
  },
});