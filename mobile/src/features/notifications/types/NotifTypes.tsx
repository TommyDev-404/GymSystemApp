
export interface Notification {
  id: number;
  recipient_id: number;
  type:
    | "CHECK_IN"
    | "PAYMENT"
    | "REWARD"
    | "EXPIRY"
    | "REMINDER";
  title: string;
  description: string;
  is_read: boolean;
  created_at: string;
}

export type NotificationGroupType = {
  label: string;
  icon: any;
  color: string;
  bg: string;
  memberId: number;
  items: any[];
};