import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function requestPermissionsAsync() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        return false;
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('prayer', {
            name: 'Prayer Times',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#1B4332',
            sound: 'adhan.wav', // We will need to bundle adhan.wav in android/app/src/main/res/raw or use default
        });
    }

    return true;
}

export async function schedulePrayerNotification(
    prayerName: string,
    timeToPrayerTimeInMs: number, // Time relative to now when the prayer starts
    soundName?: string
) {
    const hasPermission = await requestPermissionsAsync();
    if (!hasPermission) return;

    const trigger = new Date(Date.now() + timeToPrayerTimeInMs);

    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Prayer Time',
            body: `It is time for ${prayerName} prayer.`,
            sound: soundName || true,
        },
        trigger: { date: trigger } as Notifications.DateTriggerInput,
    });
}

export async function cancelAllScheduledNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}
