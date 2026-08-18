import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { AppBackground } from "@/components/shared/AppBackground";
import { theme } from "@/utils/theme";

import AiHeader from "../components/AiHeader";
import AiMessage from "../components/AiMessages";
import AiSuggestions from "../components/AiSuggestions";
import ChatInput from "../components/ChatInput";

export default function ChatbotScreen() {
  const [input, setInput] = useState("");
  const [behaviour, setBehaviour] = useState<
    "height" | undefined
  >("height");

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "👋 Hi! I'm GymBot AI.\n\nAsk me about workouts, nutrition, weight loss, muscle gain, or gym programs 💪",
      sender: "bot",
    },
  ]);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const showListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setBehaviour("height");
      }
    );

    const hideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setBehaviour(undefined);
      }
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      Keyboard.dismiss();
      return false;
    };

    const sub = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => sub.remove();
  }, []);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
    };

    const typingMessage = {
      id: "typing",
      text: "GymBot AI is typing...",
      sender: "bot",
      isTyping: true,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      typingMessage,
    ]);

    setInput("");

    setTimeout(() => {
      setMessages((prev) => {
        const filtered = prev.filter(
          (msg) => msg.id !== "typing"
        );

        return [
          ...filtered,
          {
            id: Date.now().toString() + "bot",
            text: "💪 Got it! Let me help you with that.",
            sender: "bot",
          },
        ];
      });
    }, 1500);
  };

  return (
    <AppBackground>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />

        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : behaviour
          }
        >
          <AiHeader />

          <View style={styles.chatContainer}>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <AiMessage item={item} />
              )}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.messageContent}
            />

            <AiSuggestions
              visible={messages.length === 1}
            />

            <View style={styles.inputContainer}>
              <ChatInput
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  keyboardContainer: {
    flex: 1,
  },

  chatContainer: {
    flex: 1,
  },
  
  messageContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },

  inputContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 4 : 8,
    backgroundColor: theme.card,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
});