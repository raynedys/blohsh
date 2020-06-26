
var CACHE_STATIC_NAME = 'static-v2';
var CACHE_DYNAMIC_NAME = 'dynamic-v2';

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  //supaya otomatis skip waiting
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          './',
          './index.html',
          './offline.html',
          './css/bootstrap.css',
          './css/linearicons.css',
          './css/themify-icons.css',
          './css/owl.carousel.css',
          './css/magnific-popup.css',
          './css/main.css',
          './css/optional.css',
          './js/vendor/jquery-2.2.4.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js',
          './js/vendor/bootstrap.min.js',
          './js/jquery.nice-select.min.js',
          './js/jquery.sticky.js',
          './js/nouislider.min.js',
          './js/jquery.magnific-popup.min.js',
          './js/owl.carousel.min.js',
          './js/script.js',
          './js/main.js',
          './img/category/kids.jpg',
          './img/category/woman.jpg',
          './img/category/men.jpg',
          './img/features/f-icon4.png',
          './img/features/f-icon3.png',
          './img/features/f-icon2.png',
          './img/features/f-icon1.png',
          './img/banner/banner-img2.jpg',
          './img/banner/banner-img.jpg',
          './img/logo.png',
          './img/fav.png',
          './fonts/themify.woff?-fvbane',
          './fonts/Linearicons-Free.woff2?w118d',
          'https://fonts.googleapis.com/css?family=Poppins:500,700|Roboto:400,500',
          // 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4.woff2',
          // 'https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2',
          // 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
          // 'https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2',
          // 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4.woff2',
          // 'https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2',
          // 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
          // 'https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2'
        ]);
      })
  )
});

//fungsi untuk menghapus cache klo ada perubahan, namun harus diupdate dulu static & dynamic cache 
self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err) {
              return caches.open(CACHE_STATIC_NAME)
                .then(function(cache) {
                  return cache.match('./offline.html');
                });
            });
        }
      })
  );
});