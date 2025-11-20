/**
 * Base Screen class for all mobile screens
 * Contains common methods that can be used across all screens
 */
export default class BaseScreen {
    /**
     * Wait for element to be displayed
     * @param element - WebdriverIO element
     * @param timeout - timeout in milliseconds
     */
    async waitForDisplayed(element: WebdriverIO.Element, timeout = 10000): Promise<void> {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Wait for element to be clickable
     * @param element - WebdriverIO element
     * @param timeout - timeout in milliseconds
     */
    async waitForClickable(element: WebdriverIO.Element, timeout = 10000): Promise<void> {
        await element.waitForClickable({ timeout });
    }

    /**
     * Tap on element
     * @param element - WebdriverIO element
     */
    async tap(element: WebdriverIO.Element): Promise<void> {
        await this.waitForDisplayed(element);
        await element.click();
    }

    /**
     * Type text into element
     * @param element - WebdriverIO element
     * @param text - text to type
     */
    async typeText(element: WebdriverIO.Element, text: string): Promise<void> {
        await this.waitForDisplayed(element);
        await element.setValue(text);
    }

    /**
     * Get text from element
     * @param element - WebdriverIO element
     * @returns text content
     */
    async getText(element: WebdriverIO.Element): Promise<string> {
        await this.waitForDisplayed(element);
        return await element.getText();
    }

    /**
     * Check if element is displayed
     * @param element - WebdriverIO element
     * @returns boolean
     */
    async isDisplayed(element: WebdriverIO.Element): Promise<boolean> {
        try {
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Scroll to element
     * @param element - WebdriverIO element
     */
    async scrollToElement(element: WebdriverIO.Element): Promise<void> {
        await element.scrollIntoView();
    }

    /**
     * Hide keyboard (mobile specific)
     */
    async hideKeyboard(): Promise<void> {
        try {
            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }
        } catch (error) {
            console.log('Keyboard not shown or unable to hide');
        }
    }

    /**
     * Swipe from one coordinate to another
     * @param startX - start X coordinate
     * @param startY - start Y coordinate
     * @param endX - end X coordinate
     * @param endY - end Y coordinate
     */
    async swipe(startX: number, startY: number, endX: number, endY: number): Promise<void> {
        await driver.touchPerform([
            { action: 'press', options: { x: startX, y: startY } },
            { action: 'wait', options: { ms: 500 } },
            { action: 'moveTo', options: { x: endX, y: endY } },
            { action: 'release' }
        ]);
    }

    /**
     * Swipe up on screen
     */
    async swipeUp(): Promise<void> {
        const { height, width } = await driver.getWindowRect();
        await this.swipe(
            width / 2,
            height * 0.8,
            width / 2,
            height * 0.2
        );
    }

    /**
     * Swipe down on screen
     */
    async swipeDown(): Promise<void> {
        const { height, width } = await driver.getWindowRect();
        await this.swipe(
            width / 2,
            height * 0.2,
            width / 2,
            height * 0.8
        );
    }

    /**
     * Take screenshot
     * @param filename - screenshot filename
     */
    async takeScreenshot(filename: string): Promise<void> {
        await browser.saveScreenshot(`./screenshots/${filename}.png`);
    }

    /**
     * Wait for a specific time
     * @param ms - milliseconds to wait
     */
    async wait(ms: number): Promise<void> {
        await browser.pause(ms);
    }
}
