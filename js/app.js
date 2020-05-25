if ('serviceWorker' in navigator) {
    //console.log('service worker is supported')
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../cached_serviceworker_sites.js')
            .then(reg => console.log('service worker is registered'))
            .catch(err => console.log(`Service Worker :Error :${err}`))
    })
}