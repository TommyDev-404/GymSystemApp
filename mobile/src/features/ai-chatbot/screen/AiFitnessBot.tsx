import {
   View,
   Text,
   TextInput,
   TouchableOpacity,
   FlatList,
   Keyboard,
   BackHandler,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
 } from "react-native";
 import { useEffect, useRef, useState } from "react";
 import { SafeAreaView } from "react-native-safe-area-context";
 import { StatusBar } from "expo-status-bar";
 import {
   Bot,
   Send,
   Apple,
   Heart,
   Lightbulb,
   Dumbbell,
 } from "lucide-react-native";
import AiHeader from "../components/AiHeader";
import AiMessage from "../components/AiMessages";
import AiSuggestions from "../components/AiSuggestions";
import ChatInput from "../components/ChatInput";
 
 const suggestions = [
   { icon: Dumbbell, text: "Create a 5-day workout plan" },
   { icon: Apple, text: "Diet tips for muscle gain" },
   { icon: Heart, text: "Best cardio for fat loss" },
   { icon: Lightbulb, text: "How to improve bench press" },
 ];
 
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
     flatListRef.current?.scrollToEnd({ animated: true });
   }, [messages]);
 
   const sendMessage = () => {
     if (!input.trim()) return;
 
     const userMessage = {
       id: Date.now().toString(),
       text: input,
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
 
   const renderMessage = ({ item }: any) => {
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
   };
 
   return (
     <KeyboardAvoidingView
       style={{
         flex: 1,
         backgroundColor: "#F8FAFC",
       }}
       behavior={Platform.OS === "ios" ? "padding" : behaviour}
     >
       <StatusBar style="light"/>
 
         {/* Header */}
         <AiHeader/>
 
         {/* Messages */}
         <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <AiMessage item={item} />
            )}
            contentContainerStyle={{
               padding: 16,
               flexGrow: 1,
            }}
         />
 
         {/* Suggestions */}
         <AiSuggestions visible={messages.length === 1} />
 
         {/* Input */}
         <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
         />
     </KeyboardAvoidingView>
   );
 }