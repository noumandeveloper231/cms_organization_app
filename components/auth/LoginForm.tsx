import React, { useState } from 'react';
import { Alert, Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export type LoginRole = 'STAFF' | 'JOB_SEEKER';

interface Props {
  initialRole?: LoginRole;
  onSubmit: (params: { role: LoginRole; email: string; password: string }) => Promise<void>;
  loading?: boolean;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm({ initialRole = 'STAFF', onSubmit, loading }: Props) {
  const [role, setRole] = useState<LoginRole>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter email and password.');
      return;
    }

    if (!emailRegex.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    await onSubmit({ role, email: email.trim(), password });
  };

  return (
    <View className="gap-4">
      <ThemedText type="title">Sign in</ThemedText>

      <View className="mt-2 flex-row gap-3">
        <Pressable
          onPress={() => setRole('STAFF')}
          className={[
            'rounded-full border px-4 py-2',
            role === 'STAFF' ? 'border-blue-600' : 'border-slate-300',
          ].join(' ')}
        >
          <ThemedText type="defaultSemiBold">Staff / Hiring</ThemedText>
        </Pressable>

        <Pressable
          onPress={() => setRole('JOB_SEEKER')}
          className={[
            'rounded-full border px-4 py-2',
            role === 'JOB_SEEKER' ? 'border-blue-600' : 'border-slate-300',
          ].join(' ')}
        >
          <ThemedText type="defaultSemiBold">Job Seeker</ThemedText>
        </Pressable>
      </View>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="you@example.com"
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="••••••••"
      />

      <Button
        title="Sign in"
        isLoading={!!loading}
        onPress={handleSubmit}
        fullWidth
        size="lg"
        variant="primary"
      />

      <View className="mt-2">
        <ThemedText type="defaultSemiBold">
          Selected: {role === 'STAFF' ? 'Internal staff / hiring manager' : 'Job seeker'}
        </ThemedText>
      </View>
    </View>
  );
}

