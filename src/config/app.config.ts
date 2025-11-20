export interface AppConfig {
    android: {
        appPackage: string;
        appActivity: string;
        appPath: string;
    };
    ios: {
        bundleId: string;
        appPath: string;
    };
}

export const appConfig: AppConfig = {
    android: {
        appPackage: 'com.wdiodemoapp',
        appActivity: 'com.wdiodemoapp.MainActivity',
        appPath: '/Users/carlos.eduardo/webDriveriO/apps/android/app-debug.apk'
    },
    ios: {
        bundleId: 'com.yourcompany.yourapp', // Update with your app's bundle ID
        appPath: process.cwd() + '/apps/ios/YourApp.app' // Update with your .app file path
    }
};
