import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Lightbulb } from "lucide-react-native";
import { theme } from "@/utils/theme";
import { FitnessGuide } from "../types/fitnessTypes";

const GREEN = theme.primary;

interface DailyTipsCardProps {
  tips: FitnessGuide["tips"];
}

export function DailyTipsCard({
  tips,
}: DailyTipsCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Lightbulb
            size={18}
            color={GREEN}
            strokeWidth={2.2}
          />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.label}>DAILY TIPS</Text>

          <Text style={styles.description}>
            Simple habits to help you stay consistent.
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {tips.map((tip, index) => (
          <View key={tip} style={styles.tipItem}>
            <View style={styles.number}>
              <Text style={styles.numberText}>
                {index + 1}
              </Text>
            </View>

            <Text style={styles.tip}>{tip}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: `${GREEN}20`,
    marginRight: 10,
  },

  headerText: {
    flex: 1,
  },

  label: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.7,
    color: GREEN,
  },

  description: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
    color: theme.textSub,
  },

  content: {
    marginTop: 16,
    gap: 10,
  },

  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  number: {
    width: 23,
    height: 23,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: `${GREEN}20`,
    marginRight: 9,
  },

  numberText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: GREEN,
  },

  tip: {
    flex: 1,
    paddingTop: 2,
    fontSize: 11.5,
    lineHeight: 17,
    color: theme.textSub,
  },
});