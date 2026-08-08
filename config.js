// Completar con los datos de tu proyecto de Supabase
// Dashboard de Supabase -> Project Settings -> API
window.SUPABASE_CONFIG = {
  url: "https://TU-PROYECTO.supabase.co",
  anonKey: "TU-ANON-KEY-PUBLICA",
};

// La "anon key" es pública por diseño (no es un secreto): la seguridad real
// la dan las políticas RLS definidas en supabase/schema.sql, no esta clave.
