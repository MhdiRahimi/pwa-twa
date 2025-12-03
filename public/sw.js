self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  event.respondWith(
    fetch(request).catch(() => {
      if (request.mode === "navigate") {
        return new Response(
          "<h1>Offline</h1><p>Internet connection required.</p>",
          { headers: { "Content-Type": "text/html" } }
        );
      }
      return new Response(null, { status: 503 });
    })
  );
});

self.addEventListener("sync", (event) => {
  console.log("Background sync triggered:", event.tag);
  if (event.tag === "sync-cart") {
    event.waitUntil(syncCartActions());
  }
});
