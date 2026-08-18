import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { Send } from "lucide-react-native";
import { theme } from "@/utils/theme";

interface Props {
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
}

export default function ChatInput({
  input,
  setInput,
  sendMessage,
}: Props) {
  const hasInput = input.trim().length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask about workouts, nutrition, tips..."
          placeholderTextColor={theme.textMuted}
          style={styles.input}
          multiline
          maxLength={1000}
          textAlignVertical="center"
        />

        <Pressable
          onPress={sendMessage}
          disabled={!hasInput}
          style={({ pressed }) => [
            styles.sendButton,
            hasInput
              ? styles.sendActive
              : styles.sendDisabled,
            pressed && hasInput && styles.pressed,
          ]}
        >
          <Send
            size={15}
            color={
              hasInput
                ? "#FFFFFF"
                : theme.textMuted
            }
            strokeWidth={2.3}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: "transparent",
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    minHeight: 52,
    paddingLeft: 15,
    paddingRight: 7,
    paddingVertical: 7,
    borderRadius: 17,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 10,
    color: theme.text,
    fontSize: 13,
    lineHeight: 19,
  },

  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  sendActive: {
    backgroundColor: theme.primary,
  },

  sendDisabled: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
});