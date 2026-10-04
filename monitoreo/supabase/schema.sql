-- ============================================================
-- Esquema para "Puntos de muestreo - Riachuelo"
-- Ejecutar completo en Supabase: Dashboard -> SQL Editor -> New query
-- ============================================================

-- Extensión para generar UUIDs
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Perfiles (nombre visible de cada usuario)
-- ------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles_select_all" on profiles
  for select using (auth.role() = 'authenticated');

create policy "profiles_insert_own" on profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id);

-- Crea automáticamente un perfil cuando alguien se registra
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nombre)
  values (new.id, coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------
-- Categorías de cobertura vegetal (editables por el equipo)
-- ------------------------------------------------------------
create table if not exists cobertura_categorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  color text not null,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table cobertura_categorias enable row level security;

create policy "cobertura_categorias_select_all" on cobertura_categorias
  for select using (auth.role() = 'authenticated');

create policy "cobertura_categorias_insert_all" on cobertura_categorias
  for insert with check (auth.role() = 'authenticated');

create policy "cobertura_categorias_update_all" on cobertura_categorias
  for update using (auth.role() = 'authenticated');

create policy "cobertura_categorias_delete_all" on cobertura_categorias
  for delete using (auth.role() = 'authenticated');

-- Categorías iniciales de referencia (el equipo puede agregar más desde la app)
insert into cobertura_categorias (nombre, color) values
  ('Bosque en galería', '#1F3B2C'),
  ('Pajonal / pirizal', '#8A9A3B'),
  ('Lomada con sabana', '#B58B4C'),
  ('Borde de estero', '#3F8C82')
on conflict (nombre) do nothing;

-- ------------------------------------------------------------
-- Puntos de muestreo
-- ------------------------------------------------------------
create table if not exists puntos (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('ave', 'camara', 'acceso', 'interes', 'cobertura')),
  cobertura_categoria_id uuid references cobertura_categorias(id),
  lat double precision not null,
  lng double precision not null,
  fecha date not null,
  autor_id uuid references auth.users(id),
  autor_nombre text not null,
  nota text,
  hallazgo boolean not null default false,
  tabla_datos jsonb,
  foto_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table puntos enable row level security;

create policy "puntos_select_all" on puntos
  for select using (auth.role() = 'authenticated');

create policy "puntos_insert_all" on puntos
  for insert with check (auth.role() = 'authenticated');

create policy "puntos_update_all" on puntos
  for update using (auth.role() = 'authenticated');

create policy "puntos_delete_all" on puntos
  for delete using (auth.role() = 'authenticated');

create index if not exists puntos_tipo_idx on puntos (tipo);
create index if not exists puntos_fecha_idx on puntos (fecha);

-- ------------------------------------------------------------
-- Storage: bucket para fotos de puntos
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('fotos-puntos', 'fotos-puntos', true)
on conflict (id) do nothing;

create policy "fotos_puntos_select_all" on storage.objects
  for select using (bucket_id = 'fotos-puntos');

create policy "fotos_puntos_insert_auth" on storage.objects
  for insert with check (bucket_id = 'fotos-puntos' and auth.role() = 'authenticated');

create policy "fotos_puntos_delete_auth" on storage.objects
  for delete using (bucket_id = 'fotos-puntos' and auth.role() = 'authenticated');
