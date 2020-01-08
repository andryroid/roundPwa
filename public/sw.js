//var index = Math.random();
var index = 1;
var STATIC_CACHE = "static-v" + index;
var DYNAMIC_CACHE = "dynamic-v" + index;
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(function (cache) {
                cache.addAll([
                    "/",
                    "index.html",
                    "offline.html",
                    "https://fonts.googleapis.com/css?family=Roboto:400,700",
                    "https://fonts.googleapis.com/icon?family=Material+Icons",
                    "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
                    "/src/images/main-image.jpg",
                    "/src/css/app.css",
                    "/src/css/feed.css",
                    "/manifest.json",
                    "/src/js/material.min.js",
                    "/src/js/promise.js",
                    "/src/js/fetch.js",
                    "/src/js/app.js",
                    "/src/js/feed.js",
                ]);
            })
    );
});
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys()
            .then(function (listeKey) {
                return Promise.all(listeKey.map(function (key) {
                    if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                        return caches.delete(key);
                    }
                }))
            })
    );
});

//catch all fetch 
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                else {
                    return fetch(event.request)
                        .then(function (res) {
                            return caches.open(DYNAMIC_CACHE)
                                .then(function (cache) {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                                .catch(function () {

                                })
                                ;
                        })
                        .catch(function (error) {
                            return caches.open(STATIC_CACHE)
                                .then(function (cache) {
                                    return cache.match('/offline.html');
                                })
                        })
                        ;
                }
            })
    );
});
