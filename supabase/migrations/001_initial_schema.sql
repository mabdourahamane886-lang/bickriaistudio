create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  hook text,
  angle text,
  platform text,
  language text default 'fr',
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  idea_id uuid references public.ideas(id) on delete set null,
  title text not null,
  status text not null default 'draft',
  format text not null default '9:16',
  duration_seconds integer,
  script text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.scenes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  scene_order integer not null,
  narration text,
  visual_prompt text,
  duration_seconds integer default 5,
  created_at timestamptz not null default now()
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  type text not null,
  storage_path text,
  external_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.social_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  platform text not null,
  account_name text,
  provider_account_id text,
  access_token_encrypted text,
  refresh_token_encrypted text,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, platform, provider_account_id)
);

create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  social_account_id uuid references public.social_accounts(id) on delete set null,
  platform text not null,
  status text not null default 'draft',
  scheduled_at timestamptz,
  published_at timestamptz,
  external_post_id text,
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists public.brand_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  brand_name text default 'Bickri Service Agency',
  primary_color text default '#07111f',
  accent_color text default '#facc15',
  watermark_url text,
  default_language text default 'fr',
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.ideas enable row level security;
alter table public.projects enable row level security;
alter table public.scenes enable row level security;
alter table public.assets enable row level security;
alter table public.social_accounts enable row level security;
alter table public.publications enable row level security;
alter table public.brand_settings enable row level security;

create policy "profiles own rows" on public.profiles for all to authenticated
using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "ideas own rows" on public.ideas for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "projects own rows" on public.projects for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "assets own rows" on public.assets for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "social accounts own rows" on public.social_accounts for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "publications own rows" on public.publications for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "brand settings own rows" on public.brand_settings for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "scenes through owned projects" on public.scenes for all to authenticated
using (exists (
  select 1 from public.projects p
  where p.id = scenes.project_id and p.user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.projects p
  where p.id = scenes.project_id and p.user_id = (select auth.uid())
));
