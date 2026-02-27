// Service Worker for InfraLive Solutions
// Version: 1.0.0
// Cache: infralive-v1

const CACHE_NAME = 'infralive-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/case-studies.html',
  '/contact.html',
  '/css/style.css',
  '/js/main.js',
  '/assets/site.webmanifest',
  '/favicon.ico'
];

// Install event - precache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching critical assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - cache-first strategy
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension requests
  if (event.request.url.indexOf('chrome-extension') !== -1) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if found
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return cachedResponse;
        }
        
        // Otherwise fetch from network
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Cache the response for future use
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('Service Worker: Caching new resource', event.request.url);
              });
            
            return response;
          })
          .catch(error => {
            console.log('Service Worker: Fetch failed; returning offline page', error);
            
            // If the request is for a page, return offline page
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match(OFFLINE_URL);
            }
            
            // For other requests, return a fallback
            return new Response('Network error occurred', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'submit-form') {
    console.log('Service Worker: Background sync for form submission');
    event.waitUntil(submitPendingForms());
  }
});

// Periodic background updates
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-cache') {
    console.log('Service Worker: Periodic cache update');
    event.waitUntil(updateCache());
  }
});

// Update cache with fresh content
async function updateCache() {
  const cache = await caches.open(CACHE_NAME);
  const requests = await cache.keys();
  
  return Promise.all(
    requests.map(async request => {
      try {
        const response = await fetch(request);
        if (response.status === 200) {
          await cache.put(request, response);
          console.log('Service Worker: Updated cache for', request.url);
        }
      } catch (error) {
        console.log('Service Worker: Failed to update', request.url, error);
      }
    })
  );
}

// Submit pending forms (simplified)
async function submitPendingForms() {
  // In a real implementation, this would submit forms stored in IndexedDB
  console.log('Service Worker: Submitting pending forms');
  return Promise.resolve();
}

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update from InfraLive Solutions',
    icon: '/assets/icon-192x192.png',
    badge: '/assets/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/assets/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('InfraLive Solutions', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification click received');
  
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});