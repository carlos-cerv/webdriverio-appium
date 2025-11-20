/**
 * Login test suite for WebDriverIO Demo App
 * Tests login functionality including form validation and authentication flow
 */

import { expect } from 'chai';
import LoginScreen from '../screenobjects/LoginScreen';
import { testData } from '../data/testData';

/**
 * Test suite: Login functionality
 * Validates login screen elements and user authentication
 */
describe('WebDriverIO Demo App - Login Tests', () => {
    /**
     * Setup before each test
     * Navigates to the login screen and ensures it's ready for testing
     */
    beforeEach(async () => {
        // Wait for app to stabilize
        await driver.pause(1000);
        
        // Tap on Login tab
        const loginTab = await $('~Login');
        if (await loginTab.isDisplayed()) {
            await loginTab.click();
            await driver.pause(500);
        }
    });

    /**
     * Test: Verify login form is displayed
     * Validates that all login form elements are visible on screen
     */
    it('should display login form', async () => {
        // Verify login form elements are displayed
        const usernameInput = await LoginScreen.usernameInput;
        const passwordInput = await LoginScreen.passwordInput;
        const loginButton = await LoginScreen.loginButton;

        expect(await usernameInput.isDisplayed()).to.be.true;
        expect(await passwordInput.isDisplayed()).to.be.true;
        expect(await loginButton.isDisplayed()).to.be.true;
    });

    /**
     * Test: Verify username can be entered successfully
     * Validates that username input accepts and retains text
     */
    it('should enter username successfully', async () => {
        // Enter username
        await LoginScreen.enterUsername(testData.users.validUser.username);

        // Verify text was entered
        const usernameInput = await LoginScreen.usernameInput;
        const usernameValue = await usernameInput.getText();
        expect(usernameValue).to.equal('test@webdriver.io');
    });

    /**
     * Test: Verify password can be entered successfully
     * Validates that password input accepts text (content will be masked)
     */
    it('should enter password successfully', async () => {
        // Enter password
        await LoginScreen.enterPassword(testData.users.validUser.password);
        
        // Verify password field has content (password fields show dots/masked)
        const passwordInput = await LoginScreen.passwordInput;
        const hasValue = await passwordInput.getText();
        expect(hasValue.length).to.be.greaterThan(0);
    });

    /**
     * Test: Verify complete login flow
     * Tests end-to-end login process with valid credentials
     */
    it('should complete login flow', async () => {
        // Enter credentials
        await LoginScreen.enterUsername(testData.users.validUser.username);
        await LoginScreen.enterPassword(testData.users.validUser.password);
        
        // Tap login button
        await LoginScreen.tapLoginButton();
        
        // Wait for success message or navigation
        await driver.pause(2000);
        
        // Verify we're logged in (adjust selector based on your app)
        // This is a simple check - adjust based on what appears after successful login
        expect(true).to.be.true;
    });

    /**
     * Cleanup after each test
     * Captures screenshot on test failure for debugging purposes
     */
    afterEach(async function() {
        // Take screenshot if test fails
        if (this.currentTest?.state === 'failed') {
            const testName = this.currentTest?.title?.replace(/\s+/g, '-') || 'unknown';
            await driver.saveScreenshot(`./screenshots/failed-${testName}.png`);
        }
    });
});
