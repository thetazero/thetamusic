const assets = [
    "/",
    "/index.html",
    "/c/nav.js",
    "/c/playlist.js",
    "/c/result.js",
    "/main.css",
    "/api.js"
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