import { StackWrapper } from "@/components/shared/StackWrapper";
import { AttendanceList } from "@/features/attendance-history/components/AttendanceList";
import {
  useGetMemberAttendanceHistory,
  useGetMemberAttendanceProgress,
} from "@/features/attendance-history/hook/useAttendance";
import { AttendanceChart } from "../components/AttendanceChart";
import { useAuth } from "@/context/AuthContext";

export function AttendanceHistoryScreen() {
  const { memberIDs } = useAuth();

  const { data: attendanceData = [], isLoading: attendanceLoading } = useGetMemberAttendanceHistory(Number(memberIDs?.member_id!));
  const { data: attendanceProgressData = [], isLoading: progressLoading } = useGetMemberAttendanceProgress(Number(memberIDs?.member_id!));

  const isLoading = attendanceLoading || progressLoading;

  return (
    <StackWrapper
      title="Check-in History"
      subtitle="Your gym attendance records"
      loading={isLoading}
      useScrollView={false}
      gap={20}
    >
      <AttendanceChart chartData={attendanceProgressData} />
      
      <AttendanceList history={attendanceData} />
    </StackWrapper>
  );
}