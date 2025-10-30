# TalentIQ — Next.js Starter (MVP)

Gorgeous, simple, and functional web app starter with:
- Next.js App Router (TypeScript) + Tailwind
- Supabase (Postgres) schema for `actors`
- OpenAI JSON-mode endpoint for parsing casting breakdowns
- Minimal UI: paste breakdown → AI JSON → bucketed recommendations (mock data)

## 1) One‑click deploy
- Push this repo to GitHub.
- In Vercel: **New Project → Import**.
- Add environment variables:
  - `OPENAI_API_KEY`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2) Local (optional)
```bash
pnpm i # or npm i / yarn
pnpm dev
```

## 3) Supabase
- Create a new Supabase project.
- Run `supabase/schema.sql` then (optionally) `supabase/seed.sql` in the SQL editor.
- Expand RLS later using `supabase/policies.sql`.

## 4) What works now
- `/` — Paste a casting breakdown and click **Parse with AI**. The serverless function calls OpenAI and returns strict JSON. The page scores 3 mock actors client‑side and buckets them into Best / Strong / Wildcards.

## 5) Roadmap (small, sequential PRs)
- [ ] Replace mock `MOCK` data with live Supabase `actors` query.
- [ ] Auth: Supabase Auth (email link) + profile `role` (Agent/Actor).
- [ ] Actor CRUD: `/actors` list + create/edit pages; media uploads (Supabase Storage).
- [ ] Local‑hire intelligence: per‑zone min rates; mismatch flags in UI.
- [ ] Bookings & callbacks tables → Insights.
- [ ] Real LTR model: store parsed breakdowns + feedback to improve scoring.
- [ ] PDF exporter page (server component) for submission packets.

---

**Tech decisions kept intentionally simple** so you can ship fast, then harden with RLS policies and proper migrations.
