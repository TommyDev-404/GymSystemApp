export type FitnessGuideType = "GAIN" | "LOSS";

export interface WorkoutDay {
  day: string;
  title: string;
  focus: string;
  exercises: string[];
}

export interface NutritionCategory {
  title: string;
  description: string;
  foods: string[];
}

export interface FitnessGuide {
  title: string;
  description: string;
  goalDescription: string;
  workoutDescription: string;
  workouts: WorkoutDay[];
  nutritionDescription: string;
  nutrition: NutritionCategory[];
  tips: string[];
}