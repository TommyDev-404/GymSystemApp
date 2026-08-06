import React from "react";

import {
	FlatList,
	View,
	Text,
} from "react-native";

import {
	ProgressHistoryCard
} from "./FitnessProgressCard";


interface Props{
	history:any[];
}


export function ProgressHistoryList({
	history
}:Props){

	if(history.length === 0){

		return (

			<View
				style={{
					flex:1,
					alignItems:"center",
					justifyContent:"center"
				}}
			>

				<Text>
					No progress history yet
				</Text>

			</View>

		);

	}


	return (

		<FlatList

			data={history}

			keyExtractor={(item)=>String(item.id)}

			contentContainerStyle={{
				padding:20,
				gap:16
			}}

			renderItem={({item})=>(

				<ProgressHistoryCard
					item={item}
				/>

			)}

		/>

	);

}