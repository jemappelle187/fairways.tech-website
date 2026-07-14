create table if not exists tracker_visitors (
  id text primary key,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  first_ip inet,
  last_ip inet,
  user_agent text,
  browser text,
  operating_system text,
  device text,
  language text,
  first_referrer text,
  first_utm jsonb not null default '{}'::jsonb,
  session_count integer not null default 0 check (session_count >= 0),
  is_bot boolean not null default false
);

create table if not exists tracker_sessions (
  id text primary key,
  visitor_id text not null references tracker_visitors(id) on delete cascade,
  started_at timestamptz not null,
  last_seen_at timestamptz not null,
  page_view_count integer not null default 0 check (page_view_count >= 0),
  event_count integer not null default 0 check (event_count >= 0),
  entry_url text not null,
  last_url text not null,
  referrer text,
  utm jsonb not null default '{}'::jsonb,
  ip_address inet,
  geo_city text,
  geo_region text,
  geo_country text,
  network_org text,
  device text,
  environment text not null,
  screen text,
  converted boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists tracker_events (
  id text primary key,
  session_id text not null references tracker_sessions(id) on delete cascade,
  visitor_id text not null references tracker_visitors(id) on delete cascade,
  event_type text not null check (
    event_type in ('page_view', 'cta_click', 'form_submit', 'browser_gps')
  ),
  occurred_at timestamptz not null,
  url text not null,
  path text not null,
  title text,
  action_label text,
  target_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists tracker_visitors_last_seen_idx
  on tracker_visitors (last_seen_at);
create index if not exists tracker_sessions_visitor_started_idx
  on tracker_sessions (visitor_id, started_at desc);
create index if not exists tracker_sessions_ip_device_started_idx
  on tracker_sessions (ip_address, device, started_at desc);
create index if not exists tracker_sessions_last_seen_idx
  on tracker_sessions (last_seen_at);
create index if not exists tracker_events_session_occurred_idx
  on tracker_events (session_id, occurred_at);
create index if not exists tracker_events_visitor_occurred_idx
  on tracker_events (visitor_id, occurred_at desc);

comment on table tracker_visitors is
  'Anonymous browser identifiers used for internal Fairways.Tech visit analytics.';
comment on column tracker_sessions.ip_address is
  'Full source IP retained for internal security and visit analysis.';
