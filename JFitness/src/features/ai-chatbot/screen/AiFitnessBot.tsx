import { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { StackWrapper } from "@/components/shared/StackWrapper";
import { theme } from "@/utils/theme";
import AiHeader from "../components/AiHeader";
import AiMessage from "../components/AiMessages";
import AiSuggestions from "../components/AiSuggestions";
import ChatInput from "../components/ChatInput";

export default function ChatbotScreen() {
  const [input, setInput] = useState("");
  const [behaviour, setBehaviour] = useState<"height" | undefined>("height");
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "👋 Hi! I'm GymBot AI.\n\nAsk me about workouts, nutrition, weight loss, muscle gain, or gym programs 💪",
      sender: "bot",
    },
  ]);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () => {
      setBehaviour("height");
    });

    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setBehaviour(undefined);
    });

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

    setMessages((prev) => [...prev, userMessage, typingMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== "typing");

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

  const header = <AiHeader />;

  return (
    <StackWrapper
      title="GymBot AI"
      showDefaultHeader={false}
      headerContent={header}
      horizontalPadding={0}
      paddingTop={0}
      paddingBottom={0}
      gap={0}
      useScrollView={false}
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : behaviour}
      >
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AiMessage item={item} />}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.messageContent}
          />

          <AiSuggestions visible={messages.length === 1} />

          <View style={styles.inputContainer}>
            <ChatInput
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </StackWrapper>
  );
}

const styles = StyleSheet.create({
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