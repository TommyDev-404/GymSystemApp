import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { ShieldCheck } from 'lucide-react-native';
import { AuthLayout } from '@/features/auth/layout/AuthLayout';
import * as api from '@/features/auth/api/auth.api';
import { theme } from '@/utils/theme';
import FormField from '@/features/auth/components/FormField'; // adjust path if needed
import PrimaryButton from '@/features/auth/components/PrimaryButton'; // adjust path if needed

export default function ActivateScreen() {
	const [code, setCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleCodeChange = (text: string) => {
		setCode(text);
		if (error) setError('');
	};

	const handleActivate = async () => {
		if (!code.trim()) {
			setError('Please enter your activation code.');
			return;
		}

		try {
			setError('');
			setIsLoading(true);

			const res = await api.verifyActivationCodeApi(code);

			if (res.success) {
				router.push({
					pathname: '/(auth)/create-account',
					params: {
					username: res.data.username,
					id: res.data.memberId,
					},
				});
			} else {
				setError('Invalid or expired code. Please try again.');
			}
		} catch (err: any) {
			setError(err?.message || 'Something went wrong. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthLayout title="Activate Membership" subtitle="Verify your membership before creating your account">
			{/* Info Card */}
			<View style={styles.infoCard}>
				<View style={styles.iconContainer}>
					<ShieldCheck size={26} color={theme.primary} strokeWidth={2.2} />
				</View>
				<Text style={styles.infoTitle}>Membership Verification</Text>
				<Text style={styles.infoText}>
					Enter the activation code provided by the gym staff to continue creating your account.
				</Text>
			</View>

			{/* Error */}
			{error ? (
				<View style={styles.errorBox}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			) : null}

			{/* Activation Code */}
			<FormField
				label="ACTIVATION CODE"
				value={code}
				onChangeText={handleCodeChange}
				placeholder="Enter 6-digit code"
				keyboardType="numeric"
				autoCapitalize="characters"
			/>

			{/* Verify Button */}
			<PrimaryButton
				title={isLoading ? 'Verifying...' : 'Verify Membership'}
				onPress={handleActivate}
				loading={isLoading}
				disabled={isLoading}
			/>
		</AuthLayout>
	);
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: theme.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 20,
    alignItems: 'center',
    marginBottom: 22,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 6,
  },
  infoText: {
    textAlign: 'center',
    color: theme.textSub,
    fontSize: 13,
    lineHeight: 20,
  },
  errorBox: {
    backgroundColor: theme.errorBg,
    borderWidth: 1,
    borderColor: theme.errorBorder,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  errorText: {
    color: theme.errorText,
    fontSize: 14,
    textAlign: 'center',
  },
});