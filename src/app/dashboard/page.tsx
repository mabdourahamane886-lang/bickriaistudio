"use client";

import { useState } from "react";
import Link from "next/link";

type Idea = { title: string; hook: string; angle: string; platform: string };

export default function DashboardPage() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("tiktok");
  const [idea, setIdea] = useState<Idea | null>(null);
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function generateIdea() {
    setLoading(true); setMessage("");
    try {
      const r = await fetch("/api/ideas", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({topic, platform, language:"français", count:1}) });
      const data = await r.json(); if (!r.ok) throw new Error(data.error || "Erreur");
      setIdea(data.ideas[0]); setScript("");
    } catch (e) { setMessage(e instanceof Error ? e.message : "Erreur inattendue"); }
    finally { setLoading(false); }
  }

  async function generateScript() {
    if (!idea) return;
    setLoading(true); setMessage("");
    try {
      const r = await fetch("/api/script", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({idea:idea.title, hook:idea.hook, durationSeconds:60}) });
      const data = await r.json(); if (!r.ok) throw new Error(data.error || "Erreur");
      setScript(data.script);
    } catch (e) { setMessage(e instanceof Error ? e.message : "Erreur inattendue"); }
    finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-sm font-semibold tracking-[0.2em] text-yellow-400">BICKRI AI STUDIO</p><h1 className="mt-1 text-4xl font-bold">Tableau de bord</h1></div>
          <Link href="/" className="rounded-lg border border-slate-700 px-4 py-2">Accueil</Link>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[["💡","Idées","Génération active"],["✍️","Scripts","Génération active"],["🎬","Storyboard","Préparation active"],["🚀","Publication","Connexion API requise"]].map(([icon,label,status])=>(
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><div className="text-2xl">{icon}</div><div className="mt-3 text-xl font-bold">{label}</div><div className="mt-2 text-sm text-slate-400">{status}</div></div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">⚡ Générateur de contenu</h2>
            <p className="mt-2 text-slate-400">Crée une idée et son hook sans clé API externe.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_180px]">
              <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Ex. Les merveilles du Niger" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-yellow-400"/>
              <select value={platform} onChange={e=>setPlatform(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
                <option value="tiktok">TikTok</option><option value="youtube">YouTube</option><option value="instagram">Instagram</option><option value="facebook">Facebook</option>
              </select>
            </div>
            <button onClick={generateIdea} disabled={loading || !topic.trim()} className="mt-4 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Génération…" : "Générer une idée"}</button>
            {message && <p className="mt-4 text-sm text-red-400">{message}</p>}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">🎯 Résultat</h2>
            {idea ? <><h3 className="mt-4 text-2xl font-bold">{idea.title}</h3><p className="mt-3 text-yellow-300">Hook : {idea.hook}</p><p className="mt-3 text-slate-400">{idea.angle}</p><button onClick={generateScript} disabled={loading} className="mt-5 rounded-xl border border-yellow-400 px-5 py-3 font-semibold text-yellow-300 disabled:opacity-50">✍️ Générer le script 60 s</button></> : <p className="mt-4 text-slate-500">Ton idée générée apparaîtra ici.</p>}
          </div>
        </section>

        {script && <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-xl font-bold">📝 Script généré</h2><pre className="mt-4 whitespace-pre-wrap font-sans leading-7 text-slate-300">{script}</pre></section>}
      </div>
    </main>
  );
}
