# Service Worker Tests

This file contains comprehensive unit tests for the service worker functionality in the portfolio website.

## Test Coverage

### 🧪 Development Mode Detection
- ✅ Detects development mode on localhost
- ✅ Detects development mode on 127.0.0.1  
- ✅ Correctly identifies production domains

### 🔍 Request Type Detection
- ✅ Identifies static assets (JS, CSS, fonts)
- ✅ Identifies API requests (/api/ paths and api domains)
- ✅ Identifies HTML requests (by Accept header)
- ✅ Identifies image requests (jpg, png, svg, etc.)
- ✅ Identifies font requests (woff, ttf, Google Fonts)

### 🚀 Development Asset Handling
- ✅ Fetches from network first in development
- ✅ Falls back to cache when network fails
- ✅ Returns JS fallback when both network and cache fail
- ✅ Returns CSS fallback when both network and cache fail

### 💾 Static Asset Handling
- ✅ Returns cached response when available
- ✅ Fetches from network and caches when not cached
- ✅ Returns JS fallback when network fails and no cache
- ✅ Returns CSS fallback when network fails and no cache
- ✅ Returns 503 for other asset types when offline

### 🗂️ Cache Management
- ✅ Has correct static assets list
- ✅ Has correct cache strategies defined

### ⚠️ Error Handling
- ✅ Handles cache open errors gracefully
- ✅ Handles unexpected errors gracefully

### 🔄 Response Cloning
- ✅ Properly clones responses with all properties

## Running Tests

```bash
# Run only service worker tests
yarn test --run ServiceWorker.spec.js

# Run all tests
yarn test --run
```

## Test Structure

The tests use comprehensive mocking to simulate:
- Service Worker environment (`self`, `caches`, `fetch`)
- URL parsing and request handling
- Response objects with proper methods
- Cache operations and network failures

## Key Features Tested

1. **Offline Functionality**: Ensures the service worker provides proper fallbacks when offline
2. **Cache Strategies**: Verifies different caching approaches for different asset types
3. **Development vs Production**: Tests behavior differences between environments
4. **Error Resilience**: Ensures graceful handling of various failure scenarios
5. **Request Classification**: Validates proper identification of different request types

## Mock Implementation

The tests include sophisticated mocks for:
- `global.caches` - Cache API operations
- `global.fetch` - Network requests
- `global.Response` - HTTP responses with text() method
- `global.Request` - HTTP requests with headers
- `global.URL` - URL parsing and manipulation
- `global.self` - Service Worker context

This ensures the service worker logic can be tested in isolation without requiring a real browser environment.
