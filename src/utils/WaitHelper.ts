/**
 * Wait helper utilities
 */
export class WaitHelper {
    /**
     * Wait for element to exist
     * @param element - WebdriverIO element
     * @param timeout - timeout in milliseconds
     */
    static async waitForExist(element: WebdriverIO.Element, timeout = 10000): Promise<void> {
        await element.waitForExist({ timeout });
    }

    /**
     * Wait for element to be displayed
     * @param element - WebdriverIO element
     * @param timeout - timeout in milliseconds
     */
    static async waitForDisplayed(element: WebdriverIO.Element, timeout = 10000): Promise<void> {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Wait for element to be enabled
     * @param element - WebdriverIO element
     * @param timeout - timeout in milliseconds
     */
    static async waitForEnabled(element: WebdriverIO.Element, timeout = 10000): Promise<void> {
        await element.waitForEnabled({ timeout });
    }

    /**
     * Wait for element to be clickable
     * @param element - WebdriverIO element
     * @param timeout - timeout in milliseconds
     */
    static async waitForClickable(element: WebdriverIO.Element, timeout = 10000): Promise<void> {
        await element.waitForClickable({ timeout });
    }

    /**
     * Wait for element to disappear
     * @param element - WebdriverIO element
     * @param timeout - timeout in milliseconds
     */
    static async waitForDisappear(element: WebdriverIO.Element, timeout = 10000): Promise<void> {
        await element.waitForDisplayed({ timeout, reverse: true });
    }

    /**
     * Wait for condition to be true
     * @param condition - condition function
     * @param timeout - timeout in milliseconds
     * @param errorMessage - error message to display if condition is not met
     */
    static async waitUntil(
        condition: () => Promise<boolean>,
        timeout = 10000,
        errorMessage = 'Condition not met within timeout'
    ): Promise<void> {
        await browser.waitUntil(condition, {
            timeout,
            timeoutMsg: errorMessage
        });
    }
}
