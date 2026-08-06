import React from "react";

import {
	View,
	Text,
	StyleSheet,
} from "react-native";

import {
	TrendingUp,
	TrendingDown,
} from "lucide-react-native";


export function ProgressHistoryCard({
	item
}:{
	item:any;
}){


	const isGain =
		item.weight_change > 0;


	const date =
		new Date(
			item.recorded_at
		).toLocaleDateString(
			"en-US",
			{
				month:"short",
				day:"2-digit",
				year:"numeric"
			}
		);



	return (

		<View style={styles.card}>


			<View style={styles.header}>


				<Text style={styles.date}>
					{date}
				</Text>


				<View
					style={[
						styles.badge,
						{
							backgroundColor:
							isGain
							? "#dcfce7"
							: "#fee2e2"
						}
					]}
				>

					<Text
						style={[
							styles.badgeText,
							{
								color:
								isGain
								? "#16a34a"
								: "#dc2626"
							}
						]}
					>

						{
							isGain
							? "Gain Weight"
							: "Lose Weight"
						}

					</Text>

				</View>


			</View>



			<View style={styles.row}>


				<View>

					<Text style={styles.value}>
						{item.current_weight} kg
					</Text>

					<Text style={styles.label}>
						Current
					</Text>

				</View>


				<View>

					<Text style={styles.label}>
						Target
					</Text>

					<Text style={styles.value}>
						{item.target_weight} kg
					</Text>

				</View>


			</View>



			<View style={styles.changeBox}>


				<Text style={styles.weightChange}>
					{item.previous_weight} kg
				</Text>


				<Text style={styles.arrow}>
					→
				</Text>


				<Text style={styles.weightChange}>
					{item.current_weight} kg
				</Text>


			</View>



			<View style={styles.footer}>


				{
					isGain ? (

						<TrendingUp
							size={16}
							color="#10b981"
						/>

					):(


						<TrendingDown
							size={16}
							color="#ef4444"
						/>

					)

				}


				<Text style={styles.changeText}>

					{isGain ? "+" : ""}
					{item.weight_change} kg
					{" "}
					{
						isGain
						? "gained"
						: "lost"
					}

				</Text>


			</View>



			<Text style={styles.progressLabel}>
				Progress
			</Text>


			<View style={styles.progressTrack}>

				<View
					style={[
						styles.progressFill,
						{
							width:
							`${item.progress_percentage}%`
						}
					]}
				/>

			</View>


			<Text style={styles.percent}>
				{item.progress_percentage}%
			</Text>


		</View>

	);

}

const styles = StyleSheet.create({

   card:{
      backgroundColor:"#fff",
      borderRadius:24,
      padding:20,
      borderWidth:1,
      borderColor:"#e2e8f0",
   },
   
   
   header:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center"
   },
   
   
   date:{
      fontSize:14,
      fontWeight:"600",
      color:"#64748b"
   },
   
   
   badge:{
      paddingHorizontal:10,
      paddingVertical:5,
      borderRadius:999
   },
   
   
   badgeText:{
      fontSize:12,
      fontWeight:"700"
   },
   
   
   row:{
      marginTop:20,
      flexDirection:"row",
      justifyContent:"space-between"
   },
   
   
   value:{
      fontSize:22,
      fontWeight:"700",
      color:"#0f172a"
   },
   
   
   label:{
      marginTop:3,
      fontSize:12,
      color:"#94a3b8"
   },
   
   
   changeBox:{
      marginTop:20,
      flexDirection:"row",
      alignItems:"center",
      gap:8
   },
   
   
   weightChange:{
      fontSize:16,
      fontWeight:"700",
      color:"#334155"
   },
   
   
   arrow:{
      fontSize:18,
      color:"#94a3b8"
   },
   
   
   footer:{
      marginTop:18,
      flexDirection:"row",
      alignItems:"center",
      gap:6
   },
   
   
   changeText:{
      fontSize:14,
      fontWeight:"600",
      color:"#475569"
   },
   
   
   progressLabel:{
      marginTop:18,
      marginBottom:8,
      color:"#64748b",
      fontSize:13
   },
   
   
   progressTrack:{
      height:10,
      backgroundColor:"#f1f5f9",
      borderRadius:999,
      overflow:"hidden"
   },
   
   
   progressFill:{
      height:"100%",
      backgroundColor:"#10b981",
      borderRadius:999
   },
   
   
   percent:{
      marginTop:6,
      textAlign:"right",
      fontSize:12,
      color:"#64748b"
   }
   
   });