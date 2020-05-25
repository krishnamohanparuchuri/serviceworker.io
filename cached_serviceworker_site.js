const cacheName = 'version4';


//call install event
self.addEventListener('install', e => {
    console.log('Service worker : Installed')
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
        // caches.match(e.request)
        // .then((res) => {
        //     if (!navigator.online) {
        //         if (res) {
        //             return res;
        //         } else {
        //             return caches.match(new Request('offline.html'))
        //         }
        //     } else {
        //         return upDateCache(e.request)
        //     }
        // })


        fetch(e.request)
        .then(res => {
            //make a clone/copy of respone
            const resClone = res.clone();
            caches.open(cacheName)
                .then(cache => {
                    //add response to cache
                    cache.put(e.request, resClone)
                });
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    )
})

// async function upDateCache(request) {
//     return fetch(request)
//         .then((res) => {
//             if (res) {
//                 return caches.open(cacheName)
//                     .then((cache) => {
//                         return cache.put(request, res.clone())
//                             .then(() => {
//                                 return res
//                             })
//                     })

//             }

//         })
// }