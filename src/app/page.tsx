import Link from "next/link";

const cards = [
  ["💡", "Idées", "Générez des concepts, hooks et angles adaptés à chaque réseau."],
  ["✍️", "Scripts", "Transformez une idée en script prêt pour la voix off."],
  ["🎬", "Studio vidéo", "Organisez scènes, médias, voix et sous-titres."],
  ["🚀", "Publication", "Préparez YouTube et TikTok avec leurs APIs officielles."]
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            BICKRI SERVICE AGENCY
          </p>
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Bickri AI Studio
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Ton studio IA pour trouver des idées, écrire des scripts, construire des vidéos
            et préparer leur publication sur tes réseaux sociaux.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/dashboard" className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-slate-950">
              Ouvrir le studio
            </Link>
            <a href="https://github.com/mabdourahamane886-lang/bickriaistudio"
              className="rounded-xl border border-slate-700 px-6 py-3 font-semibold">
              GitHub
            </a>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {cards.map(([icon, title, text]) => (
            <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="text-3xl">{icon}</div>
              <h2 className="mt-4 text-xl font-bold">{title}</h2>
              <p className="mt-2 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
