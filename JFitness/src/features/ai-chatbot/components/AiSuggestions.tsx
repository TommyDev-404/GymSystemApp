import {
   ScrollView,
   TouchableOpacity,
   Text,
} from "react-native";
import {
   Dumbbell,
   Apple,
   Heart,
   Lightbulb,
 } from "lucide-react-native";
 
 const suggestions = [
   {
     icon: Dumbbell,
     text: "Create a 5-day workout plan",
   },
   {
     icon: Apple,
     text: "Diet tips for muscle gain",
   },
   {
     icon: Heart,
     text: "Best cardio for fat loss",
   },
   {
     icon: Lightbulb,
     text: "How to improve bench press",
   },
 ];
 
 interface Props {
   visible: boolean;
 }
 
 export default function AiSuggestions({
   visible,
 }: Props) {
   if (!visible) return null;
 
   return (
     <ScrollView
       horizontal
       showsHorizontalScrollIndicator={false}
       style={{
         maxHeight: 50,
       }}
       contentContainerStyle={{
         paddingHorizontal: 16,
         gap: 10,
         alignItems: "center",
       }}
     >
       {suggestions.map((s) => (
         <TouchableOpacity
           key={s.text}
           style={{
             flexDirection: "row",
             alignItems: "center",
             height: 40,
             paddingHorizontal: 14,
             borderRadius: 12,
             backgroundColor: "#fff",
             borderWidth: 1,
             borderColor: "#E2E8F0",
           }}
         >
           <s.icon size={13} color="#10B981" />
 
           <Text
             style={{
               marginLeft: 8,
               color: "#334155",
               fontSize: 12,
             }}
           >
             {s.text}
           </Text>
         </TouchableOpacity>
       ))}
     </ScrollView>
   );
 }