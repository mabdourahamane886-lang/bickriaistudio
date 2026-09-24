import { fal } from "@fal-ai/client";

export interface VideoScene {
  narration?: string;
  visualPrompt?: string;
  durationSeconds?: number;
}

export interface VideoProvider {
  createRender(input: { scenes: VideoScene[]; format: "9:16" | "16:9" | "1:1" }): Promise<{ id: string; status: string; url?: string }>;
}

export async function createFalVideo(input: { scenes: VideoScene[]; format: "9:16" | "16:9" | "1:1" }) {
  const key = process.env.FAL_KEY;
  if (!key) throw new Error("FAL_KEY n'est pas configurée dans l'environnement Vercel.");

  fal.config({ credentials: key });

  const prompt = input.scenes.map((s, i) =>
    `Scène ${i + 1}: ${s.visualPrompt || s.narration || "cinematic scene"}. ${s.narration ? `Narration: ${s.narration}` : ""}`
  ).join(" ");

  const result = await fal.subscribe("fal-ai/kling-video/v3/standard/text-to-video", {
    input: { prompt, aspect_ratio: input.format === "9:16" ? "9:16" : input.format === "1:1" ? "1:1" : "16:9" },
    logs: false
  });

  const data = result.data as any;
  const url = data?.video?.url || data?.video_url || data?.url;
  if (!url) throw new Error("Le fournisseur vidéo n'a pas retourné d'URL.");
  return { id: String(result.requestId || data?.id || ""), status: "completed", url };
}
