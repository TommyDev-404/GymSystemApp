
export interface ReferralData {
   member_id: number;
   referral_code: string;
   total_referred: number;
   points_earned: number;
}

export interface ReferralRecord {
   name: string;
   status: "Active" | "Inactive" | "Suspended";
   profile: string;
   points_earned: number;
   joined_date: string | Date;
   referred_at: string | Date;
 }