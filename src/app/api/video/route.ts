import { NextResponse } from "next/server";
import { createFalVideo } from "@/lib/video/provider";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const scenes = Array.isArray(body.scenes) ? body.scenes : [];
  const format = body.format === "16:9" || body.format === "1:1" ? body.format : "9:16";
  if (!scenes.length) return NextResponse.json({ error: "Au moins une scène est requise." }, { status: 400 });
  try {
    const result = await createFalVideo({ scenes, format });
    return NextResponse.json({ provider: "fal-kling-v3", ...result });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Échec de génération vidéo." }, { status: 503 });
  }
}
