import { View, Text } from "react-native";
import { Bot } from "lucide-react-native";

interface Message {
   id: string;
   text: string;
   sender: "user" | "bot";
   isTyping?: boolean;
}
 
interface Props {
  item: Message;
}

export default function AiMessage({
  item,
}: Props) {
  const isUser = item.sender === "user";

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 14,
      }}
    >
      {!isUser && (
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#0F172A",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 8,
            alignSelf: "flex-end",
          }}
        >
          <Bot size={14} color="#10B981" />
        </View>
      )}

      <View
        style={{
          maxWidth: "80%",
          paddingHorizontal: 16,
          paddingVertical: 14,
          backgroundColor: isUser ? "#10B981" : "#fff",

          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderBottomRightRadius: isUser ? 4 : 18,
          borderBottomLeftRadius: isUser ? 18 : 4,

          shadowColor: "#000",
          shadowOpacity: isUser ? 0 : 0.06,
          shadowRadius: 8,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          elevation: 2,
        }}
      >
        <Text
          style={{
            color: isUser ? "#fff" : "#0F172A",
            fontSize: 13,
            lineHeight: 21,
          }}
        >
          {item.text}
        </Text>
      </View>
    </View>
  );
}