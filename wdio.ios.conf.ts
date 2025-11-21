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
        'appium:deviceName': 'iPhone 15 Pro', // Available: iPhone 15, iPhone 15 Pro, iPhone 15 Pro Max, iPhone SE (3rd gen)
        'appium:platformVersion': '18.4', // Update to match your Xcode/Simulator version (GitHub Actions has 18.4+)
        'appium:automationName': 'XCUITest',
        // iOS app configuration
        // OPTION 1: Download actual iOS demo app
        // 1. Go to: https://github.com/webdriverio/native-demo-app/releases/latest
        // 2. Download: iOS-Simulator-NativeDemoApp-x.x.x.app.zip
        // 3. Extract to apps/ios/ folder
        // 4. Uncomment line below and update with actual app name:
        // 'appium:app': process.cwd() + '/apps/ios/iOS-Simulator-NativeDemoApp-0.4.0.app',
        
        // OPTION 2: Use bundleId (requires app pre-installed on simulator)
        // This is the current active configuration
        'appium:bundleId': 'com.wdiodemoapp',
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
        // udid removed - Appium will auto-detect the booted simulator
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
