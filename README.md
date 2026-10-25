# Creator Pro Recorder 📱🎥

> **Premium, 100% On-Device Screen Recorder and UI Design Studio for Android.**  
> Zero Ads. Zero Background Tracking. 100% Private Offline Audio & Video Capture.

---

## 🌟 Key Highlights

- **Zero Ads & Zero Telemetry:** Completely ad-free (AdMob and all third-party ad networks removed). No analytics or remote tracking.
- **Automated Public APK Builds via GitHub Actions:** Push to GitHub and immediately download the compiled Android APK from **Actions Artifacts** or **GitHub Releases**.
- **6 Premium Theme Presets:** Midnight Pro, Cyber Neon, Minimal White, Creator Purple, Gaming Red, and Glass Premium.
- **Interactive UI Design Studio:** Real-time design token customizer for colors, corner radiuses, button shapes, floating widgets, and navigation layouts.
- **Full Display & Custom Crop Capture:** Record full screen or interactively drag a custom crop boundary (16:9, 9:16 Shorts/Reels, 1:1, 4:3).
- **Dual-Track Audio Mixing:** Record internal system sound + microphone commentary simultaneously with live VU decibel meters.
- **Floating Facecam Bubble:** Front camera overlay with custom shapes (Circle, Rounded, Square, Oval) and repositioning grid.
- **Built-In Precision Video Editor:** Dual-handle timeline trimmer with scrubber, playback speed adjustments (0.5x - 2.0x), and fast export.

---

## 📦 How to Download / Build Public APK on GitHub

This repository comes pre-configured with a **GitHub Actions CI/CD Pipeline** (`.github/workflows/build-apk.yml`).

### Option 1: Automatic Download from GitHub Actions
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "Initial commit for Creator Pro Recorder"
   git push origin main
   ```
2. Navigate to your GitHub repository in your browser.
3. Click on the **Actions** tab at the top.
4. Select the latest **"Build Public Android APK"** run.
5. Under the **Artifacts** section at the bottom of the page, click **`CreatorProRecorder-APK`** to download your public `.apk` file directly!

### Option 2: Automatic Public GitHub Release
To publish an official public release with a direct APK download link:
```bash
git tag v1.0.0
git push origin v1.0.0
```
GitHub Actions will automatically compile the APK and publish a **GitHub Release** at `https://github.com/<your-username>/<your-repo>/releases` with the `CreatorProRecorder-v1.0.0.apk` file attached.

### Option 3: Build Locally via Android Studio
1. Open the `/android` folder in **Android Studio**.
2. Let Gradle sync.
3. Run or build the project:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```
4. Output APK location:
   `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 💻 Running the Web Interactive Design Studio

The web application lets you preview and interact with all 6 themes and screens on both a simulated Android phone chassis and responsive desktop view:

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Visit `http://localhost:3000` to open the interactive UI Design Studio.

```bash
# Build for production
npm run build
```

---

## 🛡️ Privacy Policy

Creator Pro Recorder is designed from the ground up to respect user privacy:
- All video streams and audio captures are processed **100% on-device**.
- Files are saved to your device's local storage (`Movies/CreatorPro`).
- We do **not** collect passwords, personal information, microphone recordings, or camera feeds.

Read the full [Privacy Policy](./PRIVACY_POLICY.md).

---

## 📁 Repository Structure

```
├── .github/
│   └── workflows/
│       └── build-apk.yml         # GitHub Actions APK build & release pipeline
├── android/                      # Native Android Kotlin & Jetpack Compose project
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   └── java/com/creatorpro/recorder/
│   │   │       ├── MainActivity.kt
│   │   │       ├── ScreenCaptureService.kt
│   │   │       └── ui/theme/Theme.kt
│   │   └── build.gradle.kts
│   ├── build.gradle.kts
│   └── settings.gradle.kts
├── src/                          # Interactive Web Design Studio (React + TS)
│   ├── components/
│   │   ├── screens/              # All 8 recorder app screens
│   │   ├── ThemeGallery.tsx      # 6-theme comparative gallery
│   │   ├── CustomDesignEditor.tsx# Real-time token customizer
│   │   ├── DeviceFrame.tsx       # Android chassis & status bar
│   │   └── PrivacyPolicyModal.tsx# In-app Google Play privacy policy
│   ├── context/
│   │   └── ThemeContext.tsx      # Centralized theme tokens & persistence
│   └── data/
│       └── presetThemes.ts       # 6 pristine theme presets
├── PRIVACY_POLICY.md             # Standalone Privacy Policy
├── README.md                     # Documentation
└── package.json
```

---

## 📧 Developer Contact & Support

- **Developer Email:** [bittubam349@gmail.com](mailto:bittubam349@gmail.com)
- **License:** Apache-2.0
