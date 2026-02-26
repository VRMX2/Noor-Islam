import React from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, StatusBar,
    Platform, ScrollView, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

const ADHKAR_CATEGORIES = [
    {
        id: 'morning',
        title: 'Morning Adhkar',
        arabic: 'أذكار الصباح',
        description: 'Daily morning remembrance',
        count: 20,
        icon: 'partly-sunny-outline' as const,
        lib: 'ion',
        color: '#F59E0B',
    },
    {
        id: 'evening',
        title: 'Evening Adhkar',
        arabic: 'أذكار المساء',
        description: 'Daily evening remembrance',
        count: 20,
        icon: 'moon-outline' as const,
        lib: 'ion',
        color: '#6366F1',
    },
    {
        id: 'sleep',
        title: 'Before Sleep',
        arabic: 'أذكار النوم',
        description: 'Adhkar before sleeping',
        count: 10,
        icon: 'bed-outline' as const,
        lib: 'ion',
        color: '#3B82F6',
    },
    {
        id: 'wakeup',
        title: 'Upon Waking',
        arabic: 'أذكار الاستيقاظ',
        description: 'Adhkar when you wake',
        count: 5,
        icon: 'sunny-outline' as const,
        lib: 'ion',
        color: '#EF4444',
    },
    {
        id: 'prayer',
        title: 'After Prayer',
        arabic: 'أذكار بعد الصلاة',
        description: 'Post-prayer remembrance',
        count: 15,
        icon: 'hands-pray' as const,
        lib: 'mci',
        color: '#10B981',
    },
    {
        id: 'quran',
        title: 'Quranic Duas',
        arabic: 'أدعية قرآنية',
        description: 'Supplications from the Quran',
        count: 25,
        icon: 'book-open-page-variant-outline' as const,
        lib: 'mci',
        color: '#8B5CF6',
    },
];

export default function AdhkarScreen() {
    const { colors, isDark } = useTheme();
    const router = useRouter();

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                <View style={styles.headerArea}>
                    <Text style={[styles.title, { color: colors.primary }]}>الأذكار والأدعية</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Adhkar & Duas</Text>
                </View>

                <View style={styles.grid}>
                    {ADHKAR_CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
                            onPress={() => router.push(`/adhkar/${cat.id}` as any)}
                            activeOpacity={0.8}
                        >
                            <View style={[styles.iconWrap, { backgroundColor: cat.color + '22' }]}>
                                {cat.lib === 'mci'
                                    ? <MaterialCommunityIcons name={cat.icon as any} size={30} color={cat.color} />
                                    : <Ionicons name={cat.icon as any} size={30} color={cat.color} />
                                }
                            </View>
                            <Text style={[styles.cardArabic, { color: cat.color }]}>{cat.arabic}</Text>
                            <Text style={[styles.cardTitle, { color: colors.text }]}>{cat.title}</Text>
                            <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>{cat.description}</Text>
                            <View style={[styles.badge, { backgroundColor: cat.color + '22' }]}>
                                <Text style={[styles.badgeText, { color: cat.color }]}>{cat.count} adhkar</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tasbih shortcut */}
                <TouchableOpacity
                    style={[styles.tasbihBanner, { backgroundColor: colors.primary }]}
                    onPress={() => router.push('/tasbih' as any)}
                    activeOpacity={0.85}
                >
                    <Text style={styles.tasbihIcon}>📿</Text>
                    <View style={styles.tasbihText}>
                        <Text style={styles.tasbihTitle}>Digital Tasbih</Text>
                        <Text style={styles.tasbihSub}>Count your remembrance</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0 },
    content: { padding: 16, paddingBottom: 32 },
    headerArea: { alignItems: 'center', marginBottom: 24 },
    title: { fontSize: 28, fontFamily: 'Amiri_700Bold', fontWeight: 'bold' },
    subtitle: { fontSize: 14, fontFamily: 'Amiri_400Regular', marginTop: 2 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
    card: {
        width: '47%',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
    },
    iconWrap: {
        width: 60,
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardArabic: { fontSize: 16, fontFamily: 'Amiri_700Bold', marginBottom: 2, textAlign: 'center' },
    cardTitle: { fontSize: 13, fontFamily: 'Amiri_700Bold', fontWeight: '600', textAlign: 'center', marginBottom: 2 },
    cardDesc: { fontSize: 11, fontFamily: 'Amiri_400Regular', textAlign: 'center', marginBottom: 8 },
    badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
    badgeText: { fontSize: 11, fontFamily: 'Amiri_400Regular', fontWeight: '600' },
    tasbihBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        borderRadius: 16,
        gap: 14,
    },
    tasbihIcon: { fontSize: 28 },
    tasbihText: { flex: 1 },
    tasbihTitle: { color: '#fff', fontSize: 16, fontFamily: 'Amiri_700Bold', fontWeight: 'bold' },
    tasbihSub: { color: 'rgba(255,255,255,0.75)', fontSize: 12, fontFamily: 'Amiri_400Regular' },
});
