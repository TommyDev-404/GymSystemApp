export type MemberDashboard = {
   id: number;
   username: string;
   membership_start: string | null;
   plan: string;
   expiry: string | null;
   status: "Active" | "Inactive";
   points: number;
 
   stats: {
      dayStreak: number;
      totalVisits: number;
      thisMonth: number;
   };
};

export interface CreateFitnessGoalPayload {
   goal_type: "LOSE_WEIGHT" | "GAIN_WEIGHT";
   current_weight: number;
   target_weight: number;
 }
 
 
 export interface UpdateFitnessGoalPayload {
   goal_type?: "LOSE_WEIGHT" | "GAIN_WEIGHT";
   current_weight?: number;
   target_weight?: number;
}

export interface WeightGoal {
  id:number;
  member_id:number;
  goal_type:"LOSE_WEIGHT" | "GAIN_WEIGHT";

  start_weight:number;
  current_weight:number;
  target_weight:number;

  progress_percentage: number;
  status: string;
}

export interface FitnessGoalHistory {
  id: number;
  goal_type: "LOSE_WEIGHT" | "GAIN_WEIGHT";
  previous_weight:number;
  current_weight:number;
  target_weight:number;
  weight_change:number;
  progress_percentage:number;
  recorded_at:string;
}

export interface Badges {
  notificationCount: number;
  communityCount: number;
}