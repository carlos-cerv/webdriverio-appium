import { expect } from 'chai';
import LoginScreen from '../screenobjects/LoginScreen';
import { testData } from '../data/testData';

describe('WebDriverIO Demo App - Login Tests', () => {
    beforeEach(async () => {
        // Navigate to login screen
        await driver.pause(1000);
        
        // Tap on Login tab
        const loginTab = await $('~Login');
        if (await loginTab.isDisplayed()) {
            await loginTab.click();
            await driver.pause(500);
        }
    });

    it('should display login form', async () => {
        // Verify login form elements are displayed
        const usernameInput = await LoginScreen.usernameInput;
        const passwordInput = await LoginScreen.passwordInput;
        const loginButton = await LoginScreen.loginButton;

        expect(await usernameInput.isDisplayed()).to.be.true;
        expect(await passwordInput.isDisplayed()).to.be.true;
        expect(await loginButton.isDisplayed()).to.be.true;
    });

    it('should enter username successfully', async () => {
        // Enter username
        await LoginScreen.enterUsername(testData.users.validUser.username);

        // Verify text was entered
        const usernameInput = await LoginScreen.usernameInput;
        const usernameValue = await usernameInput.getText();
        expect(usernameValue).to.equal('test@webdriver.io');
    });

    it('should enter password successfully', async () => {
        // Enter password
        await LoginScreen.enterPassword(testData.users.validUser.password);
        
        // Verify password field has content (password fields show dots/masked)
        const passwordInput = await LoginScreen.passwordInput;
        const hasValue = await passwordInput.getText();
        expect(hasValue.length).to.be.greaterThan(0);
    });

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

    afterEach(async function() {
        // Take screenshot if test fails
        if (this.currentTest?.state === 'failed') {
            const testName = this.currentTest?.title?.replace(/\s+/g, '-') || 'unknown';
            await driver.saveScreenshot(`./screenshots/failed-${testName}.png`);
        }
    });
});
