import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, StatusBar,
    Platform, ActivityIndicator, ScrollView, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

const PRAYER_NAMES = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
const PRAYER_ICONS: Record<string, any> = {
    Fajr: 'partly-sunny-outline',
    Sunrise: 'sunny-outline',
    Dhuhr: 'sunny',
    Asr: 'cloudy-outline',
    Maghrib: 'sunset-outline',
    Isha: 'moon-outline',
};

function to12h(time24: string) {
    if (!time24) return '--:--';
    const [hStr, mStr] = time24.split(':');
    let h = parseInt(hStr, 10);
    const m = mStr;
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
}

export default function PrayerScreen() {
    const { colors, isDark } = useTheme();
    const [timings, setTimings] = useState<Record<string, string> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [date] = useState(new Date());
    const [nextPrayer, setNextPrayer] = useState<string | null>(null);

    useEffect(() => {
        const d = date;
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        // Using Mecca as default location — replace with user location if desired
        fetch(`https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=21.3891&longitude=39.8579&method=4`)
            .then((r) => r.json())
            .then((data) => {
                setTimings(data.data.timings);
                findNextPrayer(data.data.timings);
            })
            .catch(() => setError('Could not load prayer times. Check your connection.'))
            .finally(() => setLoading(false));
    }, []);

    const findNextPrayer = (t: Record<string, string>) => {
        const now = new Date();
        const nowMin = now.getHours() * 60 + now.getMinutes();
        for (const name of PRAYER_NAMES) {
            const [h, m] = (t[name] ?? '').split(':').map(Number);
            const pMin = h * 60 + m;
            if (pMin > nowMin) {
                setNextPrayer(name);
                return;
            }
        }
        setNextPrayer('Fajr'); // next day
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                <View style={styles.headerArea}>
                    <Text style={[styles.title, { color: colors.primary }]}>Prayer Times</Text>
                    <Text style={[styles.dateText, { color: colors.textSecondary }]}>
                        {date.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </Text>
                </View>

                {loading && (
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color={colors.primary} />
                        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Loading prayer times...</Text>
                    </View>
                )}

                {error && (
                    <View style={[styles.errorCard, { backgroundColor: colors.surface, borderColor: colors.error }]}>
                        <Ionicons name="warning-outline" size={24} color={colors.error} />
                        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
                    </View>
                )}

                {timings && PRAYER_NAMES.map((name) => {
                    const isNext = name === nextPrayer;
                    return (
                        <View
                            key={name}
                            style={[
                                styles.prayerCard,
                                {
                                    backgroundColor: isNext ? colors.primary : colors.surface,
                                    borderColor: isNext ? colors.primary : colors.border,
                                },
                            ]}
                        >
                            <View style={[styles.prayerIconWrap, { backgroundColor: isNext ? 'rgba(255,255,255,0.2)' : colors.primary + '22' }]}>
                                <Ionicons
                                    name={PRAYER_ICONS[name]}
                                    size={22}
                                    color={isNext ? '#fff' : colors.primary}
                                />
                            </View>
                            <View style={styles.prayerInfo}>
                                <Text style={[styles.prayerName, { color: isNext ? '#fff' : colors.text }]}>{name}</Text>
                                {isNext && (
                                    <Text style={styles.nextLabel}>Next Prayer</Text>
                                )}
                            </View>
                            <Text style={[styles.prayerTime, { color: isNext ? '#D4A853' : colors.primary }]}>
                                {to12h(timings[name])}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0 },
    content: { padding: 16, paddingBottom: 32 },
    headerArea: { alignItems: 'center', marginBottom: 24 },
    title: { fontSize: 26, fontFamily: 'Amiri_700Bold', fontWeight: 'bold' },
    dateText: { fontSize: 13, fontFamily: 'Amiri_400Regular', marginTop: 4 },
    prayerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 12,
        gap: 14,
    },
    prayerIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prayerInfo: { flex: 1 },
    prayerName: { fontSize: 16, fontFamily: 'Amiri_700Bold', fontWeight: '600' },
    nextLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: 'Amiri_400Regular', marginTop: 2 },
    prayerTime: { fontSize: 16, fontFamily: 'Amiri_700Bold', fontWeight: 'bold' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, paddingTop: 60 },
    loadingText: { fontSize: 14, fontFamily: 'Amiri_400Regular' },
    errorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginTop: 24,
    },
    errorText: { flex: 1, fontSize: 14, fontFamily: 'Amiri_400Regular' },
});
