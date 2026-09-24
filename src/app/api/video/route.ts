import { NextResponse } from "next/server";
import { getVideoProvider } from "@/lib/video/provider";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const scenes = Array.isArray(body.scenes) ? body.scenes : [];
  const format = body.format === "16:9" || body.format === "1:1" ? body.format : "9:16";

  if (!scenes.length) return NextResponse.json({ error: "Au moins une scène est requise." }, { status: 400 });

  try {
    const result = await getVideoProvider().createRender({ scenes, format });
    return NextResponse.json({ provider: "configured", ...result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Impossible de lancer le rendu vidéo." }, { status: 503 });
  }
}
