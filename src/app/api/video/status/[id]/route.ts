import { NextResponse } from "next/server";
import { getReplicateVideo } from "@/lib/video/provider";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "ID de génération manquant." },
        { status: 400 }
      );
    }

    const result = await getReplicateVideo(id);

    return NextResponse.json({
      provider: "replicate-wan-2.5",
      ...result
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Impossible de vérifier la génération vidéo.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
