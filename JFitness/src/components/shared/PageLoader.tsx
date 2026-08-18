import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "./ScreenHeader";
import { AppBackground } from "./AppBackground";
import { theme } from "@/utils/theme";

interface PageLoaderProps {
	title: string;
	subtitle?: string;
	message?: string;
}

export function PageLoader({
	title,
	subtitle,
	message = "Loading...",
}: PageLoaderProps) {
	return (
		<AppBackground>
			<SafeAreaView style={styles.container}>
				<ScreenHeader
					title={title}
					subtitle={subtitle}
				/>

				<View style={styles.loadingContainer}>
					<View style={styles.loader}>
						<ActivityIndicator
							size="small"
							color={theme.primaryLight}
						/>

						<Text style={styles.loadingText}>
							{message}
						</Text>
					</View>
				</View>
			</SafeAreaView>
		</AppBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 60,
	},
	loader: {
		alignItems: "center",
		justifyContent: "center",
	},
	loadingText: {
		marginTop: 10,
		fontSize: 11,
		fontWeight: "600",
		color: theme.textMuted,
	},
});