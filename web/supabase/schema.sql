-- ============================================================
-- DataLife — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── leads ──────────────────────────────────────────────────
-- Populated by /api/quote (contact form) and /api/chat/lead (chatbot)
create table if not exists leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  source       text not null check (source in ('quote_form', 'chatbot')),
  name         text not null,
  email        text,                  -- nullable: chatbot leads may not provide email
  company      text,
  service      text not null,
  description  text,
  budget       text,
  timeline     text,
  -- chatbot-specific fields (null for quote_form leads)
  project_type        text,
  has_data            boolean,
  current_tools       text,
  urgency             text,
  recommended_service text,
  full_transcript     text
);

alter table leads enable row level security;

-- Service role key (server-side) can insert; no public read/write
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'leads' and policyname = 'service role insert') then
    create policy "service role insert" on leads for insert to service_role with check (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'leads' and policyname = 'service role select') then
    create policy "service role select" on leads for select to service_role using (true);
  end if;
end $$;


-- ── bookings ────────────────────────────────────────────────
-- Populated by /api/webhooks/calcom on BOOKING_CREATED
create table if not exists bookings (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  uid             text unique not null,   -- Cal.com booking UID
  title           text not null,
  start_time      timestamptz not null,
  end_time        timestamptz not null,
  attendee_name   text,
  attendee_email  text
);

alter table bookings enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'bookings' and policyname = 'service role insert') then
    create policy "service role insert" on bookings for insert to service_role with check (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'bookings' and policyname = 'service role select') then
    create policy "service role select" on bookings for select to service_role using (true);
  end if;
end $$;


-- ── chat_logs ───────────────────────────────────────────────
-- Full chatbot conversation transcripts
create table if not exists chat_logs (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  session_id  text not null,
  role        text not null check (role in ('user', 'assistant')),
  content     text not null
);

alter table chat_logs enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'chat_logs' and policyname = 'service role insert') then
    create policy "service role insert" on chat_logs for insert to service_role with check (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'chat_logs' and policyname = 'service role select') then
    create policy "service role select" on chat_logs for select to service_role using (true);
  end if;
end $$;
