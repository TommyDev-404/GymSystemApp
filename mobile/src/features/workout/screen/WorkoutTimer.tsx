import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react-native";
import { router } from "expo-router";


export function WorkoutTimerScreen() {

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  const [timeLeft, setTimeLeft] = useState(
    minutes * 60 + seconds
  );

  const [running, setRunning] = useState(false);


  useEffect(()=>{

    if(!running) return;


    const timer = setInterval(()=>{

      setTimeLeft(prev=>{

        if(prev <= 1){

          setRunning(false);

          return 0;

        }


        return prev - 1;

      });


    },1000);



    return ()=>clearInterval(timer);


  },[running]);


  const reset = ()=>{

    setRunning(false);

    setTimeLeft(
      minutes * 60 + seconds
    );

  };


  const updateTime = (
    newMinutes:number,
    newSeconds:number
  )=>{

    setMinutes(newMinutes);

    setSeconds(newSeconds);

    setTimeLeft(
      newMinutes * 60 + newSeconds
    );

  };

  const formatTime = (value:number)=>{

    const min = Math.floor(value / 60);

    const sec = value % 60;


    return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

  };

   return (
      <SafeAreaView style={styles.container}>


      <StatusBar
      barStyle="dark-content"
      backgroundColor="#F8FAFC"
      />



      {/* Header */}

      <View style={styles.header}>

      <TouchableOpacity
      style={styles.back}
      onPress={() => router.back()}
      >

      <ArrowLeft
      size={20}
      color="#334155"
      />

      </TouchableOpacity>


      <View>

      <Text style={styles.title}>
      Workout Timer
      </Text>

      <Text style={styles.subtitle}>
      Set your workout duration
      </Text>

      </View>

      </View>





      {/* Timer */}

      <View style={styles.timerCard}>


      <Text style={styles.label}>
      TIME REMAINING
      </Text>


      <Text style={styles.time}>
      {formatTime(timeLeft)}
      </Text>



      </View>





      {/* Controls */}

      <View style={styles.controls}>


      <TouchableOpacity
      style={styles.reset}
      onPress={reset}
      >

      <RotateCcw
      size={22}
      color="#64748B"
      />

      </TouchableOpacity>




      <TouchableOpacity
      style={styles.play}
      onPress={()=>setRunning(!running)}
      >


      {
      running
      ?
      <Pause
      size={30}
      color="white"
      fill="white"
      />
      :
      <Play
      size={30}
      color="white"
      fill="white"
      />
      }


      </TouchableOpacity>


      </View>






      {/* Time Setting */}


      <View style={styles.settings}>


      <Text style={styles.settingTitle}>
      Set Timer
      </Text>



      <TimeAdjust
      label="Minutes"
      value={minutes}

      minus={()=>
      updateTime(
      Math.max(0,minutes-1),
      seconds
      )
      }

      plus={()=>
      updateTime(
      minutes+1,
      seconds
      )
      }

      />



      <TimeAdjust
      label="Seconds"
      value={seconds}

      minus={()=>
      updateTime(
      minutes,
      Math.max(0,seconds-5)
      )
      }

      plus={()=>
      updateTime(
      minutes,
      Math.min(55,seconds+5)
      )
      }

      />



      </View>



      </SafeAreaView>
   );

}

function TimeAdjust({
   label,
   value,
   minus,
   plus
}:any){
   return (

   <View style={styles.row}>


   <Text style={styles.label}>
   {label}
   </Text>



   <View style={styles.adjust}>


   <TouchableOpacity
   style={styles.smallBtn}
   onPress={minus}
   >

   <Minus
   size={15}
   color="#64748B"
   />

   </TouchableOpacity>



   <Text style={styles.number}>
   {value}
   </Text>



   <TouchableOpacity
   style={styles.plusBtn}
   onPress={plus}
   >

   <Plus
   size={15}
   color="white"
   />

   </TouchableOpacity>


   </View>


   </View>

   );
}

const styles = StyleSheet.create({

   container: {
     flex: 1,
     backgroundColor: "#F8FAFC",
     paddingHorizontal: 20,
   },
 
 
   // HEADER
 
   header: {
     flexDirection: "row",
     alignItems: "center",
     gap: 12,
     paddingVertical: 18,
   },
 
 
   back: {
     width: 40,
     height: 40,
     borderRadius: 14,
     backgroundColor: "#E2E8F0",
 
     justifyContent: "center",
     alignItems: "center",
   },
 
 
   title: {
     fontSize: 20,
     fontWeight: "700",
     color: "#0F172A",
   },
 
 
   subtitle: {
     fontSize: 12,
     color: "#64748B",
     marginTop: 2,
   },
 
 
 
   // TIMER CARD
 
   timerCard: {
     height: 300,
 
     borderRadius: 30,
 
     backgroundColor: "#0F172A",
 
     justifyContent: "center",
     alignItems: "center",
 
     marginTop: 20,
 
 
     shadowColor: "#000",
     shadowOpacity: 0.15,
     shadowRadius: 12,
     shadowOffset: {
       width: 0,
       height: 6,
     },
 
     elevation: 5,
   },
 
 
   label: {
     fontSize: 13,
     fontWeight: "700",
 
     letterSpacing: 1.5,
 
     color: "#94A3B8",
   },
 
 
   time: {
     fontSize: 64,
 
     fontWeight: "800",
 
     color: "#FFFFFF",
 
     marginTop: 10,
   },
 
 
 
   // BUTTONS
 
   controls: {
     flexDirection: "row",
 
     justifyContent: "center",
 
     alignItems: "center",
 
     gap: 25,
 
     marginTop: 35,
   },
 
 
   reset: {
     width: 56,
     height: 56,
 
     borderRadius: 30,
 
     backgroundColor: "#E2E8F0",
 
     justifyContent: "center",
     alignItems: "center",
   },
 
 
   play: {
     width: 82,
     height: 82,
 
     borderRadius: 41,
 
     backgroundColor: "#10B981",
 
     justifyContent: "center",
     alignItems: "center",
 
 
     shadowColor: "#10B981",
     shadowOpacity: 0.35,
 
     shadowRadius: 12,
 
     shadowOffset: {
       width: 0,
       height: 6,
     },
 
     elevation: 6,
   },
 
 
 
   // SETTINGS CARD
 
   settings: {
     backgroundColor: "#FFFFFF",
 
     marginTop: 35,
 
     borderRadius: 24,
 
     padding: 20,
 
 
     shadowColor: "#000",
     shadowOpacity: 0.05,
 
     shadowRadius: 10,
 
     shadowOffset: {
       width: 0,
       height: 4,
     },
 
     elevation: 3,
   },
 
 
   settingTitle: {
     fontSize: 16,
 
     fontWeight: "700",
 
     color: "#0F172A",
 
     marginBottom: 18,
   },
 
 
   row: {
     flexDirection: "row",
 
     justifyContent: "space-between",
 
     alignItems: "center",
 
     marginBottom: 16,
   },
 
 
   label: {
     fontSize: 14,
 
     color: "#475569",
 
     fontWeight: "500",
   },
 
 
   adjust: {
     flexDirection: "row",
 
     alignItems: "center",
 
     gap: 14,
   },
 
 
   smallBtn: {
     width: 34,
 
     height: 34,
 
     borderRadius: 17,
 
     backgroundColor: "#F1F5F9",
 
     justifyContent: "center",
 
     alignItems: "center",
   },
 
 
   plusBtn: {
     width: 34,
 
     height: 34,
 
     borderRadius: 17,
 
     backgroundColor: "#10B981",
 
     justifyContent: "center",
 
     alignItems: "center",
   },
 
 
   number: {
     width: 45,
 
     textAlign: "center",
 
     fontSize: 18,
 
     fontWeight: "700",
 
     color: "#0F172A",
   },
 
 });