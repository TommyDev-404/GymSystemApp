import React, { useState } from "react";
import {
	View,
	Text,
	Pressable,
	StyleSheet,
	LayoutAnimation,
	Platform,
	UIManager,
} from "react-native";
import {
	ChevronDown,
	FileText,
	ShieldCheck,
} from "lucide-react-native";

import { theme } from "@/utils/theme";

if (
	Platform.OS === "android" &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

type LegalAccordionProps = {
	type: "terms" | "privacy";
};

export function LegalAccordion({
	type,
}: LegalAccordionProps) {
	const [expanded, setExpanded] = useState(false);

	const isTerms = type === "terms";

	const toggle = () => {
		LayoutAnimation.configureNext(
			LayoutAnimation.Presets.easeInEaseOut
		);

		setExpanded((prev) => !prev);
	};

	return (
		<View style={styles.wrapper}>
			<Pressable
				onPress={toggle}
				style={({ pressed }) => [
					styles.header,
					pressed && styles.pressed,
					expanded && styles.headerExpanded,
				]}
			>
				<View style={styles.icon}>
					{isTerms ? (
						<FileText
							size={18}
							color={theme.primaryLight}
							strokeWidth={2}
						/>
					) : (
						<ShieldCheck
							size={18}
							color={theme.primaryLight}
							strokeWidth={2}
						/>
					)}
				</View>

				<View style={styles.titleContainer}>
					<Text style={styles.title}>
						{isTerms
							? "Terms & Conditions"
							: "Privacy Policy"}
					</Text>

					<Text style={styles.subtitle}>
						{isTerms
							? "Rules and conditions for using the app"
							: "How we collect and protect your data"}
					</Text>
				</View>

				<ChevronDown
					size={18}
					color={theme.textMuted}
					strokeWidth={2}
					style={{
						transform: [
							{
								rotate: expanded ? "180deg" : "0deg",
							},
						],
					}}
				/>
			</Pressable>

			{expanded && (
				<View style={styles.content}>
					{isTerms ? (
						<TermsContent />
					) : (
						<PrivacyContent />
					)}
				</View>
			)}
		</View>
	);
}

function TermsContent() {
	return (
		<View>
			<LegalSection
				title="1. Use of the Application"
				text="This application is provided to help gym members manage their membership, attendance, payments, rewards, and fitness-related information. By using the application, you agree to use it responsibly and only for its intended purpose."
			/>

			<LegalSection
				title="2. Membership & Account"
				text="You are responsible for keeping your account information accurate and for maintaining the security of your account. You should not share your login credentials or allow another person to access your account."
			/>

			<LegalSection
				title="3. Attendance & Check-in"
				text="Attendance records are associated with your member account. QR-based check-ins must only be performed by the member assigned to the account. Attempting to check in on behalf of another member may result in account restrictions."
			/>

			<LegalSection
				title="4. Payments"
				text="Membership payments and transactions displayed in the application are based on records maintained by the gym. Payment information should be reviewed carefully, and any discrepancies should be reported to gym administration."
			/>

			<LegalSection
				title="5. Rewards"
				text="Rewards, points, and redemption availability may be subject to gym rules and eligibility requirements. The gym may update reward availability or redemption conditions when necessary."
			/>

			<LegalSection
				title="6. Changes to These Terms"
				text="The gym may update these terms when necessary to reflect changes to the application, services, or operational policies. Continued use of the application after changes means you acknowledge the updated terms."
			/>
		</View>
	);
}

function PrivacyContent() {
	return (
		<View>
			<LegalSection
				title="1. Information We Collect"
				text="The application may store information such as your name, username, email address, profile information, membership details, attendance records, payment records, rewards activity, and fitness progress."
			/>

			<LegalSection
				title="2. How We Use Your Information"
				text="Your information is used to provide and manage gym services, including membership management, attendance tracking, payment records, rewards, notifications, and fitness progress features."
			/>

			<LegalSection
				title="3. Account Information"
				text="Your account information is used to identify your membership and provide access to features available to you. You should keep your account credentials private and notify gym staff if you believe your account has been compromised."
			/>

			<LegalSection
				title="4. Data Protection"
				text="Reasonable technical and organizational measures are used to protect your information from unauthorized access, alteration, disclosure, or loss. However, no electronic system can guarantee absolute security."
			/>

			<LegalSection
				title="5. Sharing of Information"
				text="Your personal information is intended to be used for gym operations and service delivery. Information may be accessed by authorized gym personnel when necessary to manage memberships, payments, attendance, rewards, and related services."
			/>

			<LegalSection
				title="6. Your Rights"
				text="You may request clarification regarding the personal information associated with your account and may ask authorized gym personnel about correcting inaccurate account information."
			/>

			<LegalSection
				title="7. Changes to This Privacy Policy"
				text="This privacy policy may be updated when the application's features, services, or data practices change. Any updated version will reflect the latest practices of the application."
			/>
		</View>
	);
}

function LegalSection({
	title,
	text,
}: {
	title: string;
	text: string;
}) {
	return (
		<View style={styles.legalSection}>
			<Text style={styles.legalTitle}>{title}</Text>

			<Text style={styles.legalText}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		borderBottomWidth: 1,
		borderBottomColor: theme.border,
	},

	header: {
		minHeight: 76,
		paddingHorizontal: 14,
		paddingVertical: 13,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: theme.card,
	},

	headerExpanded: {
		backgroundColor: theme.surface,
	},

	pressed: {
		opacity: 0.8,
	},

	icon: {
		width: 38,
		height: 38,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.accentWash,
		borderWidth: 1,
		borderColor: theme.borderAccent,
		marginRight: 12,
	},

	titleContainer: {
		flex: 1,
	},

	title: {
		fontSize: 13,
		fontWeight: "700",
		color: theme.text,
	},

	subtitle: {
		marginTop: 3,
		fontSize: 10,
		lineHeight: 15,
		color: theme.textMuted,
	},

	content: {
		paddingHorizontal: 16,
		paddingTop: 4,
		paddingBottom: 18,
		backgroundColor: theme.surface,
	},

	legalSection: {
		marginTop: 14,
	},

	legalTitle: {
		fontSize: 12,
		fontWeight: "700",
		color: theme.text,
		marginBottom: 5,
	},

	legalText: {
		fontSize: 11,
		lineHeight: 18,
		color: theme.textSub,
	},
});