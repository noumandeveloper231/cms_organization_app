import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function JobseekerChangePasswordScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!password) {
      Alert.alert('Missing password', 'Please choose a new password.');
      return;
    }

    // NOTE: Backend currently enforces first-time change via must_reset_password and
    // temp passwords. When a dedicated endpoint exists, wire it here.
    setLoading(true);
    try {
      Alert.alert(
        'Password change',
        'This screen will call the job seeker password change endpoint when it is available. For now, continue using the portal as normal.',
        [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
      );
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
        <ThemedText type="title">Change temporary password</ThemedText>
        <ThemedText>
          For security, please change the temporary password that was emailed to {email}.
        </ThemedText>

        <Input
          label="New password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
        />

        <Button
          title="Save new password"
          isLoading={loading}
          onPress={onSubmit}
          fullWidth
          size="lg"
        />
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
