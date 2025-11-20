import type { Options } from '@wdio/types';

export const config: Options.Testrunner = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },

    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './src/tests/**/*.spec.ts'
    ],
    exclude: [],

    //
    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Pixel 9a',
        'appium:platformVersion': '16.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': '/Users/carlos.eduardo/webDriveriO/apps/android/app-debug.apk',
        'appium:appPackage': 'com.wdiodemoapp',
        'appium:appActivity': 'com.wdiodemoapp.MainActivity',
        'appium:autoGrantPermissions': true,
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 240
    }],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    //
    // =====
    // Hooks
    // =====
    services: ['appium'],
    
    port: 4723,
    
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: './allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    //
    // =====
    // Hooks
    // =====
    /**
     * Gets executed once before all workers get launched.
     */
    onPrepare: function () {
        console.log('Starting test execution...');
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialize specific service
     * for that worker as well as modify runtime environments in an async fashion.
     */
    onWorkerStart: function () {
        console.log('Worker started');
    },
    /**
     * Gets executed just after a worker process has exited.
     */
    onWorkerEnd: function () {
        console.log('Worker ended');
    },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     */
    beforeSession: function () {
        console.log('Before session');
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     */
    before: async function () {
        // Set implicit timeout
        // await browser.setTimeout({ 'implicit': 10000 });
    },
    /**
     * Hook that gets executed before the suite starts
     */
    beforeSuite: function () {
        console.log('Before suite');
    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    beforeHook: function () {
        // Add custom logic before hooks
    },
    /**
     * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
     * afterEach in Mocha)
     */
    afterHook: function () {
        // Add custom logic after hooks
    },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: function () {
        console.log('Starting test');
    },
    /**
     * Runs before a WebDriver command gets executed.
     */
    beforeCommand: function () {
        // Add custom logic before commands
    },
    /**
     * Runs after a WebDriver command gets executed
     */
    afterCommand: function () {
        // Add custom logic after commands
    },
    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {object}  test             test object
     * @param {object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {*}       result.result    return object of test function
     * @param {number}  result.duration  duration of test
     * @param {boolean} result.passed    true if test has passed, otherwise false
     * @param {object}  result.retries   information about spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    afterTest: async function (test, context, { error }) {
        if (error) {
            // Screenshot will be taken in test file afterEach hook
        }
    },
    /**
     * Hook that gets executed after the suite has ended
     */
    afterSuite: function () {
        console.log('After suite');
    },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     */
    after: function () {
        console.log('After all tests');
    },
    /**
     * Gets executed right after terminating the webdriver session.
     */
    afterSession: function () {
        console.log('After session');
    },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     */
    onComplete: function () {
        console.log('Test execution completed');
    },
};
