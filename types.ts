
export enum SourceType {
  NDI_HX = 'NDI|HX',
  SRT = 'SRT',
  RTMP_LOCAL = 'RTMP',
  UVC = 'USB/UVC',
  DJI_DRONE = 'DJI',
  GOPRO = 'GoPro'
}

export enum SportType {
  FOOTBALL = 'Football',
  BASKETBALL = 'Basketball',
  BASEBALL = 'Baseball',
  TENNIS = 'Tennis'
}

export type TransitionType = 'CUT' | 'FADE' | 'WIPE';

export interface PTZState {
  pan: number;
  tilt: number;
  zoom: number;
  speed: number;
  activePreset: number | null;
}

export interface SourceHealth {
  battery: number; // 0-100
  temperature: number; // Celsius
  signal: number; // 0-100
}

export interface ConnectivityStats {
  ip?: string;
  jitter: number[]; // For sparkline
  packetLoss: number;
  rtt: number;
  bufferUsage: number;
  syncDelay: number;
}

export interface MediaSource {
  id: string;
  name: string;
  type: SourceType;
  resolution: string;
  fps: number;
  bitrate: number;
  latency: number;
  status: 'connected' | 'disconnected' | 'connecting';
  stats?: ConnectivityStats;
  health?: SourceHealth;
  ptzState?: PTZState;
}

export interface MatchState {
  sport: SportType;
  teamA: { name: string; score: number; color: string; fouls: number };
  teamB: { name: string; score: number; color: string; fouls: number };
  period: number;
  timerMs: number;
  isTimerRunning: boolean;
  isGameOver: boolean;
}

export interface ReplayEvent {
  id: string;
  timestamp: string;
  type: 'GOAL' | 'FOUL' | 'MANUAL';
  sourceId: string;
  durationMs: number;
}

export interface AppState {
  activeSourceId: string;
  previewSourceId: string;
  isStreaming: boolean;
  isRecording: boolean;
  currentScene: 'intro' | 'game' | 'replay' | 'sponsor' | 'outro';
}

export interface AudioChannel {
  id: string;
  name: string;
  level: number;
  isMuted: boolean;
  isLocked: boolean;
  followVideo: boolean;
  delayMs: number;
  peakDb: number;
}

export interface PiPConfig {
  active: boolean;
  sourceId: string;
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  size: 'small' | 'medium' | 'large';
}

export interface ChromaConfig {
  active: boolean;
  keyColor: string;
  tolerance: number;
}

// Technical Spec Types
export interface ViewModelSpec {
  name: string;
  responsibilities: string[];
  states: string[];
  logicSnippet: string;
}
