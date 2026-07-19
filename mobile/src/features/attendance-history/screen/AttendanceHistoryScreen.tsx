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

const history = [
  { type: "Gym Check-in", date: "June 24, 2026 • 6:30 AM" },
  { type: "Gym Check-in", date: "June 23, 2026 • 7:10 AM" },
  { type: "Workout Completed", date: "June 22, 2026 • 6:45 AM" },
];

export function AttendanceHistoryScreen({ id, onBack }: Props) {

  const {
    data: attendanceData = [],
    isLoading,
  } = useGetMemberAttendanceHistory(
    Number(id)
  );

  console.log(attendanceData)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <AttendanceHeader onBack={() => router.back()} />

      <AttendanceList history={attendanceData} />
    </SafeAreaView>
  );
}