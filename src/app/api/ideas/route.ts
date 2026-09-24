import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const topic = typeof body.topic === "string" ? body.topic.trim() : "";

  if (!topic) {
    return NextResponse.json({ error: "Le sujet est obligatoire." }, { status: 400 });
  }

  // Adapter IA à connecter côté serveur.
  return NextResponse.json({
    provider: "not-configured",
    message: "Le fournisseur IA doit être configuré via AI_PROVIDER et AI_API_KEY.",
    input: { topic }
  });
}
