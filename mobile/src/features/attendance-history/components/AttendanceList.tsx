import React from "react";
import { View, Text, ScrollView } from "react-native";
import { CheckCircle, History } from "lucide-react-native";
import { EmptyState } from "@/components/EmptyState";

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
      contentContainerStyle={{
        padding: 20,
        gap: 12,
        flexGrow: 1,
      }}
    >
      {history.length > 0 ?
        history.map((h) => (
        <View
          key={h.id}
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 14,

            flexDirection: "row",
            alignItems: "center",
            gap: 12,

            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 8,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            elevation: 2,
          }}
        >

          {/* ICON */}
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              backgroundColor: "#d1fae5",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircle
              size={18}
              color="#10b981"
            />
          </View>


          {/* INFO */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              Gym Check-in
            </Text>


            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 3,
                gap: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: "#64748b",
                }}
              >
                {h.date}
              </Text>

              <Text
                style={{
                  fontSize: 11,
                  color: "#94a3b8",
                }}
              >
                •
              </Text>

              <Text
                style={{
                  fontSize: 11,
                  color: "#64748b",
                }}
              >
                {h.time}
              </Text>
            </View>
          </View>


          {/* STATUS */}
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 20,
              backgroundColor: "#d1fae5",
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: "700",
                color: "#065f46",
              }}
            >
              ✓ Done
            </Text>
          </View>

        </View>
        ))
      : 
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
         <EmptyState
            icon={History}
            title="No attendance records found"
            subtitle="Your completed gym check-ins will be displayed here."
          />
      </View>
      }
    </ScrollView>
  );
}