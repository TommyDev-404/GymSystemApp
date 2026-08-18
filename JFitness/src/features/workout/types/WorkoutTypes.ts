
export type WorkoutTutorials = {
   id: number;
   name: string;
   category: string;
   level: string;
   video_url: string;
   instructions: string;
   equipment: string[];
   muscles_targeted: string[];
   demo_images: string[];
   created_at: string;
   updated_at: string;
}

interface WorkoutExercise {
  name: string;
  sets: string;
  weight?: string;
}

export interface Workout {
  id?: number | string;
  name: string;
  date: string;
  duration: string;
  exercises?: WorkoutExercise[];
}
 
export type Params = {
   limit?: number;
   category?: string;
};

export type ExerciseInput = {
   name: string;
   sets?: number;
   reps?: number;
   weight?: number;
 }

export type CreateWorkoutInput = {
   name: string;
   duration: string;
   exercises: ExerciseInput[];
}
 
export interface WorkoutProgress {
  value: number;
  label: string;
}

export interface WorkoutSummary {
   totalWorkouts: number;
   weeklyWorkouts: number;
   averageDuration: number;
 }