// Service Worker for Portfolio Website
// Version: 1.1.0
// Caches resources for offline functionality with optimized cache lifetimes

const CACHE_NAME = 'portfolio-cache-v1.1';
const STATIC_CACHE_NAME = 'portfolio-static-v1.1';
const DYNAMIC_CACHE_NAME = 'portfolio-dynamic-v1.1';

// Cache lifetime constants (in milliseconds)
const STATIC_CACHE_MAX_AGE = 365 * 24 * 60 * 60 * 1000; // 1 year for static assets
const DYNAMIC_CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days for dynamic content
const IMAGE_CACHE_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days for images

// Development mode detection
const isDevelopment = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

// Production base path - matches the configuration in src/config/constants.js
const basePath = !isDevelopment ? '/portafolio' : '';

// Static assets to cache immediately
const STATIC_ASSETS = [
  basePath + '/',
  basePath + '/index.html',
  basePath + '/manifest.json',
  basePath + '/favicon.ico',
  basePath + '/favicon-geometric.svg',
  basePath + '/robots.txt',
  basePath + '/sitemap.xml',
  basePath + '/Engineer_Wilberto_Pacheco_Batista.pdf'
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first for static assets
  CACHE_FIRST: 'cache-first',
  // Network first for dynamic content
  NETWORK_FIRST: 'network-first',
  // Stale while revalidate for frequently updated content
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        // In development, only cache basic assets, let others be cached on demand
        if (isDevelopment) {
          return cache.addAll(STATIC_ASSETS.filter(asset => 
            !asset.includes('.js') && !asset.includes('.css')
          ));
        } else {
          return cache.addAll(STATIC_ASSETS);
        }
      })
      .then(() => {
        console.log('Service Worker: Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
        // Don't fail installation if some assets can't be cached
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle requests with appropriate caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // In development mode, skip service worker caching for Vite dev server
  // This prevents interference with HMR and ensures fresh content
  if (isDevelopment) {
    // Skip caching for Vite dev server requests (localhost/127.0.0.1)
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      // Let the request pass through without service worker interception
      return;
    }
    
    // For other development requests, use network-first strategy
    if (isStaticAsset(request) && (url.pathname.includes('.js') || url.pathname.includes('.css'))) {
      event.respondWith(handleDevelopmentAsset(request));
      return;
    }
  }

  // Check for no-cache headers and skip caching
  // This handles cases where servers explicitly set no-cache
  const cacheControl = request.headers.get('cache-control');
  if (cacheControl && (cacheControl.includes('no-cache') || cacheControl.includes('no-store'))) {
    // Skip service worker caching, let browser handle it
    return;
  }

  // Handle different types of requests
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isHTMLRequest(request)) {
    event.respondWith(handleHTMLRequest(request));
  } else if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isFontRequest(request)) {
    event.respondWith(handleFontRequest(request));
  } else {
    event.respondWith(handleGenericRequest(request));
  }
});

// Helper functions to determine request types
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(js|css|woff2?|ttf|eot)$/);
}

function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') || url.hostname.includes('api');
}

function isHTMLRequest(request) {
  return request.headers.get('accept')?.includes('text/html');
}

function isImageRequest(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/);
}

function isFontRequest(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(woff2?|ttf|eot)$/) || 
         url.hostname.includes('fonts.googleapis.com') ||
         url.hostname.includes('fonts.gstatic.com');
}

// Development-specific asset handling
async function handleDevelopmentAsset(request) {
  try {
    // In development, always try network first
    const networkResponse = await fetch(request);
    
    // Check if response has no-cache headers - don't cache these
    const cacheControl = networkResponse.headers.get('cache-control');
    if (cacheControl && (cacheControl.includes('no-cache') || cacheControl.includes('no-store'))) {
      // Return response without caching
      return networkResponse;
    }
    
    if (networkResponse.ok) {
      // Only cache if response doesn't have no-cache headers
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Development asset network failed, trying cache', request.url);
    
    // If network fails, try cache
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If no cache either, return minimal fallback
    const url = new URL(request.url);
    if (url.pathname.endsWith('.js')) {
      return new Response('// Offline - JavaScript not available', {
        status: 200,
        headers: { 'Content-Type': 'application/javascript' }
      });
    } else if (url.pathname.endsWith('.css')) {
      return new Response('/* Offline - CSS not available */', {
        status: 200,
        headers: { 'Content-Type': 'text/css' }
      });
    }
    
    throw error;
  }
}

// Helper function to check if cached response is still valid
function isCacheValid(cachedResponse, maxAge) {
  if (!cachedResponse) return false;
  
  const dateHeader = cachedResponse.headers.get('date');
  if (!dateHeader) return true; // If no date header, assume valid
  
  const responseDate = new Date(dateHeader).getTime();
  const now = Date.now();
  return (now - responseDate) < maxAge;
}

// Cache strategies implementation
async function handleStaticAsset(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    // Check if cached response is still valid (within max age)
    if (cachedResponse && isCacheValid(cachedResponse, STATIC_CACHE_MAX_AGE)) {
      return cachedResponse;
    }
    
    // Try to fetch from network
    try {
      const networkResponse = await fetch(request);
      
      // Check if response has no-cache headers - don't cache these
      const cacheControl = networkResponse.headers.get('cache-control');
      if (cacheControl && (cacheControl.includes('no-cache') || cacheControl.includes('no-store'))) {
        // Return response without caching
        return networkResponse;
      }
      
      if (networkResponse.ok) {
        // Clone response before caching
        const responseToCache = networkResponse.clone();
        // Add cache headers for long-term caching
        const headers = new Headers(responseToCache.headers);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
        headers.set('Date', new Date().toUTCString());
        
        const modifiedResponse = new Response(responseToCache.body, {
          status: responseToCache.status,
          statusText: responseToCache.statusText,
          headers: headers
        });
        
        cache.put(request, modifiedResponse.clone());
        return networkResponse;
      }
    } catch (networkError) {
      console.log('Service Worker: Network unavailable for static asset', request.url);
      // Return stale cache if available, even if expired
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    // If no cache and no network, return appropriate fallback
    const url = new URL(request.url);
    if (url.pathname.endsWith('.js')) {
      return new Response('// Offline - JavaScript not available', {
        status: 200,
        headers: { 'Content-Type': 'application/javascript' }
      });
    } else if (url.pathname.endsWith('.css')) {
      return new Response('/* Offline - CSS not available */', {
        status: 200,
        headers: { 'Content-Type': 'text/css' }
      });
    }
    
    return new Response('Offline - Static asset not available', { 
      status: 503, 
      statusText: 'Service Unavailable' 
    });
  } catch (error) {
    console.error('Service Worker: Error handling static asset', error);
    return new Response('Offline - Static asset not available', { 
      status: 503, 
      statusText: 'Service Unavailable' 
    });
  }
}

async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response(JSON.stringify({ 
      error: 'Offline - API not available',
      message: 'Please check your internet connection and try again.'
    }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleHTMLRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(basePath + '/index.html');
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offline - Portfolio</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1.0">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px; 
              background: #f5f5f5; 
            }
            .offline-message { 
              background: white; 
              padding: 30px; 
              border-radius: 10px; 
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              max-width: 500px;
              margin: 0 auto;
            }
            h1 { color: #333; }
            p { color: #666; }
            .retry-btn {
              background: #007bff;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="offline-message">
            <h1>You're Offline</h1>
            <p>It looks like you're not connected to the internet. Some features may not be available.</p>
            <p>Please check your connection and try again.</p>
            <button class="retry-btn" onclick="window.location.reload()">Retry</button>
          </div>
        </body>
      </html>
    `, {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

async function handleImageRequest(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    // Check if cached image is still valid
    if (cachedResponse && isCacheValid(cachedResponse, IMAGE_CACHE_MAX_AGE)) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Add cache headers for image caching
      const headers = new Headers(networkResponse.headers);
      headers.set('Cache-Control', 'public, max-age=2592000'); // 30 days
      headers.set('Date', new Date().toUTCString());
      
      const responseToCache = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: headers
      });
      
      cache.put(request, responseToCache.clone());
      return networkResponse;
    }
    
    // Return stale cache if available
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return networkResponse;
  } catch (error) {
    // Return cached response if available, even if expired
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return a placeholder image or transparent pixel
    return new Response(
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+',
      {
        headers: { 'Content-Type': 'image/svg+xml' }
      }
    );
  }
}

async function handleFontRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    // Fonts should be cached long-term (1 year)
    if (cachedResponse && isCacheValid(cachedResponse, STATIC_CACHE_MAX_AGE)) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Add cache headers for long-term font caching
      const headers = new Headers(networkResponse.headers);
      headers.set('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
      headers.set('Date', new Date().toUTCString());
      
      const responseToCache = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: headers
      });
      
      cache.put(request, responseToCache.clone());
      return networkResponse;
    }
    
    // Return stale cache if available
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Font request failed', error);
    // Return cached font if available
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('', { status: 404 });
  }
}

async function handleGenericRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Offline - Resource not available', { 
      status: 503, 
      statusText: 'Service Unavailable' 
    });
  }
}

// Background sync for when connection is restored
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Clear old dynamic cache entries based on cache type
    const dynamicCache = await caches.open(DYNAMIC_CACHE_NAME);
    const staticCache = await caches.open(STATIC_CACHE_NAME);
    
    // Clean dynamic cache (7 days)
    const dynamicRequests = await dynamicCache.keys();
    for (const request of dynamicRequests) {
      const response = await dynamicCache.match(request);
      if (response && !isCacheValid(response, DYNAMIC_CACHE_MAX_AGE)) {
        await dynamicCache.delete(request);
      }
    }
    
    // Clean static cache (1 year) - only remove if really old
    const staticRequests = await staticCache.keys();
    for (const request of staticRequests) {
      const response = await staticCache.match(request);
      if (response && !isCacheValid(response, STATIC_CACHE_MAX_AGE)) {
        await staticCache.delete(request);
      }
    }
    
    console.log('Service Worker: Background sync completed - cache cleaned');
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/favicon-geometric.svg',
    badge: '/favicon-geometric.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/favicon-geometric.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon-geometric.svg'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Portfolio Update', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(basePath + '/')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('Service Worker: Loaded successfully');
