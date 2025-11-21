/**
 * Application configuration interface
 * Defines the structure for platform-specific app settings
 */
export interface AppConfig {
    /** Android application configuration */
    android: {
        /** Android app package name */
        appPackage: string;
        /** Android app main activity */
        appActivity: string;
        /** Path to Android APK file */
        appPath: string;
    };
    /** iOS application configuration */
    ios: {
        /** iOS app bundle identifier */
        bundleId: string;
        /** Path to iOS .app file */
        appPath: string;
    };
}

/**
 * Application configuration object
 * Contains platform-specific app identifiers and paths
 */
export const appConfig: AppConfig = {
    android: {
        appPackage: 'com.wdiodemoapp',
        appActivity: 'com.wdiodemoapp.MainActivity',
        appPath: '/Users/carlos.eduardo/webDriveriO/apps/android/app-debug.apk'
    },
    ios: {
        bundleId: 'com.yourcompany.yourapp', // Update with your app's bundle ID
        appPath: process.cwd() + '/apps/ios/wdiodemoapp.app' // Update with your .app file path
    }
};
