import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-yellow-400">BICKRI AI STUDIO</p>
            <h1 className="mt-1 text-4xl font-bold">Tableau de bord</h1>
          </div>
          <Link href="/" className="rounded-lg border border-slate-700 px-4 py-2">Accueil</Link>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["12", "Idées"],
            ["4", "Scripts"],
            ["3", "Vidéos prêtes"],
            ["7", "Publications"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="text-4xl font-bold text-yellow-400">{value}</div>
              <div className="mt-2 text-slate-400">{label}</div>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
            <h2 className="text-xl font-bold">Créer du contenu</h2>
            <p className="mt-2 text-slate-400">Le pipeline complet sera connecté aux fournisseurs IA et vidéo.</p>
            <button className="mt-6 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-slate-950">
              Générer une idée
            </button>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">Connexions</h2>
            <p className="mt-3 text-sm text-slate-400">YouTube: non connecté</p>
            <p className="mt-2 text-sm text-slate-400">TikTok: non connecté</p>
          </div>
        </section>
      </div>
    </main>
  );
}
