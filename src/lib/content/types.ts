export type Platform = "youtube" | "tiktok" | "instagram" | "facebook";

export interface ContentIdea {
  id: string;
  title: string;
  hook?: string;
  angle?: string;
  platform?: Platform;
  language?: string;
  status: "draft" | "ready" | "archived";
}

export interface VideoProject {
  id: string;
  title: string;
  format: "9:16" | "16:9" | "1:1";
  status: "draft" | "script" | "storyboard" | "rendering" | "ready" | "published";
  durationSeconds?: number;
}
