var boutonNotification = document.querySelectorAll(".enable-notifications");
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


function askPersmission() {
    Notification.requestPermission(result => {
        if (result === "granted") {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready
                    .then(sw => {
                        sw.showNotification('From roundPWA', {
                            body: 'hey!',
                            icon: '/src/images/icons/apple-icon-72x72.png',
                            image: '/src/images/sf-boat.jpg',
                            vibrate: [200, 50, 200],
                            tag: 'notification-test',
                            renotify: false,
                            actions: [
                                {
                                    action: 'confirm', title: 'Click me if you like my app'
                                }
                            ]
                        });
                    });
            }
        }
    });
}

if ('Notification' in window) {
    for (var i = 0; i < boutonNotification.length; i++) {
        boutonNotification[i].style.display = 'inline-block';
        boutonNotification[i].addEventListener('click', askPersmission);
    }
}
