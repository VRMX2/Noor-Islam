import React from 'react';
import {
    View, Text, ScrollView, StyleSheet, TouchableOpacity,
    SafeAreaView, StatusBar, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const FEATURE_CARDS = [
    { title: 'Quran', subtitle: 'Read & Listen', icon: 'book-open-page-variant-outline', route: '/(tabs)/quran', lib: 'mci' },
    { title: 'Prayer Times', subtitle: 'Daily Schedule', icon: 'time-outline', route: '/(tabs)/prayer', lib: 'ion' },
    { title: 'Adhkar', subtitle: 'Morning & Evening', icon: 'hands-pray', route: '/(tabs)/adhkar', lib: 'mci' },
    { title: 'Qibla', subtitle: 'Find Direction', icon: 'compass-outline', route: '/qibla', lib: 'ion' },
    { title: 'Tasbih', subtitle: 'Digital Counter', icon: 'radio-button-on-outline', route: '/tasbih', lib: 'ion' },
    { title: 'Settings', subtitle: 'Customize App', icon: 'settings-outline', route: '/settings', lib: 'ion' },
] as const;

export default function HomeScreen() {
    const { colors, isDark } = useTheme();
    const { profile, user } = useAuth();
    const router = useRouter();

    const displayName = profile?.name || user?.displayName || 'Beloved';

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'صباح الخير';
        if (hour < 17) return 'مساء الخير';
        return 'مساء النور';
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <LinearGradient
                    colors={[colors.primary, isDark ? '#2D5016' : '#2D6A4F']}
                    style={styles.header}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View>
                        <Text style={styles.arabicGreeting}>{greeting()}</Text>
                        <Text style={styles.greeting}>Welcome, {displayName}</Text>
                        <Text style={styles.date}>
                            {new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </Text>
                    </View>
                    <View style={styles.islamicBadge}>
                        <Text style={styles.islamicBadgeText}>☪</Text>
                    </View>
                </LinearGradient>

                {/* Verse of the day */}
                <View style={[styles.verseCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.verseLabel, { color: colors.secondary }]}>Verse of the Day</Text>
                    <Text style={[styles.verseArabic, { color: colors.text }]}>
                        ﴿ وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ﴾
                    </Text>
                    <Text style={[styles.verseTranslation, { color: colors.textSecondary }]}>
                        "And whoever fears Allah — He will make for him a way out." (65:2)
                    </Text>
                </View>

                {/* Feature Grid */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
                <View style={styles.grid}>
                    {FEATURE_CARDS.map((card) => (
                        <TouchableOpacity
                            key={card.title}
                            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
                            onPress={() => router.push(card.route as any)}
                            activeOpacity={0.8}
                        >
                            <View style={[styles.cardIcon, { backgroundColor: colors.primary + '22' }]}>
                                {card.lib === 'mci'
                                    ? <MaterialCommunityIcons name={card.icon as any} size={28} color={colors.primary} />
                                    : <Ionicons name={card.icon as any} size={28} color={colors.primary} />
                                }
                            </View>
                            <Text style={[styles.cardTitle, { color: colors.text }]}>{card.title}</Text>
                            <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>{card.subtitle}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0 },
    scrollContent: { paddingBottom: 32 },
    header: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 20,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    arabicGreeting: {
        fontSize: 22,
        color: '#D4A853',
        fontFamily: 'Amiri_700Bold',
        marginBottom: 4,
    },
    greeting: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Amiri_700Bold',
        marginBottom: 4,
    },
    date: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.75)',
        fontFamily: 'Amiri_400Regular',
    },
    islamicBadge: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    islamicBadgeText: { fontSize: 30, color: '#D4A853' },
    verseCard: {
        margin: 16,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
    },
    verseLabel: {
        fontSize: 12,
        fontFamily: 'Amiri_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 10,
    },
    verseArabic: {
        fontSize: 20,
        fontFamily: 'Amiri_400Regular',
        textAlign: 'right',
        lineHeight: 36,
        marginBottom: 10,
    },
    verseTranslation: {
        fontSize: 14,
        fontFamily: 'Amiri_400Regular',
        fontStyle: 'italic',
        lineHeight: 22,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Amiri_700Bold',
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginBottom: 12,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
        gap: 8,
    },
    card: {
        width: '47%',
        margin: '1.5%',
        padding: 18,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
    },
    cardIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 15,
        fontFamily: 'Amiri_700Bold',
        fontWeight: '600',
        marginBottom: 2,
    },
    cardSubtitle: { fontSize: 12, fontFamily: 'Amiri_400Regular' },
});
