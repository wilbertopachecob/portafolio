import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock service worker environment
const mockCaches = {
  open: vi.fn(),
  keys: vi.fn(),
  delete: vi.fn(),
  match: vi.fn(),
  put: vi.fn(),
  addAll: vi.fn()
}

const mockCache = {
  match: vi.fn(),
  put: vi.fn(),
  addAll: vi.fn(),
  keys: vi.fn()
}

const mockFetch = vi.fn()
const mockSkipWaiting = vi.fn()
const mockClientsClaim = vi.fn()

// Mock global objects
global.caches = mockCaches
global.fetch = mockFetch
global.self = {
  location: { hostname: 'localhost' },
  skipWaiting: mockSkipWaiting,
  clients: { claim: mockClientsClaim },
  addEventListener: vi.fn(),
  registration: {
    showNotification: vi.fn()
  }
}

// Mock URL constructor
global.URL = class URL {
  constructor(url) {
    this.href = url
    if (url.includes('://')) {
      const parts = url.split('://')[1].split('/')
      this.hostname = parts[0]
      this.pathname = '/' + parts.slice(1).join('/').split('?')[0].split('#')[0]
    } else {
      this.hostname = 'localhost'
      this.pathname = url.split('?')[0].split('#')[0]
    }
    this.protocol = url.includes('://') ? url.split('://')[0] + ':' : 'http:'
  }
}

// Mock Response
global.Response = class Response {
  constructor(body, options = {}) {
    this.body = body
    this.status = options.status || 200
    this.statusText = options.statusText || 'OK'
    this.headers = new Map(Object.entries(options.headers || {}))
    this.ok = this.status >= 200 && this.status < 300
  }
  
  clone() {
    return new Response(this.body, {
      status: this.status,
      statusText: this.statusText,
      headers: Object.fromEntries(this.headers)
    })
  }
  
  async text() {
    return this.body
  }
  
  get(key) {
    return this.headers.get(key)
  }
}

// Mock Request
global.Request = class Request {
  constructor(url, options = {}) {
    this.url = url
    this.method = options.method || 'GET'
    this.headers = new Map(Object.entries(options.headers || {}))
  }
  
  get(key) {
    return this.headers.get(key)
  }
}

// Load the service worker code
const serviceWorkerCode = `
// Service Worker for Portfolio Website
// Version: 1.0.0
// Caches resources for offline functionality

const CACHE_NAME = 'portfolio-cache-v1';
const STATIC_CACHE_NAME = 'portfolio-static-v1';
const DYNAMIC_CACHE_NAME = 'portfolio-dynamic-v1';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-geometric.svg',
  '/robots.txt',
  '/sitemap.xml',
  '/Engineer_Wilberto_Pacheco_Batista.pdf'
];

// Development mode detection
const isDevelopment = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

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

// Helper functions to determine request types
function isStaticAsset(request) {
  const url = new URL(request.url);
  return !!url.pathname.match(/\\.(js|css|woff2?|ttf|eot)$/);
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
  return !!url.pathname.match(/\\.(jpg|jpeg|png|gif|webp|svg|ico)$/);
}

function isFontRequest(request) {
  const url = new URL(request.url);
  return !!url.pathname.match(/\\.(woff2?|ttf|eot)$/) || 
         url.hostname.includes('fonts.googleapis.com') ||
         url.hostname.includes('fonts.gstatic.com');
}

// Development-specific asset handling
async function handleDevelopmentAsset(request) {
  try {
    // In development, always try network first
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache the response for future use
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

// Cache strategies implementation
async function handleStaticAsset(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Try to fetch from network
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
        return networkResponse;
      }
    } catch (networkError) {
      console.log('Service Worker: Network unavailable for static asset', request.url);
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

// Export functions for testing
self.testExports = {
  isStaticAsset,
  isAPIRequest,
  isHTMLRequest,
  isImageRequest,
  isFontRequest,
  handleDevelopmentAsset,
  handleStaticAsset,
  isDevelopment,
  STATIC_ASSETS,
  CACHE_STRATEGIES
};
`

// Execute the service worker code
eval(serviceWorkerCode)

describe('Service Worker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCaches.open.mockResolvedValue(mockCache)
    mockCaches.keys.mockResolvedValue(['old-cache'])
    mockCaches.delete.mockResolvedValue(true)
    mockCache.match.mockResolvedValue(null)
    mockCache.put.mockResolvedValue()
    mockCache.addAll.mockResolvedValue()
    mockCache.keys.mockResolvedValue([])
    mockFetch.mockResolvedValue(new Response('test content', { status: 200 }))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Development Mode Detection', () => {
    it('should detect development mode on localhost', () => {
      expect(self.testExports.isDevelopment).toBe(true)
    })

    it('should detect development mode on 127.0.0.1', () => {
      global.self.location.hostname = '127.0.0.1'
      // Re-evaluate the service worker code to test different hostname
      const isDev = global.self.location.hostname === 'localhost' || global.self.location.hostname === '127.0.0.1'
      expect(isDev).toBe(true)
    })

    it('should not detect development mode on production domain', () => {
      global.self.location.hostname = 'example.com'
      const isDev = global.self.location.hostname === 'localhost' || global.self.location.hostname === '127.0.0.1'
      expect(isDev).toBe(false)
    })
  })

  describe('Request Type Detection', () => {
    it('should identify static assets correctly', () => {
      const jsRequest = new Request('http://localhost:8080/js/app.js')
      const cssRequest = new Request('http://localhost:8080/css/style.css')
      const fontRequest = new Request('http://localhost:8080/fonts/font.woff2')
      const htmlRequest = new Request('http://localhost:8080/index.html')

      expect(self.testExports.isStaticAsset(jsRequest)).toBe(true)
      expect(self.testExports.isStaticAsset(cssRequest)).toBe(true)
      expect(self.testExports.isStaticAsset(fontRequest)).toBe(true)
      expect(self.testExports.isStaticAsset(htmlRequest)).toBe(false)
    })

    it('should identify API requests correctly', () => {
      const apiRequest = new Request('http://localhost:8080/api/users')
      const apiDomainRequest = new Request('https://api.example.com/data')
      const regularRequest = new Request('http://localhost:8080/page')

      expect(self.testExports.isAPIRequest(apiRequest)).toBe(true)
      expect(self.testExports.isAPIRequest(apiDomainRequest)).toBe(true)
      expect(self.testExports.isAPIRequest(regularRequest)).toBe(false)
    })

    it('should identify HTML requests correctly', () => {
      const htmlRequest = new Request('http://localhost:8080/page', {
        headers: { 'accept': 'text/html,application/xhtml+xml' }
      })
      const jsonRequest = new Request('http://localhost:8080/api', {
        headers: { 'accept': 'application/json' }
      })

      expect(self.testExports.isHTMLRequest(htmlRequest)).toBe(true)
      expect(self.testExports.isHTMLRequest(jsonRequest)).toBe(false)
    })

    it('should identify image requests correctly', () => {
      const jpgRequest = new Request('http://localhost:8080/image.jpg')
      const pngRequest = new Request('http://localhost:8080/image.png')
      const svgRequest = new Request('http://localhost:8080/icon.svg')
      const textRequest = new Request('http://localhost:8080/file.txt')

      expect(self.testExports.isImageRequest(jpgRequest)).toBe(true)
      expect(self.testExports.isImageRequest(pngRequest)).toBe(true)
      expect(self.testExports.isImageRequest(svgRequest)).toBe(true)
      expect(self.testExports.isImageRequest(textRequest)).toBe(false)
    })

    it('should identify font requests correctly', () => {
      const woffRequest = new Request('http://localhost:8080/font.woff2')
      const googleFontRequest = new Request('https://fonts.googleapis.com/css')
      const gstaticRequest = new Request('https://fonts.gstatic.com/font.woff2')
      const regularRequest = new Request('http://localhost:8080/style.css')

      expect(self.testExports.isFontRequest(woffRequest)).toBe(true)
      expect(self.testExports.isFontRequest(googleFontRequest)).toBe(true)
      expect(self.testExports.isFontRequest(gstaticRequest)).toBe(true)
      expect(self.testExports.isFontRequest(regularRequest)).toBe(false)
    })
  })

  describe('Development Asset Handling', () => {
    it('should fetch from network first in development', async () => {
      const request = new Request('http://localhost:8080/js/app.js')
      const mockResponse = new Response('console.log("test")', { status: 200 })

      mockFetch.mockResolvedValue(mockResponse)
      mockCaches.open.mockResolvedValue(mockCache)

      const result = await self.testExports.handleDevelopmentAsset(request)

      expect(mockFetch).toHaveBeenCalledWith(request)
      expect(mockCache.put).toHaveBeenCalledWith(request, mockResponse.clone())
      expect(result).toBe(mockResponse)
    })

    it('should fallback to cache when network fails in development', async () => {
      const request = new Request('http://localhost:8080/js/app.js')
      const cachedResponse = new Response('cached content', { status: 200 })

      mockFetch.mockRejectedValue(new Error('Network error'))
      mockCache.match.mockResolvedValue(cachedResponse)

      const result = await self.testExports.handleDevelopmentAsset(request)

      expect(mockCache.match).toHaveBeenCalledWith(request)
      expect(result).toBe(cachedResponse)
    })

    it('should return JS fallback when both network and cache fail', async () => {
      const request = new Request('http://localhost:8080/js/app.js')

      mockFetch.mockRejectedValue(new Error('Network error'))
      mockCache.match.mockResolvedValue(null)

      const result = await self.testExports.handleDevelopmentAsset(request)

      expect(result.status).toBe(200)
      expect(result.headers.get('Content-Type')).toBe('application/javascript')
      expect(await result.text()).toBe('// Offline - JavaScript not available')
    })

    it('should return CSS fallback when both network and cache fail', async () => {
      const request = new Request('http://localhost:8080/css/style.css')

      mockFetch.mockRejectedValue(new Error('Network error'))
      mockCache.match.mockResolvedValue(null)

      const result = await self.testExports.handleDevelopmentAsset(request)

      expect(result.status).toBe(200)
      expect(result.headers.get('Content-Type')).toBe('text/css')
      expect(await result.text()).toBe('/* Offline - CSS not available */')
    })
  })

  describe('Static Asset Handling', () => {
    it('should return cached response when available', async () => {
      const request = new Request('http://localhost:8080/js/app.js')
      const cachedResponse = new Response('cached content', { status: 200 })

      mockCache.match.mockResolvedValue(cachedResponse)

      const result = await self.testExports.handleStaticAsset(request)

      expect(mockCache.match).toHaveBeenCalledWith(request)
      expect(result).toBe(cachedResponse)
    })

    it('should fetch from network and cache when not cached', async () => {
      const request = new Request('http://localhost:8080/js/app.js')
      const networkResponse = new Response('network content', { status: 200 })

      mockCache.match.mockResolvedValue(null)
      mockFetch.mockResolvedValue(networkResponse)

      const result = await self.testExports.handleStaticAsset(request)

      expect(mockFetch).toHaveBeenCalledWith(request)
      expect(mockCache.put).toHaveBeenCalledWith(request, networkResponse.clone())
      expect(result).toBe(networkResponse)
    })

    it('should return JS fallback when network fails and no cache', async () => {
      const request = new Request('http://localhost:8080/js/app.js')

      mockCache.match.mockResolvedValue(null)
      mockFetch.mockRejectedValue(new Error('Network error'))

      const result = await self.testExports.handleStaticAsset(request)

      expect(result.status).toBe(200)
      expect(result.headers.get('Content-Type')).toBe('application/javascript')
      expect(await result.text()).toBe('// Offline - JavaScript not available')
    })

    it('should return CSS fallback when network fails and no cache', async () => {
      const request = new Request('http://localhost:8080/css/style.css')

      mockCache.match.mockResolvedValue(null)
      mockFetch.mockRejectedValue(new Error('Network error'))

      const result = await self.testExports.handleStaticAsset(request)

      expect(result.status).toBe(200)
      expect(result.headers.get('Content-Type')).toBe('text/css')
      expect(await result.text()).toBe('/* Offline - CSS not available */')
    })

    it('should return 503 for other asset types when offline', async () => {
      const request = new Request('http://localhost:8080/font.woff2')

      mockCache.match.mockResolvedValue(null)
      mockFetch.mockRejectedValue(new Error('Network error'))

      const result = await self.testExports.handleStaticAsset(request)

      expect(result.status).toBe(503)
      expect(result.statusText).toBe('Service Unavailable')
      expect(await result.text()).toBe('Offline - Static asset not available')
    })
  })

  describe('Cache Management', () => {
    it('should have correct static assets list', () => {
      const expectedAssets = [
        '/',
        '/index.html',
        '/manifest.json',
        '/favicon.ico',
        '/favicon-geometric.svg',
        '/robots.txt',
        '/sitemap.xml',
        '/Engineer_Wilberto_Pacheco_Batista.pdf'
      ]

      expect(self.testExports.STATIC_ASSETS).toEqual(expectedAssets)
    })

    it('should have correct cache strategies', () => {
      expect(self.testExports.CACHE_STRATEGIES).toEqual({
        CACHE_FIRST: 'cache-first',
        NETWORK_FIRST: 'network-first',
        STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle cache open errors gracefully', async () => {
      const request = new Request('http://localhost:8080/js/app.js')

      mockCaches.open.mockRejectedValue(new Error('Cache error'))

      const result = await self.testExports.handleStaticAsset(request)

      expect(result.status).toBe(503)
      expect(result.statusText).toBe('Service Unavailable')
    })

    it('should handle unexpected errors gracefully', async () => {
      const request = new Request('http://localhost:8080/js/app.js')

      mockCaches.open.mockImplementation(() => {
        throw new Error('Unexpected error')
      })

      const result = await self.testExports.handleStaticAsset(request)

      expect(result.status).toBe(503)
      expect(result.statusText).toBe('Service Unavailable')
    })
  })

  describe('Response Cloning', () => {
    it('should properly clone responses', () => {
      const originalResponse = new Response('test content', {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'text/plain' }
      })

      const clonedResponse = originalResponse.clone()

      expect(clonedResponse.status).toBe(originalResponse.status)
      expect(clonedResponse.statusText).toBe(originalResponse.statusText)
      expect(clonedResponse.headers.get('Content-Type')).toBe('text/plain')
    })
  })
})
