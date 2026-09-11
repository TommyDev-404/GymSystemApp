export type ProgramLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export interface ProgramWorkout {
  day: string;
  title: string;
  focus: string;
  duration: string;
  exercises: string[];
}

export interface BeginnerProgram {
  id: number;
  name: string;
  level: ProgramLevel;
  duration: string;
  frequency: string;
  equipment: string;
  description: string;
  goals: string[];
  image: string;
  color: string;
  workouts: ProgramWorkout[];
  tips: string[];
}