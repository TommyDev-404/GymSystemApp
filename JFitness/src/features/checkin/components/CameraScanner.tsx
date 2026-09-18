import { CameraView, useCameraPermissions } from "expo-camera";
import {
	View,
	Text,
	StyleSheet,
	Animated,
	Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { X, ScanLine, ShieldCheck } from "lucide-react-native";
import { theme } from "@/utils/theme";

export function CameraScanner({ onScanned, isScanning }: any) {
	const router = useRouter();
	const [permission, requestPermission] = useCameraPermissions();
	const scannedRef = useRef(false);
	const scanAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(scanAnim, {
					toValue: 1,
					duration: 1800,
					useNativeDriver: true,
				}),
				Animated.timing(scanAnim, {
					toValue: 0,
					duration: 1800,
					useNativeDriver: true,
				}),
			])
		);

		animation.start();

		return () => animation.stop();
	}, [scanAnim]);

	if (!permission?.granted) {
		requestPermission();

		return (
			<View style={styles.permissionContainer}>
				<View style={styles.permissionIcon}>
					<ScanLine
						size={28}
						color={theme.primaryLight}
						strokeWidth={2}
					/>
				</View>

				<Text style={styles.permissionTitle}>
					Camera Access Required
				</Text>

				<Text style={styles.permissionText}>
					Allow camera access to scan your gym QR code.
				</Text>
			</View>
		);
	}

	const handleBarcode = ({ data }: any) => {
		if (scannedRef.current || !isScanning) return;

		scannedRef.current = true;

		setTimeout(() => {
			onScanned(data);
		}, 200);
	};

	return (
		<View style={styles.container}>
			<CameraView
				style={styles.camera}
				facing="back"
				barcodeScannerSettings={{
					barcodeTypes: ["qr"],
				}}
				onBarcodeScanned={
					isScanning ? handleBarcode : undefined
				}
			/>

			<LinearGradient
				colors={[
					"rgba(11,13,16,0.75)",
					"transparent",
					"transparent",
					"rgba(11,13,16,0.9)",
				]}
				locations={[0, 0.25, 0.65, 1]}
				style={StyleSheet.absoluteFill}
				pointerEvents="none"
			/>

			<Pressable
				onPress={() => router.back()}
				style={({ pressed }) => [
					styles.closeButton,
					pressed && styles.pressed,
				]}
			>
				<X
					size={21}
					color="white"
					strokeWidth={2.2}
				/>
			</Pressable>

			<View style={styles.topContent}>
				<View style={styles.badge}>
					<ScanLine
						size={15}
						color={theme.primaryLight}
						strokeWidth={2}
					/>

					<Text style={styles.badgeText}>
						QR SCANNER
					</Text>
				</View>

				<Text style={styles.title}>
					Scan your check-in code
				</Text>

				<Text style={styles.subtitle}>
					Position the QR code inside the frame
				</Text>
			</View>

			<View style={styles.scannerArea} pointerEvents="none">
				<View style={styles.scanFrame}>
					<View style={[styles.corner, styles.topLeft]} />
					<View style={[styles.corner, styles.topRight]} />
					<View style={[styles.corner, styles.bottomLeft]} />
					<View style={[styles.corner, styles.bottomRight]} />

					<Animated.View
						style={[
							styles.scanBeamWrapper,
							{
								transform: [
									{
										translateY:
											scanAnim.interpolate({
												inputRange: [0, 1],
												outputRange: [-125, 125],
											}),
									},
								],
								opacity: scanAnim.interpolate({
									inputRange: [0, 0.5, 1],
									outputRange: [0.35, 1, 0.35],
								}),
							},
						]}
					>
						<LinearGradient
							colors={[
								"rgba(20,184,166,0)",
								"rgba(45,212,191,0.85)",
								"rgba(20,184,166,0)",
							]}
							start={{ x: 0, y: 0.5 }}
							end={{ x: 1, y: 0.5 }}
							style={styles.beam}
						/>

						<View style={styles.coreLine} />
					</Animated.View>
				</View>
			</View>

			<View style={styles.bottomContent}>
				<View style={styles.statusCard}>
					<View style={styles.statusIcon}>
						<ShieldCheck
							size={18}
							color={theme.primaryLight}
							strokeWidth={2}
						/>
					</View>

					<View style={styles.statusTextContainer}>
						<Text style={styles.statusTitle}>
							{isScanning
								? "Ready to scan"
								: "Scanner paused"}
						</Text>

						<Text style={styles.statusSubtitle}>
							{isScanning
								? "Keep the QR code steady"
								: "Please wait..."}
						</Text>
					</View>

					<View
						style={[
							styles.statusDot,
							!isScanning && styles.statusDotInactive,
						]}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.bg,
	},

	camera: {
		...StyleSheet.absoluteFill,
	},

	closeButton: {
		position: "absolute",
		top: 52,
		right: 20,
		width: 42,
		height: 42,
		borderRadius: 14,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(19,22,27,0.78)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.12)",
		zIndex: 10,
	},

	pressed: {
		opacity: 0.65,
		transform: [{ scale: 0.96 }],
	},

	topContent: {
		position: "absolute",
		top: 58,
		left: 20,
		right: 75,
		alignItems: "flex-start",
	},

	badge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 7,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 20,
		backgroundColor: "rgba(20,184,166,0.12)",
		borderWidth: 1,
		borderColor: theme.borderAccent,
	},

	badgeText: {
		fontSize: 10,
		fontWeight: "800",
		letterSpacing: 1,
		color: theme.primaryLight,
	},

	title: {
		marginTop: 14,
		fontSize: 22,
		fontWeight: "800",
		color: "#fff",
		letterSpacing: -0.5,
	},

	subtitle: {
		marginTop: 5,
		fontSize: 12,
		color: "rgba(255,255,255,0.65)",
	},

	scannerArea: {
		position: "absolute",
		top: "50%",
		left: 0,
		right: 0,
		marginTop: -145,
		alignItems: "center",
	},

	scanFrame: {
		width: 270,
		height: 270,
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},

	corner: {
		position: "absolute",
		width: 42,
		height: 42,
		borderColor: theme.primaryLight,
	},

	topLeft: {
		top: 0,
		left: 0,
		borderTopWidth: 3,
		borderLeftWidth: 3,
		borderTopLeftRadius: 14,
	},

	topRight: {
		top: 0,
		right: 0,
		borderTopWidth: 3,
		borderRightWidth: 3,
		borderTopRightRadius: 14,
	},

	bottomLeft: {
		bottom: 0,
		left: 0,
		borderBottomWidth: 3,
		borderLeftWidth: 3,
		borderBottomLeftRadius: 14,
	},

	bottomRight: {
		bottom: 0,
		right: 0,
		borderBottomWidth: 3,
		borderRightWidth: 3,
		borderBottomRightRadius: 14,
	},

	scanBeamWrapper: {
		position: "absolute",
		width: "100%",
		alignItems: "center",
	},

	beam: {
		width: "92%",
		height: 20,
		borderRadius: 20,
	},

	coreLine: {
		position: "absolute",
		width: "86%",
		height: 2,
		backgroundColor: theme.primaryLight,
		shadowColor: theme.primaryLight,
		shadowOpacity: 0.9,
		shadowRadius: 12,
		elevation: 8,
	},

	bottomContent: {
		position: "absolute",
		left: 20,
		right: 20,
		bottom: 45,
	},

	statusCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 13,
		borderRadius: 17,
		backgroundColor: "rgba(19,22,27,0.88)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.1)",
	},

	statusIcon: {
		width: 36,
		height: 36,
		borderRadius: 11,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.accentWash,
		borderWidth: 1,
		borderColor: theme.borderAccent,
	},

	statusTextContainer: {
		flex: 1,
		marginLeft: 11,
	},

	statusTitle: {
		fontSize: 13,
		fontWeight: "700",
		color: theme.primary,
	},

	statusSubtitle: {
		marginTop: 2,
		fontSize: 10,
		color: "white",
	},

	statusDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: theme.primaryLight,
	},

	statusDotInactive: {
		backgroundColor: theme.textMuted,
	},

	permissionContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 35,
		backgroundColor: theme.bg,
	},

	permissionIcon: {
		width: 64,
		height: 64,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.accentWash,
		borderWidth: 1,
		borderColor: theme.borderAccent,
	},

	permissionTitle: {
		marginTop: 18,
		fontSize: 18,
		fontWeight: "800",
		color: theme.text,
		textAlign: "center",
	},

	permissionText: {
		marginTop: 7,
		fontSize: 12,
		lineHeight: 18,
		color: theme.textSub,
		textAlign: "center",
	},
});