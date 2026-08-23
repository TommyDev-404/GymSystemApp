import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Target, ArrowDown, ArrowUp } from "lucide-react-native";
import { theme } from "@/utils/theme";

interface ProgressMetricGridProps {
  startingWeight: number;
  targetWeight: number;
  remainingWeight: number;
  weightChange: number;
  goalType: "LOSE_WEIGHT" | "GAIN_WEIGHT";
  isMovingAway: boolean;
}

const GREEN = theme.primary;
const RED = "#EF4444";

export function ProgressMetricGrid({
  startingWeight,
  targetWeight,
  remainingWeight,
  weightChange,
  goalType,
  isMovingAway,
}: ProgressMetricGridProps) {
  const isLoseWeight = goalType === "LOSE_WEIGHT";
  const changeLabel = isLoseWeight ? "Weight Lost" : "Weight Gained";
  const changeColor = isMovingAway ? RED : GREEN;
  const ChangeIcon = isLoseWeight ? ArrowDown : ArrowUp;

  return (
    <View>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Progress Summary</Text>
          <Text style={styles.sectionSubtitle}>
            Your current goal metrics
          </Text>
        </View>
      </View>

      <View style={styles.grid}>
        <MetricCard
          label="Starting Weight"
          value={`${startingWeight.toFixed(1)} kg`}
          icon={
            <Target
              size={16}
              color={theme.textMuted}
              strokeWidth={2}
            />
          }
          iconColor={theme.textMuted}
        />

        <MetricCard
          label="Target Weight"
          value={`${targetWeight.toFixed(1)} kg`}
          icon={
            <Target
              size={16}
              color={theme.textMuted}
              strokeWidth={2}
            />
          }
          iconColor={theme.textMuted}
        />

        <MetricCard
          label={changeLabel}
          value={`${Math.abs(weightChange).toFixed(1)} kg`}
          highlighted={!isMovingAway}
          danger={isMovingAway}
          icon={
            <ChangeIcon
              size={16}
              color={changeColor}
              strokeWidth={2.3}
            />
          }
          iconColor={changeColor}
        />

        <MetricCard
          label="Remaining"
          value={`${remainingWeight.toFixed(1)} kg`}
          highlighted={!isMovingAway}
          danger={isMovingAway}
          icon={
            <ChangeIcon
              size={16}
              color={changeColor}
              strokeWidth={2.3}
            />
          }
          iconColor={changeColor}
        />
      </View>
    </View>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconColor: string;
  highlighted?: boolean;
  danger?: boolean;
}

function MetricCard({
  label,
  value,
  icon,
  iconColor,
  highlighted = false,
  danger = false,
}: MetricCardProps) {
  return (
    <View
      style={[
        styles.card,
        highlighted && { borderColor: `${GREEN}55` },
        danger && { borderColor: `${RED}55` },
      ]}
    >
      <View
        style={[
          styles.icon,
          { borderColor: `${iconColor}35` },
        ]}
      >
        {icon}
      </View>

      <Text style={styles.label}>{label}</Text>

      <Text
        style={[
          styles.value,
          highlighted && styles.valueHighlighted,
          danger && styles.valueDanger,
        ]}
      >
        {value}
      </Text>

      <View
        style={[
          styles.accentLine,
          { backgroundColor: iconColor },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.text,
  },
  sectionSubtitle: {
    marginTop: 3,
    fontSize: 10.5,
    color: theme.textMuted,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    width: "48.5%",
    minHeight: 105,
    padding: 13,
    borderRadius: 16,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.borderStrong,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
    backgroundColor: theme.surface,
    borderWidth: 1,
  },
  label: {
    fontSize: 10,
    color: theme.textMuted,
    fontWeight: "600",
  },
  value: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: "800",
    color: theme.textSub,
  },
  valueHighlighted: {
    color: GREEN,
  },
  valueDanger: {
    color: RED,
  },
  accentLine: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: 26,
    height: 2,
    borderRadius: 999,
    opacity: 0.7,
  },
});