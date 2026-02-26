import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, StyleSheet, TouchableOpacity,
    SafeAreaView, StatusBar, Platform, ActivityIndicator, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

export default function QuranScreen() {
    const { colors, isDark } = useTheme();
    const router = useRouter();
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [filtered, setFiltered] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://api.alquran.cloud/v1/surah')
            .then((r) => r.json())
            .then((data) => {
                setSurahs(data.data);
                setFiltered(data.data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const q = search.toLowerCase();
        setFiltered(
            surahs.filter((s) =>
                s.englishName.toLowerCase().includes(q) ||
                s.name.includes(search) ||
                String(s.number).includes(q)
            )
        );
    }, [search, surahs]);

    const renderSurah = ({ item }: { item: Surah }) => (
        <TouchableOpacity
            style={[styles.surahRow, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => router.push(`/quran/${item.number}` as any)}
            activeOpacity={0.8}
        >
            <View style={[styles.numberBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.numberText}>{item.number}</Text>
            </View>
            <View style={styles.surahInfo}>
                <Text style={[styles.surahEnglish, { color: colors.text }]}>{item.englishName}</Text>
                <Text style={[styles.surahMeta, { color: colors.textSecondary }]}>
                    {item.englishNameTranslation} · {item.numberOfAyahs} verses · {item.revelationType}
                </Text>
            </View>
            <Text style={[styles.arabicName, { color: colors.primary }]}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.primary }]}>القرآن الكريم</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>The Holy Quran</Text>
            </View>

            <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Ionicons name="search-outline" size={18} color={colors.textSecondary} />
                <TextInput
                    style={[styles.searchInput, { color: colors.text }]}
                    placeholder="Search surah..."
                    placeholderTextColor={colors.textSecondary}
                    value={search}
                    onChangeText={setSearch}
                />
                {search.length > 0 && (
                    <TouchableOpacity onPress={() => setSearch('')}>
                        <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
                    </TouchableOpacity>
                )}
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Loading Surahs...</Text>
                </View>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => String(item.number)}
                    renderItem={renderSurah}
                    contentContainerStyle={styles.list}
                    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0 },
    header: { alignItems: 'center', paddingVertical: 16 },
    title: { fontSize: 28, fontFamily: 'Amiri_700Bold', fontWeight: 'bold' },
    subtitle: { fontSize: 14, fontFamily: 'Amiri_400Regular', marginTop: 2 },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        gap: 8,
    },
    searchInput: { flex: 1, fontSize: 15, fontFamily: 'Amiri_400Regular' },
    list: { paddingHorizontal: 16, paddingBottom: 24 },
    surahRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        gap: 12,
    },
    numberBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
    surahInfo: { flex: 1 },
    surahEnglish: { fontSize: 15, fontFamily: 'Amiri_700Bold', fontWeight: '600', marginBottom: 2 },
    surahMeta: { fontSize: 12, fontFamily: 'Amiri_400Regular' },
    arabicName: { fontSize: 20, fontFamily: 'Amiri_700Bold' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
    loadingText: { fontSize: 14, fontFamily: 'Amiri_400Regular' },
});
