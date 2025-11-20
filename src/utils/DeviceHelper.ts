/**
 * Device helper utilities
 */
export class DeviceHelper {
    /**
     * Check if platform is Android
     * @returns boolean
     */
    static isAndroid(): boolean {
        return driver.isAndroid;
    }

    /**
     * Check if platform is iOS
     * @returns boolean
     */
    static isIOS(): boolean {
        return driver.isIOS;
    }

    /**
     * Get device orientation
     * @returns device orientation
     */
    static async getOrientation(): Promise<string> {
        return await driver.getOrientation();
    }

    /**
     * Set device orientation
     * @param orientation - PORTRAIT or LANDSCAPE
     */
    static async setOrientation(orientation: 'PORTRAIT' | 'LANDSCAPE'): Promise<void> {
        await driver.setOrientation(orientation);
    }

    /**
     * Get device screen size
     * @returns screen size object
     */
    static async getScreenSize(): Promise<{ width: number; height: number }> {
        const { width, height } = await driver.getWindowRect();
        return { width, height };
    }

    /**
     * Check if keyboard is shown
     * @returns boolean
     */
    static async isKeyboardShown(): Promise<boolean> {
        return await driver.isKeyboardShown();
    }

    /**
     * Hide keyboard
     */
    static async hideKeyboard(): Promise<void> {
        try {
            if (await this.isKeyboardShown()) {
                await driver.hideKeyboard();
            }
        } catch (error) {
            console.log('Unable to hide keyboard:', error);
        }
    }

    /**
     * Get current app package (Android) or bundle ID (iOS)
     * @returns app identifier
     */
    static async getAppIdentifier(): Promise<string> {
        if (this.isAndroid()) {
            return await driver.getCurrentPackage();
        } else {
            // For iOS, you might need to implement custom logic
            return 'iOS Bundle ID';
        }
    }

    /**
     * Launch app
     */
    static async launchApp(): Promise<void> {
        await driver.launchApp();
    }

    /**
     * Close app
     */
    static async closeApp(): Promise<void> {
        await driver.closeApp();
    }

    /**
     * Reset app
     */
    static async resetApp(): Promise<void> {
        await driver.closeApp();
        await driver.launchApp();
    }

    /**
     * Terminate app
     * @param bundleId - bundle ID or package name
     */
    static async terminateApp(bundleId: string): Promise<void> {
        await driver.terminateApp(bundleId, {});
    }

    /**
     * Activate app
     * @param bundleId - bundle ID or package name
     */
    static async activateApp(bundleId: string): Promise<void> {
        await driver.activateApp(bundleId);
    }

    /**
     * Check if app is installed
     * @param bundleId - bundle ID or package name
     * @returns boolean
     */
    static async isAppInstalled(bundleId: string): Promise<boolean> {
        return await driver.isAppInstalled(bundleId);
    }

    /**
     * Install app
     * @param appPath - path to app file
     */
    static async installApp(appPath: string): Promise<void> {
        await driver.installApp(appPath);
    }

    /**
     * Remove app
     * @param bundleId - bundle ID or package name
     */
    static async removeApp(bundleId: string): Promise<void> {
        await driver.removeApp(bundleId);
    }

    /**
     * Background app
     * @param seconds - number of seconds to background app
     */
    static async backgroundApp(seconds: number): Promise<void> {
        await driver.background(seconds);
    }

    /**
     * Get device time
     * @returns device time string
     */
    static async getDeviceTime(): Promise<string> {
        return await driver.getDeviceTime();
    }

    /**
     * Lock device
     */
    static async lockDevice(): Promise<void> {
        await driver.lock();
    }

    /**
     * Unlock device
     */
    static async unlockDevice(): Promise<void> {
        await driver.unlock();
    }

    /**
     * Check if device is locked
     * @returns boolean
     */
    static async isDeviceLocked(): Promise<boolean> {
        return await driver.isLocked();
    }

    /**
     * Take screenshot
     * @param filename - screenshot filename
     */
    static async takeScreenshot(filename: string): Promise<void> {
        await browser.saveScreenshot(`./screenshots/${filename}.png`);
    }
}
