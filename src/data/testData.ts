/**
 * Test data configuration
 * Centralized location for all test data used across test suites
 */
export const testData = {
    /** User credentials for testing */
    users: {
        /** Valid user credentials for successful login scenarios */
        validUser: {
            username: 'test@webdriver.io',
            password: 'Test1234!'
        },
        /** Invalid user credentials for negative test scenarios */
        invalidUser: {
            username: 'invalid@example.com',
            password: 'wrong'
        }
    },
    /** Timeout values in milliseconds for different wait scenarios */
    timeout: {
        /** Short timeout for fast operations (5 seconds) */
        short: 5000,
        /** Medium timeout for standard operations (10 seconds) */
        medium: 10000,
        /** Long timeout for slow operations (30 seconds) */
        long: 30000
    }
};
