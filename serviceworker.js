const cacheName = 'version3';
const cacheAssets = [
    'index.html',
    'offline.html',
    '/css/style.css',
    '/js/app.js',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png'

]



//call install event
self.addEventListener('install', e => {
    console.log('Service worker : Installed')
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('Service Worker: caching files');
            cache.addAll(cacheAssets)
        })
        .then(() => self.skipWaiting())
    )
})

//activate event
self.addEventListener('activate', e => {
    console.log('Service worker : Activated');
    //remove the older cache files
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('service worker :clearing old cache')
                        return caches.delete(cache)
                    }

                })
            )
        })
    )
})

self.addEventListener('fetch', e => {
    console.log('Service worker : fetched');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})