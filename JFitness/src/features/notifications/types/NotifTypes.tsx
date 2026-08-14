
export interface Notification {
  id: number;
  recipient_id: number;
  category:
    "PAYMENT" |
    "MEMBERSHIP" |
    "REWARD" |
    "MEMBER" |
    "ATTENDANCE";
  type:
    "MEMBERSHIP_EXPIRED" |
    "MEMBERSHIP_EXPIRING" |
    "MEMBERSHIP_UPGRADE" |
    "PAYMENT_RECORDED" |
    "MEMBER_ADDED" |
    "MEMBER_INACTIVE_3_DAYS" |
    "MEMBER_INACTIVE_7_DAYS" |
    "MEMBER_INACTIVE_14_DAYS" |
    "REWARD_CLAIMED" |
    "ATTENDANCE_POINTS" |
    "REWARD_CANCELLED";
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