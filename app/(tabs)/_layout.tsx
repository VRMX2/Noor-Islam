import { Tabs } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import TopTabBar from '../../components/TopTabBar';

export default function TabLayout() {
    const { colors } = useTheme();

    return (
        <Tabs
            tabBar={(props) => <TopTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                // No bottom tab bar styles needed — replaced by TopTabBar
            }}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="quran" />
            <Tabs.Screen name="prayer" />
            <Tabs.Screen name="adhkar" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}
