/**
 * iOS Configuration for WebDriverIO
 * This configuration extends the base config with iOS-specific capabilities
 */

import type { Options } from '@wdio/types';
import { config as baseConfig } from './wdio.conf';

/**
 * Export iOS test runner configuration
 * Merges base configuration with iOS-specific settings
 */
export const config: Options.Testrunner = {
    ...baseConfig,
    
    // iOS-specific capabilities for test execution
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 16 Pro', // Available: iPhone 15, iPhone 15 Pro, iPhone 15 Pro Max, iPhone SE (3rd gen)
        'appium:platformVersion': '18.5', // Update to match your Xcode/Simulator version
        'appium:automationName': 'XCUITest',
        // iOS app path - Update with your actual .app or .ipa file
        // Note: Currently no valid iOS app in apps/ios folder
        // For WebDriverIO demo app, download from: https://github.com/webdriverio/native-demo-app/releases
        // Extract the .app.zip file and place the .app bundle here
        'appium:app': process.cwd() + '/apps/ios/iOS-Simulator-NativeDemoApp.app',
        // Alternative: Use bundleId if app is already installed on simulator
        // 'appium:bundleId': 'com.wdiodemoapp',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 240,
        'appium:autoAcceptAlerts': true,
        'appium:autoDismissAlerts': false,
        // Additional iOS-specific capabilities
        'appium:useNewWDA': false, // Set to true if having WDA issues
        'appium:wdaLaunchTimeout': 120000,
        'appium:wdaConnectionTimeout': 120000,
        'appium:showXcodeLog': true, // Helpful for debugging
        'appium:udid': 'auto', // Auto-detect simulator, or specify specific UDID
    }],
    
    // iOS-specific service options
    services: [
        ['appium', {
            args: {
                relaxedSecurity: true,
                log: './appium.log'
            },
            logPath: './'
        }]
    ]
};
