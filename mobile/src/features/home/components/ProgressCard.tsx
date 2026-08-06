import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  TrendingDown,
  TrendingUp,
  Target,
} from "lucide-react-native";


const GREEN = "#10b981";
const GREEN_DARK = "#059669";
const RED = "#ef4444";


interface ProgressCardProps {
  goalType: "LOSE_WEIGHT" | "GAIN_WEIGHT";
  currentWeight: number;
  startingWeight: number;
  goalWeight: number;
  percentage: number;
  onPress: () => void;
}


export function ProgressCard({
  goalType,
  currentWeight,
  startingWeight,
  goalWeight,
  percentage,
  onPress,
}: ProgressCardProps) {

  const isLoseWeight = goalType === "LOSE_WEIGHT";

  const weightChange = isLoseWeight
    ? startingWeight - currentWeight
    : currentWeight - startingWeight;

  const remainingWeight = Math.abs(
    currentWeight - goalWeight
  );

  const isProgressPositive = weightChange > 0;


  return (
    <View style={styles.card}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>

          <View style={styles.iconBadge}>
            <Target
              color={GREEN}
              size={17}
            />
          </View>

          <View>
            <Text style={styles.title}>
              Body Progress
            </Text>

            <View
              style={[
                styles.goalBadge,
                isLoseWeight
                  ? styles.lossBadge
                  : styles.gainBadge,
              ]}
            >
              <Text
                style={[
                  styles.goalBadgeText,
                  isLoseWeight
                    ? styles.lossText
                    : styles.gainText,
                ]}
              >
                {isLoseWeight
                  ? "Lose Weight"
                  : "Gain Weight"}
              </Text>
            </View>
          </View>

        </View>


        <View style={styles.percentPill}>
          <Text style={styles.percentText}>
            {percentage}%
          </Text>
        </View>

      </View>


      {/* STATS */}
      <View style={styles.statsRow}>

        <StatBlock
          label="Start"
          value={startingWeight}
        />

        <View style={styles.dividerWrap}>
          <View style={styles.divider} />
        </View>

        <StatBlock
          label="Current"
          value={currentWeight}
          emphasized
        />

        <View style={styles.dividerWrap}>
          <View style={styles.divider} />
        </View>

        <StatBlock
          label="Goal"
          value={goalWeight}
          align="right"
        />

      </View>


      {/* PROGRESS */}
      <View style={styles.progressSection}>

        <View style={styles.trackBg}>
          <View
            style={[
              styles.trackFill,
              {
                width: `${percentage}%`,
              },
            ]}
          />
        </View>


        <View style={styles.progressFooter}>

          <View style={styles.trendRow}>

            {
              isProgressPositive ? (
                <TrendingUp
                  color={GREEN}
                  size={15}
                />
              ) : (
                <TrendingDown
                  color={RED}
                  size={15}
                />
              )
            }


            <Text style={styles.trendText}>
              {Math.abs(weightChange).toFixed(1)}
              {" kg "}
              {
                isLoseWeight
                  ? isProgressPositive
                    ? "lost"
                    : "gained"
                  : isProgressPositive
                    ? "gained"
                    : "lost"
              }
            </Text>

          </View>


          {
            remainingWeight > 0 && (
              <Text style={styles.remainingText}>
                {remainingWeight.toFixed(1)}
                {" kg to go"}
              </Text>
            )
          }

        </View>

      </View>


      {/* BUTTON */}
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.cta,
          pressed && {
            backgroundColor: GREEN_DARK,
          },
        ]}
      >
        <Text style={styles.ctaText}>
          Update Goal
        </Text>
      </Pressable>


    </View>
  );
}



function StatBlock({
  label,
  value,
  align = "left",
  emphasized = false,
}: {
  label: string;
  value: number;
  align?: "left" | "right" | "center";
  emphasized?: boolean;
}) {

  const alignItems =
    align === "right"
      ? "flex-end"
      : align === "center"
        ? "center"
        : "flex-start";


  return (
    <View style={{ alignItems }}>

      <Text style={styles.statLabel}>
        {label}
      </Text>


      <Text
        style={[
          styles.statValue,
          emphasized &&
            styles.statValueEmphasized,
        ]}
      >
        {value}

        <Text style={styles.statUnit}>
          {" kg"}
        </Text>

      </Text>

    </View>
  );
}



const styles = StyleSheet.create({

  card:{
    marginHorizontal:20,
    backgroundColor:"#fff",
    borderRadius:24,
    borderWidth:1,
    borderColor:"#f1f5f9",
    overflow:"hidden",
    shadowColor:"#0f172a",
    shadowOpacity:0.05,
    shadowRadius:8,
    shadowOffset:{
      width:0,
      height:2,
    },
    elevation:2,
  },


  header:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal:20,
    paddingTop:20,
  },


  headerLeft:{
    flexDirection:"row",
    alignItems:"center",
    gap:10,
  },


  iconBadge:{
    width:36,
    height:36,
    borderRadius:18,
    backgroundColor:"#ecfdf5",
    justifyContent:"center",
    alignItems:"center",
  },


  title:{
    fontSize:16,
    fontWeight:"700",
    color:"#0f172a",
  },


  goalBadge:{
    marginTop:4,
    paddingHorizontal:8,
    paddingVertical:3,
    borderRadius:999,
    alignSelf:"flex-start",
  },


  lossBadge:{
    backgroundColor:"#fef2f2",
  },


  gainBadge:{
    backgroundColor:"#ecfdf5",
  },


  goalBadgeText:{
    fontSize:11,
    fontWeight:"600",
  },


  lossText:{
    color:RED,
  },


  gainText:{
    color:GREEN,
  },


  percentPill:{
    backgroundColor:"#ecfdf5",
    paddingHorizontal:10,
    paddingVertical:4,
    borderRadius:999,
  },


  percentText:{
    fontSize:12,
    fontWeight:"700",
    color:GREEN,
  },


  statsRow:{
    flexDirection:"row",
    alignItems:"center",
    marginTop:20,
    paddingHorizontal:20,
  },


  dividerWrap:{
    flex:1,
    alignItems:"center",
    paddingHorizontal:8,
  },


  divider:{
    width:"100%",
    height:1,
    backgroundColor:"#f1f5f9",
  },


  statLabel:{
    fontSize:11,
    fontWeight:"500",
    color:"#94a3b8",
    letterSpacing:0.5,
    textTransform:"uppercase",
  },


  statValue:{
    marginTop:2,
    fontSize:18,
    fontWeight:"700",
    color:"#0f172a",
  },


  statValueEmphasized:{
    fontSize:24,
  },


  statUnit:{
    fontSize:12,
    color:"#94a3b8",
    fontWeight:"500",
  },


  progressSection:{
    marginTop:24,
    paddingHorizontal:20,
  },


  trackBg:{
    height:10,
    borderRadius:999,
    backgroundColor:"#f1f5f9",
    overflow:"hidden",
  },


  trackFill:{
    height:"100%",
    borderRadius:999,
    backgroundColor:GREEN,
  },


  progressFooter:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginTop:10,
  },


  trendRow:{
    flexDirection:"row",
    alignItems:"center",
    gap:6,
  },


  trendText:{
    fontSize:14,
    fontWeight:"500",
    color:"#475569",
  },


  remainingText:{
    fontSize:12,
    color:"#94a3b8",
  },


  cta:{
    marginHorizontal:20,
    marginTop:20,
    marginBottom:20,
    backgroundColor:GREEN,
    paddingVertical:14,
    borderRadius:16,
  },


  ctaText:{
    textAlign:"center",
    color:"#fff",
    fontSize:14,
    fontWeight:"600",
  },

});