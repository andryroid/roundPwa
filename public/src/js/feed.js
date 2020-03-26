var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
var sharedMomentsArea = document.querySelector('#shared-moments');

function initializeCamera() {
  if ('getUserMedia' in navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        document.querySelector("#create-post video").style.display = 'block';
        document.querySelector("#player").srcObject = stream;
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  else {
    console.log('erreur media');
  }
}
function openCreatePostModal() {
  createPostArea.style.display = 'block';
  initializeCamera();
  /*if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function (choiceResult) {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === 'dismissed') {
        console.log('User cancelled installation');
      } else {
        console.log('User added to home screen');
      }
    });

    deferredPrompt = null;
  }*/
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
  document.querySelector("#create-post video").style.display = 'none';
  document.querySelector("#player").srcObject = null;
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
/*function handleSaveClick(event) {
  console.log('clicked!');
  if ('caches' in window) {
    caches.open('user-caching')
    
      .then(function (cache) {
        cache.addAll([
          'https://httpbin.org/get',
          '/src/images/sf-boat.jpg'
        ])
      })
  }
}*/
function createCard() {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
  var cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
  cardTitle.style.backgroundSize = 'cover';
  cardTitle.style.height = '180px';
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement('h2');
  cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = 'San Fransisco Trip';
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  cardSupportingText.textContent = 'In San Francisco';
  cardSupportingText.style.textAlign = 'center';
  /*var cardSaveButton = document.createElement("button");
  cardSaveButton.textContent = "Save";
  cardSupportingText.appendChild(cardSaveButton);
  cardSaveButton.addEventListener('click', handleSaveClick);*/
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

fetch('https://httpbin.org/get')
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    createCard();
  });

document.getElementById("post-btn").addEventListener('click', event => {
  event.preventDefault();
  if (document.getElementById('title').value != "" || document.getElementById('location').value != "") {
    //debut du synchro
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready
        .then(function (sw) {
          var enreg = {
            id: new Date().toISOString(),
            title: document.getElementById('title').value,
            location: document.getElementById('location').value
          };
          writeData('dataSync', enreg)
            .then(function () {
              return sw.sync.register('sync-data');
            })
            .then(function () {
              alert('enregistrement ok!');
            });
        });
    }
    else {
      console.log('send data directly');
    }
  }
  else {
    alert('input correct');
  }
});
