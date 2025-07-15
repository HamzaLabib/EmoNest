import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthProvider, useAuth } from '../scripts/authUtils/authContext';

function RootNavigation() {
  const { authenticated } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';

    if (!authenticated && !inAuthGroup) {
      router.replace('/auth/login');
    } else if (authenticated && inAuthGroup) {
      router.replace('/');
    }
  }, [authenticated, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function LayoutWrapper() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
