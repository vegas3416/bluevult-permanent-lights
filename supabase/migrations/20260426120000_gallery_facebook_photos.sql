-- Facebook-sourced gallery images synced via Edge Function (Graph API → this table).
-- The site reads with the anon key; only the service role / Edge Function writes.

create table if not exists public.gallery_facebook_photos (
  id uuid primary key default gen_random_uuid(),
  fb_photo_id text not null unique,
  image_url text not null,
  width int,
  height int,
  created_time timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists gallery_facebook_photos_created_time_idx
  on public.gallery_facebook_photos (created_time desc nulls last);

alter table public.gallery_facebook_photos enable row level security;

create policy "Anyone can read gallery facebook photos"
  on public.gallery_facebook_photos
  for select
  to anon, authenticated
  using (true);

comment on table public.gallery_facebook_photos is 'Populated by sync-facebook-gallery Edge Function; public read for marketing site.';
