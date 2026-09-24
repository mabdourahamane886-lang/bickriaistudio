import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const idea = typeof body.idea === "string" ? body.idea.trim() : "";
  const hook = typeof body.hook === "string" ? body.hook.trim() : "";
  if (!idea) return NextResponse.json({ error:"L'idée est obligatoire." }, {status:400});
  const script = [
    "[HOOK — 0:00]", hook || idea, "",
    "[INTRO — 0:05]", `Aujourd'hui, découvrons ${idea.toLowerCase()} en quelques secondes.`, "",
    "[PARTIE 1 — 0:12]", "Premier point : présente le fait ou l'information la plus importante avec une phrase simple et une image forte.", "",
    "[PARTIE 2 — 0:28]", "Deuxième point : ajoute un exemple concret, un chiffre ou une courte anecdote pour maintenir l'attention.", "",
    "[PARTIE 3 — 0:43]", "Troisième point : donne une information surprenante et relie-la au quotidien du public.", "",
    "[CONCLUSION — 0:55]", "Si tu as appris quelque chose, partage cette vidéo et dis-moi en commentaire ce que tu veux découvrir ensuite."
  ].join("\n");
  return NextResponse.json({provider:"local", durationSeconds:60, script});
}
