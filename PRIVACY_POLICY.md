# Privacy Policy for Creator Pro Recorder

**Effective Date:** October 25, 2026  
**Developer Contact:** bittubam349@gmail.com  
**Application Name:** Creator Pro Recorder  

---

## 1. Overview
Creator Pro Recorder ("the Application") is an offline-first, privacy-respecting Android screen recording and video studio tool. We believe your screen, voice, camera, and content belong entirely to you.

**The Application does NOT collect, store, transmit, sell, or share any personal data, screen recordings, audio captures, or camera streams with any remote servers, cloud services, or third-party advertising networks.**

---

## 2. Zero Ads and Zero Tracking Policy
- **No Third-Party Advertising:** The application contains zero advertising networks, tracking SDKs (e.g., AdMob, Unity, AppLovin), or marketing pixels.
- **No Telemetry or Analytics:** We do not track user behavior, device identifiers, IP addresses, or crash logs through remote analytics services.
- **No User Accounts:** The application requires no login, sign-up, email verification, or cloud accounts.

---

## 3. Permissions Requested and Their Strict Purpose

Creator Pro Recorder requests only the minimum required Android runtime permissions strictly necessary to perform screen recording functions:

| Permission | Android API | Purpose |
| :--- | :--- | :--- |
| `FOREGROUND_SERVICE_MEDIA_PROJECTION` | Android 10+ (API 29+) | Required by Android OS to record the display surface while notifying the user with an active ongoing notification. |
| `RECORD_AUDIO` | Android 6.0+ (API 23+) | Captures microphone voice commentary and internal device audio (via `AudioPlaybackCaptureConfiguration`). |
| `CAMERA` | Android 6.0+ (API 23+) | Used solely for the optional front-camera "Facecam" floating bubble overlay during recording. Camera frames are rendered locally in memory and never sent over the network. |
| `WRITE_EXTERNAL_STORAGE` / `READ_MEDIA_VIDEO` | Android Storage API / MediaStore | Saves your encoded MP4 video files to your device's local storage (`Movies/CreatorPro`) and allows viewing inside the in-app gallery. |
| `POST_NOTIFICATIONS` | Android 13+ (API 33+) | Displays the recording status notification with Pause/Stop quick actions in the notification shade. |
| `SYSTEM_ALERT_WINDOW` | Optional | Allows displaying the floating recording control bubble over other running apps and games. |

---

## 4. Local Data Storage & User Control
- All video captures and exported audio/video files are stored **100% locally** on your device's internal storage or SD card.
- You maintain complete control over your recordings. You may view, trim, export, rename, or permanently delete any recording at any time.
- Deleting a recording from within Creator Pro Recorder permanently deletes the file from device storage immediately.

---

## 5. Children’s Privacy
The Application is completely safe for all audiences, including children under 13. We do not solicit or collect personal identifiable information from anyone.

---

## 6. Security of Your Content
Because all audio processing, video rendering, and facecam overlays occur entirely on-device via Android's hardware `MediaCodec` and `MediaMuxer` pipelines, your recorded content is isolated within your device's secure sandbox and cannot be accessed remotely.

---

## 7. Changes to This Privacy Policy
If updates are made to this policy, the updated version will be committed to this repository with an updated effective date.

---

## 8. Contact Us
For any questions, feedback, or support regarding this Privacy Policy:
- **Email:** [bittubam349@gmail.com](mailto:bittubam349@gmail.com)
