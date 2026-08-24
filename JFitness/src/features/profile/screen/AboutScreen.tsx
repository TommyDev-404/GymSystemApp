import {
	StyleSheet,
	Text,
	View,
 } from "react-native";
 import { StackWrapper } from "@/components/shared/StackWrapper";
 import { LegalAccordion } from "@/features/profile/components/LegalAccordion";
 import { theme } from "@/utils/theme";
 import {
	ShieldCheck,
	Info,
	Dumbbell,
 } from "lucide-react-native";
 
 export default function AboutScreen() {
	return (
	  <StackWrapper
		 title="About"
		 subtitle="Learn more about the app and your privacy"
		 horizontalPadding={20}
		 paddingTop={10}
		 paddingBottom={35}
		 gap={0}
	  >
		 <View style={styles.appCard}>
			<View style={styles.appIcon}>
			  <Dumbbell
				 size={28}
				 color={theme.primaryLight}
				 strokeWidth={2.2}
			  />
			</View>
 
			<Text style={styles.appName}>
			  JFitness Gym Management
			</Text>
 
			<Text style={styles.appDescription}>
			  Your personal fitness companion for managing your
			  membership, attendance, payments, rewards, and
			  workout progress.
			</Text>
 
			<View style={styles.versionBadge}>
			  <Info
				 size={12}
				 color={theme.primaryLight}
				 strokeWidth={2.2}
			  />
			  <Text style={styles.versionText}>Version 1.0.0</Text>
			</View>
		 </View>
 
		 <View style={styles.sectionHeader}>
			<View style={styles.sectionIcon}>
			  <ShieldCheck
				 size={15}
				 color={theme.primaryLight}
				 strokeWidth={2.2}
			  />
			</View>
 
			<View>
			  <Text style={styles.sectionTitle}>Legal & Privacy</Text>
			  <Text style={styles.sectionSubtitle}>
				 Review how your information is handled
			  </Text>
			</View>
		 </View>
 
		 <View style={styles.menuCard}>
			<LegalAccordion type="terms" />
			<LegalAccordion type="privacy" />
		 </View>
 
		 <View style={styles.sectionHeader}>
			<View style={styles.sectionIcon}>
			  <Info
				 size={15}
				 color={theme.primaryLight}
				 strokeWidth={2.2}
			  />
			</View>
 
			<View>
			  <Text style={styles.sectionTitle}>
				 Application Information
			  </Text>
			  <Text style={styles.sectionSubtitle}>
				 Details about this application
			  </Text>
			</View>
		 </View>
 
		 <View style={styles.infoCard}>
			<View style={styles.infoRow}>
			  <Text style={styles.infoLabel}>Application</Text>
			  <Text style={styles.infoValue}>
				 JFitness Gym Management
			  </Text>
			</View>
 
			<View style={styles.infoDivider} />
 
			<View style={styles.infoRow}>
			  <Text style={styles.infoLabel}>Version</Text>
			  <Text style={styles.infoValue}>1.0.0</Text>
			</View>
 
			<View style={styles.infoDivider} />
 
			<View style={styles.infoRow}>
			  <Text style={styles.infoLabel}>Platform</Text>
			  <Text style={styles.infoValue}>
				 Mobile Application
			  </Text>
			</View>
		 </View>
 
		 <View style={styles.footer}>
			<Text style={styles.footerText}>
			  Made for a better fitness experience
			</Text>
 
			<Text style={styles.copyright}>
			  © 2026 Gym Management
			</Text>
		 </View>
	  </StackWrapper>
	);
 }
 
 const styles = StyleSheet.create({
	appCard: {
	  backgroundColor: theme.card,
	  borderRadius: 20,
	  borderWidth: 1,
	  borderColor: theme.borderAccent,
	  padding: 22,
	  alignItems: "center",
	  marginBottom: 22,
	  overflow: "hidden",
	},
	appIcon: {
	  width: 64,
	  height: 64,
	  borderRadius: 18,
	  alignItems: "center",
	  justifyContent: "center",
	  backgroundColor: theme.accentWash,
	  borderWidth: 1,
	  borderColor: theme.borderAccent,
	  marginBottom: 14,
	},
	appName: {
	  fontSize: 20,
	  fontWeight: "800",
	  color: theme.text,
	  letterSpacing: -0.4,
	  textAlign: "center",
	},
	appDescription: {
	  marginTop: 7,
	  fontSize: 11,
	  lineHeight: 17,
	  color: theme.textSub,
	  textAlign: "center",
	  maxWidth: 300,
	},
	versionBadge: {
	  flexDirection: "row",
	  alignItems: "center",
	  gap: 5,
	  marginTop: 14,
	  paddingHorizontal: 9,
	  paddingVertical: 6,
	  borderRadius: 9,
	  backgroundColor: theme.accentWash,
	  borderWidth: 1,
	  borderColor: theme.borderAccent,
	},
	versionText: {
	  fontSize: 9,
	  fontWeight: "700",
	  color: theme.primaryLight,
	},
	sectionHeader: {
	  flexDirection: "row",
	  alignItems: "center",
	  marginBottom: 12,
	  marginLeft: 2,
	},
	sectionIcon: {
	  width: 34,
	  height: 34,
	  borderRadius: 11,
	  alignItems: "center",
	  justifyContent: "center",
	  marginRight: 10,
	  backgroundColor: theme.accentWash,
	  borderWidth: 1,
	  borderColor: theme.borderAccent,
	},
	sectionTitle: {
	  fontSize: 14,
	  fontWeight: "800",
	  color: theme.text,
	  letterSpacing: -0.1,
	},
	sectionSubtitle: {
	  marginTop: 2,
	  fontSize: 10,
	  fontWeight: "500",
	  color: theme.textMuted,
	},
	menuCard: {
	  backgroundColor: theme.card,
	  borderRadius: 18,
	  borderWidth: 1,
	  borderColor: theme.border,
	  overflow: "hidden",
	  marginBottom: 22,
	},
	infoCard: {
	  backgroundColor: theme.card,
	  borderRadius: 18,
	  borderWidth: 1,
	  borderColor: theme.border,
	  paddingHorizontal: 16,
	},
	infoRow: {
	  minHeight: 50,
	  flexDirection: "row",
	  alignItems: "center",
	  justifyContent: "space-between",
	},
	infoLabel: {
	  fontSize: 11,
	  fontWeight: "600",
	  color: theme.textMuted,
	},
	infoValue: {
	  fontSize: 11,
	  fontWeight: "700",
	  color: theme.textSub,
	  maxWidth: "65%",
	  textAlign: "right",
	},
	infoDivider: {
	  height: 1,
	  backgroundColor: theme.border,
	},
	footer: {
	  alignItems: "center",
	  marginTop: 28,
	},
	footerText: {
	  fontSize: 10,
	  fontWeight: "600",
	  color: theme.textMuted,
	},
	copyright: {
	  marginTop: 5,
	  fontSize: 9,
	  color: theme.textMuted,
	},
 });