
export type Reward = {
   id: number;
   name: string;
   description: string;
   category: "Fitness" | "Nutrition" | "Loyalty" | "Special";
   points_required: number;
   total_claim: number;
   createdAt: string;
   updatedAt: string;
}

export type RedeemedReward = {
   id: number;
   reward_id: number;
 
   name: string;
   description: string;
   category: "Fitness" | "Nutrition" | "Loyalty" | "Special";
 
   points_used: number;
 
   status: "Pending" | "Claimed" | "Cancelled";
 
   redeemed_at: string;
 }