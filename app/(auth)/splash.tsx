import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function SplashScreen() {
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const { colors } = useTheme();

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                if (user) {
                    router.replace('/(tabs)' as any);
                } else {
                    router.replace('/(auth)/login');
                }
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isLoading, user]);

    return (
        <LinearGradient
            colors={[colors.primary, colors.background]}
            style={styles.container}
        >
            <Animated.View entering={FadeIn.duration(1000)} exiting={FadeOut}>
                <Text style={[styles.title, { color: colors.secondary }]}>
                    نور الإسلام
                </Text>
                <Text style={[styles.subtitle, { color: colors.surface }]}>
                    Noor Islam
                </Text>
            </Animated.View>

            <Animated.View
                entering={FadeIn.delay(1000).duration(800)}
                style={styles.verseContainer}
            >
                <Text style={[styles.verse, { color: colors.surface }]}>
                    "نُورٌ عَلَى نُورٍ ۗ يَهْدِي اللَّهُ لِنُورِهِ مَن يَشَاءُ"
                </Text>
                <Text style={[styles.verseTranslation, { color: colors.surface }]}>
                    "Light upon light. Allah guides to His light whom He wills."
                </Text>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        fontFamily: 'Amiri_700Bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 24,
        marginTop: 8,
        fontFamily: 'Amiri_400Regular',
        textAlign: 'center',
    },
    verseContainer: {
        position: 'absolute',
        bottom: 50,
        paddingHorizontal: 32,
        alignItems: 'center',
    },
    verse: {
        fontSize: 20,
        fontFamily: 'Amiri_400Regular_Italic',
        textAlign: 'center',
        marginBottom: 8,
    },
    verseTranslation: {
        fontSize: 14,
        textAlign: 'center',
        opacity: 0.8,
    },
});
