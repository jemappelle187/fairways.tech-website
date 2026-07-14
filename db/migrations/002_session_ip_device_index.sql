drop index if exists tracker_sessions_ip_device_started_idx;

create index tracker_sessions_ip_device_started_idx
  on tracker_sessions (ip_address, device, started_at desc);
