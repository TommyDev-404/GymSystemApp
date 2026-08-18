import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Target,
  ArrowDown,
  ArrowUp,
} from "lucide-react-native";

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

  const changeLabel = isLoseWeight
    ? "Weight Lost"
    : "Weight Gained";

  const changeIcon = isLoseWeight ? (
    <ArrowDown
      size={16}
      color={isMovingAway ? RED : GREEN}
      strokeWidth={2.3}
    />
  ) : (
    <ArrowUp
      size={16}
      color={isMovingAway ? RED : GREEN}
      strokeWidth={2.3}
    />
  );

  const remainingIcon = isLoseWeight ? (
    <ArrowDown
      size={16}
      color={isMovingAway ? RED : GREEN}
      strokeWidth={2.3}
    />
  ) : (
    <ArrowUp
      size={16}
      color={isMovingAway ? RED : GREEN}
      strokeWidth={2.3}
    />
  );

  return (
    <View style={styles.grid}>

      {/* STARTING WEIGHT */}

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

      {/* TARGET WEIGHT */}

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

      {/* WEIGHT LOST / GAINED */}

      <MetricCard
        label={changeLabel}
        value={`${Math.abs(weightChange).toFixed(1)} kg`}
        highlighted={!isMovingAway}
        danger={isMovingAway}
        icon={changeIcon}
        iconColor={isMovingAway ? RED : GREEN}
      />

      {/* REMAINING */}

      <MetricCard
        label="Remaining"
        value={`${remainingWeight.toFixed(1)} kg`}
        highlighted={!isMovingAway}
        danger={isMovingAway}
        icon={remainingIcon}
        iconColor={isMovingAway ? RED : GREEN}
      />

    </View>
  );
}


/* =========================================================
   METRIC CARD
========================================================= */

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

        highlighted && styles.cardHighlighted,

        danger && styles.cardDanger,
      ]}
    >
      {/* ICON */}

      <View
        style={[
          styles.icon,

          highlighted && styles.iconHighlighted,

          danger && styles.iconDanger,

          {
            borderColor: `${iconColor}45`,
          },
        ]}
      >
        {icon}
      </View>

      {/* LABEL */}

      <Text style={styles.label}>
        {label}
      </Text>

      {/* VALUE */}

      <Text
        style={[
          styles.value,

          highlighted && styles.valueHighlighted,

          danger && styles.valueDanger,
        ]}
      >
        {value}
      </Text>

      {/* CENTERED UNDERLINE */}

      <View
        style={[
          styles.accentLine,
          {
            backgroundColor: iconColor,
          },
        ]}
      />
    </View>
  );
}


/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  /* ================= GRID ================= */

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },


  /* ================= CARD ================= */

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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,

    elevation: 3,
  },


  /* ================= POSITIVE ================= */

  cardHighlighted: {
    borderColor: theme.borderAccent,
  },


  /* ================= DANGER ================= */

  cardDanger: {
    borderColor: theme.errorBorder,
  },


  /* ================= ICON ================= */

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


  iconHighlighted: {
    backgroundColor: "rgba(16,185,129,0.08)",
  },


  iconDanger: {
    backgroundColor: "rgba(239,68,68,0.08)",
  },


  /* ================= LABEL ================= */

  label: {
    fontSize: 10,

    color: theme.textMuted,

    fontWeight: "600",
  },


  /* ================= VALUE ================= */

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


  /* ================= ACCENT ================= */

  accentLine: {
    position: "absolute",

    bottom: 0,
    alignSelf: "center",

    width: 26,
    height: 2,

    borderRadius: 999,

    opacity: 0.85,
  },

});