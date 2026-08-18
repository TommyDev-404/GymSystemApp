import { Pressable, Text, StyleSheet } from "react-native";
import { Camera } from "lucide-react-native";
import { theme } from "@/utils/theme";

export default function ChangePhotoButton({
	onPress,
}: {
	onPress: () => void;
}) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.button,
				pressed && styles.pressed,
			]}
		>
			<Camera
				size={17}
				color={theme.primaryLight}
				strokeWidth={2.2}
			/>

			<Text style={styles.text}>
				Change Profile Photo
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		minHeight: 48,
		paddingHorizontal: 18,
		borderRadius: 14,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 9,
		backgroundColor: theme.accentWash,
		borderWidth: 1,
		borderColor: theme.borderAccent,
	},

	pressed: {
		opacity: 0.65,
		transform: [{ scale: 0.98 }],
	},

	text: {
		fontSize: 13,
		fontWeight: "700",
		color: theme.primaryLight,
		letterSpacing: 0.1,
	},
});