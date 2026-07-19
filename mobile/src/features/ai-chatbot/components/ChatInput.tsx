import {
   View,
   TextInput,
   TouchableOpacity,
 } from "react-native";
 import { Send } from "lucide-react-native";
 
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
   return (
     <View
       style={{
         paddingHorizontal: 16,
         paddingVertical: 12,
         backgroundColor: "#fff",
         borderTopWidth: 1,
         borderTopColor: "#F1F5F9",
       }}
     >
       <View
         style={{
           flexDirection: "row",
           alignItems: "center",
           paddingHorizontal: 16,
           paddingVertical: 12,
           borderRadius: 20,
           backgroundColor: "#F8FAFC",
           borderWidth: 1.5,
           borderColor: "#E2E8F0",
         }}
       >
         <TextInput
           value={input}
           onChangeText={setInput}
           placeholder="Ask about workouts, nutrition, tips..."
           placeholderTextColor="#94A3B8"
           style={{
             flex: 1,
             color: "#0F172A",
             fontSize: 13,
           }}
         />
 
         <TouchableOpacity
           onPress={sendMessage}
           style={{
             width: 36,
             height: 36,
             borderRadius: 12,
             justifyContent: "center",
             alignItems: "center",
             backgroundColor:
               input.trim()
                 ? "#10B981"
                 : "#E2E8F0",
           }}
         >
           <Send
             size={15}
             color={
               input.trim()
                 ? "#fff"
                 : "#94A3B8"
             }
           />
         </TouchableOpacity>
       </View>
     </View>
   );
 }