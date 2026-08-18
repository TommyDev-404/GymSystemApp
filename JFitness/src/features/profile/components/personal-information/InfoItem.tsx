import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { theme } from "@/utils/theme";

export default function InfoItem({
	label,
	value,
	onPress,
}: {
	label: string;
	value: string;
	onPress: () => void;
}) {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onPress}
			activeOpacity={0.7}
		>
			<View style={styles.content}>
				<Text style={styles.label}>{label}</Text>

				<Text style={styles.value} numberOfLines={1}>
					{value || "Not provided"}
				</Text>
			</View>

			<View style={styles.action}>
				<ChevronRight
					size={16}
					color={theme.textMuted}
					strokeWidth={2.2}
				/>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: 58,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 8,
	},

	content: {
		flex: 1,
		paddingRight: 12,
	},

	label: {
		fontSize: 10,
		fontWeight: "600",
		color: theme.textMuted,
		marginBottom: 4,
	},

	value: {
		fontSize: 14,
		fontWeight: "700",
		color: theme.text,
	},

	action: {
		width: 30,
		height: 30,
		borderRadius: 9,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.card,
		borderWidth: 1,
		borderColor: theme.border,
	},
});