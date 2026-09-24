# Bickri AI Studio 🚀

Studio IA professionnel de création de contenu pour Bickri Service Agency.

## Pipeline
**Idée → Hook → Script → Storyboard → Assets → Voix → Sous-titres → Rendu → Programmation → Publication**

## Modules
- 💡 Générateur d'idées
- ✍️ Scripts et hooks
- 🎬 Studio vidéo
- 📚 Bibliothèque
- 📅 Calendrier éditorial
- ▶️ YouTube
- 🎵 TikTok
- 🤖 Assistant IA
- 🎨 Identité de marque
- 🔐 Authentification Supabase + RLS

## Développement

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variables d'environnement

Les secrets ne sont jamais stockés dans GitHub. Configurer les variables dans Vercel ou dans `.env.local`.

Voir `.env.example`.

## Base de données

Le schéma initial se trouve dans:
`supabase/migrations/001_initial_schema.sql`

Il couvre les profils, idées, projets, scènes, assets, comptes sociaux, publications et identité de marque.

## Statut

MVP en construction. Les intégrations de génération vidéo, TTS, YouTube et TikTok sont conçues comme des adaptateurs serveur et nécessitent leurs propres credentials/API.

