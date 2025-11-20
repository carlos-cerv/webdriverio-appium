/**
 * Android Configuration for WebDriverIO
 * This configuration extends the base config with Android-specific capabilities
 */

import type { Options } from '@wdio/types';
import { config as baseConfig } from './wdio.conf';

/**
 * Export Android test runner configuration
 * Merges base configuration with Android-specific settings
 */
export const config: Options.Testrunner = {
    ...baseConfig,
    
    // Android-specific capabilities for test execution
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Android Emulator',
        'appium:platformVersion': '13.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': './apps/android/app-debug.apk',
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 240,
        'appium:disableWindowAnimation': true,
        'appium:skipDeviceInitialization': false,
        'appium:skipServerInstallation': false
    }]
};
