const AVAILABLE_SOURCES = [
  "google_drive",
  "drop_box",
  "daily_motion",
  "youtube",
  "link",
] as const;

export type AvailableSources = (typeof AVAILABLE_SOURCES)[number];
