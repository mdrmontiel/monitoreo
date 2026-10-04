-- ============================================================
-- Migración v2: roles de usuario + registros de obra + alertas
-- Ejecutar UNA vez en Supabase: SQL Editor -> New query -> Run
-- (no borra nada de lo que ya existe)
-- ============================================================

-- ------------------------------------------------------------
-- 1. Rol en el perfil
--    equipo      = equipo de línea de base (todo)
--    obra        = operario / encargado ambiental (carga registros de obra)
--    icaa        = supervisión (ve todo, atiende alertas, exporta)
--    propietario = ciencia ciudadana (carga avistajes)
-- ------------------------------------------------------------
alter table profiles add column if not exists rol text not null default 'obra'
  check (rol in ('equipo', 'obra', 'icaa', 'propietario'));

-- Quienes ya tenían cuenta son del equipo de línea de base
update profiles set rol = 'equipo' where created_at < now();

-- Nadie puede cambiarse su propio rol desde la app
create or replace function public.proteger_rol()
returns trigger as $$
begin
  if new.rol is distinct from old.rol and public.mi_rol() <> 'equipo' then
    new.rol := old.rol;
  end if;
  return new;
end;
$$ language plpgsql security definer;

-- Rol del usuario logueado (se usa en las políticas)
create or replace function public.mi_rol()
returns text as $$
  select rol from public.profiles where id = auth.uid();
$$ language sql stable security definer;

drop trigger if exists profiles_proteger_rol on profiles;
create trigger profiles_proteger_rol
  before update on profiles
  for each row execute procedure public.proteger_rol();

-- El equipo puede asignar roles a otros
drop policy if exists "profiles_update_equipo" on profiles;
create policy "profiles_update_equipo" on profiles
  for update using (public.mi_rol() = 'equipo');

-- ------------------------------------------------------------
-- 2. Puntos de muestreo: solo el equipo carga y edita
-- ------------------------------------------------------------
drop policy if exists "puntos_insert_all" on puntos;
drop policy if exists "puntos_update_all" on puntos;
drop policy if exists "puntos_delete_all" on puntos;

create policy "puntos_insert_equipo" on puntos
  for insert with check (public.mi_rol() = 'equipo');
create policy "puntos_update_equipo" on puntos
  for update using (public.mi_rol() = 'equipo');
create policy "puntos_delete_equipo" on puntos
  for delete using (public.mi_rol() = 'equipo');

-- ------------------------------------------------------------
-- 3. Registros de obra
--    tipo: avance | arbol | hallazgo | medida
-- ------------------------------------------------------------
create table if not exists registros_obra (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('avance', 'arbol', 'hallazgo', 'medida')),
  fecha date not null,
  autor_id uuid references auth.users(id),
  autor_nombre text not null,
  lat double precision,
  lng double precision,
  progresiva numeric(6,3),
  sector text,
  -- avance: prog_inicio, prog_fin, checklist{}, margen
  -- arbol: especie, dap_cm, motivo
  -- hallazgo: subtipo, especie, accion
  datos jsonb not null default '{}'::jsonb,
  nota text,
  foto_url text,
  critico boolean not null default false,
  atendida boolean not null default false,
  atendida_por text,
  atendida_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table registros_obra enable row level security;

drop policy if exists "registros_select" on registros_obra;
drop policy if exists "registros_insert" on registros_obra;
drop policy if exists "registros_update" on registros_obra;
drop policy if exists "registros_delete" on registros_obra;

-- Todos los usuarios logueados ven los registros (propietarios: solo los suyos)
create policy "registros_select" on registros_obra
  for select using (
    auth.role() = 'authenticated'
    and (public.mi_rol() <> 'propietario' or autor_id = auth.uid())
  );

-- Cada uno carga a su nombre; propietarios solo hallazgos
create policy "registros_insert" on registros_obra
  for insert with check (
    autor_id = auth.uid()
    and (public.mi_rol() <> 'propietario' or tipo = 'hallazgo')
  );

-- El autor corrige lo suyo; equipo e ICAA marcan alertas como atendidas
create policy "registros_update" on registros_obra
  for update using (
    autor_id = auth.uid() or public.mi_rol() in ('equipo', 'icaa')
  );

create policy "registros_delete" on registros_obra
  for delete using (public.mi_rol() = 'equipo');

create index if not exists registros_fecha_idx on registros_obra (fecha);
create index if not exists registros_critico_idx on registros_obra (critico, atendida);

-- Alertas en tiempo real
do $$ begin
  alter publication supabase_realtime add table registros_obra;
exception when duplicate_object then null; end $$;
