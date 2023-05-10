const CACHE_NAME = "version-1"
const urlToCache = ["index.html", "offline.html"]


this.addEventListener('install', (event) =>{
    event.waitUntill(
        caches.open(CACHE_NAME). then((cache) =>{
            console.log("Open Cache");
            return cache.addAll(urlToCache);
        })
    )
})

this.addEventListener("fetch", (event) =>{
    event.respondWith(
        caches.match(event.request). then((res) =>{
            return fetch(event.request).catch(() =>caches.match('offline.html'))
        })
    )
})

this.addEventListener('activate', (event) =>{
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)
    event.waitUntill(caches.keys().then((cacheNames) =>Promise.all(
        cacheNames.map((cacheName) =>{
            if(!cacheWhiteList.includes(cacheName)){
                return caches.delete(cacheName);
            }
        })
    )))
})
