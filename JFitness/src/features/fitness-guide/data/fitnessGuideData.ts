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

export const fitnessGuideData: Record<FitnessGuideType, FitnessGuide> = {
  GAIN: {
    title: "Your Weight Gain Guide",
    description:
      "A practical guide to support healthy weight gain through strength training, balanced nutrition, and proper recovery.",
    goalDescription:
      "Focus on gradually increasing body weight while building strength and supporting muscle development.",
    workoutDescription:
      "Prioritize resistance training and allow enough recovery between workouts.",
    workouts: [
      {
        day: "Monday",
        title: "Upper Body",
        focus: "Chest, back, shoulders, and arms",
        exercises: [
          "Bench Press",
          "Lat Pulldown",
          "Seated Row",
          "Shoulder Press",
          "Bicep Curl",
          "Tricep Pushdown",
        ],
      },
      {
        day: "Wednesday",
        title: "Lower Body",
        focus: "Quads, hamstrings, glutes, and calves",
        exercises: [
          "Squats",
          "Leg Press",
          "Romanian Deadlift",
          "Leg Curl",
          "Leg Extension",
          "Calf Raises",
        ],
      },
      {
        day: "Friday",
        title: "Full Body",
        focus: "Compound movements for overall strength",
        exercises: [
          "Squats",
          "Bench Press",
          "Lat Pulldown",
          "Shoulder Press",
          "Leg Curl",
          "Plank",
        ],
      },
    ],
    nutritionDescription:
      "Focus on protein-rich foods, nutritious calorie-dense options, and consistent meals throughout the day.",
    nutrition: [
      {
        title: "Protein",
        description: "Supports muscle repair and development.",
        foods: ["Eggs", "Chicken", "Fish", "Lean Beef", "Milk", "Greek Yogurt"],
      },
      {
        title: "Carbohydrates",
        description: "Provides energy for training and daily activities.",
        foods: ["Rice", "Oats", "Potatoes", "Sweet Potatoes", "Bread", "Pasta"],
      },
      {
        title: "Healthy Fats",
        description: "Provides energy and adds nutritious calories to meals.",
        foods: ["Peanut Butter", "Nuts", "Avocado", "Seeds", "Olive Oil"],
      },
    ],
    tips: [
      "Eat regular meals and avoid frequently skipping meals.",
      "Include a source of protein in your main meals.",
      "Choose nutritious calorie-dense foods instead of relying mainly on processed foods.",
      "Increase food portions gradually according to your needs.",
      "Allow your body enough time to recover between workouts.",
      "Stay consistent and monitor your progress over time.",
    ],
  },

  LOSS: {
    title: "Your Weight Loss Guide",
    description:
      "A practical guide to support healthy weight loss through regular activity, strength training, balanced nutrition, and sustainable habits.",
    goalDescription:
      "Focus on gradually reducing body weight while maintaining strength, muscle, and healthy daily habits.",
    workoutDescription:
      "Combine resistance training with regular cardiovascular activity and adequate recovery.",
    workouts: [
      {
        day: "Monday",
        title: "Full Body",
        focus: "Major muscle groups and strength",
        exercises: [
          "Squats",
          "Chest Press",
          "Lat Pulldown",
          "Shoulder Press",
          "Leg Curl",
          "Plank",
        ],
      },
      {
        day: "Tuesday",
        title: "Cardio",
        focus: "Improve cardiovascular activity",
        exercises: [
          "Brisk Walking",
          "Cycling",
          "Treadmill Walking",
          "Elliptical",
        ],
      },
      {
        day: "Thursday",
        title: "Full Body",
        focus: "Strength and muscle maintenance",
        exercises: [
          "Leg Press",
          "Seated Row",
          "Chest Press",
          "Leg Extension",
          "Leg Curl",
          "Plank",
        ],
      },
      {
        day: "Saturday",
        title: "Light Activity",
        focus: "Low-intensity movement and recovery",
        exercises: [
          "Walking",
          "Light Cycling",
          "Stretching",
          "Mobility Exercises",
        ],
      },
    ],
    nutritionDescription:
      "Prioritize protein, vegetables, fiber-rich foods, and balanced portions while limiting highly processed foods and sugary drinks.",
    nutrition: [
      {
        title: "Protein",
        description: "Helps support muscle maintenance and keeps meals satisfying.",
        foods: ["Chicken", "Fish", "Eggs", "Lean Beef", "Greek Yogurt", "Beans"],
      },
      {
        title: "Fiber-Rich Foods",
        description: "Helps make meals more filling and nutrient-dense.",
        foods: ["Vegetables", "Fruits", "Oats", "Beans", "Whole Grains"],
      },
      {
        title: "Healthy Fats",
        description: "Include moderate portions as part of a balanced diet.",
        foods: ["Avocado", "Nuts", "Seeds", "Olive Oil"],
      },
    ],
    tips: [
      "Focus on sustainable habits rather than rapid changes.",
      "Include protein and vegetables in your main meals.",
      "Choose water regularly instead of frequently consuming sugary drinks.",
      "Be mindful of portion sizes and highly processed foods.",
      "Combine strength training with regular physical activity.",
      "Track your progress consistently and adjust your habits gradually.",
    ],
  },
};
