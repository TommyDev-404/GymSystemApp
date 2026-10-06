import { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CheckCircle, History } from "lucide-react-native";
import { StackWrapper } from "@/components/shared/StackWrapper";
import {
  useGetMemberAttendanceHistory,
  useGetMemberAttendanceProgress,
} from "@/features/attendance-history/hook/useAttendance";
import { AttendanceChart } from "../components/AttendanceChart";
import { EmptyState } from "@/components/shared/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/utils/theme";

interface Attendance {
  id: number;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
}

export function AttendanceHistoryScreen() {
  const { memberIDs } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: attendanceData = [],
    isLoading: attendanceLoading,
    refetch: refetchAttendance,
  } = useGetMemberAttendanceHistory(Number(memberIDs?.member_id!));

  const {
    data: attendanceProgressData = [],
    isLoading: progressLoading,
    refetch: refetchProgress,
  } = useGetMemberAttendanceProgress(Number(memberIDs?.member_id!));

  const isLoading = attendanceLoading || progressLoading;

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await Promise.all([
        refetchAttendance(),
        refetchProgress(),
      ]);
    } catch (error) {
      console.error("❌ Attendance history refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };
  
  return (
    <StackWrapper
      title="Check-in History"
      subtitle="Your gym attendance records"
      loading={isLoading}
      useScrollView={false}
      gap={0}
    >
      <FlatList
        data={attendanceData as Attendance[]}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <AttendanceChart chartData={attendanceProgressData} />

            <View style={styles.sectionHeader}>
              <Text style={styles.title}>Recent Attendance</Text>
              <Text style={styles.subtitle}>
                Your recent gym check-ins and check-outs
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <CheckCircle
                size={18}
                color={theme.primaryLight}
                strokeWidth={2.2}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.attendanceTitle}>
                Gym Attendance
              </Text>

              <Text style={styles.date}>{item.date}</Text>

              <View style={styles.timeRow}>
                <View style={styles.timeItem}>
                  <Text style={styles.timeLabel}>Check-in</Text>
                  <Text style={styles.time}>
                    {item.checkInTime ?? "--"}
                  </Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.timeItem}>
                  <Text style={styles.timeLabel}>Check-out</Text>
                  <Text style={styles.time}>
                    {item.checkOutTime ?? "--"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.status}>
              <Text style={styles.statusText}>
                {item.checkOutTime ? "✓ Done" : "Active"}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <EmptyState
              icon={History}
              title="No attendance records found"
              subtitle="Your gym check-ins and check-outs will be displayed here."
            />
          </View>
        }
      />
    </StackWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 24,
    gap: 10,
  },

  headerContent: {
    gap: 20,
    marginBottom: 10,
  },

  sectionHeader: {
    marginTop: 2,
  },

  title: {
    fontSize: 15,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.2,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 11,
    color: theme.textMuted,
  },

  card: {
    backgroundColor: theme.card,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    flex: 1,
  },

  attendanceTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
  },

  date: {
    marginTop: 3,
    fontSize: 11,
    color: theme.textMuted,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },

  timeItem: {
    flex: 1,
  },

  timeLabel: {
    fontSize: 9,
    fontWeight: "600",
    color: theme.textMuted,
    textTransform: "uppercase",
  },

  time: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "600",
    color: theme.textSub,
  },

  separator: {
    width: 1,
    height: 28,
    backgroundColor: theme.borderAccent,
  },

  status: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
    color: theme.primaryLight,
  },

  empty: {
    flex: 1,
    minHeight: 280,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});