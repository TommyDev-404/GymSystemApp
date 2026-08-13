import React from "react";
import { View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AttendanceHeader } from "@/features/attendance-history/components/AttendanceHeader";
import { AttendanceList } from "@/features/attendance-history/components/AttendanceList";
import { router, useLocalSearchParams } from "expo-router";
import { useGetMemberAttendanceHistory } from "@/features/attendance-history/hook/useAttendance";

interface Props {
  id: number,
  onBack?: () => void;
}

export function AttendanceHistoryScreen({ id }: Props) {

  const {
    data: attendanceData = [],
    isLoading,
  } = useGetMemberAttendanceHistory(
    Number(id)
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <AttendanceHeader onBack={() => router.back()} />

      <AttendanceList history={attendanceData} />
    </SafeAreaView>
  );
}