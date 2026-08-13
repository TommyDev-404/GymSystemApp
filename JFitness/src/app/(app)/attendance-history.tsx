import { AttendanceHistoryScreen } from "@/features/attendance-history/screen/AttendanceHistoryScreen";
import { router, useLocalSearchParams } from "expo-router";

export default function AttendanceHistory() {
  
  const { memberId } = useLocalSearchParams();

  return (
    <AttendanceHistoryScreen
      id={Number(memberId)}
      onBack={() => router.back()}
    />
  );
}