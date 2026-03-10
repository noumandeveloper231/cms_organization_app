import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Link, router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LoginForm, LoginRole } from '@/components/auth/LoginForm';
import { useAuth } from '@/src/context/AuthContext';

export default function LoginScreen() {
  const { loginStaff, loginJobSeeker, status } = useAuth();

  const handleSubmit = async ({
    role,
    email,
    password,
  }: {
    role: LoginRole;
    email: string;
    password: string;
  }) => {
    if (role === 'STAFF') {
      const result = await loginStaff({ email, password });
      if (!result.ok) {
        throw new Error(result.error ?? 'Unable to login');
      }
      if (result.requires2FA) {
        router.push({
          pathname: '/auth/otp',
          params: { email },
        });
        return;
      }
    } else {
      const result = await loginJobSeeker({ email, password });
      if (!result.ok) {
        throw new Error(result.error ?? 'Unable to login');
      }
      if (result.mustResetPassword) {
        router.push({
          pathname: '/auth/jobseeker-change-password',
          params: { email },
        });
        return;
      }
    }

    router.replace('/(tabs)');
  };

  const isChecking = status === 'checking';

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ThemedView className="flex-1 justify-center gap-4 p-6">
        <LoginForm
          onSubmit={async (params) => {
            try {
              await handleSubmit(params);
            } catch (e: any) {
              // eslint-disable-next-line no-console
              console.error(e);
            }
          }}
          loading={isChecking}
        />

        <ThemedText
          className='text-blue-500'
          onPress={() => router.push('/auth/forgot-password')}
        >
          Forgot password?
        </ThemedText>

        <View className="mt-6">
          <ThemedText>
            Back to home:{' '}
            <Link href="/(tabs)" className="mt-3 underline">
              Dashboard
            </Link>
          </ThemedText>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

