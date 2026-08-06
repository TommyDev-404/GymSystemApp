import React from "react";

import {
	View,
	Text,
	Pressable,
	StyleSheet,
} from "react-native";

import {
	ChevronLeft,
} from "lucide-react-native";


interface Props{
	onBack:()=>void;
}


export function ProgressHistoryHeader({
	onBack
}:Props){

	return (

		<View style={styles.container}>

			<Pressable
				onPress={onBack}
			>

				<ChevronLeft
					size={26}
					color="#0f172a"
				/>

			</Pressable>


			<Text style={styles.title}>
				Progress History
			</Text>


			<View style={{width:26}} />

		</View>

	);

}


const styles = StyleSheet.create({

	container:{
		height:60,
		backgroundColor:"#fff",
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
		paddingHorizontal:20,
		borderBottomWidth:1,
		borderColor:"#f1f5f9"
	},

	title:{
		fontSize:18,
		fontWeight:"700",
		color:"#0f172a"
	}

});