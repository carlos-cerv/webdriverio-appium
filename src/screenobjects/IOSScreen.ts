import BaseScreen from './BaseScreen';

/**
 * iOS specific screen class
 * Contains methods specific to iOS platform
 */
export default class IOSScreen extends BaseScreen {
    /**
     * Get element using iOS predicate string
     * @param predicate - iOS predicate string
     * @returns WebdriverIO element
     */
    async getElementByPredicate(predicate: string): Promise<WebdriverIO.Element> {
        return await $(`-ios predicate string:${predicate}`);
    }

    /**
     * Get element using iOS class chain
     * @param classChain - iOS class chain string
     * @returns WebdriverIO element
     */
    async getElementByClassChain(classChain: string): Promise<WebdriverIO.Element> {
        return await $(`-ios class chain:${classChain}`);
    }

    /**
     * Get element by accessibility ID
     * @param accessibilityId - accessibility identifier
     * @returns WebdriverIO element
     */
    async getElementByAccessibilityId(accessibilityId: string): Promise<WebdriverIO.Element> {
        return await $(`~${accessibilityId}`);
    }

    /**
     * Get element by label
     * @param label - element label
     * @returns WebdriverIO element
     */
    async getElementByLabel(label: string): Promise<WebdriverIO.Element> {
        return await this.getElementByPredicate(`label == "${label}"`);
    }

    /**
     * Shake device
     */
    async shakeDevice(): Promise<void> {
        await driver.shake();
    }

    /**
     * Lock device
     */
    async lockDevice(): Promise<void> {
        await driver.lock();
    }

    /**
     * Unlock device
     */
    async unlockDevice(): Promise<void> {
        await driver.unlock();
    }

    /**
     * Check if device is locked
     * @returns boolean indicating if device is locked
     */
    async isDeviceLocked(): Promise<boolean> {
        return await driver.isLocked();
    }

    /**
     * Perform touch ID
     * @param match - whether touch ID should match
     */
    async touchId(match: boolean): Promise<void> {
        await driver.touchId(match);
    }

    /**
     * Get clipboard text
     * @returns clipboard content
     */
    async getClipboard(): Promise<string> {
        return await driver.getClipboard();
    }

    /**
     * Set clipboard text
     * @param text - text to set in clipboard
     */
    async setClipboard(text: string): Promise<void> {
        await driver.setClipboard(text);
    }
}
