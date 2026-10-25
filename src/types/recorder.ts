export type AudioSource = 'internal' | 'microphone' | 'mixed' | 'mute';
export type VideoResolution = '720p' | '1080p' | '1440p' | '4k';
export type VideoFPS = 24 | 30 | 60 | 120;
export type VideoBitrate = '4Mbps' | '8Mbps' | '16Mbps' | '24Mbps' | 'Auto';
export type VideoEncoder = 'H.264' | 'H.265' | 'AV1';
export type FacecamShape = 'circle' | 'rounded' | 'square' | 'oval';
export type FacecamPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface RecordingItem {
  id: string;
  title: string;
  date: string;
  timestamp: number;
  duration: string; // e.g., "04:12"
  durationSeconds: number;
  fileSizeBytes: number;
  fileSizeFormatted: string; // e.g., "68.4 MB"
  resolution: string; // e.g., "1080p · 60fps"
  thumbnailUrl: string;
  videoUrl: string;
  category: 'gameplay' | 'tutorial' | 'shorts' | 'general';
  isFavorite?: boolean;
}

export interface RecorderSettings {
  resolution: VideoResolution;
  fps: VideoFPS;
  bitrate: VideoBitrate;
  encoder: VideoEncoder;
  countdownSeconds: number; // 0, 3, 5, 10
  shakeToStop: boolean;
  showTouches: boolean;
  floatingControlsEnabled: boolean;
  
  // Audio settings
  audioSource: AudioSource;
  internalAudioVolume: number; // 0-100
  micGain: number; // 0-100
  noiseSuppression: boolean;
  sampleRate: '44.1kHz' | '48.0kHz';
  
  // Facecam settings
  facecamEnabled: boolean;
  facecamShape: FacecamShape;
  facecamSize: 'small' | 'medium' | 'large';
  facecamPosition: FacecamPosition;
  facecamMirror: boolean;
  facecamOpacity: number; // 50-100
  
  // Storage
  storageLocation: 'internal' | 'sdcard';
  availableStorageGb: number;
  totalStorageGb: number;
}
