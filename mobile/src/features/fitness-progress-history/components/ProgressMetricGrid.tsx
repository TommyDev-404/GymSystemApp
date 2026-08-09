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

interface ProgressMetricGridProps {
  startingWeight: number;
  targetWeight: number;
  remainingWeight: number;
  weightChange: number;
  goalType: "LOSE_WEIGHT" | "GAIN_WEIGHT";
  isMovingAway: boolean;
}

const GREEN = "#10B981";
const RED = "#EF4444";

const SLATE_50 = "#F8FAFC";
const SLATE_100 = "#F1F5F9";
const SLATE_400 = "#94A3B8";
const SLATE_500 = "#64748B";
const SLATE_700 = "#334155";

export function ProgressMetricGrid({
  startingWeight,
  targetWeight,
  remainingWeight,
  weightChange,
  goalType,
  isMovingAway,
}: ProgressMetricGridProps) {

  const isLoseWeight =
    goalType === "LOSE_WEIGHT";

  const changeLabel = isLoseWeight
    ? "Weight Lost"
    : "Weight Gained";

  const changeIcon = isLoseWeight ? (
    <ArrowDown
      size={17}
      color={isMovingAway ? RED : GREEN}
      strokeWidth={2.3}
    />
  ) : (
    <ArrowUp
      size={17}
      color={isMovingAway ? RED : GREEN}
      strokeWidth={2.3}
    />
  );

  const remainingIcon = isLoseWeight ? (
    <ArrowDown
      size={17}
      color={isMovingAway ? RED : GREEN}
      strokeWidth={2.3}
    />
  ) : (
    <ArrowUp
      size={17}
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
            size={17}
            color={SLATE_500}
            strokeWidth={2}
          />
        }
      />

      {/* TARGET WEIGHT */}

      <MetricCard
        label="Target Weight"
        value={`${targetWeight.toFixed(1)} kg`}
        icon={
          <Target
            size={17}
            color={SLATE_500}
            strokeWidth={2}
          />
        }
      />

      {/* WEIGHT LOST / GAINED */}

      <MetricCard
        label={changeLabel}
        value={`${Math.abs(weightChange).toFixed(1)} kg`}
        highlighted
        danger={isMovingAway}
        icon={changeIcon}
      />

      {/* REMAINING */}

      <MetricCard
        label="Remaining"
        value={`${remainingWeight.toFixed(1)} kg`}
        highlighted
        danger={isMovingAway}
        icon={remainingIcon}
      />

    </View>
  );
}


/* ========================================================= */
/* METRIC CARD */
/* ========================================================= */

interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlighted?: boolean;
  danger?: boolean;
}

function MetricCard({
  label,
  value,
  icon,
  highlighted = false,
  danger = false,
}: MetricCardProps) {

  return (
    <View
      style={[
        styles.card,

        highlighted &&
          styles.cardHighlighted,

        danger &&
          styles.cardDanger,
      ]}
    >

      {/* ICON */}

      <View
        style={[
          styles.icon,

          highlighted &&
            styles.iconHighlighted,

          danger &&
            styles.iconDanger,
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

          highlighted &&
            styles.valueHighlighted,

          danger &&
            styles.valueDanger,
        ]}
      >
        {value}
      </Text>

    </View>
  );
}


/* ========================================================= */
/* STYLES */
/* ========================================================= */

const styles = StyleSheet.create({

  /* GRID */

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },


  /* CARD */

  card: {
    width: "48.5%",
    minHeight: 105,

    padding: 13,

    borderRadius: 16,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: SLATE_100,
  },


  /* HIGHLIGHTED */

  cardHighlighted: {
    backgroundColor: "#F7FFFB",
    borderColor: "#D1FAE5",
  },


  /* DANGER */

  cardDanger: {
    backgroundColor: "#FFF8F8",
    borderColor: "#FECACA",
  },


  /* ICON */

  icon: {
    width: 30,
    height: 30,

    borderRadius: 9,

    backgroundColor: SLATE_50,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 9,
  },


  iconHighlighted: {
    backgroundColor: "#ECFDF5",
  },


  iconDanger: {
    backgroundColor: "#FEF2F2",
  },


  /* LABEL */

  label: {
    fontSize: 10,

    color: SLATE_400,

    fontWeight: "600",
  },


  /* VALUE */

  value: {
    marginTop: 3,

    fontSize: 16,

    fontWeight: "800",

    color: SLATE_700,
  },


  valueHighlighted: {
    color: GREEN,
  },


  valueDanger: {
    color: RED,
  },

});
