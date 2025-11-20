# iOS Application Files

## Current Status
The current files in this directory are placeholders and need to be replaced with actual iOS application files.

## Setup Instructions

### Option 1: WebDriverIO Demo App (Recommended for Testing)
1. Download the iOS simulator app from: https://github.com/webdriverio/native-demo-app/releases
2. Download `iOS-Simulator-NativeDemoApp-x.x.x.app.zip`
3. Extract the zip file to get the `.app` bundle
4. Place the extracted `.app` folder in this directory
5. Update `wdio.ios.conf.ts` to point to: `iOS-Simulator-NativeDemoApp.app`

### Option 2: Your Own iOS App

#### For Simulator Testing
- Place your `.app` bundle (folder) here
- Update the path in `wdio.ios.conf.ts`

#### For Real Device Testing
- Place your `.ipa` file here
- Ensure proper code signing and provisioning profiles
- Update the path in `wdio.ios.conf.ts`

## File Types

- **`.app`** - iOS simulator build (folder structure)
  - Used for iOS Simulator testing
  - Obtained from Xcode build for Simulator
  
- **`.ipa`** - iOS device build (archive file)
  - Used for real device testing
  - Requires code signing and provisioning profiles

## Configuration

Update the app path in `wdio.ios.conf.ts`:

```typescript
'appium:app': process.cwd() + '/apps/ios/YOUR_APP_NAME.app'
```

Or use bundle ID if app is already installed:

```typescript
'appium:bundleId': 'com.yourcompany.yourapp'
```
