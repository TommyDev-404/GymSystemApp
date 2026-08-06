import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  Target,
  ChevronRight,
  Trophy,
} from "lucide-react-native";

import { WeightGoal } from "../types/HomeTypes";


interface GoalStatusCardProps {
  goal?: WeightGoal | null;
  onPress: () => void;
}


export function GoalStatusCard({
  goal,
  onPress,
}: GoalStatusCardProps) {

  const achieved = goal?.status === "ACHIEVED";

  return (
    <View style={styles.card}>

      {/* HEADER */}
      <View style={styles.header}>

        <View style={styles.titleRow}>

          <View style={styles.iconContainer}>

            {
              achieved ? (
                <Trophy
                  size={22}
                  color="#10B981"
                />
              ) : (
                <Target
                  size={22}
                  color="#10B981"
                />
              )
            }

          </View>


          <Text style={styles.title}>
            Weight Goal
          </Text>

        </View>


        <ChevronRight
          size={22}
          color="#94A3B8"
        />

      </View>


      {/* CONTENT */}
      <View style={styles.content}>

        {
          !goal ? (

            <>
              <Text style={styles.heading}>
                Set Your Weight Goal 🎯
              </Text>


              <Text style={styles.description}>
                Track your weight journey and monitor
                your progress toward your target.
              </Text>


              <Pressable
                style={styles.button}
                onPress={onPress}
              >
                <Text style={styles.buttonText}>
                  Set Goal
                </Text>
              </Pressable>
            </>


          ) : achieved ? (

            <>
              <Text style={styles.heading}>
                🎉 Congratulations!
              </Text>


              <Text style={styles.description}>
                You achieved your weight goal.
                Great job staying consistent!
              </Text>


              <Pressable
                style={styles.button}
                onPress={onPress}
              >
                <Text style={styles.buttonText}>
                  Set New Goal
                </Text>
              </Pressable>
            </>


          ) : (

            <>
              <Text style={styles.heading}>
                Keep Going 💪
              </Text>


              <Text style={styles.description}>
                You are {goal.progress_percentage}%
                closer to reaching your goal.
              </Text>


              <Pressable
                style={styles.button}
                onPress={onPress}
              >
                <Text style={styles.buttonText}>
                  View Progress
                </Text>
              </Pressable>
            </>

          )
        }

      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  card:{
    backgroundColor:"#FFFFFF",
    marginHorizontal:20,
    borderRadius:24,
    padding:20,
    borderWidth:1,
    borderColor:"#E2E8F0",
    shadowColor:"#000",
    shadowOpacity:0.05,
    shadowRadius:10,
    shadowOffset:{
      width:0,
      height:3,
    },
    elevation:3,
  },


  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },


  titleRow:{
    flexDirection:"row",
    alignItems:"center",
  },


  iconContainer:{
    width:42,
    height:42,
    borderRadius:21,
    backgroundColor:"#D1FAE5",
    justifyContent:"center",
    alignItems:"center",
    marginRight:12,
  },


  title:{
    fontSize:18,
    fontWeight:"700",
    color:"#0F172A",
  },


  content:{
    marginTop:22,
  },


  heading:{
    fontSize:18,
    fontWeight:"700",
    color:"#1E293B",
  },


  description:{
    marginTop:8,
    fontSize:14,
    lineHeight:20,
    color:"#64748B",
  },


  button:{
    marginTop:22,
    backgroundColor:"#10B981",
    paddingVertical:13,
    borderRadius:16,
    alignItems:"center",
  },


  buttonText:{
    color:"#FFFFFF",
    fontSize:15,
    fontWeight:"700",
  },

});