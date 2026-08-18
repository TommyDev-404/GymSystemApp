import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { AuthLayout } from '@/features/auth/layout/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { theme } from '@/utils/theme';
import FormField from '@/features/auth/components/FormField'; // adjust path if needed
import PrimaryButton from '@/features/auth/components/PrimaryButton'; // adjust path if needed

export default function LoginScreen() {
	const { login } = useAuth();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleUsernameChange = (text: string) => {
		setUsername(text);
		if (errorMessage) setErrorMessage('');
	};

	const handlePasswordChange = (text: string) => {
		setPassword(text);
		if (errorMessage) setErrorMessage('');
	};

	const handleLogin = async () => {
		if (!username.trim() || !password.trim()) {
			setErrorMessage('Please fill in all fields.');
			return;
		}

		try {
			setErrorMessage('');
			setIsLoading(true);

			await login(username, password);
			router.replace('/(app)/(tabs)/home');
		} catch (error: any) {
			setErrorMessage(error.message || 'Login failed. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthLayout title="JFitness Gym" subtitle="Welcome back, let's train!">
			{/* Error */}
			{errorMessage ? (
				<View style={styles.errorBox}>
					<Text style={styles.errorText}>{errorMessage}</Text>
				</View>
			) : null}

			{/* Username */}
			<FormField
				label="USERNAME"
				value={username}
				onChangeText={handleUsernameChange}
				placeholder="Enter your username"
				autoCapitalize="none"
			/>

			{/* Password */}
			<FormField
				label="PASSWORD"
				value={password}
				onChangeText={handlePasswordChange}
				placeholder="Enter your password"
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
					{showPassword && (
					<View style={styles.checkIcon}>
						<Text style={styles.checkMark}>✓</Text>
					</View>
					)}
				</View>
				<Text style={styles.checkboxLabel}>Show password</Text>
			</TouchableOpacity>

			{/* Forgot password */}
			<TouchableOpacity
				style={styles.forgotRow}
				onPress={() => router.push('/(auth)/forgot-password')}
				activeOpacity={0.7}
			>
				<Text style={styles.forgotText}>Forgot your password?</Text>
			</TouchableOpacity>

			{/* Login Button */}
			<PrimaryButton
				title={isLoading ? 'Signing in...' : 'Login'}
				onPress={handleLogin}
				loading={isLoading}
				disabled={isLoading}
			/>

			{/* Activate Account */}
			<View style={styles.activationCard}>
				<View style={styles.activationTextBlock}>
					<Text style={styles.activationTitle}>Already a gym member?</Text>
					<Text style={styles.activationSubtitle}>
					Activate using your membership code
					</Text>
				</View>

				<TouchableOpacity
					style={styles.activationButton}
					onPress={() => router.push('/(auth)/account-activation')}
					activeOpacity={0.85}
				>
					<Text style={styles.activationButtonText}>Activate</Text>
				</TouchableOpacity>
			</View>
		</AuthLayout>
	);
}

const styles = StyleSheet.create({
  errorBox: {
    backgroundColor: theme.errorBg,
    borderWidth: 1,
    borderColor: theme.errorBorder,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  errorText: {
    color: theme.errorText,
    fontSize: 14,
    textAlign: 'center',
  },
  showPasswordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: -4,
    marginBottom: 8,
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
  checkIcon: {
    alignItems: 'center',
    justifyContent: 'center',
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
  forgotRow: {
    alignSelf: 'flex-end',
    marginBottom: 18,
    paddingVertical: 4,
  },
  forgotText: {
    color: theme.primary,
    fontSize: 14,
    fontWeight: '700',
  },activationCard: {
    marginTop: 24,
    backgroundColor: theme.surface,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  activationTextBlock: {
    flex: 1,
  },
  activationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
  },
  activationSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: theme.textSub,
    lineHeight: 16,
  },
  activationButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  activationButtonText: {
    color: '#0b0d10',
    fontSize: 13,
    fontWeight: '700',
  },
});