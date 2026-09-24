export interface VideoScene {
  narration?: string;
  visualPrompt?: string;
  durationSeconds?: number;
}

export interface VideoProvider {
  createRender(input: {
    scenes: VideoScene[];
    format: "9:16" | "16:9" | "1:1";
  }): Promise<{ id: string; status: string; url?: string }>;
}

class HttpVideoProvider implements VideoProvider {
  async createRender(input: Parameters<VideoProvider["createRender"]>[0]) {
    const endpoint = process.env.VIDEO_API_URL;
    const apiKey = process.env.VIDEO_API_KEY;
    if (!endpoint || !apiKey) throw new Error("VIDEO_API_URL et VIDEO_API_KEY doivent être configurés.");
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(input),
      cache: "no-store"
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || data.message || `Le fournisseur vidéo a répondu ${response.status}.`);
    return { id: String(data.id ?? data.renderId ?? data.job_id ?? ""), status: String(data.status ?? "queued"), url: data.url ?? data.videoUrl };
  }
}

export function getVideoProvider(): VideoProvider {
  return new HttpVideoProvider();
}
