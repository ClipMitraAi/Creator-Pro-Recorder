import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ShieldCheck, X, Lock, EyeOff, HardDrive, Smartphone, Check } from 'lucide-react';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-text animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[90vh] flex flex-col border shadow-2xl rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#0a0d14',
          borderColor: theme.borderColor,
        }}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: theme.borderColor }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Privacy Policy</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  100% On-Device · No Ads
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400">
                Creator Pro Recorder — Effective Date: October 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Privacy Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-5 text-neutral-300 text-xs leading-relaxed">
          {/* Key Privacy Highlights Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-start gap-2">
              <EyeOff className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-[11px]">Zero Tracking</strong>
                <span className="text-[10px] text-neutral-400">No analytics, no ad SDKs, no behavioral tracking.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <HardDrive className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-[11px]">100% Local Storage</strong>
                <span className="text-[10px] text-neutral-400">Video & audio files never leave your device.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Lock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-[11px]">No Account Required</strong>
                <span className="text-[10px] text-neutral-400">Ready to record immediately without signup.</span>
              </div>
            </div>
          </div>

          <section className="space-y-1.5">
            <h4 className="text-sm font-bold text-white">1. Introduction</h4>
            <p>
              Creator Pro Recorder ("we", "our", or "the app") respects your privacy. This Privacy Policy explains our commitment to keeping your screen recordings, audio captures, camera feeds, and personal data completely private and secure.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="text-sm font-bold text-white">2. Data We Do NOT Collect</h4>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li><strong className="text-neutral-200">No Screen Video Content:</strong> Any visual content captured on your screen is encoded directly into your local device storage. We have zero access to your recordings.</li>
              <li><strong className="text-neutral-200">No Audio Recordings:</strong> Microphone and internal system audio are processed on-device and multiplexed directly into the MP4 file on your internal storage or SD card.</li>
              <li><strong className="text-neutral-200">No Camera Feeds:</strong> The Facecam feature renders your camera feed as a local floating overlay. Video frames are never uploaded to remote servers.</li>
              <li><strong className="text-neutral-200">No Personal Identity:</strong> We do not collect names, email addresses, phone numbers, contacts, or passwords.</li>
              <li><strong className="text-neutral-200">No Advertising or Tracking Identifiers:</strong> There are no advertising SDKs, tracking pixels, or third-party ad networks embedded in the app.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h4 className="text-sm font-bold text-white">3. Device Permissions & Purpose</h4>
            <p>Creator Pro Recorder requests only the minimum Android runtime permissions essential for screen recording functionality:</p>
            <div className="space-y-2 mt-2">
              <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                <span className="font-mono text-emerald-400 font-bold block text-[11px]">FOREGROUND_SERVICE_MEDIA_PROJECTION</span>
                <span className="text-[11px] text-neutral-400">Allows Android's native MediaProjection API to capture the display while displaying an active notification to the user.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                <span className="font-mono text-cyan-400 font-bold block text-[11px]">RECORD_AUDIO</span>
                <span className="text-[11px] text-neutral-400">Used solely to record microphone voice commentary and internal sound when enabled by the user.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                <span className="font-mono text-amber-400 font-bold block text-[11px]">CAMERA</span>
                <span className="text-[11px] text-neutral-400">Required only for the Facecam floating camera bubble feature during live recordings.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                <span className="font-mono text-indigo-400 font-bold block text-[11px]">WRITE_EXTERNAL_STORAGE / MediaStore</span>
                <span className="text-[11px] text-neutral-400">Enables saving recorded videos and exported trimmed clips to your device's Movies/CreatorPro directory.</span>
              </div>
            </div>
          </section>

          <section className="space-y-1.5">
            <h4 className="text-sm font-bold text-white">4. Data Storage and Deletion</h4>
            <p>
              All video and audio files are stored in your device's local storage or SD card. You maintain full ownership and control over your files. Deleting a video inside Creator Pro Recorder or through your device's file manager permanently deletes it from your hardware immediately.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="text-sm font-bold text-white">5. Children's Privacy</h4>
            <p>
              Creator Pro Recorder does not collect any personal identifiable information from anyone, including children under 13.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="text-sm font-bold text-white">6. Contact Information</h4>
            <p>
              If you have any questions or feedback regarding this Privacy Policy, please contact:
            </p>
            <p className="font-mono text-emerald-400">
              Developer Email: bittubam349@gmail.com
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-black/40 text-[11px] text-neutral-400 flex items-center justify-between" style={{ borderColor: theme.borderColor }}>
          <span>Compliant with Google Play Developer Policy</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-lg"
            style={{ backgroundColor: theme.primaryColor }}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
