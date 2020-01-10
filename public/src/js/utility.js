//use indexedDB to store data
var dbPromise = idb.open('dataTest-store', 1, function (db) {
    if (!db.objectStoreNames.contains('dataTest')) {
        db.createObjectStore("dataTest", { keyPath: "id" });
    }

});
//////////////////

function writeData(st, data) {
    //store in indexedDB
    dbPromise.then(function (db) {
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st);
        store.put(data);
        return tx.complete;
    });
    //fin storage indexedDBnpm 
}