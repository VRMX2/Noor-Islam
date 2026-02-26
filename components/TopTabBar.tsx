import React from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    Platform, StatusBar, Animated,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_ICONS: Record<string, { lib: 'ion' | 'mci'; active: string; inactive: string }> = {
    index: { lib: 'ion', active: 'home', inactive: 'home-outline' },
    quran: { lib: 'mci', active: 'book-open-page-variant', inactive: 'book-open-page-variant-outline' },
    prayer: { lib: 'ion', active: 'time', inactive: 'time-outline' },
    adhkar: { lib: 'mci', active: 'hands-pray', inactive: 'hands-pray' },
    profile: { lib: 'ion', active: 'person', inactive: 'person-outline' },
};

const TAB_LABELS: Record<string, string> = {
    index: 'Home',
    quran: 'Quran',
    prayer: 'Prayer',
    adhkar: 'Adhkar',
    profile: 'Profile',
};

export default function TopTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { colors, isDark } = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isDark
                        ? 'rgba(22,27,34,0.97)'
                        : 'rgba(255,255,255,0.97)',
                    borderBottomColor: colors.border,
                    paddingTop: insets.top + 4,
                },
            ]}
        >
            <View style={styles.tabRow}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;
                    const iconConfig = TAB_ICONS[route.name];

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const iconColor = isFocused ? colors.secondary : colors.textSecondary;

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={styles.tab}
                            activeOpacity={0.75}
                        >
                            {/* Icon */}
                            {iconConfig?.lib === 'mci' ? (
                                <MaterialCommunityIcons
                                    name={(isFocused ? iconConfig.active : iconConfig.inactive) as any}
                                    size={24}
                                    color={iconColor}
                                />
                            ) : (
                                <Ionicons
                                    name={(isFocused ? iconConfig?.active : iconConfig?.inactive) as any}
                                    size={24}
                                    color={iconColor}
                                />
                            )}

                            {/* Label */}
                            <Text
                                style={[
                                    styles.label,
                                    {
                                        color: iconColor,
                                        fontWeight: isFocused ? '700' : '400',
                                    },
                                ]}
                            >
                                {TAB_LABELS[route.name]}
                            </Text>

                            {/* Active indicator */}
                            {isFocused && (
                                <View style={[styles.indicator, { backgroundColor: colors.secondary }]} />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 4,
        zIndex: 100,
    },
    tabRow: {
        flexDirection: 'row',
        paddingBottom: 6,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        gap: 3,
        position: 'relative',
    },
    label: {
        fontSize: 10,
        letterSpacing: 0.3,
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    },
    indicator: {
        position: 'absolute',
        bottom: 0,
        height: 2.5,
        width: '60%',
        borderRadius: 2,
    },
});
