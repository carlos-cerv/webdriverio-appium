# GitHub Actions Workflows

This directory contains CI/CD workflows for automated testing and reporting.

## Available Workflows

### 1. Android Tests (`android-tests.yml`)
Runs automated tests on Android emulator with Allure reporting.

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Manual trigger via Actions tab

**What it does:**
- Sets up Android SDK and emulator (API 34)
- Installs dependencies
- Runs Android test suite
- Generates Allure reports
- Uploads test artifacts (results, reports, screenshots)
- Publishes report to GitHub Pages

**Duration:** ~10-15 minutes (with caching ~8-12 minutes)

---

### 2. iOS Tests (`ios-tests.yml`)
Runs automated tests on iOS simulator with Allure reporting.

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Manual trigger via Actions tab

**What it does:**
- Sets up Xcode and iOS dependencies
- Installs Appium XCUITest driver
- Starts iOS simulator (iPhone 15 Pro or available iPhone)
- Runs iOS test suite
- Generates Allure reports
- Uploads test artifacts (results, reports, screenshots)
- Publishes report to GitHub Pages

**Duration:** ~8-12 minutes

**Note:** iOS tests require a valid iOS app in `apps/ios/` directory.

---

### 3. Quick CI (`ci.yml`)
Fast linting and type checking for quick feedback.

**Triggers:**
- Push to any branch
- Pull requests

**What it does:**
- Runs ESLint code quality checks
- Performs TypeScript type checking

**Duration:** ~2-3 minutes

---

## Viewing Test Results

### Artifacts
After each workflow run, you can download:
- **Allure Results** - Raw test execution data
- **Allure Report** - HTML report with detailed test results
- **Screenshots** - Screenshots captured during test failures

To download artifacts:
1. Go to the Actions tab in your repository
2. Click on a workflow run
3. Scroll to the "Artifacts" section at the bottom
4. Download the desired artifact

### Allure Reports on GitHub Pages

The workflows automatically publish Allure reports to GitHub Pages:

1. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Save

2. **View Reports:**
   - Android Reports: `https://<your-username>.github.io/<repository-name>/android-reports`
   - iOS Reports: `https://<your-username>.github.io/<repository-name>/ios-reports`
   - Each test run updates the report in its respective directory

3. **Report Features:**
   - Test execution timeline
   - Pass/fail statistics
   - Test case details with steps
   - Screenshots on failures
   - Separate reports for Android and iOS platforms

---

## Manual Workflow Trigger

You can manually trigger Android or iOS tests:

1. Go to Actions tab
2. Select the workflow (Android Tests or iOS Tests)
3. Click "Run workflow"
4. Select branch and click "Run workflow"

---

## Configuration

### Customizing Android Version

Edit `android-tests.yml`:

```yaml
# Change API level
sdkmanager "system-images;android-33;google_apis;x86_64"  # API 33 instead of 34

# Update AVD creation
avdmanager create avd -n test_emulator -k "system-images;android-33;google_apis;x86_64"
```

### Customizing iOS Simulator

Edit `ios-tests.yml`:

```yaml
# Change simulator
grep "iPhone 14" instead of "iPhone 15 Pro"
```

### Customizing Xcode Version

Edit `ios-tests.yml`:

```yaml
# Change Xcode version
sudo xcode-select -s /Applications/Xcode_14.3.app/Contents/Developer
```

---

## Running Multiple Android Versions

To test against multiple Android versions, add a matrix strategy:

```yaml
strategy:
  matrix:
    android-api: [30, 33, 34]
steps:
  - name: Install Android SDK components
    run: |
      sdkmanager "system-images;android-${{ matrix.android-api }};google_apis;x86_64"
```

---

## Cost Optimization

### GitHub Actions Minutes
- **Public repositories:** Unlimited for public repos
- **Private repositories:** 2,000 minutes/month free, then paid

### Tips to reduce minutes:
1. Use caching (already configured)
2. Run only on `main` and `develop` branches
3. Use `workflow_dispatch` for manual runs
4. Skip tests for documentation changes:

```yaml
on:
  push:
    branches: [ main, develop ]
    paths-ignore:
      - '**.md'
      - 'docs/**'
```

---

## Troubleshooting

### Android Emulator Issues

**Problem:** Emulator doesn't start or times out

**Solutions:**
- Increase boot timeout in workflow
- Use different Android API level
- Use different system image (e.g., `default` instead of `google_apis`)

**Problem:** Tests fail due to emulator instability

**Solutions:**
- Add more wait time after boot: `sleep 30`
- Disable animations: `settings put global window_animation_scale 0`

### iOS Simulator Issues

**Problem:** Simulator not found

**Solutions:**
- Check available simulators: `xcrun simctl list devices`
- Use different device name in workflow
- Update Xcode version

**Problem:** WebDriverAgent build fails

**Solutions:**
- Ensure Appium XCUITest driver is installed
- Check Xcode command line tools: `xcode-select --install`

### Allure Report Issues

**Problem:** Report not generated

**Solutions:**
- Check if `allure-results/` has files
- Ensure `allure-commandline` is installed
- Run `npm run report` locally first

**Problem:** GitHub Pages not showing reports

**Solutions:**
- Enable GitHub Pages in repository settings
- Check `gh-pages` branch exists
- Wait a few minutes for deployment

---

## Adding Slack Notifications

Add to any workflow:

```yaml
- name: Slack Notification
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Test execution completed'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## Adding Email Notifications

GitHub automatically sends emails on workflow failures. To customize:

1. Go to Settings → Notifications
2. Configure "Actions" notifications
3. Choose when to receive emails

---

## Best Practices

### Recommended Practices

- Use caching for dependencies (`cache: 'npm'`)
- Upload artifacts for debugging
- Use `continue-on-error: true` for tests (to generate reports even on failure)
- Keep artifact retention reasonable (7-30 days)
- Use `if: always()` for report generation

### Practices to Avoid

- Run heavy tests on every commit to feature branches
- Store sensitive data in workflows (use GitHub Secrets)
- Upload large artifacts (>100MB) regularly
- Keep artifacts forever (costs storage)

---

## Security Notes

- Never commit API keys or credentials
- Use GitHub Secrets for sensitive data
- Keep workflows in `.github/workflows/` directory
- Review PRs that modify workflows carefully

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Allure Report Documentation](https://docs.qameta.io/allure/)
- [WebDriverIO CI Integration](https://webdriver.io/docs/ci/)
- [Appium CI Setup](https://appium.io/docs/en/writing-running-appium/ci/)
