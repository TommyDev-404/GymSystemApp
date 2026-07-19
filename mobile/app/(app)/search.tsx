import ExerciseSearchScreen from "@/features/search/screen/ExerciseSearchScreen";
import FeatureSearchScreen from "@/features/search/screen/FeatureSearchScreen";
import { useLocalSearchParams } from "expo-router";

export default function Search() {
  const { fromWorkout } = useLocalSearchParams();

  const isFromWorkout = fromWorkout === "true";

   console.log(fromWorkout);
  return isFromWorkout ? (
    <ExerciseSearchScreen />
  ) : (
    <FeatureSearchScreen />
  );
}