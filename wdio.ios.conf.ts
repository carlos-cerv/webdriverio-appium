# iOS Configuration for WebDriverIO

import type { Options } from '@wdio/types';
import { config as baseConfig } from './wdio.conf';

export const config: Options.Testrunner = {
    ...baseConfig,
    
    // iOS-specific capabilities
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 15 Pro', // Available: iPhone 15, iPhone 15 Pro, iPhone 15 Pro Max, iPhone SE (3rd gen)
        'appium:platformVersion': '17.0', // Update to match your Xcode/Simulator version
        'appium:automationName': 'XCUITest',
        'appium:app': process.cwd() + '/apps/ios/YourApp.app', // Update with your .app or .ipa file
        // Alternative: Use bundleId if app is already installed
        // 'appium:bundleId': 'com.yourcompany.yourapp',
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
