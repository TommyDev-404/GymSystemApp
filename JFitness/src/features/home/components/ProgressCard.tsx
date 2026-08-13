import {
	View,
	Text,
	Pressable,
	StyleSheet,
 } from "react-native";
 
 import {
	TrendingDown,
	TrendingUp,
	Target,
	ChevronRight,
	Plus,
 } from "lucide-react-native";
 
 import { PieChart } from "react-native-gifted-charts";
 
 const GREEN = "#10B981";
 const GREEN_DARK = "#059669";
 const RED = "#EF4444";
 
 const SLATE_200 = "#E2E8F0";
 const SLATE_400 = "#94A3B8";
 const SLATE_700 = "#334155";
 const SLATE_900 = "#0F172A";
 
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
	onPress,
	onHistoryPress,
	onNewGoalPress,
 }: ProgressCardProps) {
	const isLoseWeight = goalType === "LOSE_WEIGHT";
 
	const rawProgress = Number(percentage) || 0;
 
	const chartProgress = Math.min(
	  100,
	  Math.max(0, Math.abs(rawProgress))
	);
 
	const isMovingAway = rawProgress < 0;
	const isGoalReached = rawProgress >= 100;
 
	const weightChange = isLoseWeight
	  ? startingWeight - currentWeight
	  : currentWeight - startingWeight;
 
	const isProgressPositive = weightChange > 0;
 
	const remainingWeight = Math.abs(
	  currentWeight - goalWeight
	);
 
	const displayPercentage =
	  rawProgress > 0
		 ? `+${rawProgress.toFixed(0)}%`
		 : `${rawProgress.toFixed(0)}%`;
 
	const progressDescription = isMovingAway
	  ? "moving away from goal"
	  : isGoalReached
	  ? "goal reached"
	  : "moving toward goal";
 
	const chartData = [
	  {
		 value: chartProgress,
		 color: isMovingAway ? RED : GREEN,
	  },
	  {
		 value: Math.max(
			100 - chartProgress,
			0.01
		 ),
		 color: SLATE_200,
	  },
	];
 
	return (
	  <View style={styles.card}>
 
		 {/* HEADER */}
 
		 <View style={styles.header}>
 
			<View style={styles.headerLeft}>
 
			  <View
				 style={[
					styles.iconBadge,
					isMovingAway &&
					  styles.iconBadgeDanger,
				 ]}
			  >
				 <Target
					size={18}
					color={
					  isMovingAway
						 ? RED
						 : GREEN
					}
					strokeWidth={2.2}
				 />
			  </View>
 
			  <View>
 
				 <Text style={styles.title}>
					Weight Goal Progress
				 </Text>
 
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
					  {isLoseWeight
						 ? "Lose Weight"
						 : "Gain Weight"}
					</Text>
				 </View>
 
			  </View>
 
			</View>
 
		 </View>
 
 
		 {/* HALF DONUT */}
 
		 <View style={styles.gaugeContainer}>
 
			<PieChart
			  data={chartData}
 
			  donut
			  semiCircle
 
			  radius={112}
			  innerRadius={88}
 
			  innerCircleColor="#FFFFFF"
 
			  showValuesAsLabels={false}
			  showText={false}
 
			  isAnimated
			  animationDuration={700}
 
			  centerLabelComponent={() => (
				 <View style={styles.centerLabel}>
 
					<Text
					  style={[
						 styles.percentage,
 
						 isMovingAway &&
							styles.negativePercentage,
 
						 isGoalReached &&
							styles.completedPercentage,
					  ]}
					>
					  {displayPercentage}
					</Text>
 
					<Text
					  style={[
						 styles.completedText,
 
						 isMovingAway &&
							styles.negativeCompletedText,
 
						 isGoalReached &&
							styles.goalReachedText,
					  ]}
					>
					  {progressDescription}
					</Text>
 
				 </View>
			  )}
			/>
 
 
			{/* WEIGHT LABELS */}
 
			<View style={styles.weightLabels}>
 
			  {/* START */}
 
			  <View style={styles.weightPoint}>
 
				 <View style={styles.dot} />
 
				 <Text style={styles.weightLabel}>
					START
				 </Text>
 
				 <Text style={styles.weightValue}>
					{startingWeight}
 
					<Text style={styles.unit}>
					  {" kg"}
					</Text>
				 </Text>
 
			  </View>
 
 
			  {/* CURRENT */}
 
			  <View style={styles.currentWeightPoint}>
 
				 <View
					style={[
					  styles.dot,
					  isMovingAway
						 ? styles.currentDotDanger
						 : styles.currentDot,
					]}
				 />
 
				 <Text style={styles.weightLabel}>
					CURRENT
				 </Text>
 
				 <Text
					style={[
					  styles.weightValue,
					  isMovingAway
						 ? styles.currentValueDanger
						 : styles.currentValue,
					]}
				 >
					{currentWeight}
 
					<Text style={styles.unit}>
					  {" kg"}
					</Text>
				 </Text>
 
			  </View>
 
 
			  {/* GOAL */}
 
			  <View
				 style={[
					styles.weightPoint,
					styles.goalPoint,
				 ]}
			  >
 
				 <View
					style={[
					  styles.dot,
					  styles.goalDot,
					]}
				 />
 
				 <Text style={styles.weightLabel}>
					GOAL
				 </Text>
 
				 <Text style={styles.weightValue}>
					{goalWeight}
 
					<Text style={styles.unit}>
					  {" kg"}
					</Text>
				 </Text>
 
			  </View>
 
			</View>
 
		 </View>
 
 
		 {/* SUMMARY */}
 
		 <View style={styles.summary}>
 
			<View style={styles.trendRow}>
 
			  {isProgressPositive ? (
 
				 <View style={styles.trendIcon}>
 
					<TrendingUp
					  size={15}
					  color={GREEN}
					  strokeWidth={2.3}
					/>
 
				 </View>
 
			  ) : (
 
				 <View style={styles.trendIconRed}>
 
					<TrendingDown
					  size={15}
					  color={RED}
					  strokeWidth={2.3}
					/>
 
				 </View>
 
			  )}
 
			  <View>
 
				 <Text
					style={[
					  styles.summaryValue,
 
					  isMovingAway &&
						 styles.summaryNegative,
 
					  isGoalReached &&
						 styles.summaryPositive,
					]}
				 >
					{displayPercentage}
				 </Text>
 
				 <Text style={styles.summaryLabel}>
					{progressDescription}
				 </Text>
 
			  </View>
 
			</View>
 
 
			{/* REMAINING */}
 
			{remainingWeight > 0 &&
			  !isGoalReached && (
 
			  <View
				 style={
					styles.remainingContainer
				 }
			  >
 
				 <Text style={styles.remainingValue}>
					{remainingWeight.toFixed(1)} kg
				 </Text>
 
				 <Text style={styles.remainingLabel}>
					to goal
				 </Text>
 
			  </View>
 
			)}
 
 
			{/* COMPLETED */}
 
			{isGoalReached && (
 
			  <View
				 style={
					styles.remainingContainer
				 }
			  >
 
				 <Text
					style={[
					  styles.remainingValue,
					  styles.goalReachedText,
					]}
				 >
					100%
				 </Text>
 
				 <Text style={styles.remainingLabel}>
					completed
				 </Text>
 
			  </View>
 
			)}
 
		 </View>
 
 
		 {/* VIEW PROGRESS */}
 
		 <Pressable
			onPress={onHistoryPress}
			style={({ pressed }) => [
			  styles.cta,
			  pressed && styles.ctaPressed,
			]}
		 >
 
			<Text style={styles.ctaText}>
			  View Progress
			</Text>
 
			<ChevronRight
			  size={17}
			  color="#FFFFFF"
			  strokeWidth={2.3}
			/>
 
		 </Pressable>
 
 
		 {/* NEW GOAL PROMPT */}
 
		 {isGoalReached && (
 
			<View style={styles.newGoalSection}>
 
			  <View style={styles.newGoalMessage}>
 
				 <Text style={styles.newGoalTitle}>
				 🎉 Congratulations!
				 </Text>
 
				 <Text style={styles.newGoalSubtitle}>
					You reached your target weight. Ready to set a new goal?
				 </Text>
 
			  </View>
 
			  <Pressable
				 onPress={onNewGoalPress}
				 style={({ pressed }) => [
					styles.newGoalButton,
					pressed &&
					  styles.newGoalButtonPressed,
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
 
 const styles = StyleSheet.create({
 
	/* CARD */
 
	card: {
	  marginHorizontal: 20,
 
	  backgroundColor: "#FFFFFF",
 
	  borderRadius: 22,
 
	  borderWidth: 1,
	  borderColor: "#F1F5F9",
 
	  overflow: "hidden",
 
	  elevation: 2,
 
	  shadowColor: "#000",
 
	  shadowOffset: {
		 width: 0,
		 height: 2,
	  },
 
	  shadowOpacity: 0.04,
 
	  shadowRadius: 8,
	},
 
 
	/* HEADER */
 
	header: {
	  paddingHorizontal: 18,
	  paddingTop: 18,
	},
 
	headerLeft: {
	  flexDirection: "row",
	  alignItems: "center",
	  gap: 10,
	},
 
	iconBadge: {
	  width: 36,
	  height: 36,
 
	  borderRadius: 18,
 
	  backgroundColor: "#ECFDF5",
 
	  justifyContent: "center",
	  alignItems: "center",
	},
 
	iconBadgeDanger: {
	  backgroundColor: "#FEF2F2",
	},
 
	title: {
	  fontSize: 15,
	  fontWeight: "700",
	  color: SLATE_900,
	},
 
	goalBadge: {
	  marginTop: 4,
 
	  paddingHorizontal: 8,
	  paddingVertical: 3,
 
	  borderRadius: 999,
 
	  alignSelf: "flex-start",
	},
 
	lossBadge: {
	  backgroundColor: "#FEF2F2",
	},
 
	gainBadge: {
	  backgroundColor: "#ECFDF5",
	},
 
	goalBadgeText: {
	  fontSize: 10,
	  fontWeight: "600",
	},
 
	lossText: {
	  color: RED,
	},
 
	gainText: {
	  color: GREEN,
	},
 
 
	/* GAUGE */
 
	gaugeContainer: {
	  height: 205,
 
	  marginTop: 8,
 
	  alignItems: "center",
 
	  overflow: "hidden",
	},
 
	centerLabel: {
	  width: 150,
 
	  alignItems: "center",
	  justifyContent: "center",
 
	  marginTop: 30,
	},
 
	percentage: {
	  fontSize: 30,
	  lineHeight: 34,
 
	  fontWeight: "800",
 
	  color: SLATE_900,
	},
 
	negativePercentage: {
	  color: RED,
	},
 
	completedPercentage: {
	  color: GREEN,
	},
 
	completedText: {
	  marginTop: 2,
 
	  fontSize: 10,
 
	  fontWeight: "500",
 
	  color: SLATE_400,
 
	  textAlign: "center",
	},
 
	negativeCompletedText: {
	  color: RED,
	},
 
	goalReachedText: {
	  color: GREEN,
	},
 
 
	/* WEIGHT LABELS */
 
	weightLabels: {
	  position: "absolute",
 
	  left: 18,
	  right: 18,
 
	  bottom: 4,
 
	  flexDirection: "row",
 
	  justifyContent: "space-between",
 
	  alignItems: "flex-start",
	},
 
	weightPoint: {
	  width: 70,
 
	  alignItems: "flex-start",
	},
 
	currentWeightPoint: {
	  width: 80,
 
	  alignItems: "center",
	},
 
	goalPoint: {
	  alignItems: "flex-end",
	},
 
	dot: {
	  width: 7,
	  height: 7,
 
	  borderRadius: 999,
 
	  backgroundColor: SLATE_400,
 
	  marginBottom: 4,
	},
 
	currentDot: {
	  width: 8,
	  height: 8,
 
	  backgroundColor: GREEN,
	},
 
	currentDotDanger: {
	  width: 8,
	  height: 8,
 
	  backgroundColor: RED,
	},
 
	goalDot: {
	  backgroundColor: SLATE_400,
	},
 
	weightLabel: {
	  fontSize: 9,
 
	  fontWeight: "600",
 
	  color: SLATE_400,
 
	  letterSpacing: 0.4,
	},
 
	weightValue: {
	  marginTop: 1,
 
	  fontSize: 13,
 
	  fontWeight: "700",
 
	  color: SLATE_700,
	},
 
	currentValue: {
	  color: GREEN,
	},
 
	currentValueDanger: {
	  color: RED,
	},
 
	unit: {
	  fontSize: 9,
 
	  fontWeight: "500",
 
	  color: SLATE_400,
	},
 
 
	/* SUMMARY */
 
	summary: {
	  flexDirection: "row",
 
	  justifyContent: "space-between",
 
	  alignItems: "center",
 
	  marginHorizontal: 18,
 
	  paddingVertical: 12,
	  paddingHorizontal: 12,
 
	  borderRadius: 12,
 
	  backgroundColor: "#F8FAFC",
	},
 
	trendRow: {
	  flexDirection: "row",
 
	  alignItems: "center",
 
	  gap: 8,
	},
 
	trendIcon: {
	  width: 28,
	  height: 28,
 
	  borderRadius: 8,
 
	  backgroundColor: "#ECFDF5",
 
	  alignItems: "center",
	  justifyContent: "center",
	},
 
	trendIconRed: {
	  width: 28,
	  height: 28,
 
	  borderRadius: 8,
 
	  backgroundColor: "#FEF2F2",
 
	  alignItems: "center",
	  justifyContent: "center",
	},
 
	summaryValue: {
	  fontSize: 13,
 
	  fontWeight: "700",
 
	  color: SLATE_700,
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
 
	  color: SLATE_400,
	},
 
	remainingContainer: {
	  alignItems: "flex-end",
	},
 
	remainingValue: {
	  fontSize: 13,
 
	  fontWeight: "700",
 
	  color: SLATE_700,
	},
 
	remainingLabel: {
	  marginTop: 1,
 
	  fontSize: 10,
 
	  color: SLATE_400,
	},
 
 
	/* VIEW PROGRESS */
 
	cta: {
	  marginHorizontal: 18,
 
	  marginTop: 14,
	  marginBottom: 18,
 
	  paddingVertical: 12,
 
	  borderRadius: 13,
 
	  backgroundColor: GREEN,
 
	  flexDirection: "row",
 
	  alignItems: "center",
 
	  justifyContent: "center",
 
	  gap: 4,
	},
 
	ctaPressed: {
	  backgroundColor: GREEN_DARK,
	},
 
	ctaText: {
	  color: "#FFFFFF",
 
	  fontSize: 13,
 
	  fontWeight: "700",
	},
 
 
	/* NEW GOAL */
 
	newGoalSection: {
	  marginHorizontal: 18,
 
	  marginTop: -6,
	  marginBottom: 16,
 
	  paddingTop: 12,
 
	  borderTopWidth: 1,
	  borderTopColor: "#F1F5F9",
 
	  flexDirection: "row",
 
	  alignItems: "center",
 
	  justifyContent: "space-between",
 
	  gap: 12,
	},
 
	newGoalMessage: {
	  flex: 1,
	},
 
	newGoalTitle: {
	  fontSize: 12,
 
	  fontWeight: "700",
 
	  color: SLATE_900,
	},
 
	newGoalSubtitle: {
	  marginTop: 2,
 
	  fontSize: 10,
 
	  lineHeight: 14,
 
	  color: SLATE_400,
	},
 
	newGoalButton: {
	  flexDirection: "row",
 
	  alignItems: "center",
 
	  gap: 4,
 
	  paddingHorizontal: 11,
	  paddingVertical: 8,
 
	  borderRadius: 10,
 
	  backgroundColor: "#ECFDF5",
 
	  borderWidth: 1,
	  borderColor: "#D1FAE5",
	},
 
	newGoalButtonPressed: {
	  backgroundColor: "#D1FAE5",
	},
 
	newGoalButtonText: {
	  fontSize: 11,
 
	  fontWeight: "700",
 
	  color: GREEN_DARK,
	},
 
 });