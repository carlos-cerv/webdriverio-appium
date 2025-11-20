/**
 * Gesture helper utilities
 */
export class GestureHelper {
    /**
     * Swipe from one coordinate to another
     * @param startX - start X coordinate
     * @param startY - start Y coordinate
     * @param endX - end X coordinate
     * @param endY - end Y coordinate
     * @param duration - duration in milliseconds
     */
    static async swipe(
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        duration = 500
    ): Promise<void> {
        await driver.touchPerform([
            { action: 'press', options: { x: startX, y: startY } },
            { action: 'wait', options: { ms: duration } },
            { action: 'moveTo', options: { x: endX, y: endY } },
            { action: 'release' }
        ]);
    }

    /**
     * Swipe up on screen
     * @param percentage - percentage of screen to swipe (0-1)
     */
    static async swipeUp(percentage = 0.6): Promise<void> {
        const { height, width } = await driver.getWindowRect();
        const startY = height * (1 - percentage / 2);
        const endY = height * (percentage / 2);
        await this.swipe(width / 2, startY, width / 2, endY);
    }

    /**
     * Swipe down on screen
     * @param percentage - percentage of screen to swipe (0-1)
     */
    static async swipeDown(percentage = 0.6): Promise<void> {
        const { height, width } = await driver.getWindowRect();
        const startY = height * (percentage / 2);
        const endY = height * (1 - percentage / 2);
        await this.swipe(width / 2, startY, width / 2, endY);
    }

    /**
     * Swipe left on screen
     * @param percentage - percentage of screen to swipe (0-1)
     */
    static async swipeLeft(percentage = 0.6): Promise<void> {
        const { height, width } = await driver.getWindowRect();
        const startX = width * (1 - percentage / 2);
        const endX = width * (percentage / 2);
        await this.swipe(startX, height / 2, endX, height / 2);
    }

    /**
     * Swipe right on screen
     * @param percentage - percentage of screen to swipe (0-1)
     */
    static async swipeRight(percentage = 0.6): Promise<void> {
        const { height, width } = await driver.getWindowRect();
        const startX = width * (percentage / 2);
        const endX = width * (1 - percentage / 2);
        await this.swipe(startX, height / 2, endX, height / 2);
    }

    /**
     * Swipe on element
     * @param element - element to swipe on
     * @param direction - direction to swipe (up, down, left, right)
     */
    static async swipeOnElement(
        element: WebdriverIO.Element,
        direction: 'up' | 'down' | 'left' | 'right'
    ): Promise<void> {
        const location = await element.getLocation();
        const size = await element.getSize();
        
        const centerX = location.x + size.width / 2;
        const centerY = location.y + size.height / 2;
        
        const offset = Math.min(size.width, size.height) * 0.4;

        switch (direction) {
            case 'up':
                await this.swipe(centerX, centerY + offset, centerX, centerY - offset);
                break;
            case 'down':
                await this.swipe(centerX, centerY - offset, centerX, centerY + offset);
                break;
            case 'left':
                await this.swipe(centerX + offset, centerY, centerX - offset, centerY);
                break;
            case 'right':
                await this.swipe(centerX - offset, centerY, centerX + offset, centerY);
                break;
        }
    }

    /**
     * Long press on element
     * @param element - element to long press
     * @param duration - duration in milliseconds
     */
    static async longPress(element: WebdriverIO.Element, duration = 1000): Promise<void> {
        const location = await element.getLocation();
        const size = await element.getSize();
        const x = location.x + size.width / 2;
        const y = location.y + size.height / 2;

        await driver.touchPerform([
            { action: 'press', options: { x, y } },
            { action: 'wait', options: { ms: duration } },
            { action: 'release' }
        ]);
    }

    /**
     * Tap on coordinates
     * @param x - X coordinate
     * @param y - Y coordinate
     */
    static async tapOnCoordinates(x: number, y: number): Promise<void> {
        await driver.touchPerform([
            { action: 'tap', options: { x, y } }
        ]);
    }

    /**
     * Double tap on element
     * @param element - element to double tap
     */
    static async doubleTap(element: WebdriverIO.Element): Promise<void> {
        await element.click();
        await browser.pause(100);
        await element.click();
    }

    /**
     * Scroll to element until visible
     * @param element - element to scroll to
     * @param maxScrolls - maximum number of scrolls
     */
    static async scrollToElement(element: WebdriverIO.Element, maxScrolls = 10): Promise<void> {
        let scrolls = 0;
        while (!(await element.isDisplayed()) && scrolls < maxScrolls) {
            await this.swipeUp();
            scrolls++;
        }
    }
}
