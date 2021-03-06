importScripts('/src/js/idb.js');
importScripts('/src/js/utility.js');

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
                    "/src/js/idb.js"
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
                            writeData("dataTest", {
                                id: 1, nom: "ANDRY"
                            });
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

    readData('dataTest').then(function (data) {
        console.log(data);
    });
});


self.addEventListener('sync', function (event) {
    if (event.tag == "sync-data") {
        event.waitUntil(
            //read data 
            //send to server
            //remove from idb
        );
    }
});

self.addEventListener('notificationclick', event => {
    var notification = event.notification;
    var action = event.action;

    if (action === 'confirm') {
        console.log('confirm has been clicked!');
        notification.close();
    }
});


//listening to push event
self.addEventListener('push', function (event) {
    console.log(event);
});