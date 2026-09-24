import { NextResponse } from "next/server";
import { createReplicateVideo } from "@/lib/video/provider";

export const maxDuration = 300;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const scenes = Array.isArray(body.scenes) ? body.scenes : [];
  const format = body.format === "16:9" || body.format === "1:1" ? body.format : "9:16";

  if (!scenes.length) {
    return NextResponse.json({ error: "Au moins une scène est requise." }, { status: 400 });
  }

  try {
    const result = await createReplicateVideo({ scenes, format });
    return NextResponse.json({ provider: "replicate-wan-2.5", ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Échec de génération vidéo.";
    console.error("VIDEO_GENERATION_ERROR", message);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
