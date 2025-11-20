import AndroidScreen from './AndroidScreen';
import IOSScreen from './IOSScreen';

/**
 * Login Screen Page Object
 * Handles both Android and iOS login screens
 */
class LoginScreen {
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
            usernameInput: '~input-email',
            passwordInput: '~input-password',
            loginButton: '~button-LOGIN',
            errorMessage: '~generic-error-message'
        };
    }

    /**
     * iOS selectors
     */
    private get iosSelectors() {
        return {
            usernameInput: '~input-email',
            passwordInput: '~input-password',
            loginButton: '~button-LOGIN',
            errorMessage: '~generic-error-message'
        };
    }

    /**
     * Get current platform selectors
     */
    private get selectors() {
        return driver.isAndroid ? this.androidSelectors : this.iosSelectors;
    }

    /**
     * Get username input element
     */
    get usernameInput(): Promise<WebdriverIO.Element> {
        return $(this.selectors.usernameInput);
    }

    /**
     * Get password input element
     */
    get passwordInput(): Promise<WebdriverIO.Element> {
        return $(this.selectors.passwordInput);
    }

    /**
     * Get login button element
     */
    get loginButton(): Promise<WebdriverIO.Element> {
        return $(this.selectors.loginButton);
    }

    /**
     * Get error message element
     */
    get errorMessage(): Promise<WebdriverIO.Element> {
        return $(this.selectors.errorMessage);
    }

    /**
     * Enter username
     * @param username - username to enter
     */
    async enterUsername(username: string): Promise<void> {
        await this.screen.typeText(await this.usernameInput, username);
    }

    /**
     * Enter password
     * @param password - password to enter
     */
    async enterPassword(password: string): Promise<void> {
        await this.screen.typeText(await this.passwordInput, password);
    }

    /**
     * Tap login button
     */
    async tapLoginButton(): Promise<void> {
        await this.screen.tap(await this.loginButton);
    }

    /**
     * Perform login
     * @param username - username
     * @param password - password
     */
    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.screen.hideKeyboard();
        await this.tapLoginButton();
    }

    /**
     * Get error message text
     * @returns error message text
     */
    async getErrorMessageText(): Promise<string> {
        return await this.screen.getText(await this.errorMessage);
    }

    /**
     * Check if error message is displayed
     * @returns boolean
     */
    async isErrorMessageDisplayed(): Promise<boolean> {
        return await this.screen.isDisplayed(await this.errorMessage);
    }

    /**
     * Wait for login screen to be loaded
     */
    async waitForScreenLoad(): Promise<void> {
        await this.screen.waitForDisplayed(await this.usernameInput, 15000);
        await this.screen.waitForDisplayed(await this.passwordInput, 15000);
        await this.screen.waitForDisplayed(await this.loginButton, 15000);
    }
}

export default new LoginScreen();
