import BaseScreen from './BaseScreen';

/**
 * Android specific screen class
 * Contains methods specific to Android platform
 */
export default class AndroidScreen extends BaseScreen {
    /**
     * Get element using Android UiAutomator selector
     * @param selector - UiAutomator selector string
     * @returns WebdriverIO element
     */
    async getElementByUiAutomator(selector: string): Promise<WebdriverIO.Element> {
        return await $(`android=${selector}`);
    }

    /**
     * Get element by resource ID
     * @param resourceId - Android resource ID
     * @returns WebdriverIO element
     */
    async getElementByResourceId(resourceId: string): Promise<WebdriverIO.Element> {
        return await $(`android=new UiSelector().resourceId("${resourceId}")`);
    }

    /**
     * Get element by text
     * @param text - text to search for
     * @returns WebdriverIO element
     */
    async getElementByText(text: string): Promise<WebdriverIO.Element> {
        return await $(`android=new UiSelector().text("${text}")`);
    }

    /**
     * Get element by content description
     * @param contentDesc - content description
     * @returns WebdriverIO element
     */
    async getElementByContentDesc(contentDesc: string): Promise<WebdriverIO.Element> {
        return await $(`android=new UiSelector().description("${contentDesc}")`);
    }

    /**
     * Press Android back button
     */
    async pressBack(): Promise<void> {
        await driver.back();
    }

    /**
     * Press Android home button
     */
    async pressHome(): Promise<void> {
        await driver.pressKeyCode(3);
    }

    /**
     * Open Android notifications
     */
    async openNotifications(): Promise<void> {
        await driver.openNotifications();
    }

    /**
     * Get current activity
     * @returns current activity name
     */
    async getCurrentActivity(): Promise<string> {
        return await driver.getCurrentActivity();
    }

    /**
     * Get current package
     * @returns current package name
     */
    async getCurrentPackage(): Promise<string> {
        return await driver.getCurrentPackage();
    }

    /**
     * Start an activity
     * @param appPackage - app package name
     * @param appActivity - activity name
     */
    async startActivity(appPackage: string, appActivity: string): Promise<void> {
        await driver.startActivity(appPackage, appActivity);
    }
}
