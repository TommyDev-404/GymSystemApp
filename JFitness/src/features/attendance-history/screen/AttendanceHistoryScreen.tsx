import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";

import { AttendanceList } from "@/features/attendance-history/components/AttendanceList";
import { useGetMemberAttendanceHistory, useGetMemberAttendanceProgress } from "@/features/attendance-history/hook/useAttendance";
import { AppBackground } from "@/components/shared/AppBackground";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { AttendanceChart } from "../components/AttendanceChart";
import { PageLoader } from "@/components/shared/PageLoader";
import { useAuth } from "@/context/AuthContext";

export function AttendanceHistoryScreen() {
  const { member } = useAuth();

  const { data: attendanceData = [], isLoading: attendanceLoading} = useGetMemberAttendanceHistory(Number(member?.memberId!));
  const { data: attendanceProgressData = [], isLoading: progressLoading,} = useGetMemberAttendanceProgress(Number(member?.memberId!));

  if (attendanceLoading || progressLoading) {
    return (
      <PageLoader
        title="Check-in History"
        subtitle="Your gym attendance records"
      />
    );
  }

  return (
    <AppBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScreenHeader
          title="Check-in History"
          subtitle="Your gym attendance records"
        />

        <View style={styles.content}>
          <AttendanceChart chartData={attendanceProgressData} />

          <AttendanceList history={attendanceData} />
        </View>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
  },
});