
export type Workout = {
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
 
export type Params = {
   limit?: number;
   category?: string;
};

export type ExerciseInput = {
   name: string;
   sets: number;
   reps: number;
   weight: number;
 }

export type CreateWorkoutInput = {
   name: string;
   duration: string;
   calories: string;
   exercises: ExerciseInput[];
 }