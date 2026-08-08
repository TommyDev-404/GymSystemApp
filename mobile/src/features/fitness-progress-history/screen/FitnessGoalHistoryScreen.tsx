import React from "react";
import {
	View,
	StatusBar,
} from "react-native";

import {
	SafeAreaView,
} from "react-native-safe-area-context";

import {
	router,
} from "expo-router";

import {
	ProgressHistoryHeader
} from "../components/Header";

import {
	ProgressHistoryList
} from "../components/FItnessGoalHistoryList";

import {
	useGetFitnessGoalHistory
} from "../../home/hook/useHome";
import { useAuth } from "@/context/AuthContext";
import { FitnessGoalHistory } from "@/features/home/types/HomeTypes";


export function FitnessGoalHistoryScreen(){
   const { member } = useAuth();
	const {
		data: progressHistory,
		isLoading,
	} = useGetFitnessGoalHistory(
		Number(member?.memberId!)
      );
   
   console.log(progressHistory);

	return (

		<SafeAreaView
			style={{
				flex:1,
				backgroundColor:"#f8fafc"
			}}
		>

			<StatusBar
				barStyle="dark-content"
				backgroundColor="#fff"
			/>


			<ProgressHistoryHeader
				onBack={() => router.back()}
			/>


			<ProgressHistoryList
				history={progressHistory?.history as FitnessGoalHistory[]}
			/>


		</SafeAreaView>

	);

}