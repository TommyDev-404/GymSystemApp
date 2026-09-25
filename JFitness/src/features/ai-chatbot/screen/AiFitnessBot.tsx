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
import ChatInput from "../components/ChatInput";
import { sendChatMessage } from "../api/ai.api";
import { useAuth } from "@/context/AuthContext";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  isTyping?: boolean;
};

export default function ChatbotScreen() {
  const { memberIDs } = useAuth();

  const [input, setInput] = useState("");
  const [behaviour, setBehaviour] = useState<"height" | undefined>("height");
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm JFitness AI.\n\nI'm your personal fitness coach. Ask me about workouts, nutrition, weight goals, or gym programs. 💪\n\nWhat would you like to work on today?",
      sender: "bot",
    },
  ]);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", (event) => {
      setBehaviour("height");
      setKeyboardOffset(event.endCoordinates.height);
    });

    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setBehaviour(undefined);
      setKeyboardOffset(0);
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
      backAction,
    );

    return () => sub.remove();
  }, []);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  }, [messages]);

  const sendMessage = async () => {
    
    const trimmedMessage = input.trim();

    if (!trimmedMessage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedMessage,
      sender: "user",
    };

    const typingMessage: Message = {
      id: "typing",
      text: "JFitness AI is typing...",
      sender: "bot",
      isTyping: true,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      typingMessage,
    ]);

    setInput("");
    
    console.log("Member id: ", memberIDs?.member_id);
    try {
      const { reply } = await sendChatMessage(memberIDs?.member_id!, trimmedMessage);

      setMessages((prev) => {
        const filtered = prev.filter(
          (message) => message.id !== "typing",
        );

        return [
          ...filtered,
          {
            id: `${Date.now()}-bot`,
            text: reply,
            sender: "bot",
          },
        ];
      });
    } catch (error) {
      console.error("GymBot API error:", error);

      setMessages((prev) => {
        const filtered = prev.filter(
          (message) => message.id !== "typing",
        );

        return [
          ...filtered,
          {
            id: `${Date.now()}-error`,
            text: "Sorry, I couldn't connect to GymBot AI. Please try again.",
            sender: "bot",
          },
        ];
      });
    }
  };

  const header = <AiHeader />;

  return (
    <StackWrapper
      title="JFitness AI"
      showDefaultHeader={false}
      headerContent={header}
      horizontalPadding={0}
      paddingTop={0}
      paddingBottom={0}
      gap={0}
      useScrollView={false}
    >
      <KeyboardAvoidingView
        style={[
          styles.keyboardContainer,
          Platform.OS === "android" && {
            paddingBottom: keyboardOffset - 185,
          },
        ]}
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