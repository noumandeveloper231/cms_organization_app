import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/src/context/AuthContext';

type Mode = 'STAFF' | 'JOB_SEEKER';

export default function ForgotPasswordScreen() {
  const params = useLocalSearchParams<{ email?: string; mode?: Mode }>();
  const initialEmail = params.email ?? '';
  const [email, setEmail] = useState(initialEmail);
  const mode: Mode = (params.mode as Mode) ?? 'STAFF';
  const { requestStaffPasswordReset, requestJobseekerPasswordReset } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email) {
      Alert.alert('Missing email', 'Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'STAFF') {
        const result = await requestStaffPasswordReset(email);
        if (!result.ok) {
          Alert.alert('Error', result.error ?? 'Unable to request password reset.');
          return;
        }
        router.push({
          pathname: '/auth/reset-password',
          params: { email },
        });
      } else {
        const result = await requestJobseekerPasswordReset(email);
        if (!result.ok) {
          Alert.alert('Error', result.error ?? 'Unable to request password reset.');
          return;
        }
        Alert.alert(
          'If the email exists, a new password has been sent.',
          'Please check your inbox for your new temporary password.'
        );
        router.back();
      }
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
        <ThemedText type="title">Forgot password</ThemedText>
        <ThemedText>
          Enter the email linked to your account and we&apos;ll send you a reset code or
          temporary password.
        </ThemedText>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="you@example.com"
        />

        <Button
          title="Send reset instructions"
          isLoading={loading}
          onPress={onSubmit}
          fullWidth
          size="lg"
        />
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
