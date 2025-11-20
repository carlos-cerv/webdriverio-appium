#!/bin/bash

# iOS Setup Verification Script for WebDriverIO
# This script checks if all prerequisites for iOS testing are properly installed

echo "🔍 WebDriverIO iOS Setup Verification"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check functions
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $2"
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        return 1
    fi
}

check_xcode() {
    if xcodebuild -version &> /dev/null; then
        version=$(xcodebuild -version | head -n 1)
        echo -e "${GREEN}✓${NC} Xcode installed: $version"
        return 0
    else
        echo -e "${RED}✗${NC} Xcode not installed"
        return 1
    fi
}

check_simulators() {
    if xcrun simctl list devices available | grep -q iPhone; then
        count=$(xcrun simctl list devices available | grep iPhone | wc -l | tr -d ' ')
        echo -e "${GREEN}✓${NC} iOS Simulators available: $count found"
        return 0
    else
        echo -e "${RED}✗${NC} No iOS Simulators found"
        return 1
    fi
}

check_appium_driver() {
    driver_output=$(appium driver list --installed 2>&1)
    if echo "$driver_output" | grep -iq "xcuitest"; then
        version=$(echo "$driver_output" | grep -i xcuitest | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)
        echo -e "${GREEN}✓${NC} Appium XCUITest driver installed${version:+ (v$version)}"
        return 0
    else
        echo -e "${RED}✗${NC} Appium XCUITest driver not installed"
        echo -e "  ${YELLOW}Install with: appium driver install xcuitest${NC}"
        return 1
    fi
}

check_wda() {
    wda_path="$HOME/.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent"
    if [ -d "$wda_path" ]; then
        echo -e "${GREEN}✓${NC} WebDriverAgent found"
        return 0
    else
        echo -e "${YELLOW}⚠${NC} WebDriverAgent not found (will be downloaded on first run)"
        return 0
    fi
}

check_ios_app() {
    if ls apps/ios/*.app &> /dev/null || ls apps/ios/*.ipa &> /dev/null; then
        app_count=$(ls -d apps/ios/*.app apps/ios/*.ipa 2>/dev/null | wc -l | tr -d ' ')
        echo -e "${GREEN}✓${NC} iOS app found in apps/ios/ ($app_count file(s))"
        return 0
    else
        echo -e "${YELLOW}⚠${NC} No iOS app found in apps/ios/"
        echo -e "  ${YELLOW}Add your .app or .ipa file to apps/ios/${NC}"
        return 1
    fi
}

# Run checks
echo "Checking prerequisites..."
echo ""

errors=0

# Check macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}✗${NC} Not running on macOS - iOS testing requires macOS"
    exit 1
fi

echo -e "${GREEN}✓${NC} Running on macOS"

# Check Node.js
check_command "node" "Node.js installed" || ((errors++))
if command -v node &> /dev/null; then
    echo -e "  Version: $(node --version)"
fi

# Check npm
check_command "npm" "npm installed" || ((errors++))
if command -v npm &> /dev/null; then
    echo -e "  Version: $(npm --version)"
fi

# Check Appium
check_command "appium" "Appium installed" || ((errors++))
if command -v appium &> /dev/null; then
    echo -e "  Version: $(appium --version)"
fi

# Check Xcode
check_xcode || ((errors++))

# Check Command Line Tools
if xcode-select -p &> /dev/null; then
    echo -e "${GREEN}✓${NC} Xcode Command Line Tools installed"
    echo -e "  Path: $(xcode-select -p)"
else
    echo -e "${RED}✗${NC} Xcode Command Line Tools not installed"
    echo -e "  ${YELLOW}Install with: xcode-select --install${NC}"
    ((errors++))
fi

# Check Carthage
check_command "carthage" "Carthage installed" || echo -e "  ${YELLOW}Optional but recommended: brew install carthage${NC}"

# Check ios-deploy
check_command "ios-deploy" "ios-deploy installed" || echo -e "  ${YELLOW}Optional for real devices: npm install -g ios-deploy${NC}"

echo ""
echo "Checking Appium setup..."
echo ""

# Check Appium XCUITest driver
check_appium_driver || ((errors++))

# Check WebDriverAgent
check_wda

echo ""
echo "Checking iOS environment..."
echo ""

# Check iOS Simulators
check_simulators || ((errors++))

# List available simulators
if xcrun simctl list devices available | grep -q iPhone; then
    echo ""
    echo "Available iPhone Simulators:"
    xcrun simctl list devices available | grep iPhone | head -5 | sed 's/^/  /'
fi

echo ""
echo "Checking project setup..."
echo ""

# Check iOS app
check_ios_app

# Check iOS config file
if [ -f "wdio.ios.conf.ts" ]; then
    echo -e "${GREEN}✓${NC} iOS config file exists (wdio.ios.conf.ts)"
else
    echo -e "${RED}✗${NC} iOS config file not found"
    ((errors++))
fi

echo ""
echo "======================================"

if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✓ All critical checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Add your iOS app to apps/ios/"
    echo "2. Update wdio.ios.conf.ts with your app path"
    echo "3. Start a simulator: xcrun simctl boot \"iPhone 15 Pro\""
    echo "4. Run tests: npm run test:ios"
else
    echo -e "${RED}✗ Found $errors issue(s) that need attention${NC}"
    echo ""
    echo "Please fix the issues above before running iOS tests."
    echo "See docs/IOS_SETUP.md for detailed setup instructions."
fi

echo ""
