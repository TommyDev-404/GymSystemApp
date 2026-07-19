export type MemberDashboard = {
   id: number;
   username: string;
   join_date: string | null;
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