import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

export default function TabLayout() {
    const { colors, isDark } = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.secondary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontFamily: 'Amiri_400Regular',
                    fontSize: 12,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="quran"
                options={{
                    title: 'Quran',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open-page-variant-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="prayer"
                options={{
                    title: 'Prayer',
                    tabBarIcon: ({ color }) => <Ionicons name="time-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="adhkar"
                options={{
                    title: 'Adhkar',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="hands-pray" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
