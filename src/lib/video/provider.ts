export interface VideoScene {
  narration?: string;
  visualPrompt?: string;
  durationSeconds?: number;
}

export interface VideoPrediction {
  id: string;
  status: string;
  url?: string;
  error?: string;
}

const MODEL_ENDPOINT =
  "https://api.replicate.com/v1/models/wan-video/wan-2.5-t2v/predictions";

function getSize(format: "9:16" | "16:9" | "1:1") {
  if (format === "9:16") return "720*1280";
  if (format === "1:1") return "720*720";
  return "1280*720";
}

function getToken() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    throw new Error(
      "REPLICATE_API_TOKEN n'est pas configurée dans Cloudflare Workers > Settings > Variables and Secrets."
    );
  }
  return token;
}

export async function createReplicateVideo(input: {
  scenes: VideoScene[];
  format: "9:16" | "16:9" | "1:1";
}): Promise<VideoPrediction> {
  const prompt = input.scenes
    .map((scene, index) =>
      [
        `Scene ${index + 1}: ${scene.visualPrompt || "cinematic scene"}.`,
        scene.narration ? `Narration/dialogue: ${scene.narration}` : ""
      ]
        .filter(Boolean)
        .join(" ")
    )
    .join("\n");

  // Wan 2.5 génère des clips courts. On démarre avec 5–10 secondes.
  const duration = Math.min(
    10,
    Math.max(5, Number(input.scenes[0]?.durationSeconds || 10))
  );

  const response = await fetch(MODEL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: {
        prompt,
        size: getSize(input.format),
        duration,
        negative_prompt:
          "blurry, distorted, low quality, watermark, subtitles, text artifacts",
        enable_prompt_expansion: true
      }
    })
  });

  const data = (await response.json().catch(() => ({}))) as {
    id?: string;
    status?: string;
    output?: string | string[] | null;
    error?: string | null;
  };

  if (!response.ok || !data.id) {
    throw new Error(
      data.error || `Replicate a répondu avec HTTP ${response.status}.`
    );
  }

  const url = Array.isArray(data.output)
    ? data.output[0]
    : typeof data.output === "string"
      ? data.output
      : undefined;

  return {
    id: data.id,
    status: data.status || "starting",
    url
  };
}

export async function getReplicateVideo(id: string): Promise<VideoPrediction> {
  const response = await fetch(
    `https://api.replicate.com/v1/predictions/${encodeURIComponent(id)}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  const data = (await response.json().catch(() => ({}))) as {
    id?: string;
    status?: string;
    output?: string | string[] | null;
    error?: string | null;
  };

  if (!response.ok || !data.id) {
    throw new Error(
      data.error ||
        `Impossible de récupérer la génération vidéo (HTTP ${response.status}).`
    );
  }

  const url = Array.isArray(data.output)
    ? data.output[0]
    : typeof data.output === "string"
      ? data.output
      : undefined;

  return {
    id: data.id,
    status: data.status || "unknown",
    url,
    error: typeof data.error === "string" ? data.error : undefined
  };
}
