import { theme } from "@/utils/theme";
import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  TrendingDown,
  TrendingUp,
  Target,
  ChevronRight,
  Plus,
} from "lucide-react-native";
import { PieChart } from "react-native-gifted-charts";
import { LinearGradient } from "expo-linear-gradient";

const GREEN = theme.primary;
const GREEN_DARK = theme.primaryDark;
const RED = "#EF4444";

interface ProgressCardProps {
  goalType: "LOSE_WEIGHT" | "GAIN_WEIGHT";
  currentWeight: number;
  startingWeight: number;
  goalWeight: number;
  percentage: number;
  onPress: () => void;
  onHistoryPress: () => void;
  onNewGoalPress: () => void;
}

export function ProgressCard({
  goalType,
  currentWeight,
  startingWeight,
  goalWeight,
  percentage,
  onHistoryPress,
  onNewGoalPress,
}: ProgressCardProps) {
  const isLoseWeight = goalType === "LOSE_WEIGHT";

  const rawProgress = Number(percentage) || 0;
  const chartProgress = Math.min(100, Math.max(0, Math.abs(rawProgress)));

  const isMovingAway = rawProgress < 0;
  const isGoalReached = rawProgress >= 100;

  const weightChange = isLoseWeight
    ? startingWeight - currentWeight
    : currentWeight - startingWeight;

  const isProgressPositive = weightChange > 0;

  const remainingWeight = Math.abs(currentWeight - goalWeight);

  const displayPercentage =
    rawProgress > 0
      ? `+${rawProgress.toFixed(0)}%`
      : `${rawProgress.toFixed(0)}%`;

  const progressDescription = isMovingAway
    ? "Moving away from goal"
    : isGoalReached
      ? "Goal reached"
      : "Moving toward goal";

  const chartData = [
    {
      value: chartProgress,
      color: isMovingAway ? RED : GREEN,
    },
    {
      value: Math.max(100 - chartProgress, 0.01),
      color: theme.surface3,
    },
  ];

  return (
    <View style={styles.card}>
      {/* Subtle background glow */}
      <LinearGradient
        colors={[
          "rgba(20,184,166,0.10)",
          "rgba(20,184,166,0.025)",
          "rgba(11,13,16,0)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
        pointerEvents="none"
      />

      {/* Decorative glow */}
      <View style={styles.topGlow} pointerEvents="none" />

      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.iconBadge,
              isMovingAway && styles.iconBadgeDanger,
            ]}
          >
            <Target
              size={18}
              color={isMovingAway ? RED : GREEN}
              strokeWidth={2.2}
            />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.title}>Weight Goal</Text>

            <View
              style={[
                styles.goalBadge,
                isLoseWeight
                  ? styles.lossBadge
                  : styles.gainBadge,
              ]}
            >
              <Text
                style={[
                  styles.goalBadgeText,
                  isLoseWeight
                    ? styles.lossText
                    : styles.gainText,
                ]}
              >
                {isLoseWeight ? "LOSE WEIGHT" : "GAIN WEIGHT"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.statusPill,
            isMovingAway && styles.statusPillDanger,
          ]}
        >
          <View
            style={[
              styles.statusDot,
              isMovingAway && styles.statusDotDanger,
            ]}
          />

          <Text
            style={[
              styles.statusText,
              isMovingAway && styles.statusTextDanger,
            ]}
          >
            {isGoalReached
              ? "Completed"
              : isMovingAway
                ? "Off Track"
                : "On Track"}
          </Text>
        </View>
      </View>

      {/* ================= GAUGE ================= */}

      <View style={styles.gaugeSection}>
        <PieChart
          data={chartData}
          donut
          semiCircle
          radius={108}
          innerRadius={85}
          innerCircleColor={theme.card}
          showValuesAsLabels={false}
          showText={false}
          isAnimated
          animationDuration={700}
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text
                style={[
                  styles.percentage,
                  isMovingAway && styles.negativePercentage,
                  isGoalReached && styles.completedPercentage,
                ]}
              >
                {displayPercentage}
              </Text>

              <Text
                style={[
                  styles.completedText,
                  isMovingAway && styles.negativeCompletedText,
                  isGoalReached && styles.goalReachedText,
                ]}
              >
                {progressDescription}
              </Text>
            </View>
          )}
        />
      </View>

      {/* ================= WEIGHT VALUES ================= */}

      <View style={styles.weightStats}>
        <WeightStat
          label="START"
          value={startingWeight}
        />

        <View style={styles.currentStat}>
          <View
            style={[
              styles.currentIndicator,
              isMovingAway && styles.currentIndicatorDanger,
            ]}
          />

          <Text style={styles.statLabel}>CURRENT</Text>

          <Text
            style={[
              styles.currentValue,
              isMovingAway && styles.currentValueDanger,
            ]}
          >
            {currentWeight}
            <Text style={styles.unit}> kg</Text>
          </Text>
        </View>

        <WeightStat
          label="GOAL"
          value={goalWeight}
          align="right"
        />
      </View>

      {/* ================= SUMMARY ================= */}

      <View style={styles.summary}>
        <View style={styles.summaryLeft}>
          <View
            style={[
              styles.trendIcon,
              isMovingAway && styles.trendIconDanger,
            ]}
          >
            {isProgressPositive ? (
              <TrendingUp
                size={15}
                color={GREEN}
                strokeWidth={2.3}
              />
            ) : (
              <TrendingDown
                size={15}
                color={RED}
                strokeWidth={2.3}
              />
            )}
          </View>

          <View>
            <Text
              style={[
                styles.summaryValue,
                isMovingAway && styles.summaryNegative,
                isGoalReached && styles.summaryPositive,
              ]}
            >
              {displayPercentage}
            </Text>

            <Text style={styles.summaryLabel}>
              Overall progress
            </Text>
          </View>
        </View>

        <View style={styles.summaryRight}>
          <Text
            style={[
              styles.remainingValue,
              isGoalReached && styles.goalReachedText,
            ]}
          >
            {isGoalReached
              ? "100%"
              : `${remainingWeight.toFixed(1)} kg`}
          </Text>

          <Text style={styles.remainingLabel}>
            {isGoalReached ? "completed" : "remaining"}
          </Text>
        </View>
      </View>

      {/* ================= CTA ================= */}

      <Pressable
        onPress={onHistoryPress}
        style={({ pressed }) => [
          styles.cta,
          pressed && styles.ctaPressed,
        ]}
      >
        <Text style={styles.ctaText}>View Progress History</Text>

        <ChevronRight
          size={17}
          color="#fff"
          strokeWidth={2.3}
        />
      </Pressable>

      {/* ================= NEW GOAL ================= */}

      {isGoalReached && (
        <View style={styles.newGoalSection}>
          <View style={styles.newGoalMessage}>
            <Text style={styles.newGoalTitle}>
              🎉 Goal completed
            </Text>

            <Text style={styles.newGoalSubtitle}>
              Ready to challenge yourself with a new target?
            </Text>
          </View>

          <Pressable
            onPress={onNewGoalPress}
            style={({ pressed }) => [
              styles.newGoalButton,
              pressed && styles.newGoalButtonPressed,
            ]}
          >
            <Plus
              size={15}
              color={GREEN}
              strokeWidth={2.5}
            />

            <Text style={styles.newGoalButtonText}>
              New Goal
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function WeightStat({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: number;
  align?: "left" | "right";
}) {
  return (
    <View
      style={[
        styles.weightStat,
        align === "right" && styles.weightStatRight,
      ]}
    >
      <Text style={styles.statLabel}>{label}</Text>

      <Text style={styles.statValue}>
        {value}
        <Text style={styles.unit}> kg</Text>
      </Text>
    </View>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: theme.card,

    borderWidth: 1,
    borderColor: theme.borderAccent,

    overflow: "hidden",

    shadowColor: theme.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,

    elevation: 5,
  },

  backgroundGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 190,
  },

  topGlow: {
    position: "absolute",
    top: -80,
    right: -70,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(20,184,166,0.06)",
  },

  /* ================= HEADER ================= */

  header: {
    paddingHorizontal: 17,
    paddingTop: 17,
    paddingBottom: 5,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  headerText: {
    justifyContent: "center",
  },

  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 11,

    backgroundColor: theme.accentWash,

    borderWidth: 1,
    borderColor: theme.borderAccent,

    alignItems: "center",
    justifyContent: "center",
  },

  iconBadgeDanger: {
    backgroundColor: theme.errorBg,
    borderColor: theme.errorBorder,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.text,
    letterSpacing: -0.2,
  },

  goalBadge: {
    marginTop: 4,
    alignSelf: "flex-start",

    paddingHorizontal: 7,
    paddingVertical: 2.5,

    borderRadius: 999,
  },

  lossBadge: {
    backgroundColor: theme.errorBg,
  },

  gainBadge: {
    backgroundColor: theme.accentWash,
  },

  goalBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  lossText: {
    color: RED,
  },

  gainText: {
    color: GREEN,
  },

  /* ================= STATUS ================= */

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,

    paddingHorizontal: 8,
    paddingVertical: 5,

    borderRadius: 999,

    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  statusPillDanger: {
    backgroundColor: theme.errorBg,
    borderColor: theme.errorBorder,
  },

  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: GREEN,
  },

  statusDotDanger: {
    backgroundColor: RED,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "700",
    color: GREEN,
  },

  statusTextDanger: {
    color: RED,
  },

  /* ================= GAUGE ================= */

  gaugeSection: {
    height: 190,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  centerLabel: {
    width: 150,
    alignItems: "center",
    justifyContent: "center",

    marginTop: 27,
  },

  percentage: {
    fontSize: 31,
    lineHeight: 35,

    fontWeight: "800",
    color: theme.text,

    letterSpacing: -1,
  },

  negativePercentage: {
    color: RED,
  },

  completedPercentage: {
    color: GREEN,
  },

  completedText: {
    marginTop: 3,

    fontSize: 10,
    fontWeight: "500",

    color: theme.textMuted,
    textAlign: "center",
  },

  negativeCompletedText: {
    color: RED,
  },

  goalReachedText: {
    color: GREEN,
  },

  /* ================= WEIGHT STATS ================= */

  weightStats: {
    marginHorizontal: 16,

    paddingVertical: 12,
    paddingHorizontal: 12,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: theme.surface,

    borderWidth: 1,
    borderColor: theme.border,

    borderRadius: 14,
  },

  weightStat: {
    minWidth: 70,
    alignItems: "flex-start",
  },

  weightStatRight: {
    alignItems: "flex-end",
  },

  currentStat: {
    alignItems: "center",
  },

  currentIndicator: {
    width: 6,
    height: 6,
    borderRadius: 999,

    marginBottom: 4,

    backgroundColor: GREEN,
  },

  currentIndicatorDanger: {
    backgroundColor: RED,
  },

  statLabel: {
    fontSize: 8,
    fontWeight: "700",

    color: theme.textMuted,

    letterSpacing: 0.7,
  },

  statValue: {
    marginTop: 3,

    fontSize: 13,
    fontWeight: "700",

    color: theme.textSub,
  },

  currentValue: {
    marginTop: 3,

    fontSize: 14,
    fontWeight: "800",

    color: GREEN,
  },

  currentValueDanger: {
    color: RED,
  },

  unit: {
    fontSize: 9,
    fontWeight: "500",
    color: theme.textMuted,
  },

  /* ================= SUMMARY ================= */

  summary: {
    marginHorizontal: 16,
    marginTop: 10,

    paddingHorizontal: 12,
    paddingVertical: 10,

    borderRadius: 13,

    backgroundColor: theme.surface,

    borderWidth: 1,
    borderColor: theme.border,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  summaryLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  trendIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,

    backgroundColor: theme.accentWash,

    alignItems: "center",
    justifyContent: "center",
  },

  trendIconDanger: {
    backgroundColor: theme.errorBg,
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: "800",
    color: theme.text,
  },

  summaryPositive: {
    color: GREEN,
  },

  summaryNegative: {
    color: RED,
  },

  summaryLabel: {
    marginTop: 1,

    fontSize: 10,
    color: theme.textMuted,
  },

  summaryRight: {
    alignItems: "flex-end",
  },

  remainingValue: {
    fontSize: 14,
    fontWeight: "800",
    color: theme.text,
  },

  remainingLabel: {
    marginTop: 1,

    fontSize: 10,
    color: theme.textMuted,
  },

  /* ================= CTA ================= */

  cta: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,

    height: 44,
    borderRadius: 12,

    backgroundColor: GREEN,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 5,
  },

  ctaPressed: {
    backgroundColor: GREEN_DARK,
  },

  ctaText: {
    color: "#fff",

    fontSize: 13,
    fontWeight: "700",
  },

  /* ================= NEW GOAL ================= */

  newGoalSection: {
    marginHorizontal: 16,
    marginTop: -2,
    marginBottom: 15,

    paddingTop: 12,

    borderTopWidth: 1,
    borderTopColor: theme.border,

    flexDirection: "row",
    alignItems: "center",

    gap: 10,
  },

  newGoalMessage: {
    flex: 1,
  },

  newGoalTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.text,
  },

  newGoalSubtitle: {
    marginTop: 3,

    fontSize: 10,
    lineHeight: 14,

    color: theme.textMuted,
  },

  newGoalButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,

    paddingHorizontal: 11,
    paddingVertical: 8,

    borderRadius: 10,

    backgroundColor: theme.accentWash,

    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  newGoalButtonPressed: {
    opacity: 0.7,
  },

  newGoalButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: GREEN,
  },
});