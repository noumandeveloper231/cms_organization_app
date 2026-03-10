import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/src/context/AuthContext';

export default function OtpScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const { verifyStaffOtp } = useAuth();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email) {
      Alert.alert('Missing email', 'Please go back and login again.');
      return;
    }
    if (!code) {
      Alert.alert('Missing code', 'Please enter the verification code.');
      return;
    }

    setLoading(true);
    try {
      const result = await verifyStaffOtp({ email, otp: code });
      if (!result.ok) {
        Alert.alert('Verification failed', result.error ?? 'Unable to verify code.');
        return;
      }
      router.replace('/(tabs)');
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
        <ThemedText type="title">Enter verification code</ThemedText>
        <ThemedText>
          We sent a 6 digit code to {email}. Please enter it below to complete sign in.
        </ThemedText>

        <Input
          label="Verification code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          placeholder="123456"
          maxLength={6}
        />

        <Button title="Verify" isLoading={loading} onPress={onSubmit} fullWidth size="lg" />
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
