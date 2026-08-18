import {
	View,
	Text,
	Image,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { UserRound } from "lucide-react-native";
import { theme } from "@/utils/theme";

export default function ProfileCard({
	username,
	image,
	uploading,
}: {
	username: string;
	image?: string;
	uploading: boolean;
}) {
	const initials = username
		?.split(" ")
		.filter(Boolean)
		.map((n) => n[0])
		.join("")
		.toUpperCase();

	return (
		<View style={styles.container}>
			<View style={styles.avatarWrapper}>
				<View style={styles.avatarRing}>
					{image ? (
						<Image
							source={{ uri: image }}
							style={styles.avatar}
						/>
					) : (
						<View style={styles.fallbackAvatar}>
							<Text style={styles.initials}>
								{initials || "U"}
							</Text>
						</View>
					)}

					{uploading && (
						<View style={styles.loader}>
							<ActivityIndicator
								size="small"
								color={theme.primaryLight}
							/>
						</View>
					)}
				</View>

				<View style={styles.onlineDot} />
			</View>

			<Text style={styles.name}>
				{username || "User"}
			</Text>

			<View style={styles.memberBadge}>
				<View style={styles.badgeDot} />

				<Text style={styles.member}>
					Premium Member
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingVertical: 8,
	},

	avatarWrapper: {
		position: "relative",
	},

	avatarRing: {
		width: 96,
		height: 96,
		borderRadius: 48,
		padding: 3,
		backgroundColor: theme.accentWash,
		borderWidth: 1,
		borderColor: theme.borderAccent,
		alignItems: "center",
		justifyContent: "center",
	},

	avatar: {
		width: "100%",
		height: "100%",
		borderRadius: 45,
	},

	fallbackAvatar: {
		width: "100%",
		height: "100%",
		borderRadius: 45,
		backgroundColor: theme.surface,
		alignItems: "center",
		justifyContent: "center",
	},

	initials: {
		fontSize: 25,
		fontWeight: "800",
		color: theme.primaryLight,
		letterSpacing: -0.5,
	},

	loader: {
		position: "absolute",
		inset: 3,
		borderRadius: 45,
		backgroundColor: "rgba(11,13,16,0.72)",
		alignItems: "center",
		justifyContent: "center",
	},

	onlineDot: {
		position: "absolute",
		right: 3,
		bottom: 4,
		width: 15,
		height: 15,
		borderRadius: 8,
		backgroundColor: theme.primary,
		borderWidth: 3,
		borderColor: theme.card,
	},

	name: {
		marginTop: 13,
		fontSize: 20,
		fontWeight: "800",
		color: theme.text,
		letterSpacing: -0.4,
	},

	memberBadge: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 6,
		paddingHorizontal: 9,
		paddingVertical: 5,
		borderRadius: 9,
		backgroundColor: theme.accentWash,
		borderWidth: 1,
		borderColor: theme.borderAccent,
	},

	badgeDot: {
		width: 5,
		height: 5,
		borderRadius: 3,
		backgroundColor: theme.primaryLight,
		marginRight: 5,
	},

	member: {
		fontSize: 10,
		fontWeight: "700",
		color: theme.primaryLight,
		letterSpacing: 0.1,
	},
});