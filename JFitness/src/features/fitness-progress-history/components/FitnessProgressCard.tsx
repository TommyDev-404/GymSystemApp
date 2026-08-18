import {
	View,
	Text,
	StyleSheet,
 } from "react-native";
 
 import {
	TrendingUp,
	TrendingDown,
 } from "lucide-react-native";
 
 import { FitnessGoalHistory } from "@/features/home/types/HomeTypes";
 import { theme } from "@/utils/theme";
 import { LinearGradient } from "expo-linear-gradient";
 
 const GREEN = theme.primary;
 const RED = "#EF4444";
 
 interface ProgressHistoryListProps {
	item: FitnessGoalHistory;
 }
 
 export function ProgressHistoryCard({
	item,
 }: ProgressHistoryListProps) {
	const isGain = item.weight_change > 0;
	const progress = Math.min(
	  100,
	  Math.max(0, Number(item.progress_percentage) || 0)
	);
 
	const date = new Date(
	  item.recorded_at
	).toLocaleDateString("en-US", {
	  month: "short",
	  day: "2-digit",
	  year: "numeric",
	});
 
	const changeColor = isGain ? GREEN : RED;
 
	return (
	  <View style={styles.card}>
 
		 {/* Subtle emerald background glow */}
		 <LinearGradient
			colors={[
			  "rgba(20,184,166,0.08)",
			  "rgba(20,184,166,0.025)",
			  "rgba(11,13,16,0)",
			]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.backgroundGlow}
			pointerEvents="none"
		 />
 
		 {/* Small decorative glow */}
		 <View
			style={styles.topGlow}
			pointerEvents="none"
		 />
 
		 {/* ================= HEADER ================= */}
 
		 <View style={styles.header}>
 
			<View>
			  <Text style={styles.date}>
				 {date}
			  </Text>
 
			  <Text style={styles.historyLabel}>
				 Weight Progress
			  </Text>
			</View>
 
			<View
			  style={[
				 styles.badge,
				 isGain
					? styles.gainBadge
					: styles.lossBadge,
			  ]}
			>
			  <View
				 style={[
					styles.badgeDot,
					{
					  backgroundColor: changeColor,
					},
				 ]}
			  />
 
			  <Text
				 style={[
					styles.badgeText,
					{
					  color: changeColor,
					},
				 ]}
			  >
				 {isGain
					? "Gain Weight"
					: "Lose Weight"}
			  </Text>
			</View>
 
		 </View>
 
		 {/* ================= MAIN VALUES ================= */}
 
		 <View style={styles.weightRow}>
 
			<View style={styles.weightItem}>
			  <Text style={styles.label}>
				 CURRENT
			  </Text>
 
			  <Text style={styles.currentValue}>
				 {item.current_weight}
				 <Text style={styles.unit}>
					{" "}kg
				 </Text>
			  </Text>
			</View>
 
			<View style={styles.divider} />
 
			<View style={styles.weightItem}>
			  <Text style={styles.label}>
				 TARGET
			  </Text>
 
			  <Text style={styles.value}>
				 {item.target_weight}
				 <Text style={styles.unit}>
					{" "}kg
				 </Text>
			  </Text>
			</View>
 
		 </View>
 
		 {/* ================= WEIGHT CHANGE ================= */}
 
		 <View style={styles.changeSection}>
 
			<View
			  style={[
				 styles.changeIcon,
				 isGain
					? styles.changeIconGain
					: styles.changeIconLoss,
			  ]}
			>
			  {isGain ? (
				 <TrendingUp
					size={15}
					color={GREEN}
					strokeWidth={2.4}
				 />
			  ) : (
				 <TrendingDown
					size={15}
					color={RED}
					strokeWidth={2.4}
				 />
			  )}
			</View>
 
			<View>
			  <Text
				 style={[
					styles.changeValue,
					{
					  color: changeColor,
					},
				 ]}
			  >
				 {isGain ? "+" : ""}
				 {item.weight_change} kg
			  </Text>
 
			  <Text style={styles.changeLabel}>
				 {isGain ? "Weight gained" : "Weight lost"}
			  </Text>
			</View>
 
		 </View>
 
		 {/* ================= FROM → TO ================= */}
 
		 <View style={styles.changeBox}>
 
			<View>
			  <Text style={styles.changeBoxLabel}>
				 PREVIOUS
			  </Text>
 
			  <Text style={styles.changeBoxValue}>
				 {item.previous_weight} kg
			  </Text>
			</View>
 
			<Text style={styles.arrow}>
			  →
			</Text>
 
			<View style={styles.changeBoxRight}>
			  <Text style={styles.changeBoxLabel}>
				 CURRENT
			  </Text>
 
			  <Text
				 style={[
					styles.changeBoxValue,
					{
					  color: changeColor,
					},
				 ]}
			  >
				 {item.current_weight} kg
			  </Text>
			</View>
 
		 </View>
 
		 {/* ================= PROGRESS ================= */}
 
		 <View style={styles.progressHeader}>
 
			<Text style={styles.progressLabel}>
			  Goal Progress
			</Text>
 
			<Text
			  style={[
				 styles.percent,
				 {
					color: changeColor,
				 },
			  ]}
			>
			  {progress.toFixed(0)}%
			</Text>
 
		 </View>
 
		 <View style={styles.progressTrack}>
			<View
			  style={[
				 styles.progressFill,
				 {
					width: `${progress}%`,
					backgroundColor: changeColor,
				 },
			  ]}
			/>
		 </View>
 
	  </View>
	);
 }
 
 const styles = StyleSheet.create({
	/* ================= CARD ================= */
 
	card: {
	  position: "relative",
 
	  marginBottom: 12,
 
	  padding: 16,
 
	  borderRadius: 18,
 
	  backgroundColor: theme.card,
 
	  borderWidth: 1,
	  borderColor: theme.borderAccent,
 
	  overflow: "hidden",
 
	  shadowColor: "#000",
	  shadowOffset: {
		 width: 0,
		 height: 5,
	  },
	  shadowOpacity: 0.18,
	  shadowRadius: 12,
 
	  elevation: 4,
	},
 
	backgroundGlow: {
	  position: "absolute",
 
	  top: 0,
	  left: 0,
	  right: 0,
 
	  height: 150,
	},
 
	topGlow: {
	  position: "absolute",
 
	  top: -75,
	  left: -65,
 
	  width: 170,
	  height: 170,
 
	  borderRadius: 999,
 
	  backgroundColor: "rgba(20,184,166,0.055)",
	},
 
	/* ================= HEADER ================= */
 
	header: {
	  flexDirection: "row",
 
	  alignItems: "center",
	  justifyContent: "space-between",
	},
 
	date: {
	  fontSize: 13,
 
	  fontWeight: "700",
 
	  color: theme.text,
	},
 
	historyLabel: {
	  marginTop: 3,
 
	  fontSize: 10,
 
	  color: theme.textMuted,
	},
 
	badge: {
	  flexDirection: "row",
 
	  alignItems: "center",
 
	  gap: 5,
 
	  paddingHorizontal: 8,
	  paddingVertical: 5,
 
	  borderRadius: 999,
 
	  borderWidth: 1,
	},
 
	gainBadge: {
	  backgroundColor: "rgba(16,185,129,0.08)",
	  borderColor: "rgba(16,185,129,0.22)",
	},
 
	lossBadge: {
	  backgroundColor: "rgba(239,68,68,0.08)",
	  borderColor: "rgba(239,68,68,0.22)",
	},
 
	badgeDot: {
	  width: 5,
	  height: 5,
 
	  borderRadius: 999,
	},
 
	badgeText: {
	  fontSize: 9,
 
	  fontWeight: "700",
 
	  letterSpacing: 0.2,
	},
 
	/* ================= WEIGHTS ================= */
 
	weightRow: {
	  marginTop: 18,
 
	  paddingVertical: 13,
	  paddingHorizontal: 12,
 
	  borderRadius: 13,
 
	  backgroundColor: theme.surface,
 
	  borderWidth: 1,
	  borderColor: theme.border,
 
	  flexDirection: "row",
 
	  alignItems: "center",
	},
 
	weightItem: {
	  flex: 1,
	},
 
	divider: {
	  width: 1,
	  height: 32,
 
	  backgroundColor: theme.border,
	},
 
	label: {
	  fontSize: 8,
 
	  fontWeight: "700",
 
	  color: theme.textMuted,
 
	  letterSpacing: 0.7,
	},
 
	currentValue: {
	  marginTop: 3,
 
	  fontSize: 21,
 
	  fontWeight: "800",
 
	  color: GREEN,
	},
 
	value: {
	  marginTop: 3,
 
	  fontSize: 21,
 
	  fontWeight: "800",
 
	  color: theme.text,
	},
 
	unit: {
	  fontSize: 10,
 
	  fontWeight: "500",
 
	  color: theme.textMuted,
	},
 
	/* ================= CHANGE ================= */
 
	changeSection: {
	  marginTop: 14,
 
	  flexDirection: "row",
 
	  alignItems: "center",
 
	  gap: 9,
	},
 
	changeIcon: {
	  width: 31,
	  height: 31,
 
	  borderRadius: 9,
 
	  alignItems: "center",
	  justifyContent: "center",
 
	  borderWidth: 1,
	},
 
	changeIconGain: {
	  backgroundColor: "rgba(16,185,129,0.08)",
	  borderColor: "rgba(16,185,129,0.20)",
	},
 
	changeIconLoss: {
	  backgroundColor: "rgba(239,68,68,0.08)",
	  borderColor: "rgba(239,68,68,0.20)",
	},
 
	changeValue: {
	  fontSize: 13,
 
	  fontWeight: "800",
	},
 
	changeLabel: {
	  marginTop: 1,
 
	  fontSize: 10,
 
	  color: theme.textMuted,
	},
 
	/* ================= FROM → TO ================= */
 
	changeBox: {
	  marginTop: 13,
 
	  padding: 11,
 
	  borderRadius: 12,
 
	  backgroundColor: theme.surface3,
 
	  borderWidth: 1,
	  borderColor: theme.border,
 
	  flexDirection: "row",
 
	  alignItems: "center",
	},
 
	changeBoxLabel: {
	  fontSize: 8,
 
	  fontWeight: "700",
 
	  color: theme.textMuted,
 
	  letterSpacing: 0.5,
	},
 
	changeBoxValue: {
	  marginTop: 2,
 
	  fontSize: 12,
 
	  fontWeight: "700",
 
	  color: theme.textSub,
	},
 
	arrow: {
	  marginHorizontal: "auto",
 
	  fontSize: 17,
 
	  color: theme.textMuted,
	},
 
	changeBoxRight: {
	  alignItems: "flex-end",
	},
 
	/* ================= PROGRESS ================= */
 
	progressHeader: {
	  marginTop: 15,
 
	  marginBottom: 7,
 
	  flexDirection: "row",
 
	  alignItems: "center",
	  justifyContent: "space-between",
	},
 
	progressLabel: {
	  fontSize: 10,
 
	  fontWeight: "600",
 
	  color: theme.textMuted,
	},
 
	percent: {
	  fontSize: 11,
 
	  fontWeight: "800",
	},
 
	progressTrack: {
	  height: 7,
 
	  borderRadius: 999,
 
	  backgroundColor: theme.surface3,
 
	  overflow: "hidden",
 
	  borderWidth: 1,
	  borderColor: theme.border,
	},
 
	progressFill: {
	  height: "100%",
 
	  borderRadius: 999,
	},
 });