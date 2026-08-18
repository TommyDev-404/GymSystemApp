import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';

import { AuthLayout } from '@/features/auth/layout/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { theme } from '@/utils/theme';
import FormField from '@/features/auth/components/FormField';
import PrimaryButton from '@/features/auth/components/PrimaryButton';

type CreateAccountForm = {
	username: string;
	password: string;
	confirm: string;
};

export default function CreateAccountScreen() {
	const { createAccount } = useAuth();
	const { id } = useLocalSearchParams();

	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<CreateAccountForm>({
		defaultValues: {
			username: "",
			password: '',
			confirm: '',
		},
	});

	const handleCreate = async (data: CreateAccountForm) => {
		try {
			setIsLoading(true);

			await createAccount(Number(id), data.username, data.confirm);

			router.replace('/(app)/(tabs)/home');
		} catch (err: any) {
			setError('root', {
			message:
				err?.message ||
				'Failed to create account. Please try again.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const errorMessage =
		errors.root?.message ||
		errors.password?.message ||
		errors.confirm?.message;

return (
	<AuthLayout title="Create Account" subtitle="Set your password to activate your membership">
		{/* Error */}
		{errorMessage ? (
			<View style={styles.errorBox}>
				<Text style={styles.errorText}>
					{errorMessage}
				</Text>
			</View>
		) : null}

		{/* Username */}
		<Controller
			control={control}
			name="username"
			rules={{
				required: 'Please enter a username.',
				minLength: {
					value: 8,
					message: 'Username must be unique.',
				},
			}}
			render={({ field: { onChange, value } }) => (
				<FormField
					label="USERNAME"
					value={value}
					placeholder="Username"
					onChangeText={onChange}
					secureTextEntry={!showPassword}
					autoCapitalize="none"
				/>
			)}
		/>

		{/* Password */}
		<Controller
			control={control}
			name="password"
			rules={{
				required: 'Please enter a password.',
				minLength: {
					value: 8,
					message: 'Password must be at least 8 characters.',
				},
			}}
			render={({ field: { onChange, value } }) => (
				<FormField
					label="PASSWORD"
					value={value}
					onChangeText={onChange}
					placeholder="Minimum 8 characters"
					secureTextEntry={!showPassword}
					autoCapitalize="none"
				/>
			)}
		/>

		{/* Confirm Password */}
		<Controller
			control={control}
			name="confirm"
			rules={{
				required: 'Please confirm your password.',
				validate: (value, formValues) =>
					value === formValues.password ||
					'Passwords do not match.',
			}}
			render={({ field: { onChange, value } }) => (
				<FormField
					label="CONFIRM PASSWORD"
					value={value}
					onChangeText={onChange}
					placeholder="Re-enter your password"
					secureTextEntry={!showPassword}
					autoCapitalize="none"
				/>
			)}
		/>

		{/* Show Password */}
		<TouchableOpacity
			style={styles.showPasswordRow}
			onPress={() => setShowPassword((prev) => !prev)}
			activeOpacity={0.7}
		>
			<View
				style={[
					styles.checkbox,
					showPassword && styles.checkboxChecked,
				]}
			>
				{showPassword && (
					<Text style={styles.checkMark}>✓</Text>
				)}
			</View>

			<Text style={styles.checkboxLabel}>
				Show password
			</Text>
		</TouchableOpacity>

		{/* Create Account */}
		<PrimaryButton
			title={
				isLoading
					? 'Creating account...'
					: 'Create Account'
			}
			onPress={handleSubmit(handleCreate)}
			loading={isLoading}
			disabled={isLoading}
		/>
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
});