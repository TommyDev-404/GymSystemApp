
 export interface MemberPaymentHistoryData {
   stats: PaymentStats;
   payments: PaymentHistoryItem[];
 }
 
 export interface PaymentStats {
   totalPaid: number;
   plan: string;
   expires: Date;
 }
 
 export interface PaymentHistoryItem {
   id: number;
   plan: string;
   amount: number;
   datePaid: string;
   paymentMethod: "GCash" | "Cash" | "Bank_Transfer";
   status: string;
 }