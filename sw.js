
// var CACHE_STATIC_NAME = 'static-v3';
// var CACHE_DYNAMIC_NAME = 'dynamic-v3';

// self.addEventListener('install', function(event) {
//   console.log('[Service Worker] Installing Service Worker ...', event);
//   //supaya otomatis skip waiting
//   self.skipWaiting();
//   event.waitUntil(
//     caches.open(CACHE_STATIC_NAME)
//       .then(function(cache) {
//         console.log('[Service Worker] Precaching App Shell');
//         cache.addAll([
//           '/',
//           '/index.html',
//           '/style.css',
//           '/app.js',
//           '/piano-802531_960_720.png',
//           'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
//           'https://code.jquery.com/jquery-3.5.1.slim.min.js',
//           'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
//           'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js',
//         ]);
//       })
//   )
// });

// //fungsi untuk menghapus cache klo ada perubahan, namun harus diupdate dulu static & dynamic cache 
// self.addEventListener('activate', function(event) {
//   console.log('[Service Worker] Activating Service Worker ....', event);
//   event.waitUntil(
//     caches.keys()
//       .then(function(keyList) {
//         return Promise.all(keyList.map(function(key) {
//           if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
//             console.log('[Service Worker] Removing old cache.', key);
//             return caches.delete(key);
//           }
//         }));
//       })
//   );
//   return self.clients.claim();
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 })
//             })
//             .catch(function(err) {

//             });
//         }
//       })
//   );
// });