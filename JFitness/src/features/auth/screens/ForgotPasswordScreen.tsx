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

export default function ForgotPasswordScreen() {
	const [step, setStep] = useState(1);
	const [errorMessage, setErrorMessage] = useState('');
	const [email, setEmail] = useState('');
	const [code, setCode] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const clearError = () => {
		if (errorMessage) setErrorMessage('');
	};

	const handleSendEmail = async () => {
		if (!email.trim() || !email.includes('@')) {
			setErrorMessage('Please enter a valid email address.');
			return;
		}

		try {
			setErrorMessage('');
			setIsLoading(true);
			const res = await api.sendOtpApi(email);

			if (res.success) {
				setStep(2);
			} else {
				setErrorMessage(res.message || 'Failed to send recovery code.');
			}
		} catch (error: any) {
			setErrorMessage(error.message || 'Something went wrong.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleCodeVerify = async () => {
		if (code.length !== 6) {
			setErrorMessage('Please enter the 6-digit code.');
			return;
		}

		try {
			setErrorMessage('');
			setIsLoading(true);

			const res = await api.verifyOtpApi({ email, code });
			if (res.success) {
				setStep(3);
			} else {
				setErrorMessage(res.message || 'Invalid verification code.');
			}
		} catch (error: any) {
			setErrorMessage(error.message || 'Failed to verify code.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleResetPassword = async () => {
		if (!password || !confirm) {
			setErrorMessage('Please fill in all fields.');
			return;
		}

		if (password.length < 8) {
			setErrorMessage('Password must be at least 8 characters.');
			return;
		}

		if (password !== confirm) {
			setErrorMessage('Passwords do not match.');
			return;
		}

		try {
			setErrorMessage('');
			setIsLoading(true);
			
			const res = await api.resetPasswordApi({
				email,
				newPassword: confirm,
			});

			if (res.success) {
				router.replace('/(auth)/login');
			} else {
				setErrorMessage(res.message || 'Failed to update password.');
			}
		} catch (error: any) {
			setErrorMessage(error.message || 'Something went wrong.');
		} finally {
			setIsLoading(false);
		}
	};

	const getSubtitle = () => {
		if (step === 1) return 'Enter your email to receive a recovery code';
		if (step === 2) return 'Enter the 6-digit verification code';
		return 'Create a new secure password';
	};

	return (
		<AuthLayout title="Forgot Password" subtitle={getSubtitle()}>
			{/* Modern Step Indicator */}
			<View style={styles.stepsContainer}>
				{[1, 2, 3].map((item, index) => {
					const isActive = step === item;
					const isCompleted = step > item;

					return (
						<React.Fragment key={item}>
						{/* Circle */}
						<View
							style={[
								styles.stepCircle,
								isCompleted && styles.stepCircleCompleted,
								isActive && styles.stepCircleActive,
							]}
						>
							{isCompleted ? (
								<Text style={styles.stepCheck}>✓</Text>
							) : (
								<Text
								style={[
									styles.stepNumber,
									(isActive || isCompleted) && styles.stepNumberActive,
								]}
								>
								{item}
								</Text>
							)}
						</View>

						{/* Connector line (except after last step) */}
						{index < 2 && (
							<View
								style={[
								styles.stepLine,
								step > item && styles.stepLineActive,
								]}
							/>
						)}
						</React.Fragment>
					);
				})}
			</View>

			{/* Error */}
			{errorMessage ? (
				<View style={styles.errorBox}>
					<Text style={styles.errorText}>{errorMessage}</Text>
				</View>
			) : null}

			{/* STEP 1 – Email */}
			{step === 1 && (
				<>
					<FormField
						label="EMAIL ADDRESS"
						value={email}
						onChangeText={(t) => {
							setEmail(t);
							clearError();
						}}
						placeholder="your@email.com"
						keyboardType="email-address"
						autoCapitalize="none"
					/>

					<PrimaryButton
						title={isLoading ? 'Sending...' : 'Send Recovery Code'}
						onPress={handleSendEmail}
						loading={isLoading}
						disabled={isLoading}
					/>
				</>
			)}

			{/* STEP 2 – OTP */}
			{step === 2 && (
				<>
					<View style={styles.infoCard}>
						<View style={styles.iconBox}>
							<ShieldCheck size={24} color={theme.primary} strokeWidth={2.2} />
						</View>
						<Text style={styles.infoText}>
							We sent a verification code to{'\n'}
							<Text style={styles.emailHighlight}>{email}</Text>
						</Text>
					</View>

					<FormField
						label="VERIFICATION CODE"
						value={code}
						onChangeText={(t) => {
							setCode(t.replace(/\D/g, '').slice(0, 6));
							clearError();
						}}
						placeholder="------"
						keyboardType="numeric"
						autoCapitalize="none"
					/>

					<PrimaryButton
						title={isLoading ? 'Verifying...' : 'Verify Code'}
						onPress={handleCodeVerify}
						loading={isLoading}
						disabled={isLoading}
					/>
				</>
			)}

			{/* STEP 3 – New Password */}
			{step === 3 && (
				<>
					<FormField
						label="NEW PASSWORD"
						value={password}
						onChangeText={(t) => {
							setPassword(t);
							clearError();
						}}
						placeholder="Minimum 8 characters"
						secureTextEntry={!showPassword}
						autoCapitalize="none"
					/>

					<FormField
						label="CONFIRM PASSWORD"
						value={confirm}
						onChangeText={(t) => {
							setConfirm(t);
							clearError();
						}}
						placeholder="Re-enter your password"
						secureTextEntry={!showPassword}
						autoCapitalize="none"
					/>

					{/* Show password */}
					<TouchableOpacity
						style={styles.showPasswordRow}
						onPress={() => setShowPassword(!showPassword)}
						activeOpacity={0.7}
					>
						<View style={[styles.checkbox, showPassword && styles.checkboxChecked]}>
							{showPassword && <Text style={styles.checkMark}>✓</Text>}
						</View>
						<Text style={styles.checkboxLabel}>Show password</Text>
					</TouchableOpacity>

					<PrimaryButton
						title={isLoading ? 'Updating...' : 'Reset Password'}
						onPress={handleResetPassword}
						loading={isLoading}
						disabled={isLoading}
					/>
				</>
			)}

			{/* Back to login */}
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => router.replace('/(auth)/login')}
				activeOpacity={0.7}
			>
				<Text style={styles.backText}>
					Remember your password?{' '}
					<Text style={{ color: theme.primary, fontWeight: '700' }}>Sign In</Text>
				</Text>
			</TouchableOpacity>
		</AuthLayout>
	);
}

const styles = StyleSheet.create({
  steps: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 24,
  },
  step: {
    flex: 1,
    height: 5,
    borderRadius: 10,
    backgroundColor: theme.border,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  stepCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: theme.borderStrong,
    backgroundColor: theme.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    borderColor: theme.primary,
    backgroundColor: theme.accentWash,
  },
  stepCircleCompleted: {
    borderColor: theme.primary,
    backgroundColor: theme.primary,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.textMuted,
  },
  stepNumberActive: {
    color: theme.primaryLight,
  },
  stepCheck: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0b0d10',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: theme.border,
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: theme.primary,
  },
  activeStep: {
    backgroundColor: theme.primary,
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
  infoCard: {
    backgroundColor: theme.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    alignItems: 'center',
    marginBottom: 22,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  infoText: {
    textAlign: 'center',
    color: theme.textSub,
    fontSize: 14,
    lineHeight: 20,
  },
  emailHighlight: {
    color: theme.primaryLight,
    fontWeight: '700',
  },
  showPasswordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: -4,
    marginBottom: 18,
    paddingVertical: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: theme.border,
    backgroundColor: theme.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  checkMark: {
    color: '#0b0d10',
    fontSize: 13,
    fontWeight: '800',
  },
  checkboxLabel: {
    fontSize: 14,
    color: theme.textSub,
    fontWeight: '500',
  },
  backButton: {
    marginTop: 28,
    alignItems: 'center',
  },
  backText: {
    color: theme.textSub,
    fontSize: 14,
  },
});