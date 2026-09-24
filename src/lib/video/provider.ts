import Replicate from "replicate";

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

function getSize(format: "9:16" | "16:9" | "1:1") {
  if (format === "9:16") return "720*1280";
  if (format === "1:1") return "720*720";
  return "1280*720";
}

export async function createReplicateVideo(input: {
  scenes: VideoScene[];
  format: "9:16" | "16:9" | "1:1";
}) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    throw new Error("REPLICATE_API_TOKEN n'est pas configurée dans l'environnement Vercel.");
  }

  const replicate = new Replicate({ auth: token });

  const prompt = input.scenes.map((scene, index) =>
    [
      `Scene ${index + 1}: ${scene.visualPrompt || "cinematic scene"}.`,
      scene.narration ? `Narration/dialogue: ${scene.narration}` : ""
    ].filter(Boolean).join(" ")
  ).join("\n");

  // Wan 2.5 T2V supports short generated clips; keep the first render at 5 seconds.
  const output = await replicate.run("wan-video/wan-2.5-t2v", {
    input: {
      prompt,
      size: getSize(input.format),
      duration: 5,
      negative_prompt: "blurry, distorted, low quality, watermark, subtitles, text artifacts",
      enable_prompt_expansion: true
    }
  });

  const url =
    typeof output === "string"
      ? output
      : typeof (output as { url?: unknown })?.url === "function"
        ? String((output as { url: () => string }).url())
        : String((output as { url?: unknown })?.url || "");

  if (!url || url === "undefined") {
    throw new Error("Replicate n'a pas retourné d'URL vidéo.");
  }

  return {
    id: "replicate-wan-2.5-t2v",
    status: "completed",
    url
  };
}
