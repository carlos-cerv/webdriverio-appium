# Android Configuration for WebDriverIO

import type { Options } from '@wdio/types';
import { config as baseConfig } from './wdio.conf';

export const config: Options.Testrunner = {
    ...baseConfig,
    
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
