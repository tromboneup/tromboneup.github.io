// NoteUp! moved to https://noteup-app.github.io/. This worker replaces the old one, empties its cache, removes itself
// and reloads open pages, which then get the redirect from the network.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", event => event.waitUntil((async () => {
  for (const key of await caches.keys()) await caches.delete(key);
  await self.registration.unregister();
  for (const client of await self.clients.matchAll({ type: "window" })) client.navigate(client.url);
})()));
