import { NextResponse } from "next/server";

const templates = [
  (topic: string, platform: string) => ({ title: platform === "tiktok" ? `3 choses incroyables à découvrir sur ${topic}` : `Tout savoir sur ${topic} en 60 secondes`, hook: `Tu connais vraiment ${topic} ? Voici 3 faits qui vont te surprendre.`, angle: `Format court, rythme rapide, une information forte toutes les 10 à 15 secondes, avec une conclusion qui invite à commenter.`, platform }),
  (topic: string, platform: string) => ({ title: `L'histoire de ${topic} que peu de gens connaissent`, hook: `On parle rarement de cette histoire autour de ${topic}…`, angle: `Raconter une histoire en 3 actes : contexte, moment clé, leçon à retenir.`, platform }),
  (topic: string, platform: string) => ({ title: `Pourquoi ${topic} mérite plus d'attention`, hook: `Voici pourquoi ${topic} mérite d'être découvert aujourd'hui.`, angle: `Approche éducative et positive, avec des exemples concrets et une fin mémorable.`, platform })
];

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const topic = typeof body.topic === "string" ? body.topic.trim() : "";
  const platform = typeof body.platform === "string" ? body.platform : "tiktok";
  const count = Math.min(Math.max(Number(body.count) || 1, 1), 3);
  if (!topic) return NextResponse.json({ error: "Le sujet est obligatoire." }, { status: 400 });
  const ideas = Array.from({length:count}, (_,i)=>templates[i % templates.length](topic, platform));
  return NextResponse.json({ provider:"local", ideas });
}
