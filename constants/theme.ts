import { Platform } from 'react-native';

export const Colors = {
    light: {
        primary: '#1B4332',
        secondary: '#D4A853',
        background: '#FFF8E7',
        surface: '#FFFFFF',
        text: '#0D1117',
        textSecondary: '#4A5568',
        border: '#E2E8F0',
        error: '#E53E3E',
        success: '#38A169',
    },
    dark: {
        primary: '#C8A96E',
        secondary: '#1B4332',
        background: '#0D1117',
        surface: '#161B22',
        text: '#E2E8F0',
        textSecondary: '#A0AEC0',
        border: '#2D3748',
        error: '#FC8181',
        success: '#68D391',
    },
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const Fonts = {
    regular: 'Amiri_400Regular',
    bold: 'Amiri_700Bold',
    italic: 'Amiri_400Regular_Italic',
    arabic: 'Amiri_400Regular',
};

// iOS-style system fonts for UI prose — SF Pro on iOS, Roboto on Android
export const Typography = {
    /** Large display titles (screen headings) */
    displayTitle: {
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
        fontSize: 28,
        fontWeight: '700' as const,
        letterSpacing: -0.5,
    },
    /** Section titles */
    title: {
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
        fontSize: 20,
        fontWeight: '600' as const,
        letterSpacing: -0.3,
    },
    /** Body text */
    body: {
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
        fontSize: 16,
        fontWeight: '400' as const,
        letterSpacing: 0,
    },
    /** Subheadings / card titles */
    subheading: {
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
        fontSize: 15,
        fontWeight: '600' as const,
        letterSpacing: -0.1,
    },
    /** Small captions */
    caption: {
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
        fontSize: 12,
        fontWeight: '400' as const,
        letterSpacing: 0.1,
    },
    /** Buttons */
    button: {
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
        fontSize: 16,
        fontWeight: '600' as const,
        letterSpacing: 0,
    },
    /** Arabic content still uses Amiri */
    arabic: {
        fontFamily: 'Amiri_400Regular',
        fontSize: 20,
    },
    arabicBold: {
        fontFamily: 'Amiri_700Bold',
        fontSize: 20,
    },
};
