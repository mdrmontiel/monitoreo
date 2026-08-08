# Puntos de muestreo — Riachuelo

App web (sin build, HTML/CSS/JS plano) para que el equipo consultor marque puntos de
muestreo sobre el tramo Paso Martínez → San Luis del Palmar: aves, cámaras trampa,
fácil acceso, puntos de interés y cobertura vegetal (con categorías que el equipo
puede ir creando). Funciona sin conexión: los puntos se guardan en el dispositivo
(IndexedDB) y se sincronizan solos con Supabase cuando vuelve la señal.

## 1. Crear el proyecto en Supabase

1. Entrá a [supabase.com](https://supabase.com) y creá un proyecto nuevo (nombre
   sugerido: `riachuelo-muestreo`). Elegí una región cercana (São Paulo es la más
   próxima a Argentina).
2. Guardá la contraseña de la base que te pida — no hace falta después, pero por
   si acaso.
3. Cuando el proyecto esté listo, entrá a **SQL Editor** → **New query**, pegá
   **todo** el contenido de [`supabase/schema.sql`](./supabase/schema.sql) y
   ejecutalo (▶ Run). Esto crea las tablas, los permisos (RLS) y el bucket de
   fotos.
4. Entrá a **Project Settings → API**. Vas a necesitar dos datos:
   - **Project URL** (algo como `https://xxxxx.supabase.co`)
   - **anon public key** (una clave larga que empieza con `eyJ...`)
5. Abrí el archivo [`config.js`](./config.js) de este proyecto y reemplazá:
   ```js
   window.SUPABASE_CONFIG = {
     url: "https://TU-PROYECTO.supabase.co",
     anonKey: "TU-ANON-KEY-PUBLICA",
   };
   ```
   con tus valores reales.

   > La `anon key` es pública por diseño — no es un secreto. La seguridad la dan
   > las políticas RLS que ya quedaron definidas en `schema.sql` (solo usuarios
   > logueados pueden leer/escribir).

6. (Opcional, recomendado para un equipo chico) En **Authentication → Providers
   → Email**, podés desactivar "Confirm email" para que cada persona pueda
   entrar apenas se registra, sin tener que confirmar por correo. Si lo dejás
   activado, cada integrante va a tener que click en el mail de confirmación
   antes de poder ingresar la primera vez.

## 2. Probar en tu computadora (antes de subir nada)

No necesitás instalar nada para probarlo localmente. Alcanza con abrir
`index.html` con un servidor local simple (abrir el archivo por doble clic
**no** funciona bien para los Service Workers). Si tenés Python instalado:

```bash
cd riachuelo-app
python3 -m http.server 8080
```

y abrís `http://localhost:8080` en el navegador. Registrate con tu correo y
probá agregar un punto.

## 3. Subir a GitHub

```bash
cd riachuelo-app
git init
git add .
git commit -m "Primera version de la app de puntos de muestreo"
```

Después, en [github.com](https://github.com), creá un repositorio nuevo vacío
(sin README, sin .gitignore — ya los tenemos). Te va a mostrar algo como:

```bash
git remote add origin https://github.com/TU-USUARIO/NOMBRE-REPO.git
git branch -M main
git push -u origin main
```

Copiá esas líneas (con tu usuario y nombre de repo reales) y ejecutalas.

## 4. Publicar en Netlify

1. Entrá a [app.netlify.com](https://app.netlify.com) → **Add new site → Import
   an existing project**.
2. Elegí GitHub y seleccioná el repositorio que acabás de crear.
3. En la configuración de build, dejá:
   - **Build command**: (vacío, no hace falta)
   - **Publish directory**: `.` (la raíz del repo)
4. Deploy. En un minuto vas a tener una URL tipo `nombre-random.netlify.app`
   (después la podés renombrar desde **Site settings → Change site name**).

Cada vez que hagas `git push`, Netlify vuelve a publicar solo.

## 5. Invitar al equipo

Cada integrante entra a la URL de Netlify y crea su propia cuenta (correo +
contraseña) desde "Crear cuenta nueva". Todos los usuarios logueados pueden ver
y agregar/editar todos los puntos — no hay roles distintos.

## 6. Uso en el campo sin conexión

- Antes de salir a un sector sin señal, abrí la app **con conexión** y
  apretá **"Descargar mapa para uso offline"** — esto guarda las imágenes del
  mapa de la zona del tramo para poder verlas después sin señal.
- Los puntos que agregues sin conexión se guardan igual en el celular/notebook
  y muestran la etiqueta **"sin sync"**; se suben solos apenas vuelva la señal
  (también podés apretar "Actualizar" para forzarlo).
- Para que funcione como app instalable (ícono en el celular, pantalla
  completa), desde el navegador elegí "Agregar a pantalla de inicio" /
  "Instalar app".

## Estructura del proyecto

```
index.html          pantalla de login + app principal
styles.css          estilos
app.js              lógica: auth, mapa, formulario, sincronización offline
sw.js               service worker (caché de la app y de las baldosas del mapa)
manifest.json       metadata de la PWA (ícono, nombre)
config.js           URL y clave pública de tu proyecto Supabase (editar acá)
supabase/schema.sql tablas, permisos y bucket de fotos — correr en Supabase
icons/              íconos de la app
```

## Categorías de cobertura vegetal

Vienen 4 categorías iniciales (bosque en galería, pajonal/pirizal, lomada con
sabana, borde de estero), pero cualquiera del equipo puede agregar categorías
nuevas directamente desde el formulario ("+ Agregar categoría nueva..."),
eligiendo nombre y color. Quedan disponibles para todos apenas se crean (con
conexión).
