//use indexedDB to store data
var dbPromise = idb.open('dataTest-store', 1, function (db) {
    if (!db.objectStoreNames.contains('dataTest')) {
        db.createObjectStore("dataTest", { keyPath: "id" });
    }

    if (!db.objectStoreNames.contains('dataSync')) {
        db.createObjectStore("dataSync", { keyPath: "id" });
    }

});
//////////////////

function writeData(st, data) {
    //store in indexedDB
    return dbPromise.then(function (db) {
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st);
        store.put(data);
        return tx.complete;
    });
    //fin storage indexedDBnpm 
}

//function which get all data
function readData(st) {
    return dbPromise.then(function (db) {
        var tx = db.transaction(st, 'readonly');
        var store = tx.objectStore(st);
        return store.getAll();
    });
}

//store.get(id)
//store.clear();
//store.delete(id);


function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}