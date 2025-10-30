-- Minimal MVP schema
create table if not exists actors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  union_status text,
  appearance text,
  age_range int4range, -- e.g., int4range(25,33,'[]')
  build text,
  archetypes text[] default '{}',
  skills text[] default '{}',
  boundaries text[] default '{}',
  headshot_url text,
  reel_url text,
  primary_location text,
  passport boolean default false,
  local_cities text[] default '{}',
  min_rate_by_zone jsonb default '{}',
  travel_assist boolean default false,
  last_check_in date
);

-- Simple RLS (you can expand role-based later)
alter table actors enable row level security;
create policy read_all on actors for select using (true);
create policy insert_all on actors for insert with check (true);
create policy update_all on actors for update using (true);
