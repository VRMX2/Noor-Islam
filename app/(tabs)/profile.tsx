import React from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, StatusBar,
    Platform, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../services/firebase/auth';

type MenuItem = {
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    route?: string;
    action?: () => void;
    danger?: boolean;
};

export default function ProfileScreen() {
    const { colors, isDark } = useTheme();
    const { user, profile } = useAuth();
    const router = useRouter();

    const displayName = profile?.name || user?.displayName || 'User';
    const email = user?.email || '';
    const country = profile?.country || '';

    const handleSignOut = () => {
        Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Sign Out',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await signOut();
                        // AuthContext listener will redirect to auth
                    } catch (e: any) {
                        Alert.alert('Error', e.message || 'Failed to sign out');
                    }
                },
            },
        ]);
    };

    const menuItems: MenuItem[] = [
        {
            title: 'Settings',
            subtitle: 'Appearance, notifications',
            icon: 'settings-outline',
            route: '/settings',
        },
        {
            title: 'Qibla Direction',
            subtitle: 'Find the direction of Mecca',
            icon: 'compass-outline',
            route: '/qibla',
        },
        {
            title: 'Digital Tasbih',
            subtitle: 'Count your remembrance',
            icon: 'radio-button-on-outline',
            route: '/tasbih',
        },
        {
            title: 'Sign Out',
            subtitle: 'Log out of your account',
            icon: 'log-out-outline',
            action: handleSignOut,
            danger: true,
        },
    ];

    const initials = displayName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Profile Header */}
                <LinearGradient
                    colors={[colors.primary, isDark ? '#2D5016' : '#2D6A4F']}
                    style={styles.profileHeader}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarText}>{initials}</Text>
                    </View>
                    <Text style={styles.profileName}>{displayName}</Text>
                    <Text style={styles.profileEmail}>{email}</Text>
                    {country ? (
                        <View style={styles.countryBadge}>
                            <Ionicons name="location-outline" size={14} color="#D4A853" />
                            <Text style={styles.countryText}>{country}</Text>
                        </View>
                    ) : null}
                </LinearGradient>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.title}
                            style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
                            onPress={() => {
                                if (item.action) item.action();
                                else if (item.route) router.push(item.route as any);
                            }}
                            activeOpacity={0.8}
                        >
                            <View style={[
                                styles.menuIcon,
                                { backgroundColor: item.danger ? colors.error + '22' : colors.primary + '22' },
                            ]}>
                                <Ionicons
                                    name={item.icon}
                                    size={22}
                                    color={item.danger ? colors.error : colors.primary}
                                />
                            </View>
                            <View style={styles.menuText}>
                                <Text style={[styles.menuTitle, { color: item.danger ? colors.error : colors.text }]}>
                                    {item.title}
                                </Text>
                                <Text style={[styles.menuSub, { color: colors.textSecondary }]}>{item.subtitle}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={[styles.version, { color: colors.textSecondary }]}>Noor Islam · v1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0 },
    content: { paddingBottom: 40 },
    profileHeader: {
        margin: 16,
        borderRadius: 20,
        padding: 28,
        alignItems: 'center',
    },
    avatarCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    avatarText: { fontSize: 28, color: '#D4A853', fontFamily: 'Amiri_700Bold', fontWeight: 'bold' },
    profileName: { fontSize: 22, color: '#fff', fontFamily: 'Amiri_700Bold', fontWeight: 'bold', marginBottom: 4 },
    profileEmail: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontFamily: 'Amiri_400Regular', marginBottom: 8 },
    countryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 4,
    },
    countryText: { color: '#D4A853', fontSize: 13, fontFamily: 'Amiri_400Regular' },
    menuContainer: { paddingHorizontal: 16, gap: 10 },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        gap: 14,
    },
    menuIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    menuText: { flex: 1 },
    menuTitle: { fontSize: 15, fontFamily: 'Amiri_700Bold', fontWeight: '600', marginBottom: 2 },
    menuSub: { fontSize: 12, fontFamily: 'Amiri_400Regular' },
    version: { textAlign: 'center', fontSize: 12, fontFamily: 'Amiri_400Regular', marginTop: 24 },
});
