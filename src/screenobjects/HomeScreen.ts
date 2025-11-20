import AndroidScreen from './AndroidScreen';
import IOSScreen from './IOSScreen';

/**
 * Home Screen Page Object
 * Handles both Android and iOS home screens
 */
class HomeScreen {
    private androidScreen: AndroidScreen;
    private iosScreen: IOSScreen;

    constructor() {
        this.androidScreen = new AndroidScreen();
        this.iosScreen = new IOSScreen();
    }

    /**
     * Get platform-specific screen instance
     */
    private get screen() {
        return driver.isAndroid ? this.androidScreen : this.iosScreen;
    }

    /**
     * Android selectors
     */
    private get androidSelectors() {
        return {
            welcomeMessage: '//android.widget.TextView[@resource-id="welcome-message"]',
            logoutButton: '//android.widget.Button[@text="Logout"]',
            profileButton: '//android.widget.Button[@resource-id="profile-button"]',
            settingsButton: '//android.widget.Button[@resource-id="settings-button"]'
        };
    }

    /**
     * iOS selectors
     */
    private get iosSelectors() {
        return {
            welcomeMessage: '~welcome-message',
            logoutButton: '~logout-button',
            profileButton: '~profile-button',
            settingsButton: '~settings-button'
        };
    }

    /**
     * Get current platform selectors
     */
    private get selectors() {
        return driver.isAndroid ? this.androidSelectors : this.iosSelectors;
    }

    /**
     * Get welcome message element
     */
    get welcomeMessage(): Promise<WebdriverIO.Element> {
        return $(this.selectors.welcomeMessage);
    }

    /**
     * Get logout button element
     */
    get logoutButton(): Promise<WebdriverIO.Element> {
        return $(this.selectors.logoutButton);
    }

    /**
     * Get profile button element
     */
    get profileButton(): Promise<WebdriverIO.Element> {
        return $(this.selectors.profileButton);
    }

    /**
     * Get settings button element
     */
    get settingsButton(): Promise<WebdriverIO.Element> {
        return $(this.selectors.settingsButton);
    }

    /**
     * Get welcome message text
     * @returns welcome message text
     */
    async getWelcomeMessageText(): Promise<string> {
        return await this.screen.getText(await this.welcomeMessage);
    }

    /**
     * Tap logout button
     */
    async tapLogoutButton(): Promise<void> {
        await this.screen.tap(await this.logoutButton);
    }

    /**
     * Tap profile button
     */
    async tapProfileButton(): Promise<void> {
        await this.screen.tap(await this.profileButton);
    }

    /**
     * Tap settings button
     */
    async tapSettingsButton(): Promise<void> {
        await this.screen.tap(await this.settingsButton);
    }

    /**
     * Check if home screen is displayed
     * @returns boolean
     */
    async isDisplayed(): Promise<boolean> {
        return await this.screen.isDisplayed(await this.welcomeMessage);
    }

    /**
     * Wait for home screen to be loaded
     */
    async waitForScreenLoad(): Promise<void> {
        await this.screen.waitForDisplayed(await this.welcomeMessage, 15000);
    }
}

export default new HomeScreen();
