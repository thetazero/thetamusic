const assets = [
    "/",
    "/index.html",
    "/c/nav.js",
    "/c/playlist.js",
    "/c/result.js",
    "/main.css",
    "/api.js",
    "/serviceWorker.js",
    "/favicon-16x16.png",
    "/favicon-32x32.png",
    "/favicon-96x96.png",
    "/manifest.json",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-512x512.png",
    "/images/icons/icon-96x96.png",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open('thetamusic_static').then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})