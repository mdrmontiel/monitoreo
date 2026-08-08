const APP_CACHE = "riachuelo-app-v1";
const TILE_CACHE = "riachuelo-tiles-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./config.js",
  "./manifest.json",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js",
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_CACHE).then((cache) =>
      Promise.all(
        APP_SHELL.map((url) =>
          cache.add(url).catch(() => {
            // si un recurso externo falla al cachear, no bloquear la instalación
          })
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== APP_CACHE && k !== TILE_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

function isTileRequest(url) {
  return (
    url.includes("tile.openstreetmap.org") ||
    url.includes("arcgisonline.com")
  );
}

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  if (isTileRequest(url)) {
    event.respondWith(
      caches.open(TILE_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        try {
          const res = await fetch(event.request);
          cache.put(event.request, res.clone());
          return res;
        } catch (err) {
          return cached || Response.error();
        }
      })
    );
    return;
  }

  if (url.includes("supabase.co")) {
    // Datos: siempre intentar red primero (la app maneja el modo offline
    // con IndexedDB); no interceptar estas llamadas.
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((res) => {
          const resClone = res.clone();
          caches.open(APP_CACHE).then((cache) => cache.put(event.request, resClone));
          return res;
        })
        .catch(() => cached);
    })
  );
});

// Permite que la app pida precarga de baldosas para una zona (uso offline en el campo)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "PRECACHE_TILES") {
    const urls = event.data.urls || [];
    caches.open(TILE_CACHE).then((cache) => {
      urls.forEach((u) => {
        fetch(u)
          .then((res) => res.ok && cache.put(u, res))
          .catch(() => {});
      });
    });
  }
});
