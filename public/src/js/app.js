//check if the web browser supports Promise
if (!window.Promise) window.Promise = Promise;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(argument => {
            console.log("register successfully");
        })
        .catch(function () { })
        ;
}
else {
    console.log('service worker is not enable on your browser');
}

