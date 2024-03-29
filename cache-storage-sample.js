'use strict';

async function writeCacheData(cache, key, value) {
  const url = `https://example.com/cached/${key}`;
  await cache.put(url, new Response(value));
}

async function readCacheData(cache, key) {
  const url = `https://example.com/cached/${key}`;
  const response = await cache.match(url);
  return await response.text();
}

(async () => {
  const cache = await caches.open('cache');
  await writeCacheData(cache, 'userid', 'pwnall');
  await writeCacheData(cache, 'hello', 'world');
  console.log(await readCacheData(cache, 'userid'));
})();
