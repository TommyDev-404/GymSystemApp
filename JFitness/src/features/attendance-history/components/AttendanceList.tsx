import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { CheckCircle, History } from "lucide-react-native";
import { EmptyState } from "@/components/shared/EmptyState";
import { theme } from "@/utils/theme";

interface Attendance {
  id: number;
  date: string;
  time: string;
}

interface Props {
  history: Attendance[];
}

export function AttendanceList({ history }: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Recent Attendance</Text>
        <Text style={styles.subtitle}>
          Your recent gym check-ins
        </Text>
      </View>

      {history.length > 0 ? (
        history.map((h) => (
          <View key={h.id} style={styles.card}>
            <View style={styles.iconBox}>
              <CheckCircle
                size={18}
                color={theme.primaryLight}
                strokeWidth={2.2}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.checkInTitle}>
                Gym Check-in
              </Text>

              <View style={styles.metaRow}>
                <Text style={styles.date}>{h.date}</Text>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.time}>{h.time}</Text>
              </View>
            </View>

            <View style={styles.status}>
              <Text style={styles.statusText}>✓ Done</Text>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.empty}>
          <EmptyState
            icon={History}
            title="No attendance records found"
            subtitle="Your completed gym check-ins will be displayed here."
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    gap: 10,
    flexGrow: 1,
  },

  sectionHeader: {
    marginBottom: 2,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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

  checkInTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.text,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },

  date: {
    fontSize: 11,
    color: theme.textSub,
  },

  separator: {
    fontSize: 11,
    color: theme.textMuted,
  },

  time: {
    fontSize: 11,
    color: theme.textSub,
  },

  status: {
    paddingHorizontal: 10,
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});