import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';

function InitialLayout() {
    const { user, isLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    const { isDark, colors } = useTheme();

    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!user && !inAuthGroup) {
            // Redirect to the sign-in page.
            router.replace('/(auth)/splash');
        } else if (user && inAuthGroup) {
            // Redirect to the home page.
            router.replace('/(tabs)' as any);
        }
    }, [user, isLoading, segments]);

    return (
        <>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.background },
                }}
            >
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="quran/[surahId]" options={{ title: 'Surah' }} />
                <Stack.Screen name="adhkar/[categoryId]" options={{ title: 'Adhkar' }} />
                <Stack.Screen name="settings" options={{ title: 'Settings' }} />
                <Stack.Screen name="tasbih" options={{ title: 'Tasbih' }} />
                <Stack.Screen name="qibla" options={{ title: 'Qibla Direction' }} />
            </Stack>
        </>
    );
}

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <InitialLayout />
            </AuthProvider>
        </ThemeProvider>
    );
}
