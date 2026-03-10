import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/src/context/AuthContext';

export default function ResetPasswordScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetStaffPassword } = useAuth();

  const onSubmit = async () => {
    if (!email) {
      Alert.alert('Missing email', 'Please restart the reset flow.');
      return;
    }
    if (!otp || !password) {
      Alert.alert('Missing fields', 'Please enter the code and new password.');
      return;
    }

    setLoading(true);
    try {
      const result = await resetStaffPassword({ email, otp, newPassword: password });
      if (!result.ok) {
        Alert.alert('Error', result.error ?? 'Unable to reset password.');
        return;
      }

      Alert.alert('Password updated', 'You can now log in with your new password.', [
        { text: 'OK', onPress: () => router.replace('/auth/login') },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ThemedView className="flex-1 justify-center gap-4 p-6">
        <ThemedText type="title">Reset password</ThemedText>
        <ThemedText>Enter the code we emailed you and choose a new password.</ThemedText>

        <Input
          label="Verification code"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          placeholder="123456"
          maxLength={6}
        />

        <Input
          label="New password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
        />

        <Button
          title="Update password"
          isLoading={loading}
          onPress={onSubmit}
          fullWidth
          size="lg"
        />
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
