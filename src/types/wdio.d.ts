/**
 * WebDriverIO Type Definitions
 * Extends global WebDriverIO types for custom commands and properties
 * Add custom browser commands and element methods here
 */

export {};

/**
 * Global type extensions for WebDriverIO
 */
declare global {
    namespace WebdriverIO {
        /**
         * Browser interface extension
         * Add custom browser-level commands here
         * @example
         * interface Browser {
         *   customCommand(param: string): Promise<void>;
         * }
         */
        interface Browser {}
    }
}
