import { useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import { Bot } from "lucide-react-native";
import { theme } from "@/utils/theme";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  isTyping?: boolean;
}

interface Props {
  item: Message;
}

export default function AiMessage({ item }: Props) {
  const isUser = item.sender === "user";

  const dots = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    if (!item.isTyping) return;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.stagger(
          120,
          dots.map((dot) =>
            Animated.sequence([
              Animated.timing(dot, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
              }),
              Animated.timing(dot, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
              }),
            ]),
          ),
        ),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [item.isTyping, dots]);

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
      ]}
    >
      {!isUser && (
        <View style={styles.botIcon}>
          <Bot
            size={15}
            color={theme.primaryLight}
            strokeWidth={2.2}
          />
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        {item.isTyping ? (
          <View style={styles.typingContainer}>
            {dots.map((dot, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.typingDot,
                  {
                    transform: [
                      {
                        translateY: dot.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -5],
                        }),
                      },
                    ],
                    opacity: dot.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.4, 1],
                    }),
                  },
                ]}
              />
            ))}
          </View>
        ) : (
          <Text
            style={[
              styles.messageText,
              isUser ? styles.userText : styles.botText,
            ]}
          >
            {item.text}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "flex-end",
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  botContainer: {
    justifyContent: "flex-start",
  },
  botIcon: {
    width: 32,
    height: 32,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },
  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1,
  },
  userBubble: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 5,
  },
  botBubble: {
    backgroundColor: theme.card,
    borderColor: theme.borderAccent,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 20,
  },
  userText: {
    color: "#FFFFFF",
  },
  botText: {
    color: theme.text,
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    minHeight: 20,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: theme.primaryLight,
  },
});